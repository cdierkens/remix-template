import * as docker from "@pulumi/docker";
import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { enableCloudRun } from "../apis/enable-cloud-run";
import {
  postgresDatabase,
  postgresInstance,
  postgresShadowDatabase,
  postgresUser,
} from "../database/postgresql";

if (!gcp.config.project) {
  throw new Error("Please set the project in the config.");
}

const location = gcp.config.region || "us-central1";

const config = new pulumi.Config();

const FIREBASE_API_KEY = config.getSecret("FIREBASE_API_KEY");
const FIREBASE_AUTH_DOMAIN = config.getSecret("FIREBASE_AUTH_DOMAIN");
const SESSION_STORAGE_SECRET = config.getSecret("SESSION_STORAGE_SECRET");
const POSTGRES_PASSWORD = config.getSecret("POSTGRES_PASSWORD");
const POSTGRES_USER = config.getSecret("POSTGRES_USER");

const DATABASE_URL = pulumi.interpolate`postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${postgresInstance.publicIpAddress}:5432/${postgresDatabase.name}?host=/cloudsql/${postgresInstance.connectionName}`;

const SHADOW_DATABASE_URL = pulumi.interpolate`postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${postgresInstance.publicIpAddress}:5432/${postgresShadowDatabase.name}?host=/cloudsql/${postgresInstance.connectionName}`;

const remixImage = new docker.Image("remix-image", {
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/remix`,
  build: {
    context: "../",
    extraOptions: ["--platform", "linux/amd64"],
  },
});

export const remix_service_account = new gcp.serviceaccount.Account(
  "remix-service-account",
  {
    accountId: `remix-service-account`,
    displayName: "Remix Service Account",
  }
);

const serviceAccountUserBinding = new gcp.serviceaccount.IAMBinding(
  "service-account-user-role",
  {
    serviceAccountId: remix_service_account.name,
    role: "roles/iam.serviceAccountUser",
    members: ["allUsers"],
  }
);

const serviceAccountSqlClientIAMBinding = new gcp.projects.IAMBinding(
  `cloudsql-client-role`,
  {
    project: gcp.config.project,
    role: "roles/cloudsql.client",
    members: [
      pulumi.interpolate`serviceAccount:${remix_service_account.email}`,
    ],
  }
);

export const remixService = new gcp.cloudrun.Service(
  "remix-service",
  {
    location,
    // https://github.com/hashicorp/terraform-provider-google/issues/5898
    autogenerateRevisionName: true,
    template: {
      spec: {
        serviceAccountName: remix_service_account.email,
        containers: [
          {
            image: remixImage.imageName,
            envs: [
              {
                name: "FIREBASE_API_KEY",
                value: FIREBASE_API_KEY,
              },
              {
                name: "FIREBASE_AUTH_DOMAIN",
                value: FIREBASE_AUTH_DOMAIN,
              },
              {
                name: "SESSION_STORAGE_SECRET",
                value: SESSION_STORAGE_SECRET,
              },
              {
                name: "DATABASE_URL",
                value: DATABASE_URL,
              },
              {
                name: "SHADOW_DATABASE_URL",
                value: SHADOW_DATABASE_URL,
              },
            ],
          },
        ],
      },
      metadata: {
        annotations: {
          "run.googleapis.com/cloudsql-instances":
            postgresInstance.connectionName,
        },
      },
    },
  },
  {
    dependsOn: [
      enableCloudRun,
      serviceAccountUserBinding,
      postgresDatabase,
      postgresUser,
      serviceAccountSqlClientIAMBinding,
    ],
  }
);

new gcp.cloudrun.IamMember("remix-service-iam-member", {
  service: remixService.name,
  location,
  role: "roles/run.invoker",
  member: "allUsers",
});

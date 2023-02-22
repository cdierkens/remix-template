import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const POSTGRES_USER = config.get("POSTGRES_USER");
const POSTGRES_PASSWORD = config.get("POSTGRES_PASSWORD");

export const postgresInstance = new gcp.sql.DatabaseInstance(
  "postgres-instance",
  {
    region: "us-central1",
    databaseVersion: "POSTGRES_14",
    settings: {
      tier: "db-f1-micro",
    },
    deletionProtection: true,
  }
);

export const postgresDatabase = new gcp.sql.Database("postgres-database", {
  instance: postgresInstance.name,
  deletionPolicy: "ABANDON",
});

export const postgresShadowDatabase = new gcp.sql.Database(
  "postgres-shadow-database",
  {
    instance: postgresInstance.name,
    deletionPolicy: "ABANDON",
  }
);

export const postgresUser = new gcp.sql.User("postgres-user", {
  instance: postgresInstance.name,
  name: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

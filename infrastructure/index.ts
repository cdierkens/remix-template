// import { remix_cloud_function } from "./functions/remix_cloud_function";
import { remixService } from "./compute/remix-cloud-run";
import {
  postgresDatabase,
  postgresInstance,
  postgresShadowDatabase,
} from "./database/postgresql";

export const remixServiceName = remixService.name;
export const postgresInstancePublicIp = postgresInstance.publicIpAddress;
export const postgresDatabaseName = postgresDatabase.name;
export const postgresShadowDatabaseName = postgresShadowDatabase.name;

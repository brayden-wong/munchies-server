import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "./schemas";
import {
  getDrizzleConfigToken,
  getDrizzleInstanceToken,
} from "./drizzle.constants";
import { Database, DrizzleConfig } from "./drizzle.types";
import { ScheduleModule } from "@nestjs/schedule";
import { DrizzleService } from "./drizzle.service";

@Global()
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    DrizzleService,
    {
      provide: getDrizzleConfigToken(),
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const getDatabaseConfig = async (): Promise<DrizzleConfig> => {
          return {
            host: config.get<string>("PG_HOST"),
            database: config.get<string>("PG_DATABASE"),
            port: config.get<number>("PG_PORT"),
            user: config.get<string>("PG_USER"),
            password: config.get<string>("PG_PASSWORD"),
          };
        };

        return await getDatabaseConfig();
      },
    },
    {
      provide: getDrizzleInstanceToken(),
      inject: [getDrizzleConfigToken()],
      useFactory: async ({
        database,
        host,
        password,
        user,
        ...config
      }: DrizzleConfig): Promise<Database> => {
        const connectionString = `postgres://${user}:${password}@${host}${
          process.env.NODE_ENV === "docker" ? `:${config.port}` : ""
        }/${database}`;

        const client = new Client({
          connectionString,
          ssl:
            process.env.NODE_ENV === "production"
              ? true
              : process.env.NODE_ENV === "development"
              ? true
              : false,
        });

        await client.connect();

        const db = drizzle(client, { logger: false, schema });

        return db;
      },
    },
  ],
  exports: [getDrizzleInstanceToken()],
})
export class DrizzleModule {}

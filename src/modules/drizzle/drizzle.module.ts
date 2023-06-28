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

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: getDrizzleConfigToken(),
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const getDatabaseConfig = async (): Promise<DrizzleConfig> => {
          return {
            host: config.get<string>("PG_HOST"),
            database: config.get<string>("PG_DATABASE"),
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
      }: DrizzleConfig): Promise<Database> => {
        const client = new Client({
          connectionString: `postgres://${user}:${password}@${host}/${database}`,
          ssl: true,
        });

        await client.connect();

        const db = drizzle(client, { logger: true, schema });

        return db;
      },
    },
  ],
  exports: [getDrizzleInstanceToken()],
})
export class DrizzleModule {}

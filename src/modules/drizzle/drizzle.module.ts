import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
// import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";

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
        const uri = `postgres://${user}:${password}@${host}${
          process.env.NODE_ENV === "docker" ? `:${config.port}` : ""
        }/${database}`;

        neonConfig.fetchConnectionCache = true;
        const sql = neon(uri);

        const db = drizzle(sql, { logger: true, schema });

        return db;
      },
    },
  ],
  exports: [getDrizzleInstanceToken()],
})
export class DrizzleModule {}

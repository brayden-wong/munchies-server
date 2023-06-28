import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schemas";

export type DrizzleConfig = {
  host: string;
  database: string;
  user: string;
  password: string;
};

export type Database = NodePgDatabase<typeof schema>;

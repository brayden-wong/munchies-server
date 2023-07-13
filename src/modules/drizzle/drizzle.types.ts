import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schemas";

export type DrizzleConfig = {
  host: string;
  database: string;
  user: string;
  port: number;
  password: string;
};

export type Database = NeonHttpDatabase<typeof schema>;

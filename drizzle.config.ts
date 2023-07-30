import { Config } from "drizzle-kit";
import { config } from "dotenv";
config({
  path: `.env.${process.env.NODE_ENV}`,
});

export default {
  schema: "./src/modules/drizzle/schemas",
  driver: "pg",
  dbCredentials: {
    connectionString: `postgres://${process.env.PG_USER}:${
      process.env.PG_PASSWORD
    }@${process.env.PG_HOST}${
      process.env.NODE_ENV === "docker" ? `:${process.env.PG_PORT}` : ""
    }/${process.env.PG_DATABASE}?sslmode=require`,
    ssl: process.env.NODE_ENV !== "docker" ? true : false,
  },
  out: "./.drizzle",
} satisfies Config;

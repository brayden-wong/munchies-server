import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as dotenv from "dotenv";
import { Client } from "pg";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const main = async () => {
  console.log("running migration...\n");
  const config = {
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  };

  const connectionString = `postgres://${config.user}:${config.password}@${
    config.host
  }${process.env.NODE_ENV === "docker" ? `:${config.port}` : ""}/${
    config.database
  }`;

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

  const db = drizzle(client);

  await migrate(db, { migrationsFolder: "./.drizzle" });
};

main()
  .catch((error) => {
    console.error(error);
  })
  .then(() => {
    console.log("migration complete");
  })
  .finally(() => {
    process.exit(1);
  });

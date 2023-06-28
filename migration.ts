import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

import { Client } from "pg";

const main = async () => {
  console.log("running migration...");
  const config = {
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  };

  const client = new Client({
    connectionString: `postgres://${config.user}:${config.password}@${config.host}/${config.database}`,
    ssl: true,
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

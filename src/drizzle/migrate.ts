import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { DB_CONFIG } from "../constants.js";

const { Client } = pg;

const migrationClient = new Client(DB_CONFIG);

async function main() {
  await migrationClient.connect();

  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/drizzle/migrations",
  });

  await migrationClient.end();
}

main().then(() => {
  console.log("Migration complete");
});

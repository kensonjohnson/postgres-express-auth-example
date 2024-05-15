import { config } from "dotenv";
import pg from "pg";
import { readFileSync } from "fs";

config();

if (!process.env.DATABASE_URL) {
  console.error(
    "❌ " + colorize("DATABASE_URL environment variable not set. Exiting.")
  );
  exit(1);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const check = await checkTablesExist();

switch (check.rows[0].table_count) {
  case "0":
    console.log("Creating tables...");
    await createTables();
    console.log("✅ " + colorize("Tables created successfully."));
    exit();
    break;
  case "1":
  case "2":
  case "3":
    console.log(
      "❗ " + colorize("Bad configuration found. Recreating tables...")
    );
    await deleteTables();
    await createTables();
    console.log("✅ " + colorize("Tables recreated successfully. Exiting."));
    exit();
    break;
  case "4":
    console.log("✅ " + colorize("Tables already created. Exiting."));
    exit();
    break;
  default:
    console.error("❌ " + colorize("Unexpected error encountered. Exiting."));
    exit(1);
}

function checkTablesExist() {
  const sql = readFileSync("infra/check.sql").toString();
  return pool.query(sql);
}

function createTables() {
  const sql = readFileSync("infra/init.sql").toString();
  return pool.query(sql);
}

function deleteTables() {
  const sql = readFileSync("infra/delete.sql").toString();
  return pool.query(sql);
}

function exit(code = 0) {
  pool.end();
  process.exit(code);
}

function colorize(text) {
  return `\x1b[93m${text}\x1b[39m`;
}

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

const sql = readFileSync("infra/init.sql").toString();

pool.query(sql, (error) => {
  if (error) {
    console.error("❌ " + colorize("Error creating tables: " + error));
    pool.end();
    exit(1);
  }
  console.log("✅ " + colorize("Tables created successfully."));
  exit();
});

function exit(code = 0) {
  pool.end();
  process.exit(code);
}

function colorize(text) {
  return `\x1b[93m${text}\x1b[39m`;
}

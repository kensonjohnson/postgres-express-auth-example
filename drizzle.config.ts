import { defineConfig } from "drizzle-kit";
import { DB_CONFIG } from "./src/constants.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    url: DB_CONFIG.connectionString,
  },
  verbose: true,
  strict: true,
});

import { config } from "dotenv";
config();

const isProduction = process.env.NODE_ENV !== "development";

export const PORT = parseInt(process.env.PORT || "3000");

const BASE_URL = process.env.BASE_URL ?? "http://localhost";

export const WEBSITE_URL = isProduction ? BASE_URL : `http://localhost:${PORT}`;

export const MAILTRAP_CONFIG = {
  endpoint: process.env.MAILTRAP_ENDPOINT!,
  token: process.env.MAILTRAP_API_KEY!,
};

export const MAILTRAP_SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL!;

export const SMTP_EMAIL = process.env.SMTP_EMAIL!;

export const DB_CONFIG = {
  connectionString: process.env.DATABASE_URL!,
};

export const COOKIE_SECRET = process.env.COOKIE_SECRET!;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

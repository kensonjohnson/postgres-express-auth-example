import { config } from "dotenv";
config();

const isProduction = process.env.NODE_ENV === "production";

export const PORT = parseInt(process.env.PORT || "3000");

const BASE_URL = process.env.BASE_URL ?? "http://localhost";

export const WEBSITE_URL = BASE_URL + (isProduction ? "" : `:${PORT}`);

export const SMTP_CONFIG = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT!),
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const SMTP_EMAIL = process.env.SMTP_EMAIL!;

export const DB_CONFIG = {
  connectionString: process.env.DATABASE_URL,
};

export const COOKIE_SECRET = process.env.COOKIE_SECRET!;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

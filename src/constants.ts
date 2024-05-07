import { config } from "dotenv";
config();

export const PORT = parseInt(process.env.PORT || "3000");

export const WEBSITE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

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
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
};

export const COOKIE_SECRET = process.env.COOKIE_SECRET!;

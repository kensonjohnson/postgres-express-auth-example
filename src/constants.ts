import { config } from "dotenv";
config();

const isProduction = process.env.NODE_ENV === "production";

export const port = parseInt(process.env.PORT || "3000");

export const startupMessage = isProduction
  ? `Server is running at port ${port}`
  : `Server is running at http://localhost:${port}`;

export const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT!),
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
};

export const smtpEmail = process.env.SMTP_EMAIL!;

export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
};

export const cookieSecret = process.env.COOKIE_SECRET!;
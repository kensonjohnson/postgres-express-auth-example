import { config } from "dotenv";
config();

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
  user: "postgres",
  password: "password",
  database: "postgres",
  host: "localhost",
  port: 5432,
};

export const cookieSecret = process.env.COOKIE_SECRET!;

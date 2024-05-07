import { createTransport } from "nodemailer";
import { SMTP_CONFIG } from "../../constants.js";

export const transporter = createTransport(SMTP_CONFIG);

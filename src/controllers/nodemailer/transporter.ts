import { createTransport } from "nodemailer";
import { smtpConfig } from "../../constants.js";

export const transporter = createTransport(smtpConfig);

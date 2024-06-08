import { MailtrapClient } from "mailtrap";
import { MAILTRAP_CONFIG } from "../../constants.js";

export const transporter = new MailtrapClient(MAILTRAP_CONFIG);

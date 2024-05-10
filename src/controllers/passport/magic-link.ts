import MagicLink from "passport-magic-link";
import { pool } from "../../db/db.js";
import { transporter } from "../nodemailer/transporter.js";
import { COOKIE_SECRET, WEBSITE_URL, SMTP_EMAIL } from "../../constants.js";

export const MagicLinkStrategy = new MagicLink.Strategy(
  {
    secret: COOKIE_SECRET,
    userFields: ["email"],
    tokenField: "token",
    verifyUserAfterToken: true,
  },
  sendEmailToUser,
  verifyUser
);

function sendEmailToUser(user: Express.User, token: string) {
  const link = WEBSITE_URL + "/auth/email/verify?token=" + token;
  const msg = {
    to: user.email,
    from: SMTP_EMAIL,
    subject: "Sign in to Test Website",
    text:
      "Hello! Click the link below to finish signing in to Todos.\r\n\r\n" +
      link,
    html:
      '<h3>Hello!</h3><p>Click the link below to finish signing in to Todos.</p><p><a href="' +
      link +
      '">Sign in</a></p>',
  };
  return transporter.sendMail(msg);
}

function verifyUser(user: Express.User) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      // Check for the user's email in the database
      const query = await pool.query("SELECT * FROM users WHERE email = $1", [
        user.email,
      ]);

      // If the query fails, throw
      if (!query) throw new Error("Failed to fetch user details.");

      // Check if we found a user
      if (query.rowCount && query.rowCount > 0) {
        return resolve(query.rows[0]);
      }

      // If no user found, create one
      const insert = await pool.query(
        "INSERT INTO users (email, email_verified) VALUES ($1, $2) RETURNING *",
        [user.email, true]
      );

      if (!insert) throw new Error("Failed to create user");

      return resolve(insert.rows[0]);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
}

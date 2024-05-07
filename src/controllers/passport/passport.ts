import type { Express } from "express";
import { MagicLinkStrategy } from "./magic-link.js";
import session from "express-session";
import connectPG from "connect-pg-simple";
import { pool as pgPool } from "../../db/db.js";
import passport from "passport";
import { cookieSecret } from "../../constants.js";

export function configurePassport(app: Express) {
  // Create session store
  const pgSession = connectPG(session);

  app.use(
    session({
      store: new pgSession({
        pool: pgPool,
      }),
      secret: cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 Day expiration
    })
  );

  app.use(passport.authenticate("session"));

  // Add Strategies
  passport.use(MagicLinkStrategy);

  // Serialize and Deserialize
  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      cb(null, {
        id: user.id,
        email: user.email,
      });
    });
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
      return cb(null, user as Express.User);
    });
  });
}

import { Router } from "express";
import passport from "passport";
import {
  parseUserToken,
  ensureAuthenticated,
  logoutUser,
} from "../controllers/auth-controller.js";

const authRouter = Router();

authRouter.get("/check", ensureAuthenticated, parseUserToken);

authRouter.post(
  "/email",
  passport.authenticate("magiclink", {
    // @ts-expect-error: Added by passport-magic-link, which doesn't provide TypeScript types
    action: "requestToken",
    failureRedirect: "/",
  }),
  (_req, res) => {
    res.end();
  }
);

authRouter.get(
  "/email/verify",
  passport.authenticate("magiclink", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

authRouter.post("/logout", logoutUser);

export { authRouter };

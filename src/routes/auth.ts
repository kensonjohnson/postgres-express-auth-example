import { Router } from "express";
import passport from "passport";
import {
  parseUserToken,
  ensureAuthenticated,
  logoutUser,
} from "../controllers/auth-controller.js";

const router = Router();

router.get("/check", ensureAuthenticated, parseUserToken);

router.post(
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

router.get(
  "/email/verify",
  passport.authenticate("magiclink", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.post("/logout", logoutUser);

export default router;

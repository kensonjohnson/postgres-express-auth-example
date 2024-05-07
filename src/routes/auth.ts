import { Router } from "express";
import passport from "passport";
import { logoutUser } from "../controllers/auth-controller.js";

const router = Router();

router.post(
  "/email",
  passport.authenticate("magiclink", {
    // @ts-expect-error
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

import type { Request, Response, NextFunction } from "express";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

export async function logoutUser(req: Request, res: Response) {
  req.logout((error) => {
    if (error) console.error("Error in logout", error);
    // This part is necessary to remove the session cookie,
    // as express-session does not remove it. Without this,
    // the res.cookie() below will not work.
    if (req.session && req.session.cookie) {
      req.session.destroy((error) => {
        if (error) console.error("Error in session destroy", error);
      });
    }
    // Overwrite the cookie to make sure it's removed. This one
    // works by setting the cookie to expire immediately.
    res.cookie("connect.sid", null, { expires: new Date(0), httpOnly: true });
    res.end();
  });
}

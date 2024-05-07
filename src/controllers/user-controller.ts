import type { Request, Response } from "express";

export function getUser(req: Request, res: Response) {
  const user = req.user;
  res.json(user);
}

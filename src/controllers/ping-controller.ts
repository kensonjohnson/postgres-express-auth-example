import type { Request, Response } from "express";

export function ping(req: Request, res: Response) {
  res.json({ serverMessage: "pong" });
}

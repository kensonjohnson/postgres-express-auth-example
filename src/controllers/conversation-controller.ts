import type { Request, Response } from "express";

export async function handleChatSubmission(req: Request, res: Response) {
  res.json({ message: "Chat message received" });
}

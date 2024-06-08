import type { Request, Response } from "express";
import { db } from "../drizzle/db.js";
import { UserTable } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export async function getUser(req: Request, res: Response) {
  const user = db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, req.user!.id));

  res.json(user);
}

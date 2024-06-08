import type { Request, Response } from "express";
import { db } from "../drizzle/db.js";
import { UserTable } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export async function getUser(req: Request, res: Response) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, parseInt(req.params.id!)),
  });

  res.json(user);
}

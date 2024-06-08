import type { Request, Response } from "express";
import { db } from "../drizzle/db.js";
import { UserTable } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export async function getUser(req: Request, res: Response) {
  try {
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.id, req.user!.id),
    });

    res.json(user);
  } catch (error) {
    req.log.error(error);
  }
}

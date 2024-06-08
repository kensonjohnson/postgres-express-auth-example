import type { Request, Response } from "express";
import { db } from "../drizzle/db.js";
import { CreditTable, DebitTable, UserTable } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export async function getBalance(req: Request, res: Response) {
  const userId = req.user!.id;
  try {
    const [user] = await db
      .select({ credit_balance: UserTable.credit_balance })
      .from(UserTable)
      .where(eq(UserTable.id, userId));
    res.json(user);
  } catch (error) {
    console.error(error);
  }
}

export async function addCredits(req: Request, res: Response) {
  const userId = req.user!.id;
  try {
    await db.insert(CreditTable).values({ user_id: userId, amount: 10 });

    res.json({ message: "Credit successful", amount: 10 });
  } catch (error) {
    console.error(error);
    res.end().status(500);
  }
}

export async function removeCredits(req: Request, res: Response) {
  const userId = req.user!.id;

  try {
    await db.insert(DebitTable).values({ user_id: userId, amount: 1 });

    res.json({ message: "Debit successful", amount: 1 });
  } catch (error) {
    console.error(error);
    res.end().status(500);
  }
}

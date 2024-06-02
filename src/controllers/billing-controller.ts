import type { Request, Response } from "express";
import { pool } from "../db/db.js";

export async function getBalance(req: Request, res: Response) {
  const userId = req.user!.id;
  try {
    const query = await pool.query(
      "SELECT credit_balance AS balance FROM users WHERE id = $1",
      [userId]
    );
    console.log("Balance for user " + userId + " is " + query.rows[0].balance);

    // Update the user's credit balance in the session
    const updatedUser = req.user!;
    updatedUser.credit_balance = query.rows[0].balance;
    req.logIn(updatedUser, (err) => console.error(err));
    res.json(query.rows[0]);
  } catch (error) {
    console.error(error);
  }
}

export async function addCredits(req: Request, res: Response) {
  const userId = req.user!.id;
  try {
    await pool.query("INSERT INTO credit (user_id, amount) VALUES ($1, 10)", [
      userId,
    ]);

    // Update the user's credit balance in the session.
    // Right now, only 10 credits are added at a time,
    // so we can just add 10 to the current balance.
    const updatedUser = req.user!;
    updatedUser.credit_balance += 10;
    req.logIn(updatedUser, (err) => console.error(err));

    res.json({ message: "Credit successful", amount: 10 });
  } catch (error) {
    console.error(error);
    res.end().status(500);
  }
}

export async function removeCredits(req: Request, res: Response) {
  const userId = req.user!.id;

  try {
    await pool.query("INSERT INTO debit (user_id, amount) VALUES ($1, 1)", [
      userId,
    ]);

    // Update the user's credit balance in the session.
    // Right now, only 1 credit is removed at a time,
    // so we can just subtract 1 from the current balance.
    const updatedUser = req.user!;
    updatedUser.credit_balance -= 1;
    req.logIn(updatedUser, (err) => console.error(err));

    res.json({ message: "Debit successful", amount: 1 });
  } catch (error) {
    console.error(error);
    res.end().status(500);
  }
}

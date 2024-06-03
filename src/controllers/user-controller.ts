import type { Request, Response } from "express";
import { pool } from "../db/db.js";

export async function getUser(req: Request, res: Response) {
  const query = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.user!.id,
  ]);
  res.json(query.rows[0]);
}

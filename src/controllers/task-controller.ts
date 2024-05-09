import type { Request, Response } from "express";
import { pool } from "../db/db.js";

export async function getTasks(req: Request, res: Response) {
  const { listId } = req.query;
  if (!listId) {
    return res.status(400).json({ error: "Missing listId" });
  }

  try {
    const query = await pool.query("SELECT * FROM task WHERE list_id = $1", [
      listId,
    ]);

    if (!query) throw new Error("Failed to get tasks");

    res.json(query.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get tasks" });
  }
}

export async function createTask(req: Request, res: Response) {
  const { listId, title } = req.body;
  if (!listId || !title) {
    return res.status(400).json({ error: "Missing listId or title" });
  }

  try {
    const query = await pool.query(
      "INSERT INTO task (list_id, title) VALUES ($1, $2) RETURNING *",
      [listId, title]
    );

    if (!query) throw new Error("Failed to create task");

    res.json(query.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  try {
    const query = await pool.query("DELETE FROM task WHERE id = $1", [id]);

    if (!query) throw new Error("Failed to delete task");

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
}

export async function updateTitle(req: Request, res: Response) {
  const { id, title } = req.body;
  if (!id || !title) {
    return res.status(400).json({ error: "Missing id or title" });
  }

  try {
    const query = await pool.query(
      "UPDATE task SET title = $1 WHERE id = $2 RETURNING *",
      [title, id]
    );

    if (!query) throw new Error("Failed to update task");

    res.json(query.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
}

export async function updateCompleted(req: Request, res: Response) {
  const { id, completed } = req.body;
  if (!id || completed === undefined) {
    return res.status(400).json({ error: "Missing id or completed" });
  }

  try {
    const query = await pool.query(
      "UPDATE task SET completed = $1 WHERE id = $2 RETURNING *",
      [Boolean(completed), id]
    );

    if (!query) throw new Error("Failed to update task");

    res.json(query.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
}

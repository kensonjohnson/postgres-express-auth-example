import type { Request, Response } from "express";
import { db } from "../drizzle/db.js";
import { TaskTable } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export async function getTasks(req: Request, res: Response) {
  const { listId } = req.query;
  if (!listId || typeof listId !== "string" || isNaN(parseInt(listId))) {
    return res.status(400).json({ error: "listId missing or not a number" });
  }

  try {
    const tasks = await db
      .select()
      .from(TaskTable)
      .where(eq(TaskTable.list_id, parseInt(listId)));

    res.json(tasks);
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to get tasks" });
  }
}

export async function createTask(req: Request, res: Response) {
  const { listId, title } = req.body;
  if (!listId || !title) {
    return res.status(400).json({ error: "Missing listId or title" });
  }

  if (isNaN(parseInt(listId))) {
    return res.status(400).json({ error: "listId must be a number" });
  }

  if (title.length > 255) {
    return res.status(400).json({ error: "Title is too long" });
  }

  try {
    const insert = await db
      .insert(TaskTable)
      .values({ list_id: listId, title })
      .returning();

    res.json(insert.at(0));
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    await db.delete(TaskTable).where(eq(TaskTable.id, parseInt(id)));

    res.status(204).send();
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
}

export async function updateTitle(req: Request, res: Response) {
  const { id, title } = req.body;
  if (!id || !title) {
    return res.status(400).json({ error: "Missing id or title" });
  }

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid id" });
  }

  if (title.length > 255) {
    return res.status(400).json({ error: "Title is too long" });
  }

  try {
    const update = await db
      .update(TaskTable)
      .set({ title })
      .where(eq(TaskTable.id, parseInt(id!)))
      .returning();

    res.json(update.at(0));
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
}

export async function updateCompleted(req: Request, res: Response) {
  const { id, completed } = req.body;
  if (!id || completed === undefined) {
    return res.status(400).json({ error: "Missing id or completed" });
  }

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const update = await db
      .update(TaskTable)
      .set({ completed })
      .where(eq(TaskTable.id, id))
      .returning();

    res.json(update.at(0));
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
}

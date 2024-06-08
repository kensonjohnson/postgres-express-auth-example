import type { Request, Response } from "express";
import { db } from "../drizzle/db.js";
import { ListTable, TaskTable } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

export async function getLists(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const lists = await db
      .select()
      .from(ListTable)
      .where(eq(ListTable.user_id, userId));

    if (!lists) throw new Error("Failed to fetch lists.");

    // Queue the creation of adding tasks to each list
    const formattedLists = lists.map(async (list) => {
      const tasks = await db
        .select()
        .from(TaskTable)
        .where(eq(TaskTable.list_id, list.id));
      return { ...list, tasks };
    });

    // Wait for all lists to be formatted
    const finishedResults = await Promise.all(formattedLists);

    res.json(finishedResults);
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to fetch lists." });
  }
}

export async function getList(req: Request, res: Response) {
  if (!req.params.id) {
    return res.status(400).json({ error: "No list ID provided." });
  }

  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({ error: "Invalid list ID." });
  }

  try {
    const id = parseInt(req.params.id);

    const singleList = await db
      .select()
      .from(ListTable)
      .where(eq(ListTable.id, id));

    res.status(200).json(singleList.at(0));
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to fetch list." });
  }
}

export async function createList(req: Request, res: Response) {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required." });
  }

  if (req.body.title.length > 255) {
    return res.status(400).json({ error: "Title is too long." });
  }

  try {
    const userId = req.user!.id;
    const { title, description } = req.body;

    const insert = await db
      .insert(ListTable)
      .values({
        title: title,
        description: description,
        user_id: userId,
      })
      .returning();

    res.status(201).json(insert.at(0));
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to create list." });
  }
}

export async function updateList(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const update = await db
      .update(ListTable)
      .set({
        title,
        description,
      })
      .where(eq(ListTable.id, parseInt(id!)))
      .returning();

    res.status(200).json(update.at(0));
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to update list." });
  }
}

export async function deleteList(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await db.delete(ListTable).where(eq(ListTable.id, parseInt(id!)));

    res.json({ message: "List deleted." });
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ error: "Failed to delete list." });
  }
}

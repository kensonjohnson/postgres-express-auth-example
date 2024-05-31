import type { Request, Response } from "express";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "../constants.js";
import { pool } from "../db/db.js";
import type { CompletionUsage } from "openai/resources/completions.mjs";
// import { Stream } from "openai/streaming.mjs";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getChat(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const query = await pool.query(
      "SELECT role, content FROM message WHERE conversation_id = $1 ORDER BY created_on",
      [id]
    );
    res.json(query.rows);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export async function getConversations(req: Request, res: Response) {
  try {
    const { id } = req.user!;
    const query = await pool.query(
      "SELECT id, title FROM conversation WHERE user_id = $1 ORDER BY last_updated DESC",
      [id]
    );
    res.json(query.rows);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export async function createConversation(req: Request, res: Response) {
  const { id } = req.user!;
  try {
    const query = await pool.query(
      "INSERT INTO conversation (user_id, title) VALUES ($1, $2) RETURNING id",
      [id, "Untitled Conversation"]
    );
    res.json(query.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export async function editConversationTitle(req: Request, res: Response) {
  const { id, title } = req.body;
  try {
    await pool.query("UPDATE conversation SET title = $1 WHERE id = $2", [
      title,
      id,
    ]);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export async function deleteConversation(req: Request, res: Response) {
  const { id } = req.body;
  try {
    await pool.query("DELETE FROM conversation WHERE id = $1", [id]);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export async function handleChatSubmission(req: Request, res: Response) {
  const message = req.body.message;
  let conversationId = req.body.conversationId;
  const { id } = req.user!;

  if (!message) {
    res.status(400).json({ error: "Invalid or empty message" });
    return;
  }

  try {
    if (!conversationId || conversationId === "0") {
      const query = await pool.query(
        "INSERT INTO conversation (user_id, title) VALUES ($1, $2) RETURNING id",
        [id, "Untitled Conversation"]
      );
      conversationId = query.rows[0].id;
    }
    await pool.query(
      "INSERT INTO message (conversation_id, role, content) VALUES ($1, $2, $3)",
      [conversationId, "user", message]
    );

    const query = await pool.query(
      "SELECT * FROM message WHERE conversation_id = $1 ORDER BY created_on DESC LIMIT 10",
      [conversationId]
    );

    const messages = query.rows
      .map((row) => ({
        role: row.role,
        content: row.content,
      }))
      .reverse();

    if (messages.length < 10) {
      messages.unshift({
        role: "system",
        content: "You are a helpful assistant.",
      });
    }

    console.log("first 10 messages", messages);

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
      stream_options: { include_usage: true },
    });

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    let accumulatedContent = "";
    let usage: CompletionUsage | undefined;
    for await (const part of stream) {
      if (part.choices[0]?.finish_reason === "stop") continue;
      if (part.usage) {
        usage = part.usage;
        break;
      }
      // await new Promise((resolve) => setTimeout(resolve, 30));
      const content: string = part.choices[0]?.delta?.content || "";
      accumulatedContent += content;

      res.write(content);
    }

    await pool.query(
      "INSERT INTO message (conversation_id, role, content, total_token_count, prompt_token_count, response_token_count) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        conversationId,
        "system",
        accumulatedContent,
        usage?.total_tokens ?? 0,
        usage?.prompt_tokens ?? 0,
        usage?.completion_tokens ?? 0,
      ]
    );

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

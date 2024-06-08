import type { Request, Response } from "express";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "../constants.js";
import { db } from "../drizzle/db.js";
import type { CompletionUsage } from "openai/resources/completions.mjs";
import {
  ConversationTable,
  CreditTable,
  DebitTable,
  MessageTable,
  UserTable,
} from "../drizzle/schema.js";
import { and, desc, eq, gt, sum } from "drizzle-orm";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getChat(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string" || isNaN(parseInt(id))) {
    res.status(400).json({ error: "Invalid or empty conversation ID" });
    return;
  }
  try {
    const conversations = await db
      .select({ role: MessageTable.role, content: MessageTable.content })
      .from(MessageTable)
      .where(eq(MessageTable.conversation_id, parseInt(id)))
      .orderBy(MessageTable.created_on);

    res.json(conversations);
  } catch (error) {
    req.log.error(error);
    res.status(500).end();
  }
}

export async function getConversations(req: Request, res: Response) {
  const userId = req.user!.id;

  try {
    const conversations = await db
      .select({ id: ConversationTable.id, title: ConversationTable.title })
      .from(ConversationTable)
      .where(eq(ConversationTable.user_id, userId))
      .orderBy(desc(ConversationTable.last_updated));

    res.json(conversations);
  } catch (error) {
    req.log.error(error);
    res.status(500).end();
  }
}

export async function createConversation(req: Request, res: Response) {
  const { id } = req.user!;
  try {
    const insert = await db
      .insert(ConversationTable)
      .values({
        user_id: id,
        title: "Untitled Conversation",
      })
      .returning({ id: ConversationTable.id });

    res.json(insert.at(0));
  } catch (error) {
    req.log.error(error);
    res.status(500).end();
  }
}

export async function editConversationTitle(req: Request, res: Response) {
  const { id, title } = req.body;
  if (!id || !title) {
    res
      .status(400)
      .json({ error: "Invalid or empty conversation ID or title" });
    return;
  }

  if (isNaN(parseInt(id))) {
    res.status(400).json({ error: "Invalid conversation ID" });
    return;
  }

  if (title.length > 100) {
    res.status(400).json({ error: "Title is too long" });
    return;
  }

  try {
    await db
      .update(ConversationTable)
      .set({ title })
      .where(eq(ConversationTable.id, parseInt(id)));

    res.end().status(204);
  } catch (error) {
    req.log.error(error);
    res.status(500).end();
  }
}

export async function deleteConversation(req: Request, res: Response) {
  const { id } = req.body;
  if (!id || isNaN(parseInt(id))) {
    res.status(400).json({ error: "Invalid or empty conversation ID" });
    return;
  }
  try {
    await db
      .delete(ConversationTable)
      .where(eq(ConversationTable.id, parseInt(id)));
    res.end().status(204);
  } catch (error) {
    req.log.error(error);
    res.status(500).end();
  }
}

export async function handleChatSubmission(req: Request, res: Response) {
  const message = req.body.message;
  let conversationId: number | undefined = undefined;
  if (
    req.body.conversationId !== undefined &&
    !isNaN(parseInt(req.body.conversationId))
  ) {
    conversationId = parseInt(req.body.conversationId);
  }
  const { id: userId } = req.user!;

  if (!message) {
    res.status(400).json({ error: "Invalid or empty message" });
    return;
  }

  try {
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    // Calculate the user's balance, updating it in this user's account.
    const { balance } = await db.transaction(async (tx) => {
      const credits = await tx
        .select({ credit: sum(CreditTable.amount) })
        .from(CreditTable)
        .where(
          and(
            eq(CreditTable.user_id, userId),
            gt(CreditTable.created_on, sixtyDaysAgo)
          )
        );
      const debits = await tx
        .select({ debit: sum(DebitTable.amount) })
        .from(DebitTable)
        .where(
          and(
            eq(DebitTable.user_id, userId),
            gt(DebitTable.created_on, sixtyDaysAgo)
          )
        );

      const balance =
        Number(credits.at(0)?.credit) - Number(debits.at(0)?.debit);

      await tx
        .update(UserTable)
        .set({ credit_balance: balance })
        .where(eq(UserTable.id, userId));

      return {
        balance,
      };
    });

    if (balance < 1) {
      res.status(402).json({ error: "Insufficient credits" });
      return;
    }

    // If the conversation ID is not provided, create a new conversation.
    if (!conversationId || conversationId === 0) {
      const newId = await db
        .insert(ConversationTable)
        .values({
          user_id: userId,
          title: "Untitled Conversation",
        })
        .returning({ id: ConversationTable.id });
      conversationId = newId.at(0)!.id;
    }

    // Store the message in the database.
    await db.insert(MessageTable).values({
      conversation_id: conversationId,
      role: "user",
      content: message,
    });

    const messages = (
      await db
        .select({ role: MessageTable.role, content: MessageTable.content })
        .from(MessageTable)
        .where(eq(MessageTable.conversation_id, conversationId))
        .orderBy(desc(MessageTable.created_on))
        .limit(10)
    ).reverse() as ChatCompletionMessageParam[];

    if (messages.length < 10) {
      messages.unshift({
        role: "system",
        content: "You are a helpful assistant.",
      });
    }

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

    // Save the response to the database and deduct 1 credit from the user.
    await db.insert(MessageTable).values({
      conversation_id: conversationId,
      role: "system",
      content: accumulatedContent,
      total_token_count: usage?.total_tokens ?? 0,
      prompt_token_count: usage?.prompt_tokens ?? 0,
      response_token_count: usage?.completion_tokens ?? 0,
    });

    await db.insert(DebitTable).values({
      user_id: userId,
      amount: 1,
    });

    res.end();
  } catch (error) {
    req.log.error(error);
    res.status(500).end();
  }
}

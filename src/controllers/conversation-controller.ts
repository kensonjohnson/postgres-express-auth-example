import type { Request, Response } from "express";
import OpenAI from "openai";
import { OPENAI_API_KEY } from "../constants.js";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function handleChatSubmission(req: Request, res: Response) {
  const { message } = req.body;
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
      stream_options: { include_usage: true },
    });

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    for await (const part of stream) {
      if (part.choices[0]?.finish_reason === "stop") continue;
      if (part.usage) {
        console.log("Usage:", part.usage);
        break;
      }
      const content: string = part.choices[0]?.delta?.content || "";
      res.write(content);
    }

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

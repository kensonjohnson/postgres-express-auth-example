import { Router } from "express";
import {
  getChat,
  getConversations,
  createConversation,
  editConversationTitle,
  deleteConversation,
  handleChatSubmission,
} from "../controllers/conversation-controller.js";

const conversationRouter = Router();

conversationRouter.get("/chat/:id", getChat);

conversationRouter.get("/list", getConversations);

conversationRouter.post("/new", createConversation);

conversationRouter.put("/edit", editConversationTitle);

conversationRouter.delete("/delete", deleteConversation);

conversationRouter.post("/submit", handleChatSubmission);

export { conversationRouter };

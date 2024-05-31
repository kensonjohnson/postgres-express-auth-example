import { Router } from "express";
import {
  getChat,
  getConversations,
  createConversation,
  editConversationTitle,
  deleteConversation,
  handleChatSubmission,
} from "../controllers/conversation-controller.js";

const router = Router();

router.get("/chat/:id", getChat);

router.get("/list", getConversations);

router.post("/new", createConversation);

router.put("/edit", editConversationTitle);

router.delete("/delete", deleteConversation);

router.post("/submit", handleChatSubmission);

export default router;

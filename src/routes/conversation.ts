import { Router } from "express";
import { handleChatSubmission } from "../controllers/conversation-controller.js";

const router = Router();

router.post("/", handleChatSubmission);

export default router;

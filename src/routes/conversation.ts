import { Router } from "express";
import { handleChatSubmission } from "../controllers/conversation-controller.js";

const router = Router();

router.get("/", handleChatSubmission);

export default router;

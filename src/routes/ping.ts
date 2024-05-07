import { Router } from "express";
import { ping } from "../controllers/ping-controller.js";

const router = Router();

// Routes here start with /ping
router.get("/", ping);

export default router;

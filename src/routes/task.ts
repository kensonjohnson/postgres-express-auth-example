import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateCompleted,
  updateTitle,
} from "../controllers/task-controller.js";

const router = Router();

router.get("/", getTasks);

router.post("/create", createTask);

router.delete("/delete/:id", deleteTask);

router.post("/update/title", updateTitle);

router.post("/update/completed", updateCompleted);

export default router;

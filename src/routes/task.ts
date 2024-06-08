import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateCompleted,
  updateTitle,
} from "../controllers/task-controller.js";

const taskRouter = Router();

taskRouter.get("/", getTasks);

taskRouter.post("/create", createTask);

taskRouter.delete("/delete/:id", deleteTask);

taskRouter.post("/update/title", updateTitle);

taskRouter.post("/update/completed", updateCompleted);

export { taskRouter };

import { Router } from "express";
import {
  getLists,
  createList,
  updateList,
  deleteList,
} from "../controllers/list-controller.js";

const listRouter = Router();

listRouter.get("/", getLists);

listRouter.post("/create", createList);

listRouter.put("/update/:id", updateList);

listRouter.delete("/delete/:id", deleteList);

export { listRouter };

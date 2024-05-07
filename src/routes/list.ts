import { Router } from "express";
import {
  getLists,
  createList,
  updateList,
  deleteList,
} from "../controllers/list-controller.js";

const router = Router();

router.get("/", getLists);

router.post("/create", createList);

router.put("/update/:id", updateList);

router.delete("/delete/:id", deleteList);

export default router;

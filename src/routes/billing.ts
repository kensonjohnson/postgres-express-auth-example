import { Router } from "express";
import {
  addCredits,
  getBalance,
  removeCredits,
} from "../controllers/billing-controller.js";

const router = Router();

router.get("/balance", getBalance);

router.post("/credit", addCredits);

router.post("/charge", removeCredits);

export default router;

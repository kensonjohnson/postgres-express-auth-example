import { Router } from "express";
import {
  addCredits,
  getBalance,
  removeCredits,
} from "../controllers/billing-controller.js";

const billingRouter = Router();

billingRouter.get("/balance", getBalance);

billingRouter.post("/credit", addCredits);

billingRouter.post("/charge", removeCredits);

export { billingRouter };

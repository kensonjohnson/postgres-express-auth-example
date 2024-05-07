import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // serve static files
  res.sendFile("index.html");
});

export default router;

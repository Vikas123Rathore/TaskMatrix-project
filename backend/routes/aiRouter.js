import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { generateProjectWithAI, generateTaskWithAI } from "../controllers/aiController.js";


const aiRouter = express.Router();

aiRouter.post(
  "/generate-task",
  authMiddleware,
  generateTaskWithAI
);
aiRouter.post(
  "/generate-project",
  authMiddleware,
  generateProjectWithAI
);

export default aiRouter;

import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  getTask,
  getProjectTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

// Create Task
taskRouter.post("/", authMiddleware, createTask);

// Get All Tasks
taskRouter.get("/", authMiddleware, getTasks);

// Get Tasks of Particular Project
taskRouter.get(
  "/project/:projectId",
  authMiddleware,
  getProjectTasks
);

// Get Single Task
taskRouter.get("/:id", authMiddleware, getTask);

// Update Task
taskRouter.put("/:id", authMiddleware, updateTask);

// Delete Task
taskRouter.delete("/:id", authMiddleware, deleteTask);

export default taskRouter;

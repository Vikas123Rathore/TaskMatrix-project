import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
  projectCreate,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const projectRouter = express.Router();

// Create Project
projectRouter.post("/create", authMiddleware, projectCreate);

// Get All Projects
projectRouter.get("/", authMiddleware, getProjects);

// Get Single Project
projectRouter.get("/:id", authMiddleware, getProject);

// Update Project
projectRouter.put("/:id", authMiddleware, updateProject);

// Delete Project
projectRouter.delete("/:id", authMiddleware, deleteProject);

export default projectRouter;

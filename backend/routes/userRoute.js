import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();


// Register
userRouter.post("/register", registerUser);


// Login
userRouter.post("/login", loginUser);


// Logout
userRouter.post("/logout", logoutUser);


// Current logged-in user
userRouter.get(
  "/current-user",
  authMiddleware,
  getCurrentUser
);

export default userRouter;

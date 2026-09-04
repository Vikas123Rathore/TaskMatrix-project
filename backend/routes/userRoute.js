import express from "express";
import {registerUser,loginUser, logoutUser,} from "../controllers/userController.js";

const userRouter = express.Router();

// Register
userRouter.post("/register", registerUser);

// Login
userRouter.post("/login", loginUser);

//Logout
userRouter.post("/logout", logoutUser);

export default userRouter;

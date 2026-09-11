import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const taskRouter = express.Router();

taskRouter.get("/", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Protected tasks route accessed successfully",
    user: req.user,
  });
});


export default taskRouter;

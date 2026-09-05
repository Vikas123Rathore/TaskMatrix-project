import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

dotenv.config();
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TaskMatrix API is running",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});

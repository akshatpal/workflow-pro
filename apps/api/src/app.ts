import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "../src/common/middleware/error.middleware.js";
import { authRoutes } from "./modules/auth/index.js";
import { userRoutes } from "./modules/user/index.js";
import { projectRoutes } from "./modules/project/index.js";
import { boardRoutes } from "./modules/board/index.js";
import { columnRoutes } from "./modules/column/index.js";
import { taskRoutes } from "./modules/task/index.js";
import { commentRoutes } from "./modules/comment/index.js";


const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/boards", boardRoutes);
app.use("/api/v1/columns", columnRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/comments", commentRoutes);

// Register routes here
// app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

export default app;
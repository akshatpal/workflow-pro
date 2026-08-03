import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import { errorMiddleware } from "./common/middleware/error.middleware.js";
import { authRoutes } from "./modules/auth/index.js";
import { userRoutes } from "./modules/user/index.js";
import { projectRoutes } from "./modules/project/index.js";
import { boardRoutes } from "./modules/board/index.js";
import { columnRoutes } from "./modules/column/index.js";
import { taskRoutes } from "./modules/task/index.js";
import { commentRoutes } from "./modules/comment/index.js";
import { attachmentRoutes } from "./modules/attachment/index.js";
import { notificationRoutes } from "./modules/notification/index.js";
import { chatRoutes } from "./modules/chat/index.js";
import { dashboardRoutes } from "./modules/dashboard/index.js";



const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

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
app.use("/api/v1/attachments",attachmentRoutes);
app.use("/api/v1/notifications",notificationRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Register routes here
// app.use("/api/v1/auth", authRoutes);

app.use("/uploads",express.static(path.join(process.cwd(), "uploads")));

app.use(errorMiddleware);

export default app;
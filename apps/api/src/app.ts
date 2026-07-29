import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "../src/common/middleware/error.middleware.js";

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

// Register routes here
// app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

export default app;
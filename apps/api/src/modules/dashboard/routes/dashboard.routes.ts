import { Router } from "express";

import { DashboardController } from "../controller/dashboard.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  DashboardController.dashboard
);

router.get(
  "/statistics",
  DashboardController.statistics
);

router.get(
  "/recent-projects",
  DashboardController.recentProjects
);

router.get(
  "/my-tasks",
  DashboardController.myTasks
);

router.get(
  "/activities",
  DashboardController.recentActivities
);

export default router;
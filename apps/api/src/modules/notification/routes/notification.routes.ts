import { Router } from "express";

import { NotificationController } from "../controller/notification.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";
import { authorize } from "../../../common/middleware/authorize.middleware.js";

import { UserRole } from "../../user/model/user.model.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  NotificationController.create
);

router.get(
  "/user/:userId",
  NotificationController.getAll
);

router.get(
  "/user/:userId/unread-count",
  NotificationController.unreadCount
);

router.patch(
  "/:id/read",
  NotificationController.markRead
);

router.patch(
  "/user/:userId/read-all",
  NotificationController.markAllRead
);

router.delete(
  "/:id",
  NotificationController.delete
);

export default router;
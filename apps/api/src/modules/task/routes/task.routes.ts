import { Router } from "express";

import { TaskController } from "../controller/task.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";
import { authorize } from "../../../common/middleware/authorize.middleware.js";
import { validate } from "../../../common/middleware/validate.middleware.js";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../validation/task.validation.js";

import { UserRole } from "../../user/model/user.model.js";
import {
  reorderTaskSchema,
} from "../validation/task.validation.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER,
    UserRole.EMPLOYEE
  ),
  validate(createTaskSchema),
  TaskController.createTask
);

router.get(
  "/",
  TaskController.getTasks
);

router.get(
  "/:id",
  TaskController.getTaskById
);

router.patch(
  "/reorder",
  validate(reorderTaskSchema),
  TaskController.reorderTask
);

router.patch(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER,
    UserRole.EMPLOYEE
  ),
  validate(updateTaskSchema),
  TaskController.updateTask
);

router.patch(
  "/:id/move",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER,
    UserRole.EMPLOYEE
  ),
  TaskController.moveTask
);

router.delete(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  TaskController.deleteTask
);

export default router;
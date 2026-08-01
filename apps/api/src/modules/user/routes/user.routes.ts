import { Router } from "express";

import { UserController } from "../controller/user.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";
import { authorize } from "../../../common/middleware/authorize.middleware.js";
import { validate } from "../../../common/middleware/validate.middleware.js";

import {
  getUsersSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "../validation/user.validation.js";

import { UserRole } from "../model/user.model.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  authorize(UserRole.ADMIN, UserRole.PROJECT_MANAGER),
  validate(getUsersSchema),
  UserController.getUsers
);

router.get(
  "/project-managers",
  authorize(UserRole.ADMIN, UserRole.PROJECT_MANAGER),
  UserController.getProjectManagers
);

router.get(
  "/employees",
  authorize(UserRole.ADMIN, UserRole.PROJECT_MANAGER),
  UserController.getEmployees
);

router.get(
  "/:id",
  validate(getUserByIdSchema),
  UserController.getUserById
);

router.patch(
  "/:id",
  validate(updateUserSchema),
  UserController.updateUser
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  validate(getUserByIdSchema),
  UserController.deleteUser
);

export default router;
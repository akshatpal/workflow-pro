import { Router } from "express";

import { ProjectController } from "../controller/project.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";
import { authorize } from "../../../common/middleware/authorize.middleware.js";
import { validate } from "../../../common/middleware/validate.middleware.js";

import {
  createProjectSchema,
  updateProjectSchema,
  getProjectsSchema,
  getProjectByIdSchema,
} from "../validation/project.validation.js";

import { UserRole } from "../../user/model/user.model.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(UserRole.ADMIN, UserRole.PROJECT_MANAGER),
  validate(createProjectSchema),
  ProjectController.createProject
);

router.get(
  "/",
  validate(getProjectsSchema),
  ProjectController.getProjects
);

router.get(
  "/:id",
  validate(getProjectByIdSchema),
  ProjectController.getProjectById
);

router.patch(
  "/:id",
  authorize(UserRole.ADMIN, UserRole.PROJECT_MANAGER),
  validate(updateProjectSchema),
  ProjectController.updateProject
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  validate(getProjectByIdSchema),
  ProjectController.deleteProject
);

export default router;
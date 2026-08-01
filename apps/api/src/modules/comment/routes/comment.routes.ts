import { Router } from "express";

import { CommentController } from "../controller/comment.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";
import { authorize } from "../../../common/middleware/authorize.middleware.js";
import { validate } from "../../../common/middleware/validate.middleware.js";

import {
  createCommentSchema,
  updateCommentSchema,
} from "../validation/comment.validation.js";

import { UserRole } from "../../user/model/user.model.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER,
    UserRole.EMPLOYEE
  ),
  validate(createCommentSchema),
  CommentController.createComment
);

router.get(
  "/task/:taskId",
  CommentController.getComments
);

router.get(
  "/:id",
  CommentController.getCommentById
);

router.patch(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER,
    UserRole.EMPLOYEE
  ),
  validate(updateCommentSchema),
  CommentController.updateComment
);

router.delete(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER,
    UserRole.EMPLOYEE
  ),
  CommentController.deleteComment
);

export default router;
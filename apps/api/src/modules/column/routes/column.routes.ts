import { Router } from "express";

import { ColumnController } from "../controller/column.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";
import { authorize } from "../../../common/middleware/authorize.middleware.js";
import { validate } from "../../../common/middleware/validate.middleware.js";

import {
  createColumnSchema,
  updateColumnSchema,
  getColumnsSchema,
} from "../validation/column.validation.js";

import { UserRole } from "../../user/model/user.model.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  validate(createColumnSchema),
  ColumnController.createColumn
);

router.get(
  "/board/:boardId",
  validate(getColumnsSchema),
  ColumnController.getColumns
);

router.get(
  "/:id",
  ColumnController.getColumnById
);

router.patch(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  validate(updateColumnSchema),
  ColumnController.updateColumn
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  ColumnController.deleteColumn
);

export default router;
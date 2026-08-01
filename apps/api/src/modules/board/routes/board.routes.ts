import { Router } from "express";

import { BoardController } from "../controller/board.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";
import { authorize } from "../../../common/middleware/authorize.middleware.js";
import { validate } from "../../../common/middleware/validate.middleware.js";

import {
  createBoardSchema,
  updateBoardSchema,
  getBoardsSchema,
  getBoardByIdSchema,
} from "../validation/board.validation.js";

import { UserRole } from "../../user/model/user.model.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  validate(createBoardSchema),
  BoardController.createBoard
);

router.get(
  "/project/:projectId",
  validate(getBoardsSchema),
  BoardController.getBoards
);

router.get(
  "/:id",
  validate(getBoardByIdSchema),
  BoardController.getBoardById
);

router.patch(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  validate(updateBoardSchema),
  BoardController.updateBoard
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  validate(getBoardByIdSchema),
  BoardController.deleteBoard
);

export default router;
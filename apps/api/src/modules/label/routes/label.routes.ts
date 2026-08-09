import { Router } from "express";

import { LabelController } from "../controller/label.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";
import { authorize } from "../../../common/middleware/authorize.middleware.js";
import { validate } from "../../../common/middleware/validate.middleware.js";

import {
  createLabelSchema,
  updateLabelSchema,
  getLabelsSchema,
  deleteLabelSchema,
} from "../validation/label.validation.js";

import { UserRole } from "../../user/model/user.model.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  validate(createLabelSchema),
  LabelController.createLabel
);

router.get(
  "/project/:projectId",
  validate(getLabelsSchema),
  LabelController.getLabels
);

router.patch(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  validate(updateLabelSchema),
  LabelController.updateLabel
);

router.delete(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER
  ),
  validate(deleteLabelSchema),
  LabelController.deleteLabel
);

export default router;
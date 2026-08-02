import { Router } from "express";

import { AttachmentController } from "../controller/attachment.controller.js";

import { authenticate } from "../../../common/middleware/auth.middleware.js";
import { authorize } from "../../../common/middleware/authorize.middleware.js";
import { validate } from "../../../common/middleware/validate.middleware.js";

import {
  uploadAttachmentSchema,
  getAttachmentsSchema,
} from "../validation/attachment.validation.js";

import { upload } from "../../../config/multer.js";

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
  upload.single("file"),
  validate(uploadAttachmentSchema),
  AttachmentController.upload
);

router.get(
  "/task/:taskId",
  validate(getAttachmentsSchema),
  AttachmentController.getAttachments
);

router.get(
  "/:id/download",
  AttachmentController.download
);

router.delete(
  "/:id",
  authorize(
    UserRole.ADMIN,
    UserRole.PROJECT_MANAGER,
    UserRole.EMPLOYEE
  ),
  AttachmentController.delete
);

export default router;
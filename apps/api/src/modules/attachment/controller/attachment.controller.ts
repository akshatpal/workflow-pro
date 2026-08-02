import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AttachmentService } from "../service/attachment.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";

export class AttachmentController {
  static async upload(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const attachment =
        await AttachmentService.uploadAttachment(
          req.body.task,
          req.body.uploadedBy,
          req.file!
        );

      return successResponse(
        res,
        201,
        "Attachment uploaded successfully",
        attachment
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAttachments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const attachments =
        await AttachmentService.getAttachments(
          req.params.taskId as string
        );

      return successResponse(
        res,
        200,
        "Attachments fetched successfully",
        attachments
      );
    } catch (error) {
      next(error);
    }
  }

  static async download(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const attachment =
        await AttachmentService.getAttachment(
          req.params.id as string
        );

      return res.download(
        attachment.path,
        attachment.originalName
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await AttachmentService.deleteAttachment(
          req.params.id as string
        );

      return successResponse(
        res,
        200,
        result.message
      );
    } catch (error) {
      next(error);
    }
  }
}
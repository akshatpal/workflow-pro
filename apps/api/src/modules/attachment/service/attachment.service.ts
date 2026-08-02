import fs from "fs";
import { HydratedDocument } from "mongoose";
import { Attachment, AttachmentDocument } from "../model/attachment.model.js";
import { AttachmentDto } from "../dto/attachment.dto.js";

import { Task } from "../../task/model/task.model.js";
import { UserModel } from "../../user/model/user.model.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";

export class AttachmentService {
  static async uploadAttachment(
    taskId: string,
    uploadedBy: string,
    file: Express.Multer.File
  ) {
    const task = await Task.findById(taskId);

    if (!task || task.isDeleted) {
      throw new NotFoundError("Task not found");
    }

    const user = await UserModel.findById(uploadedBy);

    if (!user || !user.isActive) {
      throw new NotFoundError("User not found");
    }

    const attachment = await Attachment.create({
      task: taskId,
      uploadedBy,
      originalName: file.originalname,
      fileName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
    });

    return AttachmentDto.toResponse(attachment as unknown as HydratedDocument<AttachmentDocument>);
  }

  static async getAttachments(taskId: string) {
    const attachments = await Attachment.find({
      task: taskId,
      isDeleted: false,
    })
      .populate(
        "uploadedBy",
        "name email profilePic"
      )
      .sort({
        createdAt: -1,
      });

    return AttachmentDto.toResponseArray(
      attachments as unknown as HydratedDocument<AttachmentDocument>[]
    );
  }

  static async getAttachment(id: string) {
    const attachment =
      await Attachment.findById(id);

    if (!attachment || attachment.isDeleted) {
      throw new NotFoundError(
        "Attachment not found"
      );
    }

    return attachment;
  }

  static async deleteAttachment(id: string) {
    const attachment =
      await Attachment.findById(id);

    if (!attachment || attachment.isDeleted) {
      throw new NotFoundError(
        "Attachment not found"
      );
    }

    if (fs.existsSync(attachment.path)) {
      fs.unlinkSync(attachment.path);
    }

    attachment.isDeleted = true;

    await attachment.save();

    return {
      message:
        "Attachment deleted successfully",
    };
  }
}
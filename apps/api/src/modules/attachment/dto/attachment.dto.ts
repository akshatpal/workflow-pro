import { HydratedDocument } from "mongoose";
import { AttachmentDocument } from "../model/attachment.model.js";

export class AttachmentDto {
  static toResponse(
    attachment: HydratedDocument<AttachmentDocument>
  ) {
    return {
      id: attachment._id.toString(),

      task: attachment.task,

      uploadedBy: attachment.uploadedBy,

      originalName: attachment.originalName,

      fileName: attachment.fileName,

      mimeType: attachment.mimeType,

      size: attachment.size,

      path: attachment.path,

      createdAt: attachment.createdAt,
    };
  }

  static toResponseArray(
    attachments: HydratedDocument<AttachmentDocument>[]
  ) {
    return attachments.map((attachment) =>
      this.toResponse(attachment)
    );
  }
}
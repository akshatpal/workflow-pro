import { z } from "zod";
import { objectIdSchema } from "../../../common/validators/objectId.validator.js";

export const uploadAttachmentSchema = z.object({
  body: z.object({
    task: objectIdSchema,

    uploadedBy: objectIdSchema,
  }),
});

export const getAttachmentsSchema = z.object({
  params: z.object({
    taskId: objectIdSchema,
  }),
});
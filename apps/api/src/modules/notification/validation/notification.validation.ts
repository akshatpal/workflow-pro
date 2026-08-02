import { z } from "zod";
import { objectIdSchema } from "../../../common/validators/objectId.validator.js";

export const createNotificationSchema = z.object({
  body: z.object({
    user: objectIdSchema,

    sender: objectIdSchema.optional(),

    title: z.string().min(1).max(200),

    message: z.string().min(1).max(1000),

    type: z.string(),

    entityId: objectIdSchema.optional(),

    entityType: z.string().optional(),
  }),
});

export const markReadSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
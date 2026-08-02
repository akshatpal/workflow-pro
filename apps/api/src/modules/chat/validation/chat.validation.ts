import { z } from "zod";
import { objectIdSchema } from "../../../common/validators/objectId.validator.js";
import { ConversationType } from "../model/conversation.model.js";

export const createConversationSchema = z.object({
  body: z.object({
    name: z.string().optional(),

    avatar: z.string().optional(),

    type: z.nativeEnum(ConversationType),

    members: z.array(objectIdSchema).min(2),

    project: objectIdSchema.optional(),
  }),
});

export const sendMessageSchema = z.object({
  body: z.object({
    conversation: objectIdSchema,

    sender: objectIdSchema,

    message: z.string().min(1).max(5000),

    attachments: z.array(objectIdSchema).optional(),
  }),
});

export const updateMessageSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z.object({
    message: z.string().min(1).max(5000),
  }),
});
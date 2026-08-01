import { z } from "zod";
import { objectIdSchema } from "../../../common/validators/objectId.validator.js";

export const createCommentSchema = z.object({
  body: z.object({
    task: objectIdSchema,

    author: objectIdSchema,

    message: z
      .string()
      .trim()
      .min(1)
      .max(5000),
  }),
});

export const updateCommentSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z.object({
    message: z
      .string()
      .trim()
      .min(1)
      .max(5000),
  }),
});
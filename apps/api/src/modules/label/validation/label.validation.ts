import { z } from "zod";

import { objectIdSchema } from "../../../common/validators/objectId.validator.js";

export const createLabelSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(50),

    color: z
      .string()
      .trim()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),

    project: objectIdSchema,
  }),
});

export const updateLabelSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(50)
      .optional(),

    color: z
      .string()
      .trim()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
      .optional(),
  }),
});

export const getLabelsSchema = z.object({
  params: z.object({
    projectId: objectIdSchema,
  }),
});

export const deleteLabelSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
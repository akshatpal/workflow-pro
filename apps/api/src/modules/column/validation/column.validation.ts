import { z } from "zod";
import { objectIdSchema } from "../../../common/validators/objectId.validator.js";

export const createColumnSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),

    board: objectIdSchema,

    color: z.string().optional(),
  }),
});

export const updateColumnSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z.object({
    name: z.string().optional(),

    color: z.string().optional(),

    position: z.number().optional(),

    wipLimit: z.number().optional(),

    isCollapsed: z.boolean().optional(),
  }),
});

export const getColumnsSchema = z.object({
  params: z.object({
    boardId: objectIdSchema,
  }),
});

export const reorderColumnsSchema = z.object({
  body: z.object({
    boardId: objectIdSchema,

    columns: z.array(
      z.object({
        id: objectIdSchema,

        position: z.number(),
      })
    ),
  }),
});
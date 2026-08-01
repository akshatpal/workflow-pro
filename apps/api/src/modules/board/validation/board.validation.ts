import { z } from "zod";
import { BoardType } from "../model/board.model.js";
import { objectIdSchema } from "../../../common/validators/objectId.validator.js";

export const createBoardSchema = z.object({
  body: z.object({
    name: z.string().trim().min(3).max(100),

    description: z.string().optional(),

    type: z.nativeEnum(BoardType).optional(),

    project: objectIdSchema,

    createdBy: objectIdSchema,
  }),
});

export const updateBoardSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z.object({
    name: z.string().trim().min(3).max(100).optional(),

    description: z.string().optional(),

    type: z.nativeEnum(BoardType).optional(),

    isDefault: z.boolean().optional(),
  }),
});

export const getBoardsSchema = z.object({
  query: z.object({
    page: z.coerce.number().default(1),

    limit: z.coerce.number().default(10),

    search: z.string().optional(),
  }),
});

export const getBoardByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
import { z } from "zod";

import {
  TaskPriority,
  TaskStatus,
} from "../model/task.model.js";

import { objectIdSchema } from "../../../common/validators/objectId.validator.js";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(200),

    description: z.string().optional(),

    project: objectIdSchema,

    board: objectIdSchema,

    column: objectIdSchema,

    assignee: objectIdSchema.optional(),

    reporter: objectIdSchema,

    priority: z.nativeEnum(TaskPriority).optional(),

    status: z.nativeEnum(TaskStatus).optional(),

    storyPoints: z.number().optional(),

    dueDate: z.string().datetime().optional(),

    labels: z.array(z.string()).optional(),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z.object({
    title: z.string().optional(),

    description: z.string().optional(),

    assignee: objectIdSchema.optional(),

    priority: z.nativeEnum(TaskPriority).optional(),

    status: z.nativeEnum(TaskStatus).optional(),

    storyPoints: z.number().optional(),

    dueDate: z.string().datetime().optional(),

    labels: z.array(z.string()).optional(),

    column: objectIdSchema.optional(),

    position: z.number().optional(),
  }),
});

export const reorderTaskSchema = z.object({
  body: z.object({
    sourceColumnId: objectIdSchema,

    destinationColumnId: objectIdSchema,

    tasks: z.array(
      z.object({
        id: objectIdSchema,

        position: z.number().min(0),
      })
    ),
  }),
});
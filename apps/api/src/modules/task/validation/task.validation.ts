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

    project: objectIdSchema.optional(),

    board: objectIdSchema.optional(),

    column: objectIdSchema,

    assignee: objectIdSchema.optional(),

    reporter: objectIdSchema.optional(),

    priority: z.nativeEnum(TaskPriority).optional(),

    status: z.nativeEnum(TaskStatus).optional(),

    storyPoints: z.number().optional(),

    dueDate: z.string().optional(),

    labels: z
      .array(objectIdSchema)
      .optional(),

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

    dueDate: z.string().optional(),

    labels: z
      .array(objectIdSchema)
      .optional(),

    column: objectIdSchema.optional(),

    position: z.number().optional(),
  }),
});

export const reorderTaskSchema = z.object({
  body: z.object({
    columns: z.array(
      z.object({
        columnId: objectIdSchema,

        tasks: z.array(
          z.object({
            id: objectIdSchema,

            position: z.number().min(0),
          })
        ),
      })
    ),
  }),
});
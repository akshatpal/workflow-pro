import { z } from "zod";

import {
  ProjectStatus,
  ProjectVisibility,
  ProjectMemberRole,
} from "../model/project.model.js";

import { objectIdSchema } from "../../../common/validators/objectId.validator.js";

const memberSchema = z.object({
  user: objectIdSchema,

  role: z.nativeEnum(ProjectMemberRole),
});

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3)
      .max(100),

    key: z
      .string()
      .trim()
      .min(2)
      .max(10)
      .transform((value) =>
        value.toUpperCase()
      ),

    description: z.string().optional(),

    avatar: z.string().optional(),

    visibility: z
      .nativeEnum(ProjectVisibility)
      .optional(),

    members: z
      .array(memberSchema)
      .optional(),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z.object({
    name: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .optional(),

    description: z.string().optional(),

    avatar: z.string().optional(),

    status: z
      .nativeEnum(ProjectStatus)
      .optional(),

    visibility: z
      .nativeEnum(ProjectVisibility)
      .optional(),

    members: z
      .array(memberSchema)
      .optional(),

    settings: z
      .object({
        allowGuestAccess:
          z.boolean().optional(),

        allowMemberInvite:
          z.boolean().optional(),

        taskPrefix:
          z.string().optional(),
      })
      .optional(),
  }),
});

export const getProjectsSchema = z.object({
  query: z.object({
    page: z.coerce
      .number()
      .default(1),

    limit: z.coerce
      .number()
      .default(10),

    search: z.string().optional(),

    status: z
      .nativeEnum(ProjectStatus)
      .optional(),

    visibility: z
      .nativeEnum(ProjectVisibility)
      .optional(),

    sortBy: z
      .string()
      .default("createdAt"),

    order: z
      .enum(["asc", "desc"])
      .default("desc"),
  }),
});

export const getProjectByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
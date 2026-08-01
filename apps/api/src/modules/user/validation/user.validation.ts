import { z } from "zod";
import { UserRole } from "../model/user.model.js";
import { objectIdSchema } from "../../../common/validators/objectId.validator.js";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),

    email: z.string().trim().email(),

    password: z
      .string()
      .min(8)
      .max(30),

    designation: z
      .string()
      .trim()
      .min(2)
      .max(100),

    manager: z.string().optional(),

    profilePic: z.string().url().optional(),

    role: z.nativeEnum(UserRole),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),

    designation: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    manager: z.string().optional(),

    profilePic: z.string().url().optional(),

    role: z.nativeEnum(UserRole).optional(),

    isActive: z.boolean().optional(),
  }),

  params: z.object({
    id: objectIdSchema,
  }),
});

export const getUsersSchema = z.object({
  query: z.object({
    page: z.coerce.number().default(1),

    limit: z.coerce.number().default(10),

    search: z.string().optional(),

    role: z.nativeEnum(UserRole).optional(),

    sortBy: z.string().default("createdAt"),

    order: z.enum(["asc", "desc"]).default("desc"),
  }),
});

export const getUserByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
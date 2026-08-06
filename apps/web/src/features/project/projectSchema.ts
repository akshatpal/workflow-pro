import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100),

  key: z
    .string()
    .min(2)
    .max(10)
    .transform((value) => value.toUpperCase()),

  description: z.string().optional(),

  visibility: z.enum([
    "PRIVATE",
    "PUBLIC",
  ]),
});

export type ProjectFormValues =
  z.infer<typeof projectSchema>;
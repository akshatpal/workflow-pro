import { z } from "zod";

export const boardSchema = z.object({
  name: z
    .string()
    .min(3, "Board name is required")
    .max(100),

  description: z.string().optional(),

  type: z.enum([
    "KANBAN",
    "SCRUM",
  ]),
});

export type BoardFormValues =
  z.infer<typeof boardSchema>;
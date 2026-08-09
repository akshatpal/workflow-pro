import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(150),

  description:
    z.string().optional(),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),

  assignee:
    z.string().optional(),

  dueDate:
    z.string().optional(),

  labels: z
    .array(z.string())
    .optional(),
});

export type TaskFormValues =
  z.infer<
    typeof taskSchema
  >;
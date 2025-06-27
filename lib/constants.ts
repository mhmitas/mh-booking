import { z } from "zod";

export const ExperienceSchema = z.object({
  type: z.string().min(1, "Type is required"),
  category: z.string().min(1, "Category is required"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.string().url("Invalid URL")).optional(),
  info: z.string().optional(),
});

export type ExperienceFormValues = z.infer<typeof ExperienceSchema>;

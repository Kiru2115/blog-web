import { z } from "zod";

/** The ID of an article: a UUID. Also checks the ID in a page address. */
export const articleIdSchema = z.uuid();

export const articleSchema = z.object({
  id: articleIdSchema,
  title: z.string().min(1),
  content: z.string(),
  publishedAt: z.iso.datetime(),
});

export const articleListSchema = z.array(articleSchema);

export type Article = z.infer<typeof articleSchema>;

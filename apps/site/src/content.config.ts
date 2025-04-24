import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const decisionTreeNodes = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/decision-tree",
  }),
  schema: z.object({
    links: z.array(reference("decisionTreeNodes")).optional(),
    title: z.string(),
  }),
});

export const collections = { decisionTreeNodes };

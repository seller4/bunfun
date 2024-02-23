import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string().max(80),
      description: z.string(),
      lang: z.string().optional(),
      // Transform string to Date object
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      heroImage: image(),
      category: z.string().optional(),
      tags: z.array(z.string()),
      draft: z.boolean().default(false),
    }),
})

export const collections = { blog }

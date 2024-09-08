import {defineCollection, z} from 'astro:content';

const mdxCollection = defineCollection({
    type: `content`,
  schema: z.object({
      title: z.string(),
      tags: z.array(z.string()),
  }),
});

export const collections = {mdx: mdxCollection};
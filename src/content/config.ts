import {defineCollection, z} from 'astro:content';

const mdxCollection = defineCollection({
  schema: z.object({
    date: z.date(),
  }),
});

export const collections = {
  mdx: mdxCollection,
};

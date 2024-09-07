import {defineCollection, z} from 'astro:content';

const mdxCollection = defineCollection({
  schema: z.object({
  }),
});

export const collections = {
  mdx: mdxCollection,
};

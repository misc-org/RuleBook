import { defineCollection, z } from 'astro:content';

const mdCollection = defineCollection({
  schema: z.object({
    date: z.date(),
  }),
});

export const collections = {
  posts: mdCollection,
};

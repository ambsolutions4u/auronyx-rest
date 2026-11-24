import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Articles live in src/content/guides/*.md
 * The file name becomes the URL: my-article.md -> /guides/my-article/
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    category: z.enum(['pillows', 'mattresses-toppers', 'sleep-guides']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    hasAffiliateLinks: z.boolean().default(true),
    order: z.number().default(100),
    readingTime: z.string().optional(),
  }),
});

export const collections = { guides };

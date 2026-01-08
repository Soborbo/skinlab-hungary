import { defineCollection, z } from 'astro:content';

// Variant schema for products with multiple options
const variantSchema = z.object({
  sku: z.string(),
  name: z.string(),
  value: z.string(),
  price: z.number().nullable(),
  image: z.string().optional(),
  available: z.boolean().optional(),
});

// Stat schema for product stats bar
const statSchema = z.object({
  value: z.string(),
  unit: z.string().optional(),
  label: z.string(),
  icon: z.string().optional(),
});

// Product schema - updated for JSON data files
const productSchema = z.object({
  slug: z.string(),
  sku: z.string(),
  name: z.string(),
  categorySlug: z.string(),
  shortDescription: z.string().default(''),
  description: z.string().default(''),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  price: z.number().nullable(),
  salePrice: z.number().nullable().optional(),
  image: z.string().default('/images/placeholder.jpg'),
  // Support both 'gallery' and 'images' field names (some products use 'images')
  gallery: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  youtubeVideos: z.array(z.string()).default([]),
  availability: z.enum(['in_stock', 'preorder', 'out_of_stock']).default('preorder'),
  hasVariants: z.boolean().default(false),
  variants: z.array(variantSchema).default([]),
  featured: z.boolean().default(false),
  specs: z.record(z.string()).optional(),
  stats: z.array(statSchema).optional(),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  whatsIncluded: z.array(z.string()).optional(),
});

// Training schema
const trainingSchema = z.object({
  name: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  price: z.number().optional(),
  priceFormatted: z.string().optional(),
  duration: z.string(),
  maxParticipants: z.number().optional(),
  certificate: z.string().optional(),
  topics: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  image: z.string().optional(),
  featured: z.boolean().default(false),
});

// Blog schema
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string().default('SkinLab'),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const collections = {
  products: defineCollection({
    type: 'data', // Changed from 'content' to 'data' for JSON files
    schema: productSchema,
  }),
  trainings: defineCollection({
    type: 'content',
    schema: trainingSchema,
  }),
  blog: defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
};

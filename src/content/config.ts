import { defineCollection, z } from 'astro:content';

// Product schema
const productSchema = z.object({
  name: z.string(),
  category: z.string(),
  categorySlug: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  price: z.number().optional(),
  priceFormatted: z.string().optional(),
  images: z.array(z.string()).default([]),
  videoUrl: z.string().optional(),
  featured: z.boolean().default(false),
  features: z.array(z.string()).default([]),
  specs: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).default([]),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).default([]),
  publishedAt: z.date().optional(),
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
    type: 'content',
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

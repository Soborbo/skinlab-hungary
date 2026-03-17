/**
 * Zod Validation Schemas for Product Content
 *
 * Mirrors the TypeScript interfaces in types/product-content.ts exactly.
 * Used for build-time validation of JSON content files.
 */

import { z } from 'zod';
import type { ProductContent, CategoryContent } from '../types/product-content';

// --- Shared sub-schemas ---

export const productContentStatSchema = z.object({
  value: z.string(),
  unit: z.string().optional(),
  label: z.string(),
  icon: z.string().optional(),
});

export const productContentFeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  highlight: z.string().optional(),
  image: z.string().optional(),
});

export const productContentReviewSchema = z.object({
  name: z.string(),
  date: z.string().optional(),
  text: z.string(),
  rating: z.number().optional(),
});

export const productContentFeatureRowsSchema = z.object({
  headline: z.string(),
  subtitle: z.string(),
  review: productContentReviewSchema.optional(),
  features: z.array(productContentFeatureSchema),
});

export const productContentTrainingSchema = z.object({
  headline: z.string(),
  badge: z.string(),
  intro: z.string(),
  items: z.array(z.string()),
  closingParagraphs: z.array(z.string()).optional(),
  price: z.string(),
  priceNote: z.string(),
  freeText: z.string().optional(),
  duration: z.string(),
  ctaText: z.string(),
});

export const productContentTestimonialSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  text: z.string(),
  rating: z.number().optional(),
  image: z.string().optional(),
});

export const productContentExpertQuoteSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  image: z.string().optional(),
});

export const productContentFunctionCardSchema = z.object({
  icon: z.string(),
  name: z.string(),
  description: z.string(),
});

export const productContentFAQItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const productContentBuyerChecklistSchema = z.object({
  headline: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(z.string()),
});

export const productContentCTASchema = z.object({
  afterVideo: z.object({
    text: z.string(),
    buttonLabel: z.string(),
    phoneLabel: z.string().optional(),
  }).optional(),
  afterFeatures: z.object({
    headline: z.string(),
    subtitle: z.string(),
    buttonLabel: z.string(),
  }).optional(),
  final: z.object({
    headline: z.string(),
    subtitle: z.string(),
    buttonLabel: z.string(),
  }).optional(),
});

export const productContentVideoDescriptionSchema = z.object({
  headline: z.string(),
  paragraphs: z.array(z.string()),
});

// --- Main schemas ---

export const productContentSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  stats: z.array(productContentStatSchema).optional(),
  roi: z.object({
    defaultTreatmentPrice: z.number(),
  }).optional(),
  videoDescription: productContentVideoDescriptionSchema.optional(),
  cta: productContentCTASchema.optional(),
  featureRows: productContentFeatureRowsSchema.optional(),
  training: productContentTrainingSchema.optional(),
  testimonials: z.array(productContentTestimonialSchema).optional(),
  expertQuote: productContentExpertQuoteSchema.optional(),
  specs: z.record(z.string()).optional(),
  functionCards: z.array(productContentFunctionCardSchema).optional(),
  faq: z.array(productContentFAQItemSchema).optional(),
  buyerChecklist: productContentBuyerChecklistSchema.optional(),
  whatsIncluded: z.array(z.string()).optional(),
});

export const categoryContentSchema = z.object({
  testimonials: z.array(productContentTestimonialSchema).optional(),
  expertQuote: productContentExpertQuoteSchema.optional(),
  featureRows: productContentFeatureRowsSchema.optional(),
  training: productContentTrainingSchema.optional(),
  functionCards: z.array(productContentFunctionCardSchema).optional(),
  faq: z.array(productContentFAQItemSchema).optional(),
  buyerChecklist: productContentBuyerChecklistSchema.optional(),
  whatsIncluded: z.array(z.string()).optional(),
  stats: z.array(productContentStatSchema).optional(),
});

// --- Validation functions ---

export function validateProductContent(data: unknown): ProductContent {
  return productContentSchema.parse(data) as ProductContent;
}

export function validateCategoryContent(data: unknown): CategoryContent {
  return categoryContentSchema.parse(data) as CategoryContent;
}

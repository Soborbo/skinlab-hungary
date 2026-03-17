// src/components/schema/index.ts
// Export all schema components

export { default as ProductSchema } from './ProductSchema.astro';
export { default as LocalBusinessSchema } from './LocalBusinessSchema.astro';
export { default as OrganizationSchema } from './OrganizationSchema.astro';
export { default as FAQSchema } from './FAQSchema.astro';
export { default as BreadcrumbSchema } from './BreadcrumbSchema.astro';
export { default as VideoSchema } from './VideoSchema.astro';

// Re-export helpers for custom use
export * from './helpers';

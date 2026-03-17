/**
 * Product Content Loader
 *
 * Loads per-locale product content at build time using import.meta.glob.
 * Resolution cascade: product JSON → category JSON → undefined.
 * Arrays use REPLACE semantics (no merging).
 * If locale file doesn't exist, falls back to entire hu file.
 */

import type { ProductContent, CategoryContent } from './types/product-content';

// Import all product content JSON files at build time
const productContentFiles = import.meta.glob<ProductContent>(
  '/src/content/product-content/*/*.json',
  { eager: true, import: 'default' }
);

// Import all category content JSON files at build time
const categoryContentFiles = import.meta.glob<CategoryContent>(
  '/src/content/product-content/*/_category/*.json',
  { eager: true, import: 'default' }
);

/**
 * Resolve a product content file path
 */
function getProductFilePath(locale: string, productSlug: string): string {
  return `/src/content/product-content/${locale}/${productSlug}.json`;
}

/**
 * Resolve a category content file path
 */
function getCategoryFilePath(locale: string, categorySlug: string): string {
  return `/src/content/product-content/${locale}/_category/${categorySlug}.json`;
}

/**
 * Fields that are arrays and should use REPLACE semantics (not merge)
 */
const ARRAY_FIELDS: (keyof ProductContent)[] = [
  'testimonials',
  'faq',
  'functionCards',
  'whatsIncluded',
  'stats',
];

/**
 * Fields that are objects and should use REPLACE semantics
 */
const OBJECT_FIELDS: (keyof ProductContent)[] = [
  'featureRows',
  'training',
  'expertQuote',
  'videoDescription',
  'cta',
  'roi',
  'specs',
];

/**
 * All cascade-able fields (arrays + objects from category defaults)
 */
const CASCADE_FIELDS: (keyof CategoryContent)[] = [
  'testimonials',
  'expertQuote',
  'featureRows',
  'training',
  'functionCards',
  'faq',
  'whatsIncluded',
  'stats',
  'buyerChecklist',
];

export interface LoadProductContentResult {
  content: ProductContent;
  isLocaleFallback: boolean;
}

/**
 * Load product content for a given locale, product, and category.
 *
 * Resolution cascade for each field:
 * 1. Product-level content (locale-specific)
 * 2. Category-level defaults (locale-specific)
 * 3. undefined (section won't render)
 *
 * If the requested locale's product file doesn't exist,
 * falls back to the entire `hu` file set (not per-field).
 */
export function loadProductContent(
  locale: string,
  productSlug: string,
  categorySlug: string
): LoadProductContentResult {
  // Try to load the product content for the requested locale
  const productPath = getProductFilePath(locale, productSlug);
  let productData = productContentFiles[productPath] as ProductContent | undefined;
  let isLocaleFallback = false;

  // If locale file doesn't exist, fall back to entire hu file
  if (!productData && locale !== 'hu') {
    const huProductPath = getProductFilePath('hu', productSlug);
    productData = productContentFiles[huProductPath] as ProductContent | undefined;
    isLocaleFallback = true;
  }

  // If still no product data (even hu doesn't exist), return minimal content
  if (!productData) {
    if (import.meta.env.DEV) {
      console.warn(
        `[product-content] No content file found for ${locale}/${productSlug} (or hu fallback)`
      );
    }
    return {
      content: {
        name: productSlug,
        shortDescription: '',
        description: '',
      },
      isLocaleFallback: locale !== 'hu',
    };
  }

  // Load category defaults for the same locale (or hu if falling back)
  const effectiveLocale = isLocaleFallback ? 'hu' : locale;
  const categoryPath = getCategoryFilePath(effectiveLocale, categorySlug);
  let categoryData = categoryContentFiles[categoryPath] as CategoryContent | undefined;

  // Category fallback to hu if not found in effective locale
  if (!categoryData && effectiveLocale !== 'hu') {
    const huCategoryPath = getCategoryFilePath('hu', categorySlug);
    categoryData = categoryContentFiles[huCategoryPath] as CategoryContent | undefined;
  }

  // Build resolved content: product fields first, then cascade from category
  const resolved: ProductContent = { ...productData };

  if (categoryData) {
    for (const field of CASCADE_FIELDS) {
      // Only fill from category if product doesn't have this field
      if (resolved[field as keyof ProductContent] === undefined && categoryData[field] !== undefined) {
        (resolved as Record<string, unknown>)[field] = categoryData[field];
      }
    }
  }

  // Dev mode warnings for missing sections
  if (import.meta.env.DEV) {
    const sectionFields = [
      'stats', 'featureRows', 'training', 'testimonials',
      'expertQuote', 'functionCards', 'faq', 'whatsIncluded',
    ];
    for (const sectionName of sectionFields) {
      if (resolved[sectionName as keyof ProductContent] === undefined) {
        console.warn(
          `[product-content] Section "${sectionName}" has no content for ${effectiveLocale}/${productSlug}`
        );
      }
    }
  }

  return {
    content: resolved,
    isLocaleFallback,
  };
}

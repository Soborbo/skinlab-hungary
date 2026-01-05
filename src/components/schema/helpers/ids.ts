// src/components/schema/helpers/ids.ts
// Utilities for consistent @id generation across all schema components

/**
 * Normalize URL before generating @id
 * Handles relative URLs, query strings, and existing hashes
 */
function normalizeUrl(url: string, baseUrl?: string): string {
  try {
    // If baseUrl provided, resolve relative URLs
    const resolved = baseUrl ? new URL(url, baseUrl).href : new URL(url).href;
    // Remove hash and query string for clean @id
    const urlObj = new URL(resolved);
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch {
    // Fallback: just strip hash
    return url.replace(/[?#].*$/, '');
  }
}

/**
 * Generate a consistent @id for schema entities
 * Strips hash, query string, and normalizes URL
 *
 * @example
 * schemaId('https://example.com/product/', 'product')
 * // => 'https://example.com/product#product'
 *
 * schemaId('https://example.com/', 'organization')
 * // => 'https://example.com#organization'
 */
export function schemaId(url: string, suffix: string, baseUrl?: string): string {
  const normalized = normalizeUrl(url, baseUrl);
  // Remove trailing slash for the hash
  const base = normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
  return `${base}#${suffix}`;
}

/**
 * Standard @id suffixes for each schema type
 * Use these for consistency across all components
 */
export const ID_SUFFIX = {
  organization: 'organization',
  localBusiness: 'localbusiness',
  website: 'website',
  webpage: 'webpage',
  product: 'product',
  service: 'service',
  breadcrumb: 'breadcrumb',
  faq: 'faq',
  article: 'article',
  video: 'video',
} as const;

/**
 * Create reference to another schema entity
 *
 * @example
 * ref('https://example.com/', 'organization')
 * // => { '@id': 'https://example.com#organization' }
 */
export function ref(
  url: string,
  suffix: keyof typeof ID_SUFFIX,
  baseUrl?: string
): { '@id': string } {
  return { '@id': schemaId(url, ID_SUFFIX[suffix], baseUrl) };
}

/**
 * Validate that URL is absolute HTTPS
 * Use in guards for image URLs
 */
export function isValidSchemaUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

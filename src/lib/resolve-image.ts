/**
 * Image resolution utilities for pre-generated optimized images.
 *
 * Replaces the import.meta.glob + resolveImage pattern used in
 * ProductGallery, FeatureRows, CategoryLayout, etc.
 */
import manifest from './image-manifest.json';

export interface ManifestEntry {
  seoSlug: string;
  alt: string;
  width: number;
  height: number;
  widths: number[];
  basePath: string;
}

const manifestData = manifest as Record<string, ManifestEntry>;

/**
 * Normalize an image path (from product JSON) to a manifest key.
 * Handles: "@assets/products/foo.webp", "assets/products/foo.webp",
 *          "/assets/products/foo.webp", "foo.webp"
 */
export function normalizeImagePath(imgPath: string): string {
  if (!imgPath) return '';

  if (imgPath.startsWith('@assets/')) {
    return imgPath;
  }
  if (imgPath.startsWith('assets/')) {
    return `@${imgPath}`;
  }
  if (imgPath.startsWith('/assets/')) {
    return `@${imgPath.slice(1)}`;
  }
  if (imgPath.startsWith('/src/assets/')) {
    return `@assets/${imgPath.slice(12)}`;
  }
  // Bare filename — assume products folder
  const filename = imgPath.split('/').pop();
  return `@assets/products/${filename}`;
}

/**
 * Look up a manifest entry by image path.
 */
export function getImageEntry(imgPath: string): ManifestEntry | null {
  const key = normalizeImagePath(imgPath);
  return manifestData[key] || null;
}

/**
 * Get the manifest key for an image path.
 */
export function getManifestKey(imgPath: string): string {
  return normalizeImagePath(imgPath);
}

/**
 * Check if an image exists in the manifest.
 */
export function hasImage(imgPath: string): boolean {
  return !!getImageEntry(imgPath);
}

/**
 * Get alt text for an image. Returns manifest alt or fallback.
 */
export function getImageAlt(imgPath: string, fallback = ''): string {
  const entry = getImageEntry(imgPath);
  return entry?.alt || fallback;
}

/**
 * Build a srcset string for a given image, format, and widths.
 */
export function buildSrcset(
  basePath: string,
  widths: number[],
  format: 'avif' | 'webp' | 'jpg'
): string {
  return widths.map(w => `${basePath}-${w}w.${format} ${w}w`).join(', ');
}

/**
 * Get the closest available width from the manifest for a requested width.
 */
export function nearestWidth(available: number[], requested: number): number {
  return available.reduce((prev, curr) =>
    Math.abs(curr - requested) < Math.abs(prev - requested) ? curr : prev
  , available[0]);
}

/**
 * Filter requested widths to those available in manifest.
 * Returns nearest matches, deduplicated.
 */
export function matchWidths(available: number[], requested: number[]): number[] {
  const matched = requested.map(w => nearestWidth(available, w));
  return [...new Set(matched)].sort((a, b) => a - b);
}

/**
 * Get OG image path for a product image.
 * Returns the largest available width in jpg format (best social media compatibility).
 */
export function getOgImagePath(imgPath: string): string {
  const entry = getImageEntry(imgPath);
  if (!entry) return '';
  const maxWidth = Math.max(...entry.widths);
  return `${entry.basePath}-${maxWidth}w.jpg`;
}

/**
 * Build-time helper: a termék `image` mezőjéből egy kész, kliensoldalon
 * is használható (publikus) thumbnail URL-t állít elő a kosár tételekhez.
 *
 * A kosár a `localStorage`-ban tárolja az URL-t, ezért a komponensekben
 * (AddToCartButton, QuickAddButton) build időben fel kell oldani.
 */
import { getImageEntry, nearestWidth } from '@/lib/resolve-image';

const PLACEHOLDER = '/images/placeholder.jpg';

/** Termék image mező → kész thumbnail URL (kb. 200px széles webp) */
export function resolveCartImage(imgPath: string | undefined | null): string {
  if (!imgPath) return PLACEHOLDER;

  // Optimalizált, manifestből feloldható kép
  const entry = getImageEntry(imgPath);
  if (entry) {
    const w = nearestWidth(entry.widths, 200);
    return `${entry.basePath}-${w}w.webp`;
  }

  // Már publikus útvonal vagy abszolút URL
  if (imgPath.startsWith('/') || imgPath.startsWith('http')) {
    return imgPath;
  }

  return PLACEHOLDER;
}

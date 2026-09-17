import type { CollectionEntry } from 'astro:content';

/**
 * A termékoldal-route-ok (`src/pages/{kategória}/[slug].astro` és a
 * `[locale]` párjuk) közös adatleképezése a ProductLayout számára.
 *
 * Korábban mind a 22 route kézzel másolta ezt az objektumot, és a mezők
 * elcsúsztak: a `designImages`/`trainingImages` csak a diódalézereknél, az
 * `extraImages` csak a coldplasma/sminktetovalas ágon ért el a layoutig.
 * Egy helyen tartva minden kategória ugyanazt kapja.
 */
export function buildProductData(entry: CollectionEntry<'products'>) {
  const d = entry.data;
  return {
    name: d.name,
    sku: d.sku,
    brand: d.brand,
    slug: d.slug,
    categorySlug: d.categorySlug,
    description: d.description,
    shortDescription: d.shortDescription,
    price: d.price,
    salePrice: d.salePrice,
    image: d.image,
    // Szándékosan változatlan szemantika: a zod mindkét tömböt []-re
    // defaultolja, így ez gyakorlatilag mindig az `images`.
    gallery: d.images || d.gallery || [],
    extraImages: d.extraImages,
    designImages: d.designImages,
    trainingImages: d.trainingImages,
    canonicalSlug: d.canonicalSlug,
    datasheet: d.datasheet,
    youtubeVideos: d.youtubeVideos,
    availability: d.availability,
    hasVariants: d.hasVariants,
    variants: d.variants,
    featured: d.featured,
    metaTitle: d.metaTitle,
    metaDescription: d.metaDescription,
    stats: d.stats,
    faq: d.faq,
    whatsIncluded: d.whatsIncluded,
    specs: d.specs,
  };
}

export type ProductData = ReturnType<typeof buildProductData>;

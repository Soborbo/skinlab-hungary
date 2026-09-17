import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { BLOG_ENABLED } from './config/features';

// Empty loader used to "draft" a whole collection behind a feature flag:
// loads zero entries, so dependent routes build nothing and search finds nothing.
const emptyLoader = { name: 'disabled', load: async () => {} };

// Variant schema for products with multiple options
const variantSchema = z.object({
  sku: z.string(),
  name: z.string(),
  value: z.string(),
  price: z.number().nullable(),
  /** Vonalkód, ha van. A Merchant Center feed variánssoraiba kerül. */
  gtin: z.string().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  available: z.boolean().optional(),
  description: z.string().optional(),
  specs: z.record(z.string(), z.string()).optional(),
});

// Stat schema for product stats bar
const statSchema = z.object({
  value: z.string(),
  unit: z.string().optional(),
  label: z.string(),
  icon: z.string().optional(),
});

// Product schema - JSON data files
const productSchema = z.object({
  slug: z.string(),
  draft: z.boolean().default(false),
  sku: z.string(),
  name: z.string(),
  // --- Merchant Center / schema.org termékazonosítás -------------------------
  // Mindhárom opcionális. `brand` hiányában a terméknévből dől el
  // (lib/merchant/brand.ts), `gtin` hiányában a feed `identifier_exists: no`-t
  // küld, `googleProductCategory` hiányában a kategória-alapértelmezés
  // érvényes (lib/merchant/categories.ts).
  brand: z.string().optional(),
  /** EAN/UPC vonalkód. Importált gépeken jellemzően nincs. */
  gtin: z.string().optional(),
  /** Gyártói cikkszám, ha eltér a saját SKU-tól. */
  mpn: z.string().optional(),
  /** Google product taxonomy numerikus ID - csak felülíráshoz. */
  googleProductCategory: z.number().int().optional(),
  categorySlug: z.string(),
  shortDescription: z.string().default(''),
  description: z.string().default(''),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  price: z.number().nullable(),
  salePrice: z.number().nullable().optional(),
  image: z.string().default('/images/placeholder.jpg'),
  gallery: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  // Secondary images shown in a dedicated gallery section deeper in the page
  // (separate from the hero gallery built from `image` + `images`).
  extraImages: z.array(z.string()).default([]),
  // Stylizált "design" fotók (életkép-háttér, stylingolt beállítás). Ezek a HERO
  // GALÉRIA ELEJÉRE kerülnek, de NEM lehetnek főképek: a főkép és a mega-menü
  // thumbnail fehér hátteres termékfotó marad, és a Merchant Center feed is a
  // `image` + `images` mezőkből épül - így a vízjeles/stylingolt fotók eleve nem
  // kerülnek be a feedbe (a Google a promóciós overlayes főképet elutasítja).
  designImages: z.array(z.string()).default([]),
  // A gépkezelői oktatás blokk (TrainingCard) saját fotói: [0] = bal oldali
  // gyakorlati kép, [1] = jobb oldali kép az árkártya felett. Ha nincs megadva,
  // az általános Skinlab oktatás-fotók maradnak. Nem kerül a hero galériába/feedbe.
  trainingImages: z.array(z.string()).max(2).default([]),
  // Letölthető termékadatlap (PDF), pl. "/datasheets/olympia.pdf". Ha nincs,
  // a Műszaki adatok blokk letöltés-gombja nem jelenik meg.
  datasheet: z.string().optional(),
  // If set, this product's page emits <link rel="canonical"> pointing to the
  // product with this slug (same category). Used for duplicate/variant spin-off
  // products (e.g. a limited-edition colour that also exists as a variant of the
  // canonical product). Hreflang is suppressed on canonicalized pages.
  canonicalSlug: z.string().optional(),
  youtubeVideos: z.array(z.string()).default([]),
  availability: z.enum(['in_stock', 'preorder', 'out_of_stock']).default('preorder'),
  hasVariants: z.boolean().default(false),
  variants: z.array(variantSchema).default([]),
  featured: z.boolean().default(false),
  specs: z.record(z.string(), z.string()).optional(),
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
  author: z.string().default('Skinlab'),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const collections = {
  products: defineCollection({
    loader: glob({ pattern: '**/[!_]*.json', base: './src/content/products' }),
    schema: productSchema,
  }),
  trainings: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/trainings' }),
    schema: trainingSchema,
  }),
  blog: defineCollection({
    // Drafted off via BLOG_ENABLED: empty collection ⇒ no post pages build and
    // blog is dropped from search until the section is re-published.
    loader: BLOG_ENABLED
      ? glob({ pattern: '**/*.md', base: './src/content/blog' })
      : emptyLoader,
    schema: blogSchema,
  }),
};

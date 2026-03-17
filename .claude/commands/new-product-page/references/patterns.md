# Minták és referenciák

## Meglévő content JSON minták

Használd ezeket mintának új termékoldal készítésekor:
- `src/content/product-content/hu/hydrascan-pro.json` — legteljesebb (hydrafacial, functionCards, training, AI témájú)
- `src/content/product-content/hu/nyxqueen_4wave_diodalezer.json` — diódalézer (variánsok, hullámhosszak, PRO konfig)
- `src/content/product-content/hu/pixelcarbonlezer.json` — ND:YAG (functionCards, carbon peeling, díjnyertes)

## FeatureRows HTML checklist minta

A `featureRows.features[].description` mezőben HTML használható. Checklist minta:

```html
<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
  <div class="flex items-center gap-2"><svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>Első elem</div>
  <div class="flex items-center gap-2"><svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>Második elem</div>
</div>
```

Fejléces checklist:

```html
<p class="font-semibold text-gray-900 mt-4 mb-2">Cím:</p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
  ...checklistek...
</div>
```

Bold elemmel:

```html
<div class="flex items-center gap-2"><svg ...><path .../></svg><strong>755 nm</strong> – leírás</div>
```

## Elérhető ikonok

### Stats ikonok
`zap` | `clock` | `wave` | `heart` | `shield` | `layers` | `award`

### FunctionCards ikonok
`zap` | `droplet` | `sun` | `sparkles` | `bolt` | `snowflake` | `spray` | `brain` | `chart` | `clipboard` | `sound` | `bubbles` | `eye`

## TypeScript interfészek

Definíciók: `src/lib/types/product-content.ts`

| Interfész | Leírás |
|-----------|--------|
| `ProductContent` | Teljes content JSON |
| `ProductContentStat` | Egy stat (value, unit?, label, icon?) |
| `ProductContentVideoDescription` | headline + paragraphs[] |
| `ProductContentCTA` | afterVideo, afterFeatures, final |
| `ProductContentFeatureRows` | headline, subtitle, review?, features[] |
| `ProductContentFeature` | title, description, image? |
| `ProductContentReview` | name, date?, text, rating? |
| `ProductContentTraining` | headline, badge, intro, items[], stb. |
| `ProductContentTestimonial` | name, role?, date?, text, rating? |
| `ProductContentExpertQuote` | quote, author, role, image? |
| `ProductContentFunctionCard` | icon, name, description |
| `ProductContentFAQItem` | question, answer |
| `ProductContentBuyerChecklist` | headline?, subtitle?, items[] |

## Content loader cascade

`loadProductContent(locale, slug, categorySlug)` — `src/lib/load-product-content.ts`

1. `src/content/product-content/{locale}/{slug}.json` — termék-specifikus
2. `src/content/product-content/{locale}/_category/{categorySlug}.json` — kategória default
3. Üres content — csak collection data jelenik meg

## [slug].astro route minta

Minden kategória [slug].astro ugyanezt a patternt követi:

```astro
---
import ProductLayout from '../../layouts/ProductLayout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const products = await getCollection('products', ({ data }) => {
    return data.categorySlug === '{categorySlug}';
  });
  return products.map((product) => ({
    params: { slug: product.data.slug },
    props: { product },
  }));
}

const { product } = Astro.props;
const productData = {
  name: product.data.name,
  sku: product.data.sku,
  slug: product.data.slug,
  categorySlug: product.data.categorySlug,
  description: product.data.description,
  shortDescription: product.data.shortDescription,
  price: product.data.price,
  image: product.data.image,
  gallery: product.data.images || product.data.gallery || [],
  youtubeVideos: product.data.youtubeVideos,
  availability: product.data.availability,
  hasVariants: product.data.hasVariants,
  variants: product.data.variants,
  featured: product.data.featured,
  metaTitle: product.data.metaTitle,
  metaDescription: product.data.metaDescription,
  stats: product.data.stats,
  faq: product.data.faq,
  whatsIncluded: product.data.whatsIncluded,
  specs: product.data.specs,
};
---
<ProductLayout product={productData} />
```

## Képfájlok

- Formátum: `.webp` (preferált), `.jpg`, `.png`
- Elérés: `src/assets/products/` mappa
- Hivatkozás JSON-ban: `@assets/products/filename.webp`
- Hero kép: min. 800x800px, négyzethez közeli arány
- Galéria képek: ugyanaz a mérettartomány
- Ha nincs kép: használj meglévőt placeholder-ként, szólj a usernek

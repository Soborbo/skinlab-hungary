# Új termékoldal létrehozása

Teljes, production-ready termékoldal készítése a hydrascan-pro referencia-struktúra szerint.

## Input

Kérd be (ha nem adta meg):
1. **Termék slug** — fájlnév és URL (pl. `novalight-4wave`)
2. **Kategória slug** — `diodalezerek` | `sminktetovalas` | `nd-yag-lezerek` | `hydrafacial` | `anti-aging` | `szalonberendezes`
3. **Termék neve**
4. **Rövid leírás** (1-2 mondat)
5. **Ár** (HUF szám, vagy `null`)
6. **Elérhetőség** — `in_stock` | `preorder` | `out_of_stock`

Ha a felhasználó egyéb infót is ad (specifikációk, funkciók, USP-k, leírás), használd fel a content feltöltésénél.

## Lépések

### 1. Product collection entry

Keress: `src/content/products/{slug}.json`. Ha nincs, hozd létre a séma szerint.
Lásd: `.claude/commands/new-product-page/references/product-collection-schema.json`

**Kép kezelés:** Az `image` mező `@assets/products/{slug}.webp` formátumú. Ha a kép fájl nem létezik, használj egy meglévő placeholder képet ugyanabból a kategóriából. Szólj a felhasználónak, hogy a képet cserélje ki. A `images[]` tömbbe a galéria képeket sorold (szintén `@assets/products/` prefix).

### 2. Content JSON

Hozd létre: `src/content/product-content/hu/{slug}.json`
Lásd: `.claude/commands/new-product-page/references/content-schema.json`

Minden szekció opcionális a `name`, `shortDescription`, `description` kivételével. A ProductLayout feltételes renderelést használ — ha egy mező hiányzik, az adott szekció nem jelenik meg.

### 3. Route ellenőrzés

Ellenőrizd, hogy `src/pages/{categorySlug}/[slug].astro` létezik. Ha nincs, hozd létre a meglévők mintájára (mind ugyanazt a patternt követi — `ProductLayout`-ot importál).

### 4. Validáció

1. `node -e "JSON.parse(require('fs').readFileSync('src/content/product-content/hu/{slug}.json','utf8'))"` — JSON szintaxis check
2. `npm run validate:content` — Zod séma validáció
3. Ellenőrizd a dev szervert: `http://localhost:4321/{categorySlug}/{slug}`

**Ha validáció hibát dob:** Olvasd el a hibaüzenetet, javítsd a JSON-t, futtasd újra. Gyakori hibák: idézőjel escape, trailing comma, hiányzó kötelező mező.

## Szekció-sorrend (ProductLayout.astro)

| # | Komponens | JSON mező | Feltétel |
|---|-----------|-----------|----------|
| 1 | `ProductGallery` + Hero inline | collection data + content overrides | mindig |
| 2 | `StatsBar` | `stats[]` | ha van |
| 3 | `ROICalculator` | `roi.defaultTreatmentPrice` | mindig |
| 4 | `VideoDescription` | `videoDescription` | ha van |
| 5 | `ProductCTA` variant="light" | `cta.afterVideo` | mindig (i18n fallback) |
| 6 | `FeatureRows` | `featureRows` | ha van |
| 7 | `ProductCTA` variant="accent" | `cta.afterFeatures` | ha van featureRows |
| 8 | `TrainingCard` | `training` | ha van |
| 9 | `Testimonials` | `testimonials[]` | ha van |
| 10 | `ExpertQuote` | `expertQuote` | ha van |
| 11 | Specs table + `FunctionCards` | `specs{}` + `functionCards[]` | ha van bármelyik |
| 12 | `ProductFAQ` | `faq[]` | ha van |
| 12.5 | `BuyerChecklist` | `buyerChecklist` | ha van |
| 13 | `WhatsIncluded` | `whatsIncluded[]` | ha van |
| 14 | `WarrantyService` | — (i18n) | mindig |
| 15 | `ProductCTA` variant="primary" | `cta.final` | mindig (i18n fallback) |
| 16 | `RelatedProducts` | — (auto) | mindig |

## Fontos fájlok

- Layout: `src/layouts/ProductLayout.astro`
- Típusok: `src/lib/types/product-content.ts`
- Loader: `src/lib/load-product-content.ts` (cascade: product JSON → category JSON → undefined)
- Komponensek: `src/components/product/*.astro`
- Ikonok, HTML minták: `.claude/commands/new-product-page/references/patterns.md`

## DO

- Minden szekciót tölts ki tartalommal — egy teljes oldal a cél
- `<mark>` tag-gel jelöld a testimonials legfontosabb részét
- FAQ: minimum 5-7 kérdés, válaszok 2-3 mondat
- WhatsIncluded: mindig zárd "2 év teljes körű garancia" és "Cseregép javítás idejére" sorokkal
- ExpertQuote: általában Horváth László, Technikai szakértő
- Használd a meglévő content JSON-öket mintának (lásd references/patterns.md)
- A featureRows description mezőben HTML használható (checklistek, grid-ek)
- JSON validáció MINDIG a végén

## DON'T

- Ne használj `„` és `"` (magyar idézőjelet) JSON stringekben — helyette `\u201E` és `\u201D`
- Ne hagyj trailing comma-t a JSON-ban
- Ne hozz létre képfájlt — csak hivatkozz rá, szólj a usernek ha hiányzik
- Ne módosítsd a ProductLayout.astro-t — csak content JSON-t és collection JSON-t írj
- Ne felejtsd el a `categorySlug` egyeztetést a collection és content JSON között
- Ne írj üres tömböket/objektumokat a content JSON-be — hagyd ki az egész mezőt ha nincs tartalom

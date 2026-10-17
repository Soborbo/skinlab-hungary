/**
 * Google Merchant Center termékfeed építése a `products` kollekcióból.
 *
 * A feed a HU nyelvű oldalakra mutat: a futáros szállítás (Foxpost/MPL) csak
 * magyar nyelvű rendelésnél érhető el (lásd lib/shipping/methods.ts →
 * `isParcelLocale`), és a Merchant Center fiók is HU/HUF célzású.
 *
 * Kihagyott termékek:
 *  - `draft: true`      → megszűnt termék, oldala sincs
 *  - `canonicalSlug`    → duplikátum (pl. limitált szín, ami variánsként is
 *                         létezik); a feedben az `id` egyedi kell legyen
 *  - `price === null`   → "ár egyeztetés alatt", a Merchant Center árat követel
 *
 * Variánsos terméknél a szülő NEM kerül be külön sorként, csak a variánsok,
 * közös `item_group_id`-vel - így nem lesz ütköző `id` (a szülő SKU-ja
 * jellemzően megegyezik az első variánséval).
 */
import type { CollectionEntry } from 'astro:content';
import { SITE } from '@/lib/constants';
import { getLocalizedUrl } from '@/i18n';
import { getImageEntry } from '@/lib/resolve-image';
import { courierOptionsForPrice, SHIPPING_LABEL_HU } from '@/lib/shipping/methods';
import { loadProductContent } from '@/lib/load-product-content';
import { resolveBrand } from '@/lib/merchant/brand';
import { googleProductCategoryFor } from '@/lib/merchant/categories';
import { productPath } from '@/lib/product-url';

type Product = CollectionEntry<'products'>['data'];

/** A feed nyelve/piaca. Egyelőre kizárólag a magyar shop. */
const FEED_LOCALE = 'hu';

/** Merchant Center mezőhosszak. */
const MAX_TITLE = 150;
const MAX_DESCRIPTION = 5000;

/** A feedbe küldött kép minimális szélessége (a Google 100px-t vár, 800+ ajánlott). */
const MIN_FEED_IMAGE_WIDTH = 800;

/** Maximum ennyi kiegészítő kép mehet egy tételhez (a Google limitje 10). */
const MAX_ADDITIONAL_IMAGES = 10;

export interface FeedShipping {
  country: 'HU';
  service: string;
  price: string;
}

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  additionalImageLinks: string[];
  availability: 'in_stock' | 'out_of_stock' | 'backorder';
  price: string;
  salePrice?: string;
  brand: string;
  gtin?: string;
  mpn?: string;
  identifierExists: boolean;
  condition: 'new';
  googleProductCategory?: number;
  productType: string;
  itemGroupId?: string;
  shipping: FeedShipping[];
  customLabel0: 'kellek' | 'gep';
  customLabel1: string;
}

/**
 * Készlet-állapot leképezése.
 *
 * A `preorder` nálunk azt jelenti, hogy a gép rendelhető, de rendelésre készül -
 * ez a Google szótárában `backorder`. A valódi `preorder` egy még meg nem
 * jelent termék, és kötelező `availability_date`-et is kérne hozzá.
 */
const AVAILABILITY: Record<Product['availability'], FeedItem['availability']> = {
  in_stock: 'in_stock',
  preorder: 'backorder',
  out_of_stock: 'out_of_stock',
};

/** HTML-tagek és felesleges whitespace eltávolítása a leírásból. */
export function toPlainText(html: string | undefined | null): string {
  return String(html ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|li|h[1-6])>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max: number): string {
  return text.length <= max ? text : text.slice(0, max - 1).trimEnd() + '…';
}

/**
 * Abszolút kép-URL a feedhez: a legkisebb olyan előre generált méret, ami eléri
 * a 800px-t (különben a legnagyobb elérhető). JPG, mert az a legszélesebb körben
 * támogatott formátum a Merchant Centerben.
 */
export function feedImageUrl(imgPath: string | undefined | null): string | null {
  if (!imgPath) return null;
  const entry = getImageEntry(imgPath);
  if (!entry || entry.widths.length === 0) return null;
  const widths = [...entry.widths].sort((a, b) => a - b);
  const width = widths.find((w) => w >= MIN_FEED_IMAGE_WIDTH) ?? widths[widths.length - 1];
  return new URL(`${entry.basePath}-${width}w.jpg`, SITE.url).href;
}

function huf(amount: number): string {
  return `${amount} HUF`;
}

/**
 * Szállítási sorok egy adott árhoz.
 *
 * Kellék-ág: pontos futárdíjak a pénztár logikájából.
 * Nagy értékű gép: ÜRES tömb - nincs automatizált szállítás, a díjat egyedileg
 * egyeztetjük. Ilyenkor a Merchant Center a fiók-szintű szállítási beállítást
 * alkalmazza; szándékosan nem írunk ide "0 Ft"-ot, mert az a hirdetésben
 * "ingyenes kiszállítás"-ként jelenne meg egy több milliós gépen.
 */
function shippingRowsFor(price: number | null): FeedShipping[] {
  return courierOptionsForPrice(price).map((option) => ({
    country: 'HU' as const,
    service: SHIPPING_LABEL_HU[option.id],
    price: huf(option.fee),
  }));
}

interface ItemInput {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string | undefined;
  gallery: string[];
  price: number;
  salePrice?: number | null;
  availability: FeedItem['availability'];
  product: Product;
  itemGroupId?: string;
  gtin?: string;
}

function toFeedItem(input: ItemInput): FeedItem | null {
  const imageLink = feedImageUrl(input.image);
  // Kép nélkül a Merchant Center automatikusan elutasít - inkább ki se küldjük.
  if (!imageLink) return null;

  const additionalImageLinks = [
    ...new Set(input.gallery.map(feedImageUrl).filter((u): u is string => !!u && u !== imageLink)),
  ].slice(0, MAX_ADDITIONAL_IMAGES);

  const { product } = input;
  const isParcelTier = courierOptionsForPrice(input.salePrice || input.price).length > 0;
  const mpn = product.mpn;
  const googleCategory = googleProductCategoryFor(
    product.categorySlug,
    product.googleProductCategory
  );

  return {
    id: input.id,
    title: truncate(input.title, MAX_TITLE),
    description: truncate(input.description, MAX_DESCRIPTION),
    link: input.link,
    imageLink,
    additionalImageLinks,
    availability: input.availability,
    price: huf(input.price),
    ...(input.salePrice ? { salePrice: huf(input.salePrice) } : {}),
    brand: resolveBrand(product.name, product.brand),
    ...(input.gtin ? { gtin: input.gtin } : {}),
    ...(mpn ? { mpn } : {}),
    // GTIN és gyártói cikkszám nélkül a Google-nak explicit jelezni kell, hogy
    // a terméknek nincs globális azonosítója (importált / saját brandelt gépek).
    identifierExists: Boolean(input.gtin || mpn),
    condition: 'new',
    ...(googleCategory !== undefined ? { googleProductCategory: googleCategory } : {}),
    productType: product.categorySlug,
    ...(input.itemGroupId ? { itemGroupId: input.itemGroupId } : {}),
    shipping: shippingRowsFor(input.salePrice || input.price),
    // Kampány-bontáshoz: a kellék-ág és a gép-ág teljesen más licitlogikát kíván.
    customLabel0: isParcelTier ? 'kellek' : 'gep',
    customLabel1: product.categorySlug,
  };
}

export function buildFeedItems(entries: CollectionEntry<'products'>[]): FeedItem[] {
  const items: FeedItem[] = [];

  for (const entry of entries) {
    const product = entry.data;
    if (product.draft || product.canonicalSlug) continue;

    const basePrice = product.salePrice || product.price;
    if (typeof basePrice !== 'number' || basePrice <= 0) continue;

    // A terméklap H1-e és leírása a lokalizált tartalomból jön - a feed ugyanezt
    // küldi, hogy a Google ne találjon eltérést a landoló oldalhoz képest.
    const { content } = loadProductContent(FEED_LOCALE, product.slug, product.categorySlug);
    const name = content.name || product.name;
    const description =
      toPlainText(content.shortDescription || product.shortDescription) ||
      toPlainText(content.description || product.description);

    const path = getLocalizedUrl(FEED_LOCALE, productPath(product.categorySlug, product.slug));
    const link = SITE.url + path;
    const availability = AVAILABILITY[product.availability];
    const gallery = [...(product.images ?? []), ...(product.gallery ?? [])];

    if (product.hasVariants && product.variants.length > 0) {
      for (const variant of product.variants) {
        const variantPrice = typeof variant.price === 'number' ? variant.price : basePrice;
        if (variantPrice <= 0) continue;
        const item = toFeedItem({
          id: variant.sku,
          title: `${name} – ${variant.name}`,
          description,
          // A `?v=` paramétert a ProductHero olvassa: kiválasztja a variánst,
          // és a hero árát is átírja a variáns árára.
          link: `${link}?v=${encodeURIComponent(variant.sku)}`,
          image: variant.image || product.image,
          gallery: variant.images ?? gallery,
          price: variantPrice,
          availability: variant.available === false ? 'out_of_stock' : availability,
          product,
          itemGroupId: product.sku,
          gtin: variant.gtin,
        });
        if (item) items.push(item);
      }
      continue;
    }

    const item = toFeedItem({
      id: product.sku,
      title: name,
      description,
      link,
      image: product.image,
      gallery,
      price: product.price ?? basePrice,
      salePrice: product.salePrice,
      availability,
      product,
      gtin: product.gtin,
    });
    if (item) items.push(item);
  }

  return items;
}

// ============================================
// XML kimenet (RSS 2.0 + g: névtér)
// ============================================

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const tag = (name: string, value: string | number) =>
  `    <${name}>${escapeXml(String(value))}</${name}>`;

function renderItem(item: FeedItem): string {
  const lines = [
    tag('g:id', item.id),
    tag('g:title', item.title),
    tag('g:description', item.description),
    tag('g:link', item.link),
    tag('g:image_link', item.imageLink),
    ...item.additionalImageLinks.map((url) => tag('g:additional_image_link', url)),
    tag('g:availability', item.availability),
    tag('g:price', item.price),
    ...(item.salePrice ? [tag('g:sale_price', item.salePrice)] : []),
    tag('g:condition', item.condition),
    tag('g:brand', item.brand),
    ...(item.gtin ? [tag('g:gtin', item.gtin)] : []),
    ...(item.mpn ? [tag('g:mpn', item.mpn)] : []),
    tag('g:identifier_exists', item.identifierExists ? 'yes' : 'no'),
    ...(item.googleProductCategory !== undefined
      ? [tag('g:google_product_category', item.googleProductCategory)]
      : []),
    tag('g:product_type', item.productType),
    ...(item.itemGroupId ? [tag('g:item_group_id', item.itemGroupId)] : []),
    ...item.shipping.map(
      (s) =>
        `    <g:shipping>\n` +
        `      <g:country>${s.country}</g:country>\n` +
        `      <g:service>${escapeXml(s.service)}</g:service>\n` +
        `      <g:price>${escapeXml(s.price)}</g:price>\n` +
        `    </g:shipping>`
    ),
    tag('g:custom_label_0', item.customLabel0),
    tag('g:custom_label_1', item.customLabel1),
  ];
  return `  <item>\n${lines.join('\n')}\n  </item>`;
}

export function renderFeedXml(items: FeedItem[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    '<channel>',
    tag('title', `${SITE.name} – termékfeed`).trim(),
    tag('link', SITE.url + '/').trim(),
    tag(
      'description',
      'Professzionális kozmetikai készülékek, lézerek és kezelőanyagok.'
    ).trim(),
    ...items.map(renderItem),
    '</channel>',
    '</rss>',
    '',
  ].join('\n');
}

/**
 * Google Merchant Center termékfeed: /merchant-feed.xml
 *
 * Build időben generált statikus fájl - a Merchant Centerben ütemezett
 * lekérésként (Scheduled fetch) kell megadni, napi frissítéssel. A tartalmat a
 * lib/merchant/feed.ts állítja elő a `products` kollekcióból.
 *
 * A robots.txt nem tiltja, de a sitemapból ki van zárva (astro.config.mjs),
 * mert nem indexelendő oldal.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { buildFeedItems, renderFeedXml } from '@/lib/merchant/feed';

export const prerender = true;

export const GET: APIRoute = async () => {
  const products = await getCollection('products');
  const xml = renderFeedXml(buildFeedItems(products));

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

import { getCollection } from 'astro:content';

/**
 * Publikált blogcikkek (`draft: true` nélkül), legújabb elöl.
 * `locale` megadásával csak az adott nyelv cikkei: hu = előtag nélküli id,
 * más nyelv = `{locale}/{slug}`. Ahol egy nyelven nincs cikk, ott a blog nem jelenik meg.
 */
export async function getBlogPosts(locale?: string) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts
    .filter((p) => !locale || (locale === 'hu' ? !p.id.includes('/') : p.id.startsWith(`${locale}/`)))
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

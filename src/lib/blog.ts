import { getCollection } from 'astro:content';
import { TEAM } from '@/lib/constants';

/** Publikált (nem draft) cikkek, legújabb elöl; `locale` = csak az adott nyelv. */
export async function getBlogPosts(locale?: string) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts
    .filter((p) => !locale || (locale === 'hu' ? !p.id.includes('/') : p.id.startsWith(`${locale}/`)))
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

/** A cikk szerzője / tipp-adója a Rólunk oldal csapatából (pontos névegyezés). */
export function findTeamMember(name: string) {
  return TEAM.find((m) => m.name === name);
}

/** Olvasási idő percben (~200 szó/perc), az MDX-komponensek és jelölők nélkül. */
export function readingMinutes(body = '') {
  const words = body
    .replace(/^import .*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter((w) => /\p{L}/u.test(w)).length;
  return Math.max(1, Math.round(words / 200));
}

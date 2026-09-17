import { t, type Locale } from '@/i18n/ui';

/**
 * Valódi vásárlói videós vélemények (YouTube Shorts) – egyetlen forrás.
 *
 * Használja: `sections/VideoTestimonials.astro` (4-es rács a főoldalon,
 * kategória- és rólunk-oldalon) és `video/VideoQuote.astro` (termékoldalon
 * szétszórt videó + idézet blokkok).
 *
 * Az idézetek (`quoteKey`) SZÓ SZERINTI mondatok a videók leiratából – csak
 * a gépi félrehallások javítva. Kitalált vagy átfogalmazott mondat nem kerülhet
 * ide (lásd memória: skinlab-video-testimonials).
 */
export interface VideoTestimonial {
  id: 'adri' | 'hajnalka' | 'anna' | 'dori';
  videoId: string;
  name: string;
  roleKey: string;
  business: string;
  /** A teljes videó hossza, ahogy a felületen megjelenik (pl. "1:14"). */
  duration: string;
  quoteKey: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'adri',
    videoId: 'YHyZ1HheFUc',
    name: 'Zsidai Adri',
    roleKey: 'videoTestimonials.role1',
    business: 'Fancy Beauty Palota',
    duration: '1:14',
    quoteKey: 'videoTestimonials.quote1',
  },
  {
    id: 'hajnalka',
    videoId: 'yD0Rhk9kXmg',
    name: 'Török Hajnalka',
    roleKey: 'videoTestimonials.role2',
    business: 'Aurora Face Art Studio & PMU Academy',
    duration: '1:42',
    quoteKey: 'videoTestimonials.quote2',
  },
  {
    id: 'anna',
    videoId: 'ftVAd7itY_0',
    name: 'Solti Anna',
    roleKey: 'videoTestimonials.role3',
    business: 'd’Ane Beauty Salon',
    duration: '0:21',
    quoteKey: 'videoTestimonials.quote3',
  },
  {
    id: 'dori',
    videoId: 'VxAFGEOMq1w',
    name: 'Rácz Dóri',
    roleKey: 'videoTestimonials.role4',
    business: 'RD Beauty',
    duration: '0:51',
    quoteKey: 'videoTestimonials.quote4',
  },
];

export function getVideoTestimonial(id: VideoTestimonial['id']): VideoTestimonial {
  const item = VIDEO_TESTIMONIALS.find((v) => v.id === id);
  if (!item) throw new Error(`Unknown video testimonial: ${id}`);
  return item;
}

/** Shorts álló (9:16) poszter; a maxresdefault Shortsnál letterboxolt lenne. */
export const shortsPoster = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/oar2.jpg`;

export function videoObjectSchema(item: VideoTestimonial, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${item.name} (${item.business})`,
    description: `${item.name} – ${t(locale, item.roleKey)} (${item.business}) – ${t(locale, 'videoTestimonials.subtitle')}`,
    thumbnailUrl: shortsPoster(item.videoId),
    contentUrl: `https://www.youtube.com/watch?v=${item.videoId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${item.videoId}`,
  };
}

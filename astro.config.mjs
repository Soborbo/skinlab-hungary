import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

const isDev = process.argv.includes('dev');
const siteUrl = isDev ? 'http://localhost:4321' : 'https://skinlabhungary.hu';

export default defineConfig({
  site: siteUrl,
  // Cloudflare serves directory routes with a trailing slash (a no-slash URL
  // 307-redirects to the slash form). Match that here so the canonical,
  // hreflang and sitemap URLs equal the actually-served URL instead of
  // pointing at a redirecting one.
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Exclude noindex utility/conversion routes so Google doesn't see
      // duplicate-content / thank-you / cart pages in the sitemap.
      // `blog` is excluded while the section is drafted off (see
      // src/config/features.ts → BLOG_ENABLED); remove it when re-publishing.
      filter: (page) =>
        !/\/(blog|koszonjuk|konzultacio-koszonjuk|rendeles-koszonjuk|kosar|megrendeles)(\/|$)/i.test(page),
      i18n: {
        defaultLocale: 'hu',
        // Language-only hreflang codes to match the <head> alternate links
        // (localeConfig[*].hreflang). Region-specific codes (hu-HU, en-GB…)
        // here previously disagreed with the head, sending Google two
        // different annotations for the same alternate.
        locales: {
          hu: 'hu',
          en: 'en',
          sk: 'sk',
          ro: 'ro',
          de: 'de',
          cs: 'cs',
          hr: 'hr',
          sr: 'sr',
          sl: 'sl',
        },
      },
    }),
  ],
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  build: {
    // Inline the shared stylesheet into each document so first paint isn't
    // blocked on a separate render-blocking CSS request (~300ms on slow
    // mobile). The CSS gzips to a few KB, so the per-page cost is small.
    inlineStylesheets: 'always',
  },
  image: {
    service: passthroughImageService(),
    domains: ['skinlabhungary.hu'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

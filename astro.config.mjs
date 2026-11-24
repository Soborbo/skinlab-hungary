import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import { readdirSync, readFileSync } from 'node:fs';

// Van-e publikált magyar cikk? A /blog/ on-demand útvonal 404-et ad, amíg nincs,
// ezért addig a sitemapből is kimarad (getCollection itt még nem érhető el).
const hasHuBlog = readdirSync('./src/content/blog')
  .filter((f) => /\.mdx?$/.test(f))
  .some((f) => !/^draft:\s*true\s*$/m.test(readFileSync(`./src/content/blog/${f}`, 'utf8')));

const isDev = process.argv.includes('dev');
const siteUrl = isDev ? 'http://localhost:4321' : 'https://skinlabhungary.hu';

export default defineConfig({
  site: siteUrl,
  // Cloudflare serves directory routes with a trailing slash (a no-slash URL
  // 307-redirects to the slash form). Match that here so the canonical,
  // hreflang and sitemap URLs equal the actually-served URL instead of
  // pointing at a redirecting one.
  trailingSlash: 'always',
  // Astro 7 changed the compressHTML default from `true` (HTML-aware) to
  // `'jsx'` (JSX-style stripping), which can drop spaces between inline
  // elements. Pin the v6 behaviour to avoid subtle whitespace regressions.
  compressHTML: true,
  integrations: [
    // Blogcikkek .mdx-ben: komponensek (videó, termékkártya, tipp) a szövegben.
    mdx(),
    sitemap({
      // Exclude noindex utility/conversion routes so Google doesn't see
      // duplicate-content / thank-you / cart pages in the sitemap.
      // `merchant-feed.xml` is a Merchant Center product feed, not a page.
      filter: (page) =>
        !/\/(koszonjuk|konzultacio-koszonjuk|rendeles-koszonjuk|kosar|megrendeles|ertekeles)(\/|$)/i.test(page) &&
        !/\/merchant-feed\.xml$/i.test(page) &&
        (hasHuBlog || !/\/blog\/$/.test(page)),
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
      // @astrojs/sitemap emits one <xhtml:link hreflang> per configured locale
      // but never an x-default. Add x-default → the Hungarian (defaultLocale)
      // URL of each page-set, matching the <head> alternate in BaseLayout.astro
      // so the sitemap and the on-page hreflang annotations agree.
      serialize(item) {
        if (item.links?.length) {
          const hu = item.links.find((l) => l.lang === 'hu');
          if (hu && !item.links.some((l) => l.lang === 'x-default')) {
            item.links.push({ lang: 'x-default', url: hu.url });
          }
        }
        return item;
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

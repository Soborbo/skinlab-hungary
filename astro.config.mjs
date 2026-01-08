import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://skinlabhungary.hu',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'hu',
        locales: {
          hu: 'hu-HU',
          en: 'en-GB',
          sk: 'sk-SK',
          ro: 'ro-RO',
          de: 'de-DE',
          cs: 'cs-CZ',
          hr: 'hr-HR',
          sr: 'sr-RS',
          sl: 'sl-SI',
        },
      },
    }),
  ],
  output: 'hybrid',
  adapter: cloudflare(),
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: ['skinlabhungary.hu'],
  },
});

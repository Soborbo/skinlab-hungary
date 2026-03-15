import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://skinlabhungary.hu',
  integrations: [
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
  adapter: cloudflare(),
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: ['skinlabhungary.hu'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

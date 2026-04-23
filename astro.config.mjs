import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

const isDev = process.argv.includes('dev');
const siteUrl = isDev ? 'http://localhost:4321' : 'https://skinlabhungary.hu';

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'never',
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
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: passthroughImageService(),
    domains: ['skinlabhungary.hu'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://skinlabhungary.hu',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'hu',
        locales: { hu: 'hu-HU' },
      },
    }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: ['skinlabhungary.hu'],
  },
});

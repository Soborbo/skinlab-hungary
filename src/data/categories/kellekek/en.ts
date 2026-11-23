/**
 * Supplies category page (catalog variant) - English copy (translation of ./hu.ts).
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.en';

export const en: ShowcaseCopy = {
  seo: {
    name: 'Supplies & Accessories',
    nameShort: 'Supplies',
    description: 'Needle cartridges and smoke extractor.',
  },
  hero: {
    titleLines: ['Needles and supplies', 'for your daily work.'],
    lead: 'Sterile, single-use needle cartridges for PMU machines and a smoke extractor for carbon peeling. Original manufacturer products, with home delivery or personal pickup.',
    imageAlt: 'Faviamo needle cartridges in a gift box',
  },
  usp: [
    { title: 'Original manufacturer products', sub: 'no third-party copies' },
    { title: 'Foxpost or GLS delivery', sub: 'to a parcel locker or your door' },
    { title: 'Personal pickup in Érd', sub: 'at our showroom' },
    { title: 'Personal advice', sub: 'from the founders' },
  ],
  catalog: {
    title: 'Supplies',
    lead: 'Needle cartridges and accessories for your machines.',
    groups: [
      {
        title: 'Needle cartridges',
        short: 'Needle cartridges',
        subtitle: 'Sterile, individually packed, single-use needle cartridges for PMU machines, in several sizes, in 1RL and 3RL configurations.',
      },
      {
        title: 'Carbon peeling accessories',
        short: 'Smoke extractor',
        subtitle: 'Smoke extractor for laser and carbon peeling treatments, with HEPA and activated carbon filters.',
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Why buy your supplies from us?',
    lead: "What's worth knowing before you order.",
    imageAlt: 'Faviamo needle cartridges in their box',
    items: [
      {
        title: 'Original needle cartridges',
        text: 'Mast Oceanheart and Faviamo, original manufacturer products, not third-party copies.',
      },
      {
        title: 'Sterile, single-use',
        text: 'The needle cartridges are individually and sterile packed, so you open a new one for every client.',
      },
      {
        title: 'Convenient delivery',
        text: 'To a Foxpost parcel locker or to your door with GLS, or in person at our showroom in Érd.',
      },
      {
        title: 'We help you choose',
        text: "If you're not sure which needle size suits your technique, ask us.",
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Not sure which needle cartridge you need?',
    needs: [
      "You don't know which size you need",
      'You have a question about compatibility',
      'You want exact info about a product',
      'You just need some good advice',
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    lead: "The most common questions about supplies. If you can't find the answer, ask us directly.",
    items: [
      {
        question: 'Which needle cartridges do you sell?',
        answer: 'Mast Oceanheart and Faviamo needle cartridges, with needle diameters from 0.18 to 0.35 mm, in 1RL and 3RL configurations. You can choose the available sizes on the product page.',
      },
      {
        question: 'What is the smoke extractor for?',
        answer: 'It extracts the smoke produced during laser and carbon peeling treatments. It works with HEPA and activated carbon filters and has built-in LED lighting.',
      },
      {
        question: 'How do I receive my order?',
        answer: 'We ship it to a Foxpost parcel locker or to your door with GLS, but you can also pick it up in person at our showroom in Érd.',
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Pick it up in person in Érd.',
    text: 'You can collect your order at our showroom, and if you have questions, we will help you on the spot.',
    demoCta: 'Book an appointment',
  },
};

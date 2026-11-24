/**
 * Treatment products category page (catalog variant) - English copy (translation of ./hu.ts).
 * No machine promises (warranty, training, service) and no delivery deadline here.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.en';

export const en: ShowcaseCopy = {
  seo: {
    name: "M'ONDUNIQ Professional Cosmetics",
    nameShort: "M'ONDUNIQ",
    description: "M'ONDUNIQ professional treatment products: hydra-liquids, active ingredient cocktails and exosome formulations.",
  },
  hero: {
    titleLines: ["M'ONDUNIQ products", 'to go with your machines.'],
    lead: 'Aqua-peeling hydra-liquids, active ingredient cocktails, exosome formulations and the complete LaserIQ carbon peeling protocol. As an official distributor, we supply original products.',
    imageAlt: "M'ONDUNIQ AquametiQ Acid Prime treatment liquid on a stone slab with a green branch",
  },
  usp: [
    { title: 'Original, official products', sub: 'from an official distributor' },
    { title: 'Foxpost or GLS delivery', sub: 'to a parcel locker or your door' },
    { title: 'Personal pickup in Érd', sub: 'at our showroom' },
    { title: 'Complete protocols', sub: 'from preparation to home care' },
  ],
  catalog: {
    title: 'Treatment products by protocol',
    lead: "By product line, in treatment step order, so you can see what's still missing from your work.",
    groups: [
      {
        title: "M'ONDUNIQ LaserIQ: carbon peeling and laser protocol",
        short: 'LaserIQ protocol',
        subtitle: 'For all our Nd:YAG lasers (PIXEL, MOSAIC, THE FRAME), in the order of the treatment protocol: skin preparation, the carbon peeling treatment, immediate regeneration, and finally care that continues at home.',
      },
      {
        title: 'AquametiQ hydra-liquids: aqua-peeling treatment liquids',
        short: 'AquametiQ liquids',
        subtitle: 'Active treatment liquids to fill into hydrodermabrasion and aqua-peeling machines. Four versions: acidic prep, hydrating, brightening and osmotic rinse water.',
      },
      {
        title: 'Active ingredient cocktails, serums and masks',
        short: 'Cocktails, serums',
        subtitle: 'For microneedling mesotherapy, nano treatments, electroporation, oxygen infusion and cold plasma protocols.',
      },
      {
        title: 'Acid exfoliation and anti-aging facial care',
        short: 'Anti-aging care',
        subtitle: "The 10% phytic acid concentrate for in-cabin exfoliation; the HI'FUsion Longevity serum and cream, the LEPIREV eye cream and the Vitamino'MASK rejuvenating face mask to hydrate the skin and reduce the visibility of wrinkles.",
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Why buy your treatment products from us?',
    lead: "What's worth knowing before you order.",
    imageAlt: "M'ONDUNIQ HI'FUsion Longevity serum and face cream on the salon counter, with a facial treatment machine in the background",
    items: [
      {
        title: 'Original, official products',
        text: 'As an official distributor, we source the products directly from the manufacturer.',
      },
      {
        title: 'Complete protocols, not single items',
        text: 'From skin preparation to home maintenance, there is a product for every step, in a system that builds on itself.',
      },
      {
        title: 'Matched to your machines',
        text: 'Carbon peeling, hydrodermabrasion, microneedling, cold plasma, mesotherapy: all your treatment products in one place.',
      },
      {
        title: 'Convenient delivery',
        text: 'To a Foxpost parcel locker or to your door with GLS, or in person at our showroom in Érd.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Not sure which treatment product you need?',
    needs: [
      "You don't know which one suits your machine",
      "You'd like to put together a protocol",
      'You have a question about a product',
      'You just need some good advice',
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    lead: "The most common questions about treatment products. If you can't find the answer, ask us directly.",
    items: [
      {
        question: 'Which treatment product suits my machine?',
        answer: 'For carbon peeling and Nd:YAG lasers, the LaserIQ line; for hydrodermabrasion and aqua-peeling machines, the AquametiQ hydra-liquids. The active ingredient cocktails are made for microneedling, mesotherapy, electroporation, oxygen and cold plasma treatments.',
      },
      {
        question: 'How do I receive my order?',
        answer: 'We ship it to a Foxpost parcel locker or to your door with GLS, but you can also pick it up in person at our showroom in Érd.',
      },
      {
        question: 'Are the products original?',
        answer: "Yes. As the official distributor of M'ONDUNIQ, we source the products directly from the manufacturer.",
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Collect it in Érd.',
    text: 'You can collect your order at our showroom, and if you have questions, we will help you on the spot.',
    demoCta: 'Book a visit',
  },
};

/**
 * Mesotherapy category page (single product) - English copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, reviews, visitSingle } from '../common.en';

const models: Record<string, ShowcaseModelCopy> = {
  dermatechplus_noneedle_mesotherapy: {
    name: 'DermaTECH+',
    keySpec: 'needle-free, up to 800 kDa',
    tagline: 'needle-free mesotherapy',
    forWho: 'Active delivery, all year round',
    desc: 'A needle-free mesotherapy device with DermoPenetrate Max technology: micro-current pulses and precision vibration deliver the active ingredient into the skin, up to a molecular size of 800 kDa, without needles, electrolysis or pH change.',
    when: [
      "you'd offer painless active ingredient delivery",
      "you'd offer mesotherapy in summer too",
      "you'd use your own serums and ampoules",
    ],
  },
};

export const en: ShowcaseCopy = {
  seo: {
    name: 'Mesotherapy Devices',
    nameShort: 'Mesotherapy',
    description: 'Needle-free and classical mesotherapy active ingredient delivery systems.',
  },
  hero: {
    titleLines: ['Mesotherapy without needles,', 'without pain.'],
    lead: 'Deep active ingredient delivery without needles or downtime, for every skin type, at any time of year. We train you, and repair it if needed.',
    imageAlt: 'DermaTECH+ needle-free mesotherapy handpiece in hand',
  },
  usp: [
    { title: '2-year full warranty', sub: 'on every new machine' },
    { title: 'Our own service in Hungary', sub: 'fast repair in Érd' },
    { title: 'Full training included', sub: 'we train you on the machine' },
    { title: 'Personal advice', sub: 'from the founders' },
  ],
  models: {
    title: 'Meet the DermaTECH+',
    lead: "Active ingredient delivery at molecular level, through the skin's natural water channels.",
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Why is a needle-free mesotherapy machine worth buying?',
    lead: "What's worth thinking through before you buy.",
    imageAlt: 'DermaTECH+ needle-free mesotherapy device',
    items: [
      {
        title: 'Painless treatment',
        text: 'No needles, micro-injuries or bleeding; the client can go straight on with their day after the treatment.',
      },
      {
        title: 'Usable all year round',
        text: "Since the skin isn't injured, it doesn't become photosensitive, so you can treat with it in summer and strong sunshine too.",
      },
      {
        title: 'Larger molecules too',
        text: 'It delivers active ingredients of up to 800 kDa: hyaluronic acid, peptides, growth factors.',
      },
      {
        title: 'Well-priced treatment',
        text: 'Salons typically charge 10 000-25 000 Ft for a needle-free mesotherapy treatment.',
      },
    ],
  },
  consult: consultSingle,
  faq: {
    title: 'Frequently asked questions',
    lead: "The most common questions about needle-free mesotherapy. If you can't find the answer, ask us directly.",
    items: [
      {
        question: 'What is DermoPenetrate Max technology?',
        answer: "It uses micro-current pulses and precision vibration to temporarily open the skin cells' natural water channels (aquaporins). This way the active ingredient enters the skin at molecular level, without needles.",
      },
      {
        question: 'Is the treatment painful?',
        answer: 'No. There are no needles, micro-injuries, burning or stinging. The client gets a pleasant, relaxing treatment and can go straight on with their day afterwards.',
      },
      {
        question: 'Which active ingredients can it be used with?',
        answer: 'With almost any cosmetic serum and ampoule: hyaluronic acid, peptides, vitamin C, retinol, niacinamide, growth factors, brightening and regenerating actives.',
      },
      {
        question: 'Why can it be used in summer too?',
        answer: "Because the treatment doesn't injure the skin, there are no needles and no peeling, so the skin doesn't become photosensitive. Unlike needle mesotherapy, it can be used safely in strong sunshine too.",
      },
      {
        question: 'How many treatments make up a course?',
        answer: 'A course consists of 3-6 treatments, once a month. One treatment takes 25-30 minutes.',
      },
    ],
  },
  visit: visitSingle,
};

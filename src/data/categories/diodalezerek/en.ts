/**
 * Diode laser category page - English copy (translation of ./hu.ts).
 * Prices, wattage, specs and images come from the product JSONs.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.en';

const models: Record<string, ShowcaseModelCopy> = {
  athena: {
    tagline: 'control and precision',
    forWho: 'New or add-on service',
    desc: 'Smart software that recommends settings based on skin and hair type. A stable, predictable machine for anyone starting or expanding hair removal.',
    when: [
      "you're looking for a cost-effective but professional entry machine",
      'hair removal will be an add-on service',
      'predictability matters more than speed',
    ],
  },
  olympia: {
    tagline: 'winning performance',
    forWho: 'Speed with control',
    desc: '1200W output power and 5 adjustable spot sizes: precise work on small areas, fast progress on large ones.',
    when: [
      "you're looking for a powerful machine at a realistic price",
      'you want faster treatments, but with control',
      'you have many different clients and body areas',
    ],
  },
  helios: {
    tagline: 'the true power of light',
    forWho: 'Clinic, high traffic',
    desc: 'Our most powerful model: 1600W, deeper effect, shorter treatment time. For high-traffic salons and clinics.',
    when: [
      'you have many hair removal clients every day',
      "you'd fit in more appointments with shorter treatments",
      "you're looking for the top category",
    ],
  },
  empire: {
    tagline: 'the intelligent system',
    forWho: 'Diagnostics + client records',
    desc: 'Micro-camera hair and skin diagnostics, digital client records with before-and-after photos, and the machine recommends the parameters.',
    when: [
      "you'd document your treatments",
      "you'd base the settings on an examination",
      "you'd work with stacked pulses (SHR STACK)",
    ],
  },
};

export const en: ShowcaseCopy = {
  seo: {
    name: 'Professional Diode Lasers',
    nameShort: 'Diode Lasers',
    description: 'Professional 4-wavelength diode lasers for permanent hair removal.',
  },
  hero: {
    titleLines: ['A diode laser that', 'brings clients back.'],
    lead: "Permanent hair removal with 4-wavelength technology, for every skin and hair type. We help you choose the right machine for your salon, train you, and repair it if needed.",
    imageAlt: 'Diode laser hair removal with an OLYMPIA machine in the salon',
  },
  usp: [
    { title: '2-year full warranty', sub: 'on every new machine' },
    { title: '8-hour on-site training', sub: '+ 6 months of follow-up' },
    { title: 'Our own service in Hungary', sub: 'fast repair in Érd' },
    { title: '0% APR instalments', sub: '50% deposit + monthly payments' },
  ],
  models: {
    title: 'Which one suits your salon?',
    lead: 'All four use 4 wavelengths. The difference is in speed, treatment mode and how much you document.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technical comparison',
    lead: 'The key parameters at a glance',
    labels: ['Price', 'Power', 'Wavelengths', 'Spot size', 'Cooling', 'Recommended for'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Why is a diode laser worth buying?',
    lead: "What's worth thinking through before you buy.",
    imageAlt: 'OLYMPIA diode laser handpiece during treatment',
    items: [
      {
        title: 'Fast payback',
        text: 'With about 3-4 clients per working day, a treatment fee of 12 000 Ft and a cost of 2 000 Ft per treatment, you keep a margin of 600 000-800 000 Ft a month. That way the machine can pay for itself in about 3.3-3.7 months. Illustrative calculation, not a financial promise.',
      },
      {
        title: 'Returning clients',
        text: 'Clients book a course of 6-8 sessions, then come back for a maintenance treatment every year.',
      },
      {
        title: 'More effective than IPL',
        text: 'More targeted, works deeper, needs fewer sessions. The client sees results sooner.',
      },
      {
        title: 'For every skin type',
        text: 'The 4 wavelengths are effective on light and dark skin, on fine and coarse hair alike.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Interest-free instalments at 0% APR: 50% deposit, the rest in 3, 6 or 12 monthly payments. No handling fee and no hidden costs.',
  },
  training: {
    titleLines: ["You won't learn it alone.", "We'll teach you everything."],
    text: '8-hour on-site training in your own salon, followed by 6 months of follow-up. FAR-certified operator training with an official certificate.',
    cta: 'Our training courses',
  },
  consult,
  faq: {
    title: 'Frequently asked questions',
    lead: "The most common questions about diode lasers. If you can't find the answer, ask us directly.",
    items: [
      {
        question: "What's the difference between 1, 3 and 4 wavelength machines?",
        answer: '1 wavelength (808 nm) is the classic, for light to medium skin. 3 wavelengths also treat darker skin and finer hair. 4 wavelengths (755 + 808 + 940 + 1064 nm) are the most versatile and more effective on light hair too.',
      },
      {
        question: 'Why does power (watts) matter?',
        answer: 'More power = faster treatment, more clients per day. For a high-traffic salon we recommend over 1000W.',
      },
      {
        question: 'Does diode laser treatment hurt?',
        answer: 'Sapphire skin cooling makes it almost painless; most clients feel only mild warmth.',
      },
      {
        question: 'How long does a treatment take?',
        answer: 'Underarms 5-10 minutes, legs 20-40 minutes, full body 60-90 minutes, depending on the machine.',
      },
    ],
  },
  visit: {
    title: 'Try them all in Érd.',
    text: 'Come to our showroom and try all four diode lasers live before you decide.',
    booking: 'By appointment',
    demoCta: 'Request a demo',
  },
};

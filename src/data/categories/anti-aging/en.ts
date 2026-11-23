/**
 * Anti-aging category page - English copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.en';

const models: Record<string, ShowcaseModelCopy> = {
  'q2-biopen': {
    name: 'Bio Pen Q2',
    keySpec: 'EMS + LED',
    tagline: 'the mobile microneedling pen',
    forWho: 'Entry level, mobile treatments',
    desc: 'A cordless microneedling pen with EMS electroporation, blue/red LED light therapy and 7 ready-made treatment programmes. With a small investment you can start offering microneedling skin renewal and active ingredient delivery treatments.',
    when: [
      "you're introducing microneedling treatments now",
      "you'd use it for active ingredient delivery too",
      "you'd also offer treatments at clients' homes",
    ],
    compare: {
      tech: 'EMS microneedling + LED light therapy',
      form: 'Cordless handheld pen',
      extra: 'Blue 470 nm / red 630 nm LED',
      use: 'Face, eye area, scalp, body',
    },
  },
  'aestiq-ai': {
    name: 'AESTIQ AI',
    keySpec: 'microneedle RF',
    tagline: 'the AI teaching platform',
    forWho: 'Premium anti-aging service',
    desc: 'A vacuum microneedle RF system: the vacuum stabilises the skin while radiofrequency works in the deeper layers. The built-in AI Educator guides you step by step, and ANG™ needle control works at preset depths.',
    when: [
      "you'd offer wrinkle, scar and stretch mark treatments",
      "you'd build a service with high treatment prices",
      'you want the machine to help you learn too',
    ],
    compare: {
      tech: 'Vacuum microneedle RF',
      form: 'Tabletop platform',
      extra: 'AI Educator + ANG™ needle control',
      use: 'Fine lines, skin laxity, enlarged pores, acne scars, stretch marks',
    },
  },
};

export const en: ShowcaseCopy = {
  seo: {
    name: 'Anti-Aging Devices',
    nameShort: 'Anti-aging',
    description: 'Vacuum microneedle RF and EMS microneedling skin rejuvenation devices.',
  },
  hero: {
    titleLines: ['Premium treatments', 'with anti-aging tech.'],
    lead: "Skin tightening, wrinkle and scar treatment without surgery, with microneedle RF or EMS technology. We'll help you choose the right machine for your salon, and repair it if needed.",
    imageAlt: 'Microneedling facial with the Bio Pen Q2 in the salon',
  },
  usp: [
    { title: '2-year full warranty', sub: 'on every new machine' },
    { title: 'Our own service in Hungary', sub: 'fast repair in Érd' },
    { title: '0% APR instalments', sub: 'on machines over 100 000 Ft' },
    { title: 'Personal advice', sub: 'from the founders' },
  ],
  models: {
    title: 'Which one suits your salon?',
    lead: 'A mobile handheld pen and a tabletop AI platform: different purposes, different price levels.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Comparison',
    lead: "The two machines are in different categories, so it's best to decide based on how you'll use them",
    labels: ['Price', 'Technology', 'Design', 'Extra', 'Application', 'Recommended for'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Why is an anti-aging machine worth buying?',
    lead: "What's worth thinking through before you buy.",
    imageAlt: 'Bio Pen Q2 microneedling pen',
    items: [
      {
        title: 'Targeted tightening',
        text: 'Microneedle RF delivers heat directly into the deeper layers of the skin, tightening it without surgery.',
      },
      {
        title: 'No downtime',
        text: 'After most treatments the client can go straight back to their daily routine.',
      },
      {
        title: 'Returning clients',
        text: 'Collagen rebuilds over weeks, so clients come back for a course of several sessions.',
      },
      {
        title: 'Premium treatment prices',
        text: 'Microneedle RF and microneedling skin renewal are among the high-margin services in salons.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Interest-free instalments at 0% APR on machines over 100 000 Ft: 50% deposit, the rest in monthly payments. No handling fee and no hidden costs.',
  },
  consult,
  faq: {
    title: 'Frequently asked questions',
    lead: "The most common questions about anti-aging machines. If you can't find the answer, ask us directly.",
    items: [
      {
        question: 'What is the difference between the AESTIQ AI and the Bio Pen Q2?',
        answer: 'The Bio Pen Q2 is a compact, cordless microneedling pen with EMS electroporation and LED light therapy. The AESTIQ AI is a higher-category vacuum microneedle RF system that combines radiofrequency, vacuum skin stabilisation, the AI Educator system and ANG™ needle control.',
      },
      {
        question: "Which one should I start with if I'm introducing microneedling treatments now?",
        answer: 'The Bio Pen Q2 is a good entry point: a small investment, easy to add to your existing services, and in a single handheld device you get microneedling, EMS electroporation and 470/630 nm LED light therapy.',
      },
      {
        question: 'When is the AESTIQ AI the better choice?',
        answer: "If you'd offer higher-category anti-aging, skin tightening, scar or texture improvement treatments. Besides the microneedles it works with RF energy, stabilises the skin with vacuum, and the AI Educator and ANG™ also support the operator's work.",
      },
      {
        question: 'Is the Bio Pen Q2 a radiofrequency device too?',
        answer: 'No, and this is an important difference. The Bio Pen Q2 uses EMS micro-current (electroporation). True microneedle RF is found in the AESTIQ AI.',
      },
      {
        question: 'When are the results visible?',
        answer: 'Slight tightening can be felt right after the treatment. With AESTIQ AI microneedle RF treatment, the real result matures over 3-6 months as collagen regenerates; a course consists of 3-4 sessions.',
      },
    ],
  },
  visit,
};

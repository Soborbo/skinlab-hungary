/**
 * ND:YAG laser category page - English copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.en';

const models: Record<string, ShowcaseModelCopy> = {
  pixelcarbonlezer: {
    name: 'PIXEL',
    keySpec: '4 heads · 1200 mJ',
    tagline: 'the compact carbon laser',
    forWho: 'Compact entry, carbon peeling',
    desc: 'A tabletop Q-switched ND:YAG laser with 4 handpiece heads (532, 755, 1064 and 1320 nm): carbon peeling, skin texture improvement, pigment and tattoo fading in one system. Closed water cooling, 4.3" touchscreen, fits in a small space.',
    when: [
      "you'd add carbon peeling to your services",
      'your treatment room is short on space',
      "you'd start with a smaller investment",
    ],
    compare: {
      waves: '532 + 755 + 1064 + 1320 nm (4 heads)',
      screen: '4.3" touchscreen',
      cooling: 'Closed water cooling system',
    },
  },
  frame: {
    name: 'FRAME',
    keySpec: '4 wavelengths',
    tagline: 'the Android smart laser',
    forWho: 'Tattoos, pigment spots, carbon',
    desc: 'An Android ND:YAG laser with a 13.3" touchscreen, 4 wavelengths and built-in handpiece cooling. For tattoo and pigment spot removal as well as carbon peeling.',
    when: [
      "you'd also offer tattoo removal",
      "you'd work with several ink colours",
      "you'd like a large, clear control interface",
    ],
    compare: {
      waves: '4 wavelengths',
      screen: '13.3" Android touchscreen',
      cooling: 'Built-in handpiece cooling',
    },
  },
};

export const en: ShowcaseCopy = {
  seo: {
    name: 'Q-switched ND:YAG Laser Devices',
    nameShort: 'ND:YAG Lasers',
    description: 'Tattoo and pigment spot removal lasers.',
  },
  hero: {
    titleLines: ['An ND:YAG laser that', 'makes tattoos disappear.'],
    lead: "Tattoo and pigment spot removal and carbon peeling with Q-switched technology. We help you choose the right machine for your salon, train you, and repair it if needed.",
    imageAlt: 'Carbon peeling treatment with the PIXEL ND:YAG laser, with protective goggles',
  },
  usp: [
    { title: '2-year full warranty', sub: 'on every new machine' },
    { title: 'FAR-certified training', sub: 'in a small group, with a model' },
    { title: 'Our own service in Hungary', sub: 'fast repair in Érd' },
    { title: '0% APR instalments', sub: '50% deposit + monthly payments' },
  ],
  models: {
    title: 'Which one suits your salon?',
    lead: 'Both are Q-switched ND:YAG lasers. The difference lies in the number of wavelengths, the control interface and the cooling.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technical comparison',
    lead: 'The key differences at a glance',
    labels: ['Price', 'Wavelengths', 'Display', 'Handpiece cooling', 'Recommended for'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Why is an ND:YAG laser worth buying?',
    lead: "What's worth thinking through before you buy.",
    imageAlt: 'PIXEL ND:YAG laser device in the showroom',
    items: [
      {
        title: 'Handles the difficult colours too',
        text: 'The Q-switched ND:YAG laser also treats green and blue tattoos, which are harder to remove.',
      },
      {
        title: 'Carbon peeling',
        text: 'Also known as the Hollywood peel: instant glow, smaller pores, more balanced oily skin.',
      },
      {
        title: 'Pigment spot treatment',
        text: 'Fading sun spots, age spots and permanent makeup, with the right choice of wavelength.',
      },
      {
        title: 'High margin',
        text: 'Salons can charge 15-50 000 Ft per session for tattoo removal and 8-15 000 Ft for carbon peeling.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Interest-free instalments at 0% APR: 50% deposit, the rest in 3 or 6 monthly payments. No handling fee and no hidden costs.',
  },
  training: {
    titleLines: ["You won't learn it alone.", "We'll teach you everything."],
    text: 'Q-switched ND:YAG laser operator training for up to 4 people: choosing the right wavelengths and parameters, carbon peeling, permanent makeup and pigment spot removal, with hands-on practice on a model. You receive a FAR-registered certificate with a B number.',
    cta: 'Training details',
  },
  consult,
  faq: {
    title: 'Frequently asked questions',
    lead: "The most common questions about ND:YAG lasers. If you can't find the answer, ask us directly.",
    items: [
      {
        question: 'Which machine should I choose?',
        answer: 'The PIXEL is a compact tabletop entry machine with 4 handpiece heads (532, 755, 1064 and 1320 nm): carbon peeling, skin texture improvement, pigment and tattoo fading in one system. The FRAME, with 4 wavelengths, an Android touchscreen and built-in handpiece cooling, covers tattoo, pigment spot and carbon treatments.',
      },
      {
        question: 'How many sessions does it take to remove a tattoo completely?',
        answer: 'It depends on the size, colour and age of the tattoo. On average 6-12 treatments are needed, 6-8 weeks apart. Black and dark colours fade faster.',
      },
      {
        question: 'Is tattoo removal painful?',
        answer: 'With proper cooling the discomfort is moderate. Many compare it to getting the tattoo: uncomfortable but bearable. A numbing cream can also be used.',
      },
      {
        question: 'What is carbon peeling, and who is it for?',
        answer: "In carbon peeling you apply a carbon mask to the face and remove it with the laser. It's recommended for oily, acne-prone skin and enlarged pores. The result is visible immediately, with no recovery time.",
      },
    ],
  },
  visit,
};

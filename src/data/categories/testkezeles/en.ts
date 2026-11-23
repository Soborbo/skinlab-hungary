/**
 * Body treatment category page - English copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.en';

const models: Record<string, ShowcaseModelCopy> = {
  'freeze-me-slim': {
    name: 'FREEZE ME SLIM',
    keySpec: '4 heads at once',
    tagline: 'the fat freezer',
    forWho: 'Targeted fat reduction',
    desc: 'Cryolipolysis (fat freezing) with 4 handpieces that work simultaneously, cooling down to -10 °C. The package also includes a bioimpedance body analyser scale, so you can track your client\'s progress in numbers.',
    when: [
      "you'd offer treatment for stubborn fat pockets",
      "you'd treat several body areas at once",
      "you'd show the results with measurements",
    ],
    compare: {
      tech: 'Cryolipolysis (fat freezing)',
      area: 'Abdomen, waist, thighs, buttocks, arms, back',
    },
  },
  'the-shaper': {
    name: 'THE SHAPER',
    keySpec: '4 technologies',
    tagline: 'the complete body contouring',
    forWho: 'Body contouring, cellulite, firming',
    desc: 'Four technologies in one machine: vacuum roller massage, radiofrequency, 940 nm infrared laser and 40 kHz ultrasonic cavitation. For face and body, with separate applicators.',
    when: [
      "you'd offer cellulite treatment too",
      "you'd treat both face and body with one machine",
      "you'd like several technologies in one place",
    ],
    compare: {
      tech: 'Vacuum + roller, RF, IR laser, cavitation',
      area: 'Body and face',
    },
  },
};

export const en: ShowcaseCopy = {
  seo: {
    name: 'Body Shaping & Contouring Machines',
    nameShort: 'Body treatment',
    description: 'Cryolipolysis, contour shaping and other body shaping and contouring machines.',
  },
  hero: {
    titleLines: ['A body treatment machine', 'to shape without surgery.'],
    lead: 'Fat freezing, body contouring and cellulite treatment without pain or downtime. We help you choose the right machine for your salon, and repair it if needed.',
    imageAlt: 'THE SHAPER body treatment machine',
  },
  usp: [
    { title: '2-year full warranty', sub: 'on every new machine' },
    { title: 'Training package', sub: 'course material and protocols' },
    { title: 'Our own service in Hungary', sub: 'fast repair in Érd' },
    { title: '0% APR instalments', sub: '50% deposit + monthly payments' },
  ],
  models: {
    title: 'Which one suits your salon?',
    lead: 'FREEZE ME SLIM targets fat pockets, while THE SHAPER uses four technologies for complete body contouring.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Comparison',
    lead: 'The key differences at a glance',
    labels: ['Price', 'Technology', 'Handpieces', 'Treatment area', 'Recommended for'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Why is a body treatment machine worth buying?',
    lead: "What's worth thinking through before you buy.",
    imageAlt: 'THE SHAPER handpiece in hand',
    items: [
      {
        title: 'Several technologies, one machine',
        text: "THE SHAPER combines vacuum roller massage, RF, infrared laser and cavitation, so you don't need to buy separate machines.",
      },
      {
        title: 'Several areas at once',
        text: "FREEZE ME SLIM's four handpieces work simultaneously, so you can treat several body areas in parallel.",
      },
      {
        title: 'Clients who come for a course',
        text: 'Fat freezing is typically a 3-session course and body contouring 6-10 sessions, so the client keeps coming back to you.',
      },
      {
        title: 'Ready-made training package',
        text: 'Course material, treatment protocols and client education materials come with the machine, so you can work professionally from your very first client.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Interest-free instalments at 0% APR: 50% deposit, the rest in 3 or 6 monthly payments. No handling fee and no hidden costs.',
  },
  consult,
  faq: {
    title: 'Frequently asked questions',
    lead: "The most common questions about body treatment machines. If you can't find the answer, ask us directly.",
    items: [
      {
        question: 'How does fat freezing work?',
        answer: 'FREEZE ME SLIM cools the fat cells in a controlled way, down to -10 °C. The cells crystallise, and the body gradually breaks them down and eliminates them naturally. The result is not immediate, it appears over several weeks.',
      },
      {
        question: 'How many sessions is a course?',
        answer: 'For fat freezing, 3 sessions are recommended, one per month. With THE SHAPER it is typically 6-10 sessions; the exact protocol depends on the treated area and the client\'s condition.',
      },
      {
        question: 'Which body areas can THE SHAPER be used on?',
        answer: 'On the face and neck for firming and wrinkle reduction. On the body, on the abdomen, waist, hips, buttocks, thighs, upper arms and back for contouring, cellulite reduction and skin firming.',
      },
      {
        question: 'When is fat freezing not recommended?',
        answer: "During pregnancy, with cold allergy and with certain illnesses. Every client must be assessed before treatment; the package's client record cards and protocols help with this.",
      },
      {
        question: "What's included in the price?",
        answer: 'Both machines come with the full training package (course material, treatment protocols, client education materials) and a 2-year warranty, and FREEZE ME SLIM also comes with the body analysis system. Hands-on training with live models is available for an extra fee.',
      },
    ],
  },
  visit,
};

/**
 * PMU machines category page - English copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, reviews } from '../common.en';

const models: Record<string, ShowcaseModelCopy> = {
  'mast-nano-2': {
    name: 'MAST Nano 2',
    keySpec: '66 g',
    tagline: 'the featherweight',
    forWho: 'Eyeliner, precision work',
    desc: 'A PMU machine weighing just 66 grams, with a coreless motor and a fixed 2.7 mm stroke. Quiet, with hardly any vibration, and its small size makes it especially good for eyeliner.',
    when: [
      'you work a lot on eyelids',
      "you're looking for the lightest machine",
      "you'd learn with a fixed stroke",
    ],
    compare: {
      stroke: '2.7 mm (fixed)',
      motor: 'Coreless, 10 000 RPM',
      weight: '66 g',
    },
  },
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal': {
    name: 'MAST P60',
    keySpec: 'adjustable stroke',
    tagline: 'the versatile one',
    forWho: 'Everyday PMU work',
    desc: 'A wireless PMU machine with a stroke adjustable in 5 steps (2.2-3.2 mm), so you can set it for everything from hair-stroke brows to shading. 121 g, more than 3 hours of runtime.',
    when: [
      'you do brows, lips and eyeliner',
      "you'd adjust the stroke for each technique",
      "you'd work without a cable",
    ],
    compare: {
      stroke: '5 steps (2.2-3.2 mm)',
      motor: 'Coreless, 11 000 RPM',
      weight: '121 g',
    },
  },
  'mast-p60-sminktetovalo-gep': {
    name: 'MAST P60 set',
    keySpec: '+ spare battery',
    tagline: 'the non-stop one',
    forWho: 'Pro studio, long working days',
    desc: 'The same MAST P60 machine with adjustable stroke, with a spare battery in one package. While one battery charges, you keep working with the other.',
    when: [
      'you have several clients in a row',
      "you wouldn't wait for charging",
      "you'd start with a complete package",
    ],
    compare: {
      stroke: '5 steps (2.2-3.2 mm)',
      motor: 'Coreless, 11 000 RPM',
      weight: '121 g',
    },
  },
  'faviamo-flare': {
    name: 'Faviamo Flare',
    keySpec: '4.2 mm stroke',
    tagline: 'the luxury tattoo machine',
    forWho: 'Lining, colouring, shading',
    desc: 'A wireless tattoo machine with an Mcore-Pro brushless motor and a 4.2 mm stroke. 182 g, 4-5 hours of runtime, 3 intensity modes, in a rose gold finish with crystal decoration.',
    when: [
      "you'd like to tattoo too, not just do PMU",
      'you need a stronger stroke',
      'you want the machine to be the jewel of your workstation',
    ],
    compare: {
      stroke: '4.2 mm',
      motor: 'Mcore-Pro brushless',
      weight: '182 g',
    },
  },
};

export const en: ShowcaseCopy = {
  seo: {
    name: 'PMU and Permanent Makeup Machines',
    nameShort: 'PMU Machines',
    description: 'Wired and wireless permanent makeup machines, tattoo machines and accessories.',
  },
  hero: {
    titleLines: ['A PMU machine', 'that adapts to your hand.'],
    lead: "Light, quiet machines for brows, lips and eyeliner. We'll help you choose the right one, and repair it if needed.",
    imageAlt: 'Permanent makeup with a MAST machine in the salon',
  },
  usp: [
    { title: '1-year warranty', sub: 'on every machine' },
    { title: 'Our own service in Hungary', sub: 'fast repair in Érd' },
    { title: 'Universal needle cartridges', sub: "fits most manufacturers' needles" },
    { title: 'Personal advice', sub: 'from the founders' },
  ],
  models: {
    title: 'Which one suits your hand?',
    lead: 'Three PMU machines and a tattoo machine. The difference is in weight, stroke length and motor.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technical comparison',
    lead: 'The key differences at a glance',
    labels: ['Price', 'Stroke length', 'Motor', 'Weight', 'Recommended for'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'What to look for when choosing a machine?',
    lead: "What's worth thinking through before you buy.",
    imageAlt: 'Faviamo Flare tattoo machine on a stand',
    items: [
      {
        title: 'Precise lines',
        text: 'With minimal vibration, microblading, powder brows and lip pigmentation all come out even.',
      },
      {
        title: 'Cable-free work',
        text: 'The MAST P60 and the Faviamo Flare run on batteries, so there is no cable in the way. The MAST P60 set also comes with a spare battery.',
      },
      {
        title: 'Universal needle cartridges',
        text: "The machines use a universal cartridge system and are compatible with most manufacturers' needle cartridges.",
      },
      {
        title: 'Pro machine at an entry price',
        text: "Even as a beginner you don't need to invest a large sum, and you can expand your equipment any time later.",
      },
    ],
  },
  consult: {
    ...consult,
    needs: [
      "You can't decide which one to choose",
      'You want accurate details about the machines',
      'You have a question about needle cartridges',
      'You just need some good advice',
    ],
  },
  faq: {
    title: 'Frequently asked questions',
    lead: "The most common questions about PMU machines. If you can't find the answer, ask us directly.",
    items: [
      {
        question: 'How long does it last on one charge?',
        answer: 'The MAST P60 more than 3 hours, the Faviamo Flare 4-5 hours. The MAST P60 set comes with a spare battery, so while one charges, you can keep working with the other.',
      },
      {
        question: 'Which machine should I choose as a beginner?',
        answer: "As a beginner, it's worth choosing an easy-to-use, reliable machine. The fixed stroke of the MAST Nano 2 makes learning easier, while the adjustable stroke of the MAST P60 grows with your technique.",
      },
      {
        question: "What's the difference between the MAST P60 and the MAST P60 set?",
        answer: "The machine is the same: stroke adjustable in 5 steps, 121 g. The set is Tiffany-coloured and comes with a spare battery, so you don't have to wait for charging even on a long working day.",
      },
      {
        question: 'Which needle cartridges can I use?',
        answer: "MAST machines use a universal cartridge system and are compatible with most manufacturers' needle cartridges. For safe work we recommend quality, sterile, single-use needle cartridges.",
      },
    ],
  },
  visit: {
    title: 'Get hands-on in Érd.',
    text: 'Come to our showroom and try the machines in your hand before you decide. Book an appointment first.',
    booking: 'By appointment',
    demoCta: 'Request a demo',
  },
};

/**
 * Hydrafacial category page - English copy (translation of ./hu.ts).
 * Prices, specs and images come from the product JSONs.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.en';

const models: Record<string, ShowcaseModelCopy> = {
  hydrascanpro: {
    name: 'HydraScan PRO+',
    keySpec: '8 handpieces',
    tagline: 'smart skin analysis',
    forWho: 'AI analysis, premium cabin',
    desc: 'A hydrodermabrasion-centred multi-device with 4K-camera, AI-powered skin analysis. Based on the analysis it recommends treatments, products and a home routine, and the digital client record documents everything.',
    when: [
      "you'd start treatments with a skin analysis",
      "you'd also grow revenue with product recommendations",
      "you'd document your client's progress",
    ],
    compare: {
      tech: 'Hydrodermabrasion + AI skin analysis',
      heads: '8 handpieces (including the LED mask)',
      ai: '4K, three-spectrum camera (approx. 2 min)',
    },
  },
  'hidra-mist-elite': {
    name: 'HydraMIST Elite',
    keySpec: '11-in-1',
    tagline: 'the versatile system',
    forWho: 'Many treatments, one machine',
    desc: '11 treatment options in one device: vacuum hydradermabrasion, oxygen infusion, radiofrequency tightening and an LED oxygen dome where music can play during the treatment.',
    when: [
      "you'd offer many facial treatments from one machine",
      "you'd offer oxygen and RF treatments too",
      "you'd give clients a premium experience",
    ],
    compare: {
      tech: 'Hydradermabrasion + oxygen + RF',
      heads: '11 functions (vacuum, US, RF, oxygen, LED)',
      ai: 'None',
    },
  },
  hydralume: {
    name: 'HydraLUME V10',
    keySpec: '12 heads + LED',
    tagline: 'the facial care centre',
    forWho: 'LED therapy, scalp care',
    desc: 'A standing facial care centre on wheels with vortex hydrodermabrasion, five winged LED panels and 12 handpieces. Deep cleansing, tightening, acne treatment and scalp care from one machine.',
    when: [
      "you'd build a complete rejuvenation protocol",
      "you'd offer LED light therapy too",
      'scalp care is part of your services',
    ],
    compare: {
      tech: 'Vortex hydrodermabrasion + LED',
      heads: '12 handpieces + 5 winged LED panels',
      ai: 'None',
    },
  },
};

export const en: ShowcaseCopy = {
  seo: {
    name: 'Hydrodermabrasion & Multifunctional Devices',
    nameShort: 'Hydrafacial machines',
    description: 'Hydrodermabrasion and combined cosmetic treatment devices.',
  },
  hero: {
    titleLines: ['A hydrafacial machine', 'that makes skin glow.'],
    lead: 'Deep cleansing, hydration and skin rejuvenation in one device, with visible results right after the first treatment. We help you choose the right machine for your salon, train you, and repair it if needed.',
    imageAlt: 'HydraScan PRO+ operator training in the Skinlab showroom',
  },
  usp: [
    { title: '2-year full warranty', sub: 'on every new machine' },
    { title: 'Individual operator training', sub: 'in our showroom' },
    { title: 'Our own service in Hungary', sub: 'fast repair in Érd' },
    { title: '0% APR instalments', sub: '50% deposit + monthly payments' },
  ],
  models: {
    title: 'Which one suits your salon?',
    lead: 'All three are built on hydrodermabrasion. The difference is in the number of handpieces, the extra technologies and whether you need skin analysis.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technical comparison',
    lead: 'The key differences at a glance',
    labels: ['Price', 'Technology', 'Handpieces', 'AI skin analysis', 'Warranty', 'Recommended for'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Why is a hydrafacial machine worth buying?',
    lead: "What's worth thinking through before you buy.",
    imageAlt: 'Hydrodermabrasion facial with a Skinlab device in the salon',
    items: [
      {
        title: 'Instant results',
        text: 'Right after the first treatment the skin looks visibly better and more radiant. The client feels the difference immediately.',
      },
      {
        title: 'Versatile treatments',
        text: 'Cleansing, hydration, anti-aging and pigmentation treatment with one machine.',
      },
      {
        title: 'Well-priced treatment',
        text: 'Salons can charge 15 000-30 000 Ft for a hydrafacial treatment, so the machine can pay for itself quickly.',
      },
      {
        title: 'Skin analysis in front of the client',
        text: "The HydraScan PRO+ 4K camera shows the skin's condition and recommends a treatment and home routine based on it.",
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Interest-free instalments at 0% APR: 50% deposit, the rest in 3 or 6 monthly payments. No handling fee and no hidden costs.',
  },
  training: {
    titleLines: ["You won't learn it alone.", "We'll teach you everything."],
    text: "Individual operator training in our showroom: we pass on our own proven technique, and you can count on our professional support after the training too.",
    cta: 'Our training courses',
  },
  consult,
  faq: {
    title: 'Frequently asked questions',
    lead: "The most common questions about hydrafacial treatment. If you can't find the answer, ask us directly.",
    items: [
      {
        question: "What's the difference between a traditional facial cleansing and a hydrafacial?",
        answer: 'A hydrafacial works with vacuum technology that delivers a serum infusion alongside deep cleansing. It is painless, causes no redness, and the client can go straight on with their day. After a traditional cleansing the face often stays red for days.',
      },
      {
        question: 'How often can a hydrafacial treatment be done?',
        answer: 'A maintenance treatment is usually recommended every 4-6 weeks. As a course it can be done weekly to improve the skin condition. It is a very gentle procedure.',
      },
      {
        question: 'Is it suitable for every skin type?',
        answer: 'Yes. A hydrafacial is one of the gentlest facial treatments and can be used on sensitive skin and rosacea too. It is only not recommended for active inflammatory acne.',
      },
    ],
  },
  visit: {
    title: 'Try it live in Érd.',
    text: 'Come to our showroom and see the machines live before you decide.',
    booking: 'By appointment',
    demoCta: 'Request a demo',
  },
};

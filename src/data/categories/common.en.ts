/**
 * Shared English text blocks of the category pages (the common.hu.ts
 * counterpart, same export names). A category can override them in <slug>/en.ts.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

export const reviews: NonNullable<ShowcaseCopy['reviews']> = { title: 'People who already work with us' };

export const compareHelp: NonNullable<ShowcaseCopy['compare']>['help'] = {
  title: "Can't decide? We'll help you choose.",
  text: 'László and Szimonetta, the co-founders of Skinlab, will advise you in person.',
};

export const financeTexts: Pick<NonNullable<ShowcaseCopy['finance']>, 'title' | 'perks' | 'cta'> = {
  title: 'No need to pay it all at once.',
  perks: ['0% APR', 'No handling fee', 'No hidden costs'],
  cta: 'I want an exact offer',
};

export const consult: ShowcaseCopy['consult'] = {
  title: 'Not sure which machine is right for you?',
  text: "Whichever applies to you, we're happy to help. Call us or request a free consultation and we'll get in touch.",
  needs: [
    "You can't decide which one to choose",
    'You want accurate details about the machines',
    "You'd like to discuss the purchase",
    'You just need some good advice',
  ],
  note: 'We usually call back within 1 business day.',
};

/** For single-product categories: not "which machine" but "this machine". */
export const consultSingle: ShowcaseCopy['consult'] = {
  ...consult,
  title: 'Have a question about the machine?',
  needs: [
    "You'd like to know if it suits your salon",
    'You want accurate details about the machine',
    "You'd like to discuss the purchase",
    'You just need some good advice',
  ],
};

export const visit: ShowcaseCopy['visit'] = {
  title: 'See it in person in Érd.',
  text: "Come to our showroom and we'll show you the machines. Book an appointment first so the machine you're interested in is definitely there.",
  booking: 'By appointment',
  demoCta: 'Request a demo',
};

export const visitSingle: ShowcaseCopy['visit'] = {
  ...visit,
  text: "Come to our showroom and we'll show you the machine live. Book an appointment first so it's definitely there.",
};

/**
 * A showcase kategóriaoldal (CategoryShowcaseLayout + src/components/category/)
 * fix feliratai nyelvenként. A kategóriánkénti szöveg NEM ide tartozik, hanem
 * a src/data/categories/<slug>/<nyelv>.ts-be.
 *
 * Miért nem az i18n JSON-okban: ott a hiányzó kulcs csendben a magyarra esik
 * vissza, itt viszont egy nyelv vagy teljes, vagy nincs (a típus kikényszeríti),
 * és a mondatba illesztett számokat függvény rakja össze a nyelv szórendjével.
 */
import type { Locale } from './ui';

export interface ShowcaseUi {
  home: string;
  breadcrumb: string;
  consultCta: string;
  compareCta: string;
  /** Ár nélküli terméknél. */
  askPrice: string;
  googleReviews: string;
  details: string;
  modelDetails: (name: string) => string;
  whenTitle: string;
  installmentTeaser: (monthly: string, months: number) => string;
  reviewsCta: string;
  readMore: string;
  readLess: string;
  whyBuyCta: string;
  finance: {
    over: (amount: string) => string;
    overOrTwo: (amount: string) => string;
    terms: { 3: string; 6: string; 12: string };
    note12: (amount: string) => string;
    note12OrTwo: (amount: string) => string;
    pickModel: string;
    pickMonths: string;
    months: (n: number) => string;
    /** „Havi részlet, {n} hónapon át”: a szám előtti és utáni rész. */
    monthlyLabel: [string, string];
    downPayment: string;
    total: string;
    interest: string;
  };
  video: {
    pill: (duration: string) => string;
    watch: string;
    play: (who: string) => string;
  };
  trainingAlt: string;
  expertRole: string;
  expertAlt: (name: string) => string;
  faqContact: string;
  visit: {
    address: string;
    hours: string;
    booking: string;
    phone: string;
    /** OPENING_HOURS napnevei (magyarul) → rövid nap ezen a nyelven. */
    days: Record<string, string>;
    closed: string;
    mapLoad: (address: string) => string;
    mapTitle: (address: string) => string;
    mapOpen: string;
    mapCookies: string;
    directions: string;
    showroomAlt: string;
  };
  heroVideo: { pause: string; play: string };
  gallery: { prev: string; next: string; images: (name: string) => string; image: (name: string, n: number) => string };
}

const hu: ShowcaseUi = {
  home: 'Főoldal',
  breadcrumb: 'Morzsamenü',
  consultCta: 'Ingyenes konzultáció',
  compareCta: 'Összehasonlítás',
  askPrice: 'Kérj ajánlatot',
  googleReviews: 'Google-értékelések',
  details: 'Részletek',
  modelDetails: (name) => `${name} részletei`,
  whenTitle: 'Neked való, ha…',
  installmentTeaser: (monthly, months) => `vagy 50% előleg + ${monthly}/hó (${months} hó)`,
  reviewsCta: 'Én is ilyen gépet szeretnék',
  readMore: 'Tovább olvasom',
  readLess: 'Kevesebb',
  whyBuyCta: 'Beszéljük meg a megtérülést',
  finance: {
    over: (amount) => `${amount} felett`,
    overOrTwo: (amount) => `${amount} felett, vagy 2 gép együtt`,
    terms: { 3: '3 hónap', 6: '3 vagy 6 hónap', 12: '3, 6 vagy 12 hónap' },
    note12: (amount) => `A 12 havi részlet ${amount} feletti vásárlásnál elérhető. Pontos ajánlatot a konzultáción adunk.`,
    note12OrTwo: (amount) =>
      `A 12 havi részlet ${amount} felett, vagy két gép együttes vásárlásakor érhető el. Pontos ajánlatot a konzultáción adunk.`,
    pickModel: 'Melyik gép?',
    pickMonths: 'Hány hónap alatt?',
    months: (n) => `${n} hónap`,
    monthlyLabel: ['Havi részlet, ', ' hónapon át'],
    downPayment: 'Előleg (50%)',
    total: 'Összesen',
    interest: 'Kamat',
  },
  video: {
    pill: (duration) => `Videós vélemény · ${duration}`,
    watch: 'Nézd meg a videót',
    play: (who) => `Videó lejátszása: ${who}`,
  },
  trainingAlt: 'Skinlab gépkezelői képzés a bemutatóteremben',
  expertRole: 'Skinlab alapító · technikai szakértő',
  expertAlt: (name) => `${name}, a Skinlab alapítója`,
  faqContact: 'Kérdésed van? Hívj minket.',
  visit: {
    address: 'Cím',
    hours: 'Nyitvatartás',
    booking: 'Bejelentkezés',
    phone: 'Telefon',
    days: { Hétfő: 'H', Kedd: 'K', Szerda: 'Sze', Csütörtök: 'Cs', Péntek: 'P', Szombat: 'Szo', Vasárnap: 'V' },
    closed: 'zárva',
    mapLoad: (address) => `Térkép betöltése: ${address}`,
    mapTitle: (address) => `Térkép: ${address}`,
    mapOpen: 'Térkép megnyitása',
    mapCookies: 'Betöltéskor a Google Térkép sütiket használhat.',
    directions: 'Útvonaltervezés',
    showroomAlt: 'A Skinlab bemutatóterme Érden',
  },
  heroVideo: { pause: 'Videó szüneteltetése', play: 'Videó lejátszása' },
  gallery: {
    prev: 'Előző kép',
    next: 'Következő kép',
    images: (name) => `${name} képei`,
    image: (name, n) => `${name} - ${n}. kép`,
  },
};

const UI: Partial<Record<Locale, ShowcaseUi>> = { hu };

/** A showcase feliratai egy nyelven; hiányzó nyelvnél build-hiba. */
export function showcaseUi(locale: Locale): ShowcaseUi {
  const ui = UI[locale];
  if (!ui) throw new Error(`[showcase] nincs felirat-fordítás ehhez a nyelvhez: ${locale} (src/i18n/showcase.ts)`);
  return ui;
}

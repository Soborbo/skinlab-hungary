/**
 * Diódalézer kategóriaoldal - magyar szöveg (képek, ikonok, adatforrások: ./index.ts).
 *
 * Forrás: a jóváhagyott Claude Design canvas (1tR5gxCsz53ehibuSLPEGD, 2026-10-30).
 * Ár, watt, specifikáció és kép NEM kerülhet ide: azok a termék-JSON-okból jönnek
 * (src/content/products/{athena,olympia,helios,empire}.json).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.hu';

const models: Record<string, ShowcaseModelCopy> = {
  athena: {
    tagline: 'a kontroll és precizitás',
    forWho: 'Kezdő / kiegészítő szolgáltatás',
    desc: 'Okos szoftver, amely bőr- és szőrtípus alapján ajánl beállítást. Stabil, kiszámítható gép annak, aki most indítja vagy egészíti ki a szőrtelenítést.',
    when: [
      'költséghatékony, de profi belépőgépet keresel',
      'a szőrtelenítés kiegészítő szolgáltatás lesz',
      'a kiszámíthatóság fontosabb a tempónál',
    ],
  },
  olympia: {
    tagline: 'a győztes teljesítmény',
    forWho: 'Tempó kontrollal',
    desc: '1200W kimeneti teljesítmény és 5 állítható spotméret: precíz munka kisebb területeken, gyors haladás nagy felületeken.',
    when: [
      'erős gépet keresel reális áron',
      'gyorsabb kezelést akarsz, de kontrollal',
      'sokféle vendéged és testterületed van',
    ],
  },
  helios: {
    tagline: 'a fény valódi ereje',
    forWho: 'Klinika, nagy forgalom',
    desc: 'A legerősebb modellünk: 1600W, mélyebb hatás, rövidebb kezelési idő. Nagy forgalmú szalonoknak és klinikáknak.',
    when: [
      'napi sok szőrtelenítő vendéged van',
      'rövidebb kezelésekkel több időpontot adnál ki',
      'a felső kategóriát keresed',
    ],
  },
  empire: {
    tagline: 'az intelligens rendszer',
    forWho: 'Diagnosztika + vendégkarton',
    desc: 'Mikrokamerás szőr- és bőrdiagnosztika, digitális vendégkarton előtte-utána fotókkal, és a gép ajánlja a paramétereket.',
    when: [
      'dokumentálnád a kezeléseket',
      'vizsgálatra építenéd a paraméterezést',
      'rétegzett impulzusokkal (SHR STACK) dolgoznál',
    ],
  },
};

export const hu: ShowcaseCopy = {
  seo: {
    name: 'Professzionális diódalézerek',
    nameShort: 'Diódalézerek',
    description: 'Professzionális 4 hullámhosszas diódalézerek tartós szőrtelenítéshez.',
  },
  hero: {
    titleLines: ['Diódalézer, ami', 'visszahozza a vendégeket.'],
    lead: 'Tartós szőrtelenítés 4 hullámhosszú technológiával, minden bőr- és szőrtípusra. Segítünk kiválasztani a szalonodhoz illő gépet, betanítunk, és ha kell, megjavítjuk.',
    imageAlt: 'Diódalézeres szőrtelenítés OLYMPIA géppel a szalonban',
  },
  usp: [
    { title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { title: '8 órás helyszíni betanítás', sub: '+ 6 hónap utánkövetés' },
    { title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { title: '0% THM részletfizetés', sub: '50% előleg + havi részletek' },
  ],
  models: {
    title: 'Melyik illik a te szalonodhoz?',
    lead: 'Mind a négy 4 hullámhosszú. A különbség a tempóban, a kezelési módban és abban, hogy mennyit dokumentálsz.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Műszaki összehasonlítás',
    lead: 'Egy pillantás alatt a fő paraméterek',
    labels: ['Ár', 'Teljesítmény', 'Hullámhosszak', 'Spotméret', 'Hűtés', 'Kinek ajánljuk'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Miért éri meg diódalézert venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    imageAlt: 'OLYMPIA diódalézer kezelőfeje kezelés közben',
    items: [
      {
        title: 'Gyors megtérülés',
        text: 'Napi 5 vendéggel, átlag 12 000 Ft/kezelés áron havonta kb. 1,3 M Ft bevétel. A gép 3-4 hónap alatt kitermelheti az árát.',
      },
      {
        title: 'Visszatérő vendégek',
        text: 'A vendégek 6-8 alkalmas kúrát vesznek, aztán évente fenntartó kezelésre járnak.',
      },
      {
        title: 'Hatékonyabb az IPL-nél',
        text: 'Célzottabb, mélyebbre hat, kevesebb alkalom kell. A vendég hamarabb látja az eredményt.',
      },
      {
        title: 'Minden bőrtípusra',
        text: 'A 4 hullámhossz világos és sötét bőrön, vékony és vastag szőrön is hatékony.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Kamatmentes részletfizetés 0% THM mellett: 50% előleg, a fennmaradó összeg 3, 6 vagy 12 havi részletben. Nincs kezelési díj és nincs rejtett költség.',
  },
  training: {
    titleLines: ['Nem egyedül tanulod meg.', 'Mindent megtanítunk neked.'],
    text: '8 órás helyszíni betanítás a saját szalonodban, utána 6 hónap utánkövetés. FAR-tanúsított gépkezelői képzés, hivatalos tanúsítvánnyal.',
    cta: 'Képzéseink',
  },
  consult,
  faq: {
    title: 'Gyakori kérdések',
    lead: 'A leggyakoribb kérdések a diódalézerekről. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Mi a különbség az 1, 3 és 4 hullámhosszú gépeknél?',
        answer: 'Az 1 hullámhossz (808 nm) a klasszikus, világos-közepes bőrre. A 3 hullámhossz már sötétebb bőrt és finomabb szőrt is kezel. A 4 hullámhossz (755 + 808 + 940 + 1064 nm) a legsokoldalúbb, a világos szőrre is hatékonyabb.',
      },
      {
        question: 'Miért fontos a teljesítmény (watt)?',
        answer: 'Nagyobb teljesítmény = gyorsabb kezelés, több vendég naponta. Nagy forgalmú szalonnak 1000W felett ajánljuk.',
      },
      {
        question: 'Fáj a vendégnek a diódalézeres kezelés?',
        answer: 'A zafír bőrhűtés szinte fájdalommentessé teszi, a legtöbb vendég csak enyhe melegséget érez.',
      },
      {
        question: 'Mennyi idő egy kezelés?',
        answer: 'Hónalj 5-10 perc, láb 20-40 perc, teljes test 60-90 perc, a géptől függően.',
      },
    ],
  },
  visit: {
    title: 'Próbáld ki mindet Érden.',
    text: 'Gyere el a bemutatótermünkbe, és élesben kipróbálhatod mind a négy diódalézert, mielőtt döntesz.',
    booking: 'Előzetes időpontfoglalással',
    demoCta: 'Bemutatót kérek',
  },
};

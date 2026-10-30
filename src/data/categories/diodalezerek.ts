/**
 * Diódalézer kategóriaoldal (HU) - szerkesztői szöveg a CategoryShowcaseLayouthoz.
 *
 * Forrás: a jóváhagyott Claude Design canvas (1tR5gxCsz53ehibuSLPEGD, 2026-10-30).
 * Ár, watt, specifikáció és kép NEM kerülhet ide: azok a termék-JSON-okból jönnek
 * (src/content/products/{athena,olympia,helios,empire}.json).
 */
import type { CompareRow, ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseConfig } from '@/lib/types/category-showcase';

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

const compareRows: CompareRow[] = [
  { label: 'Ár', source: { kind: 'price' } },
  { label: 'Teljesítmény', source: { kind: 'spec', keys: ['Teljesítmény'], strip: /\s*\(kimeneti\)/ } },
  { label: 'Hullámhosszak', source: { kind: 'spec', keys: ['Hullámhossz'], strip: /\s*\(4WAVE\)/ } },
  { label: 'Spotméret', source: { kind: 'spec', keys: ['Spotméret', 'Spot méret'] } },
  { label: 'Hűtés', source: { kind: 'spec', keys: ['Hűtési rendszer'] } },
  { label: 'Kinek ajánljuk', source: { kind: 'forWho' } },
];

export const diodalezerekShowcase: ShowcaseConfig = {
  slug: 'diodalezerek',
  seo: {
    name: 'Professzionális diódalézerek',
    nameShort: 'Diódalézerek',
    description: 'Professzionális 4 hullámhosszas diódalézerek tartós szőrtelenítéshez.',
  },
  hero: {
    titleLines: ['Diódalézer, ami', 'visszahozza a vendégeket.'],
    lead: 'Tartós szőrtelenítés 4 hullámhosszú technológiával, minden bőr- és szőrtípusra. Segítünk kiválasztani a szalonodhoz illő gépet, betanítunk, és ha kell, megjavítjuk.',
    image: '@assets/diodalezer-kezeles.jpg',
    imageAlt: 'Diódalézeres szőrtelenítés OLYMPIA géppel a szalonban',
  },
  usp: [
    { icon: 'shield', title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { icon: 'academic', title: '8 órás helyszíni betanítás', sub: '+ 6 hónap utánkövetés' },
    { icon: 'wrench', title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { icon: 'wallet', title: '0% THM részletfizetés', sub: '50% előleg + havi részletek' },
  ],
  models: {
    title: 'Melyik illik a te szalonodhoz?',
    lead: 'Mind a négy 4 hullámhosszú. A különbség a tempóban, a kezelési módban és abban, hogy mennyit dokumentálsz.',
    copy: models,
  },
  reviews: { title: 'Akik már velünk dolgoznak' },
  compare: {
    title: 'Műszaki összehasonlítás',
    lead: 'Egy pillantás alatt a fő paraméterek',
    rows: compareRows,
    help: {
      title: 'Nem tudod eldönteni? Segítünk kiválasztani.',
      text: 'László és Szimonetta, a Skinlab alapítói személyesen tanácsot adnak.',
    },
  },
  whyBuy: {
    title: 'Miért éri meg diódalézert venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    image: '@assets/products/olympia-oktatas-2.jpg',
    imageAlt: 'OLYMPIA diódalézer kezelőfeje kezelés közben',
    items: [
      {
        icon: 'banknote',
        title: 'Gyors megtérülés',
        text: 'Napi 5 vendéggel, átlag 12 000 Ft/kezelés áron havonta kb. 1,3 M Ft bevétel. A gép 3-4 hónap alatt kitermelheti az árát.',
      },
      {
        icon: 'repeat',
        title: 'Visszatérő vendégek',
        text: 'A vendégek 6-8 alkalmas kúrát vesznek, aztán évente fenntartó kezelésre járnak.',
      },
      {
        icon: 'bolt',
        title: 'Hatékonyabb az IPL-nél',
        text: 'Célzottabb, mélyebbre hat, kevesebb alkalom kell. A vendég hamarabb látja az eredményt.',
      },
      {
        icon: 'layers',
        title: 'Minden bőrtípusra',
        text: 'A 4 hullámhossz világos és sötét bőrön, vékony és vastag szőrön is hatékony.',
      },
    ],
  },
  finance: {
    title: 'Nem kell egy összegben kifizetned.',
    lead: 'Kamatmentes részletfizetés 0% THM mellett: 50% előleg, a fennmaradó összeg 3, 6 vagy 12 havi részletben. Nincs kezelési díj és nincs rejtett költség.',
    perks: ['0% THM', 'Nincs kezelési díj', 'Nincs rejtett költség'],
    defaultSlug: 'olympia',
    cta: 'Pontos ajánlatot kérek',
  },
  video: { id: 'adri', posterSrc: '/images/video/zsidai-adri-poster.jpg' },
  training: {
    titleLines: ['Nem egyedül tanulod meg.', 'Mindent megtanítunk neked.'],
    text: '8 órás helyszíni betanítás a saját szalonodban, utána 6 hónap utánkövetés. FAR-tanúsított gépkezelői képzés, hivatalos tanúsítvánnyal.',
    cta: 'Képzéseink',
    href: '/kepzesek',
  },
  consult: {
    title: 'Nem tudod, melyik gép való neked?',
    text: 'Bármelyik is igaz rád, szeretettel segítünk. Hívj minket, vagy kérj ingyenes konzultációt, és felvesszük veled a kapcsolatot.',
    needs: [
      'Nem tudod, melyiket válaszd',
      'Pontos infót kérsz a gépekről',
      'Megbeszélnéd a vásárlás részleteit',
      'Csak egy jó tanácsra van szükséged',
    ],
    note: 'Általában 1 munkanapon belül visszahívunk.',
  },
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

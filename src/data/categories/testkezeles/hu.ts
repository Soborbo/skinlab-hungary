/**
 * Testkezelő kategóriaoldal - magyar szöveg (képek, ikonok, adatforrások: ./index.ts).
 *
 * A régi kategóriaoldalnak nem volt saját tartalma; a szöveg a két termék
 * jóváhagyott termékoldali tartalmából (leírás, GYIK, csomagtartalom) készült.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';

const models: Record<string, ShowcaseModelCopy> = {
  'freeze-me-slim': {
    name: 'FREEZE ME SLIM',
    keySpec: '4 fej egyszerre',
    tagline: 'a zsírfagyasztó',
    forWho: 'Célzott zsírcsökkentés',
    desc: 'Kriolipolízis (zsírfagyasztás) 4 egyszerre használható kezelőfejjel, -10 °C-ig hűtve. A csomagban bioimpedanciás testanalizáló mérleg is van, így a vendég fejlődését számokkal követheted.',
    when: [
      'makacs zsírpárnák kezelését kínálnád',
      'több testterületet kezelnél egyszerre',
      'mérésekkel mutatnád meg az eredményt',
    ],
    compare: {
      tech: 'Kriolipolízis (zsírfagyasztás)',
      area: 'Has, derék, comb, fenék, kar, hát',
    },
  },
  'the-shaper': {
    name: 'THE SHAPER',
    keySpec: '4 technológia',
    tagline: 'a komplett alakformáló',
    forWho: 'Alakformálás, cellulit, feszesítés',
    desc: 'Négy technológia egy gépben: vákuumos görgős masszázs, rádiófrekvencia, 940 nm-es infravörös lézer és 40 kHz-es ultrahangos kavitáció. Arcra és testre is, külön applikátorokkal.',
    when: [
      'cellulitkezelést is kínálnál',
      'arcot és testet is kezelnél egy géppel',
      'több technológiát egy helyen szeretnél',
    ],
    compare: {
      tech: 'Vákuum + görgő, RF, IR lézer, kavitáció',
      area: 'Test és arc',
    },
  },
};

export const hu: ShowcaseCopy = {
  seo: {
    name: 'Test- és alakformáló gépek',
    nameShort: 'Testkezelés',
    description: 'Cryolipolysis, contour shaping és egyéb test- és alakformáló kezelőgépek.',
  },
  hero: {
    titleLines: ['Testkezelő gép, amivel', 'műtét nélkül formálsz.'],
    lead: 'Zsírfagyasztás, alakformálás és cellulitkezelés fájdalom és kieső idő nélkül. Segítünk kiválasztani a szalonodhoz illő gépet, és ha kell, megjavítjuk.',
    imageAlt: 'THE SHAPER testkezelő gép',
  },
  usp: [
    { title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { title: 'Oktatási csomag', sub: 'tananyag és protokollok' },
    { title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { title: '0% THM részletfizetés', sub: '50% előleg + havi részletek' },
  ],
  models: {
    title: 'Melyik illik a te szalonodhoz?',
    lead: 'A FREEZE ME SLIM célzottan a zsírpárnákra dolgozik, a THE SHAPER négy technológiával a teljes alakformálásra.',
    copy: models,
  },
  reviews: { title: 'Akik már velünk dolgoznak' },
  compare: {
    title: 'Összehasonlítás',
    lead: 'Egy pillantás alatt a fő különbségek',
    labels: ['Ár', 'Technológia', 'Kezelőfejek', 'Kezelt terület', 'Kinek ajánljuk'],
    help: {
      title: 'Nem tudod eldönteni? Segítünk kiválasztani.',
      text: 'László és Szimonetta, a Skinlab alapítói személyesen tanácsot adnak.',
    },
  },
  whyBuy: {
    title: 'Miért éri meg testkezelő gépet venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    imageAlt: 'THE SHAPER kezelőfej kézben',
    items: [
      {
        title: 'Több technológia egy géppel',
        text: 'A THE SHAPER vákuumos görgős masszázst, RF-et, infravörös lézert és kavitációt egyesít, így nem kell külön gépeket venned.',
      },
      {
        title: 'Több terület egyszerre',
        text: 'A FREEZE ME SLIM négy kezelőfeje egyszerre dolgozik, így több testterületet kezelhetsz párhuzamosan.',
      },
      {
        title: 'Kúrára járó vendégek',
        text: 'A zsírfagyasztás jellemzően 3, az alakformáló kezelés 6-10 alkalmas kúra, így a vendég visszatér hozzád.',
      },
      {
        title: 'Kész oktatási csomag',
        text: 'Tananyag, kezelési protokollok és vendégedukációs anyagok járnak a géphez, így az első vendégtől szakszerűen dolgozhatsz.',
      },
    ],
  },
  finance: {
    title: 'Nem kell egy összegben kifizetned.',
    lead: 'Kamatmentes részletfizetés 0% THM mellett: 50% előleg, a fennmaradó összeg 3 vagy 6 havi részletben. Nincs kezelési díj és nincs rejtett költség.',
    perks: ['0% THM', 'Nincs kezelési díj', 'Nincs rejtett költség'],
    cta: 'Pontos ajánlatot kérek',
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
    lead: 'A leggyakoribb kérdések a testkezelő gépekről. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Hogyan működik a zsírfagyasztás?',
        answer: 'A FREEZE ME SLIM kontrolláltan, -10 °C-ig hűti a zsírsejteket. A sejtek kristályosodnak, a szervezet pedig természetes úton, fokozatosan lebontja és kiüríti őket. Az eredmény nem azonnali, hetek alatt jelentkezik.',
      },
      {
        question: 'Hány alkalom egy kúra?',
        answer: 'Zsírfagyasztásnál 3 alkalom az ajánlott, havi bontásban. A THE SHAPER-rel jellemzően 6-10 alkalom, a pontos protokoll a kezelt területtől és a vendég állapotától függ.',
      },
      {
        question: 'Milyen testrészeken használható a THE SHAPER?',
        answer: 'Arcon és nyakon feszesítésre, ránccsökkentésre. Testen a hason, derékon, csípőn, fenéken, combon, felkaron és háton alakformálásra, cellulit csökkentésére és bőrfeszesítésre.',
      },
      {
        question: 'Mikor nem ajánlott a zsírfagyasztás?',
        answer: 'Terhesség, hidegallergia és egyes betegségek esetén. Kezelés előtt minden vendéget fel kell mérni, ebben a csomag vendégkartonjai és protokolljai segítenek.',
      },
      {
        question: 'Mi van benne az árban?',
        answer: 'Mindkét géphez jár a teljes oktatási csomag (tananyag, kezelési protokollok, vendégedukációs anyagok) és 2 év garancia, a FREEZE ME SLIM-hez a testanalizáló rendszer is. Élő modelles gyakorlati képzés felár ellenében kérhető.',
      },
    ],
  },
  visit: {
    title: 'Nézd meg személyesen Érden.',
    text: 'Gyere el a bemutatótermünkbe, és megmutatjuk a gépeket. Előtte egyeztessünk időpontot, hogy a választott gép biztosan ott legyen.',
    booking: 'Előzetes időpontfoglalással',
    demoCta: 'Bemutatót kérek',
  },
};

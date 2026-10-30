/**
 * Hydrafacial kategóriaoldal (HU) - szerkesztői szöveg a CategoryShowcaseLayouthoz.
 *
 * A diódás canvas (1tR5gxCsz53ehibuSLPEGD) sablonja szerint. Saját canvas nincs:
 * a szöveg a korábbi kategóriaoldal jóváhagyott tartalmából (előnyök, GYIK,
 * összehasonlítás), a termék-JSON-okból és a hero-videó felirataiból készült.
 * Ár, specifikáció és kép a termék-JSON-okból jön.
 */
import type { CompareRow, ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseConfig } from '@/lib/types/category-showcase';

const models: Record<string, ShowcaseModelCopy> = {
  hydrascanpro: {
    name: 'HydraScan PRO+',
    keySpec: '8+1 kezelőfej',
    tagline: 'az okos bőranalízis',
    forWho: 'AI-elemzés, prémium kabin',
    desc: 'Hydrodermabrázió-központú multikészülék 4K kamerás, mesterséges intelligenciával működő bőranalízissel. Az elemzés alapján kezelést, terméket és otthoni rutint ajánl, a digitális vendégkarton pedig dokumentál.',
    when: [
      'bőranalízissel indítanád a kezelést',
      'termékajánlással is növelnéd a bevételt',
      'dokumentálnád a vendég fejlődését',
    ],
    compare: {
      tech: 'Hydrodermabrázió + AI bőranalízis',
      heads: '8 kezelőfej + LED maszk',
      ai: '4K, három spektrumú kamera (kb. 2 perc)',
    },
  },
  'hidra-mist-elite': {
    name: 'HydraMIST Elite',
    keySpec: '11 az 1-ben',
    tagline: 'a sokoldalú rendszer',
    forWho: 'Sokféle kezelés egy gépből',
    desc: '11 kezelési lehetőség egy készülékben: vákuumos hydradermabrázió, oxigénes hatóanyag-bevitel, rádiófrekvenciás feszesítés és LED-oxigén kupola, amelyben kezelés közben zene is szólhat.',
    when: [
      'sokféle arckezelést adnál egy gépből',
      'oxigénes és RF-kezelést is kínálnál',
      'prémium élményt adnál a vendégnek',
    ],
    compare: {
      tech: 'Hydradermabrázió + oxigén + RF',
      heads: '11 funkció (vákuum, UH, RF, oxigén, LED)',
      ai: 'Nincs',
    },
  },
  hydralume: {
    name: 'HydraLUME V10',
    keySpec: '12 fej + LED',
    tagline: 'az arcápoló központ',
    forWho: 'LED-terápia, fejbőrápolás',
    desc: 'Álló, gurulós arcápoló központ vortex hydrodermabrázióval, öt szárnyas LED-panellel és 12 kezelőfejjel. Mélytisztítás, feszesítés, akne-kezelés és fejbőrápolás egy gépből.',
    when: [
      'komplett fiatalító protokollt építenél',
      'LED-fényterápiát is kínálnál',
      'a fejbőrápolás is a kínálatod része',
    ],
    compare: {
      tech: 'Vortex hydrodermabrázió + LED',
      heads: '12 kezelőfej + 5 szárnyas LED-panel',
      ai: 'Nincs',
    },
  },
};

const compareRows: CompareRow[] = [
  { label: 'Ár', source: { kind: 'price' } },
  { label: 'Technológia', source: { kind: 'copy', key: 'tech' } },
  { label: 'Kezelőfejek', source: { kind: 'copy', key: 'heads' } },
  { label: 'AI bőranalízis', source: { kind: 'copy', key: 'ai' } },
  { label: 'Garancia', source: { kind: 'spec', keys: ['Garancia'] } },
  { label: 'Kinek ajánljuk', source: { kind: 'forWho' } },
];

export const hydrafacialShowcase: ShowcaseConfig = {
  slug: 'hydrafacial',
  seo: {
    name: 'Hidrodermabrázió és multifunkcionális gépek',
    nameShort: 'Hydrafacial gépek',
    description: 'Hidrodermabráziós és kombinált kozmetikai kezelőgépek.',
  },
  hero: {
    titleLines: ['Hydrafacial gép, amitől', 'ragyog a vendég bőre.'],
    lead: 'Mélytisztítás, hidratálás és bőrfiatalítás egy készülékben, látványos eredménnyel már az első kezelés után. Segítünk kiválasztani a szalonodhoz illő gépet, betanítunk, és ha kell, megjavítjuk.',
    image: '@assets/hydrafacial-kezeles.jpg',
    imageAlt: 'HydraScan PRO+ gépkezelői képzés a Skinlab bemutatótermében',
    video: {
      desktop: '/videos/hydrafacial/hydrafacial-kepzes-1280.mp4',
      mobile: '/videos/hydrafacial/hydrafacial-kepzes-720sq.mp4',
      poster: '/videos/hydrafacial/hydrafacial-kepzes-poster',
      posterMobile: '/videos/hydrafacial/hydrafacial-kepzes-poster-sq',
      posterSize: { width: 1280, height: 720 },
    },
  },
  usp: [
    { icon: 'shield', title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { icon: 'academic', title: 'Egyéni gépkezelői képzés', sub: 'a bemutatótermünkben' },
    { icon: 'wrench', title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { icon: 'wallet', title: '0% THM részletfizetés', sub: '50% előleg + havi részletek' },
  ],
  models: {
    title: 'Melyik illik a te szalonodhoz?',
    lead: 'Mindhárom hydrodermabrázióra épül. A különbség a kezelőfejek számában, a kiegészítő technológiákban és abban, hogy kell-e bőranalízis.',
    copy: models,
  },
  reviews: { title: 'Akik már velünk dolgoznak' },
  compare: {
    title: 'Műszaki összehasonlítás',
    lead: 'Egy pillantás alatt a fő különbségek',
    rows: compareRows,
    help: {
      title: 'Nem tudod eldönteni? Segítünk kiválasztani.',
      text: 'László és Szimonetta, a Skinlab alapítói személyesen tanácsot adnak.',
    },
  },
  whyBuy: {
    title: 'Miért éri meg hydrafacial gépet venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    image: '@assets/hydrafacial-kezeles.jpg',
    imageAlt: 'Hidrodermabráziós arckezelés egy Skinlab készülékkel a szalonban',
    items: [
      {
        icon: 'sparkles',
        title: 'Azonnali eredmény',
        text: 'Már az első kezelés után látványosan szebb, ragyogóbb a bőr. A vendég azonnal érzi a különbséget.',
      },
      {
        icon: 'layers',
        title: 'Sokoldalú kezelések',
        text: 'Tisztítás, hidratálás, anti-aging és pigmentfolt-kezelés egy géppel.',
      },
      {
        icon: 'banknote',
        title: 'Jól árazható kezelés',
        text: 'Hydrafacial kezelésért 15-30 000 Ft-ot is elkérhetnek a szalonok, így a gép gyorsan megtérülhet.',
      },
      {
        icon: 'scan',
        title: 'Bőranalízis a vendég előtt',
        text: 'A HydraScan PRO+ 4K kamerája megmutatja a bőr állapotát, és ez alapján ajánl kezelést és otthoni rutint.',
      },
    ],
  },
  finance: {
    title: 'Nem kell egy összegben kifizetned.',
    lead: 'Kamatmentes részletfizetés 0% THM mellett: 50% előleg, a fennmaradó összeg 3 vagy 6 havi részletben. Nincs kezelési díj és nincs rejtett költség.',
    perks: ['0% THM', 'Nincs kezelési díj', 'Nincs rejtett költség'],
    defaultSlug: 'hydralume',
    cta: 'Pontos ajánlatot kérek',
  },
  video: { id: 'adri', posterSrc: '/images/video/zsidai-adri-poster.jpg' },
  training: {
    titleLines: ['Nem egyedül tanulod meg.', 'Mindent megtanítunk neked.'],
    text: 'Egyéni gépkezelői képzés a bemutatótermünkben: átadjuk a saját, bevált technikánkat, és a képzés után is számíthatsz a szakmai támogatásunkra.',
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
    lead: 'A leggyakoribb kérdések a hydrafacial kezelésről. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Mi a különbség a hagyományos arctisztítás és a hydrafacial között?',
        answer: 'A hydrafacial vákuumos technológiával dolgozik, ami a mélytisztítás mellett szérum-infúziót is biztosít. Fájdalommentes, nincs kipirulás, a vendég azonnal mehet tovább. A hagyományos tisztítás után sokszor napokig piros az arc.',
      },
      {
        question: 'Milyen gyakran lehet hydrafacial kezelést végezni?',
        answer: 'Általában 4-6 hetente ajánlott a fenntartó kezelés. Kúraszerűen hetente is végezhető a bőrállapot javítására. Nagyon kíméletes eljárás.',
      },
      {
        question: 'Minden bőrtípusra alkalmas?',
        answer: 'Igen. A hydrafacial az egyik legkíméletesebb arckezelés, érzékeny bőrre, rozáceára is alkalmazható. Egyedül aktív gyulladásos aknénál nem javasolt.',
      },
    ],
  },
  visit: {
    title: 'Próbáld ki élőben Érden.',
    text: 'Gyere el a bemutatótermünkbe, és nézd meg élőben a gépeket, mielőtt döntesz.',
    booking: 'Előzetes időpontfoglalással',
    demoCta: 'Bemutatót kérek',
  },
};

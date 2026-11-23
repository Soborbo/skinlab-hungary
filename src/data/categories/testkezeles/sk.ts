/**
 * Kategória zariadení na telo - slovenský text (preklad ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.sk';

const models: Record<string, ShowcaseModelCopy> = {
  'freeze-me-slim': {
    name: 'FREEZE ME SLIM',
    keySpec: '4 hlavice naraz',
    tagline: 'zariadenie na kryolipolýzu',
    forWho: 'Cielená redukcia tuku',
    desc: 'Kryolipolýza (zmrazovanie tuku) so 4 súčasne použiteľnými hlavicami, chladenie až na -10 °C. V balení je aj bioimpedančná analyzačná váha, takže pokrok klientky môžeš sledovať v číslach.',
    when: [
      'chceš ponúkať ošetrenie odolných tukových vankúšikov',
      'chceš ošetrovať viac partií tela naraz',
      'chceš výsledok ukázať meraním',
    ],
    compare: {
      tech: 'Kryolipolýza (zmrazovanie tuku)',
      area: 'Brucho, pás, stehná, zadok, ruky, chrbát',
    },
  },
  'the-shaper': {
    name: 'THE SHAPER',
    keySpec: '4 technológie',
    tagline: 'kompletné tvarovanie postavy',
    forWho: 'Tvarovanie postavy, celulitída, spevnenie',
    desc: 'Štyri technológie v jednom zariadení: vákuová valčeková masáž, rádiofrekvencia, infračervený laser 940 nm a ultrazvuková kavitácia 40 kHz. Na tvár aj telo, so samostatnými aplikátormi.',
    when: [
      'chceš ponúkať aj ošetrenie celulitídy',
      'chceš ošetrovať tvár aj telo jedným zariadením',
      'chceš viac technológií na jednom mieste',
    ],
    compare: {
      tech: 'Vákuum + valčeky, RF, IR laser, kavitácia',
      area: 'Telo a tvár',
    },
  },
};

export const sk: ShowcaseCopy = {
  seo: {
    name: 'Zariadenia na tvarovanie tela a postavy',
    nameShort: 'Ošetrenie tela',
    description: 'Kryolipolýza, tvarovanie kontúr a ďalšie zariadenia na tvarovanie tela a postavy.',
  },
  hero: {
    titleLines: ['Zariadenie na telo, ktorým', 'tvaruješ bez operácie.'],
    lead: 'Zmrazovanie tuku, tvarovanie postavy a ošetrenie celulitídy bez bolesti a bez rekonvalescencie. Pomôžeme ti vybrať zariadenie, ktoré sa hodí do tvojho salónu, a keď treba, opravíme ho.',
    imageAlt: 'Zariadenie na ošetrenie tela THE SHAPER',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každé nové zariadenie' },
    { title: 'Školiaci balík', sub: 'študijné materiály a protokoly' },
    { title: 'Vlastný servis v Maďarsku', sub: 'rýchla oprava v Érde' },
    { title: 'Splátky s 0 % RPMN', sub: '50 % záloha + mesačné splátky' },
  ],
  models: {
    title: 'Ktoré sa hodí do tvojho salónu?',
    lead: 'FREEZE ME SLIM cieli na tukové vankúšiky, THE SHAPER so štyrmi technológiami na kompletné tvarovanie postavy.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Porovnanie',
    lead: 'Hlavné rozdiely na prvý pohľad',
    labels: ['Cena', 'Technológia', 'Hlavice', 'Ošetrovaná oblasť', 'Pre koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Prečo sa oplatí kúpiť zariadenie na telo?',
    lead: 'Čo je dobré si pred kúpou premyslieť.',
    imageAlt: 'Hlavica THE SHAPER v ruke',
    items: [
      {
        title: 'Viac technológií v jednom zariadení',
        text: 'THE SHAPER spája vákuovú valčekovú masáž, RF, infračervený laser a kavitáciu, takže nemusíš kupovať samostatné zariadenia.',
      },
      {
        title: 'Viac partií naraz',
        text: 'Štyri hlavice FREEZE ME SLIM pracujú súčasne, takže môžeš ošetrovať viac partií tela paralelne.',
      },
      {
        title: 'Klientky, ktoré chodia na kúru',
        text: 'Zmrazovanie tuku je zvyčajne kúra s 3 sedeniami, tvarovanie postavy so 6-10 sedeniami, takže sa klientka k tebe vracia.',
      },
      {
        title: 'Hotový školiaci balík',
        text: 'K zariadeniu patria študijné materiály, protokoly ošetrení a edukačné materiály pre klientky, takže od prvej klientky pracuješ odborne.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0 % RPMN: 50 % záloha, zvyšok v 3 alebo 6 mesačných splátkach. Žiadny poplatok za vybavenie a žiadne skryté náklady.',
  },
  consult,
  faq: {
    title: 'Časté otázky',
    lead: 'Najčastejšie otázky o zariadeniach na telo. Ak nenájdeš odpoveď, opýtaj sa nás priamo.',
    items: [
      {
        question: 'Ako funguje zmrazovanie tuku?',
        answer: 'FREEZE ME SLIM kontrolovane ochladzuje tukové bunky až na -10 °C. Bunky kryštalizujú a telo ich prirodzenou cestou postupne odbúra a vylúči. Výsledok nie je okamžitý, prejaví sa v priebehu týždňov.',
      },
      {
        question: 'Koľko sedení má kúra?',
        answer: 'Pri zmrazovaní tuku sa odporúčajú 3 sedenia s mesačným odstupom. S THE SHAPER zvyčajne 6-10 sedení, presný protokol závisí od ošetrovanej oblasti a stavu klientky.',
      },
      {
        question: 'Na ktorých častiach tela sa dá THE SHAPER použiť?',
        answer: 'Na tvári a krku na spevnenie a redukciu vrások. Na tele na bruchu, páse, bokoch, zadku, stehnách, ramenách a chrbte na tvarovanie postavy, redukciu celulitídy a spevnenie pokožky.',
      },
      {
        question: 'Kedy sa zmrazovanie tuku neodporúča?',
        answer: 'V tehotenstve, pri alergii na chlad a pri niektorých ochoreniach. Pred ošetrením treba každú klientku posúdiť, s tým pomáhajú karty klientok a protokoly z balíka.',
      },
      {
        question: 'Čo je v cene?',
        answer: 'K obom zariadeniam patrí kompletný školiaci balík (študijné materiály, protokoly ošetrení, edukačné materiály pre klientky) a 2 roky záruka, k FREEZE ME SLIM navyše systém analýzy tela. Praktické školenie so živými modelmi je možné za príplatok.',
      },
    ],
  },
  visit,
};

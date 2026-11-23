/**
 * Kategória ND:YAG laserov - Slovak copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.sk';

const models: Record<string, ShowcaseModelCopy> = {
  pixelcarbonlezer: {
    name: 'PIXEL',
    keySpec: '4 hlavice · 1200 mJ',
    tagline: 'kompaktný carbon laser',
    forWho: 'Kompaktný začiatok, carbon peeling',
    desc: 'Stolový Q-switched ND:YAG laser so 4 ošetrovacími hlavicami (532, 755, 1064 a 1320 nm): carbon peeling, zlepšenie vzhľadu pleti, zosvetlenie pigmentu a tetovania v jednom systéme. Uzavreté vodné chladenie, 4,3" dotykový displej, zmestí sa aj na malé miesto.',
    when: [
      'chceš rozšíriť ponuku o carbon peeling',
      'máš v ošetrovni málo miesta',
      'chceš začať s menšou investíciou',
    ],
    compare: {
      waves: '532 + 755 + 1064 + 1320 nm (4 hlavice)',
      screen: '4,3" dotykový displej',
      cooling: 'Uzavretý systém vodného chladenia',
    },
  },
  frame: {
    name: 'FRAME',
    keySpec: '4 vlnové dĺžky',
    tagline: 'inteligentný laser s Androidom',
    forWho: 'Tetovania, pigmentové škvrny, carbon',
    desc: 'ND:YAG laser s Androidom, 13,3" dotykovým displejom, 4 vlnovými dĺžkami a zabudovaným chladením hlavice. Na odstraňovanie tetovaní a pigmentových škvŕn aj na carbon peeling.',
    when: [
      'chceš ponúkať aj odstraňovanie tetovaní',
      'chceš pracovať s viacerými farbami',
      'chceš veľké a prehľadné ovládacie rozhranie',
    ],
    compare: {
      waves: '4 vlnové dĺžky',
      screen: '13,3" dotykový displej s Androidom',
      cooling: 'Zabudované chladenie hlavice',
    },
  },
};

export const sk: ShowcaseCopy = {
  seo: {
    name: 'Q-switched ND:YAG laserové zariadenia',
    nameShort: 'ND:YAG lasery',
    description: 'Lasery na odstraňovanie tetovaní a pigmentových škvŕn.',
  },
  hero: {
    titleLines: ['ND:YAG laser, s ktorým', 'zmizne aj tetovanie.'],
    lead: 'Odstraňovanie tetovaní a pigmentových škvŕn a carbon peeling technológiou Q-switched. Pomôžeme ti vybrať zariadenie, ktoré sa hodí do tvojho salónu, zaškolíme ťa, a keď treba, opravíme ho.',
    imageAlt: 'Ošetrenie carbon peelingom laserom PIXEL ND:YAG, s ochrannými okuliarmi',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každé nové zariadenie' },
    { title: 'Školenie s certifikáciou FAR', sub: 'v malej skupine, s modelkou' },
    { title: 'Vlastný servis v Maďarsku', sub: 'rýchla oprava v Érde' },
    { title: 'Splátky s 0 % RPMN', sub: '50 % záloha + mesačné splátky' },
  ],
  models: {
    title: 'Ktoré sa hodí do tvojho salónu?',
    lead: 'Obe sú Q-switched ND:YAG lasery. Líšia sa počtom vlnových dĺžok, ovládacím rozhraním a chladením.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technické porovnanie',
    lead: 'Hlavné rozdiely na prvý pohľad',
    labels: ['Cena', 'Vlnové dĺžky', 'Displej', 'Chladenie hlavice', 'Pre koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Prečo sa oplatí kúpiť ND:YAG laser?',
    lead: 'Čo je dobré si pred kúpou premyslieť.',
    imageAlt: 'Laserové zariadenie PIXEL ND:YAG v showroome',
    items: [
      {
        title: 'Zvládne aj ťažké farby',
        text: 'Q-switched ND:YAG laser ošetrí aj zelené a modré tetovanie, ktoré sa odstraňuje ťažšie.',
      },
      {
        title: 'Carbon peeling',
        text: 'Známy aj ako Hollywood peeling: okamžitá žiarivosť, menšie póry, vyrovnanejšia mastná pleť.',
      },
      {
        title: 'Ošetrenie pigmentových škvŕn',
        text: 'Zosvetlenie slnečných a stareckých škvŕn aj permanentného make-upu, pri správnej voľbe vlnovej dĺžky.',
      },
      {
        title: 'Vysoká marža',
        text: 'Salóny si za odstránenie tetovania môžu účtovať 15-50 000 Ft za sedenie a za carbon peeling 8-15 000 Ft.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0 % RPMN: 50 % záloha, zvyšok v 3 alebo 6 mesačných splátkach. Žiadny poplatok za vybavenie a žiadne skryté náklady.',
  },
  training: {
    titleLines: ['Nebudeš sa to učiť sama.', 'Všetko ťa naučíme.'],
    text: 'Školenie obsluhy Q-switched ND:YAG lasera pre najviac 4 osoby: správna voľba vlnových dĺžok a parametrov, carbon peeling, odstraňovanie permanentného make-upu a pigmentových škvŕn, s praxou na modelke. Získaš certifikát registrovaný vo FAR s číslom B.',
    cta: 'Podrobnosti o školení',
  },
  consult,
  faq: {
    title: 'Časté otázky',
    lead: 'Najčastejšie otázky o ND:YAG laseroch. Ak nenájdeš odpoveď, opýtaj sa nás priamo.',
    items: [
      {
        question: 'Ktoré zariadenie si mám vybrať?',
        answer: 'PIXEL je kompaktné stolové zariadenie na začiatok so 4 ošetrovacími hlavicami (532, 755, 1064 a 1320 nm): carbon peeling, zlepšenie vzhľadu pleti, zosvetlenie pigmentu a tetovania v jednom systéme. FRAME so 4 vlnovými dĺžkami, dotykovým displejom s Androidom a zabudovaným chladením hlavice zvládne ošetrenie tetovaní, pigmentových škvŕn aj carbon peeling.',
      },
      {
        question: 'Koľko sedení treba na úplné odstránenie tetovania?',
        answer: 'Závisí to od veľkosti, farby a veku tetovania. V priemere treba 6-12 ošetrení s odstupom 6-8 týždňov. Čierna a tmavé farby miznú rýchlejšie.',
      },
      {
        question: 'Je odstraňovanie tetovania bolestivé?',
        answer: 'So správnym chladením je nepríjemnosť mierna. Mnohí ju prirovnávajú k samotnému tetovaniu: nepríjemné, ale znesiteľné. Dá sa použiť aj znecitlivujúci krém.',
      },
      {
        question: 'Čo je carbon peeling a pre koho je vhodný?',
        answer: 'Pri carbon peelingu nanesieš na tvár uhlíkovú masku a odstrániš ju laserom. Odporúča sa pre mastnú pleť so sklonom k akné a rozšírené póry. Výsledok je viditeľný okamžite, bez doby rekonvalescencie.',
      },
    ],
  },
  visit,
};

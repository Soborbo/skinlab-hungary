/**
 * Kategorie ND:YAG laserů - Czech copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.cs';

const models: Record<string, ShowcaseModelCopy> = {
  pixelcarbonlezer: {
    name: 'PIXEL',
    keySpec: '4 hlavice · 1200 mJ',
    tagline: 'kompaktní carbon laser',
    forWho: 'Kompaktní začátek, carbon peeling',
    desc: 'Stolní Q-switched ND:YAG laser se 4 ošetřovacími hlavicemi (532, 755, 1064 a 1320 nm): carbon peeling, zlepšení vzhledu pleti, zesvětlení pigmentu a tetování v jednom systému. Uzavřené vodní chlazení, 4,3" dotykový displej, vejde se i na malé místo.',
    when: [
      'chceš rozšířit nabídku o carbon peeling',
      'máš v ošetřovně málo místa',
      'chceš začít s menší investicí',
    ],
    compare: {
      waves: '532 + 755 + 1064 + 1320 nm (4 hlavice)',
      screen: '4,3" dotykový displej',
      cooling: 'Uzavřený systém vodního chlazení',
    },
  },
  frame: {
    name: 'FRAME',
    keySpec: '4 vlnové délky',
    tagline: 'chytrý laser s Androidem',
    forWho: 'Tetování, pigmentové skvrny, carbon',
    desc: 'ND:YAG laser s Androidem, 13,3" dotykovým displejem, 4 vlnovými délkami a vestavěným chlazením hlavice. Na odstraňování tetování a pigmentových skvrn i na carbon peeling.',
    when: [
      'chceš nabízet i odstraňování tetování',
      'chceš pracovat s více barvami',
      'chceš velké a přehledné ovládací rozhraní',
    ],
    compare: {
      waves: '4 vlnové délky',
      screen: '13,3" dotykový displej s Androidem',
      cooling: 'Vestavěné chlazení hlavice',
    },
  },
};

export const cs: ShowcaseCopy = {
  seo: {
    name: 'Q-switched ND:YAG laserové přístroje',
    nameShort: 'ND:YAG lasery',
    description: 'Lasery na odstraňování tetování a pigmentových skvrn.',
  },
  hero: {
    titleLines: ['ND:YAG laser, se kterým', 'zmizí i tetování.'],
    lead: 'Odstraňování tetování a pigmentových skvrn a carbon peeling technologií Q-switched. Pomůžeme ti vybrat přístroj, který se hodí do tvého salonu, zaškolíme tě, a když je potřeba, opravíme ho.',
    imageAlt: 'Ošetření carbon peelingem laserem PIXEL ND:YAG, s ochrannými brýlemi',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každý nový přístroj' },
    { title: 'Školení s certifikací FAR', sub: 'v malé skupině, s modelkou' },
    { title: 'Vlastní servis v Maďarsku', sub: 'rychlá oprava v Érdu' },
    { title: 'Splátky s 0% RPSN', sub: '50% záloha + měsíční splátky' },
  ],
  models: {
    title: 'Který se hodí do tvého salonu?',
    lead: 'Oba jsou Q-switched ND:YAG lasery. Liší se počtem vlnových délek, ovládacím rozhraním a chlazením.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technické srovnání',
    lead: 'Hlavní rozdíly na první pohled',
    labels: ['Cena', 'Vlnové délky', 'Displej', 'Chlazení hlavice', 'Pro koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Proč koupit ND:YAG laser?',
    lead: 'Co je dobré si před nákupem promyslet.',
    imageAlt: 'Laserový přístroj PIXEL ND:YAG v showroomu',
    items: [
      {
        title: 'Zvládne i obtížné barvy',
        text: 'Q-switched ND:YAG laser ošetří i zelené a modré tetování, které se odstraňuje hůře.',
      },
      {
        title: 'Carbon peeling',
        text: 'Známý také jako Hollywood peeling: okamžitá zářivost, menší póry, vyrovnanější mastná pleť.',
      },
      {
        title: 'Ošetření pigmentových skvrn',
        text: 'Zesvětlení slunečních a stařeckých skvrn i permanentního make-upu, při správné volbě vlnové délky.',
      },
      {
        title: 'Vysoká marže',
        text: 'Salony si za odstranění tetování mohou účtovat 15-50 000 Ft za sezení a za carbon peeling 8-15 000 Ft.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0% RPSN: 50% záloha, zbytek ve 3 nebo 6 měsíčních splátkách. Žádný poplatek za vyřízení a žádné skryté náklady.',
  },
  training: {
    titleLines: ['Nebudeš se to učit sama.', 'Všechno tě naučíme.'],
    text: 'Školení obsluhy Q-switched ND:YAG laseru pro nejvýše 4 osoby: správná volba vlnových délek a parametrů, carbon peeling, odstraňování permanentního make-upu a pigmentových skvrn, s praxí na modelce. Získáš certifikát registrovaný ve FAR s číslem B.',
    cta: 'Podrobnosti o školení',
  },
  consult,
  faq: {
    title: 'Časté otázky',
    lead: 'Nejčastější otázky o ND:YAG laserech. Pokud nenajdeš odpověď, zeptej se nás přímo.',
    items: [
      {
        question: 'Který přístroj si mám vybrat?',
        answer: 'PIXEL je kompaktní stolní přístroj pro začátek se 4 ošetřovacími hlavicemi (532, 755, 1064 a 1320 nm): carbon peeling, zlepšení vzhledu pleti, zesvětlení pigmentu a tetování v jednom systému. FRAME se 4 vlnovými délkami, dotykovým displejem s Androidem a vestavěným chlazením hlavice zvládne ošetření tetování, pigmentových skvrn i carbon peeling.',
      },
      {
        question: 'Kolik sezení je potřeba k úplnému odstranění tetování?',
        answer: 'Záleží na velikosti, barvě a stáří tetování. V průměru je potřeba 6-12 ošetření s odstupem 6-8 týdnů. Černá a tmavé barvy mizí rychleji.',
      },
      {
        question: 'Je odstraňování tetování bolestivé?',
        answer: 'Se správným chlazením je nepříjemnost mírná. Mnozí ji přirovnávají k tetování samotnému: nepříjemné, ale snesitelné. Lze použít i znecitlivující krém.',
      },
      {
        question: 'Co je carbon peeling a pro koho je vhodný?',
        answer: 'Při carbon peelingu naneseš na obličej uhlíkovou masku a odstraníš ji laserem. Doporučuje se pro mastnou pleť se sklonem k akné a rozšířené póry. Výsledek je vidět okamžitě, bez doby rekonvalescence.',
      },
    ],
  },
  visit,
};

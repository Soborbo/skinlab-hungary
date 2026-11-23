/**
 * Kategorie PMU přístrojů - český text (překlad ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, reviews } from '../common.cs';

const models: Record<string, ShowcaseModelCopy> = {
  'mast-nano-2': {
    name: 'MAST Nano 2',
    keySpec: '66 g',
    tagline: 'lehký jako pírko',
    forWho: 'Oční linky, precizní práce',
    desc: 'PMU přístroj s hmotností pouhých 66 gramů, coreless motorem a pevným zdvihem 2,7 mm. Tichý, téměř nevibruje a díky malé velikosti je obzvlášť vhodný na oční linky.',
    when: [
      'hodně pracuješ na víčkách',
      'hledáš nejlehčí přístroj',
      'chceš se učit s pevným zdvihem',
    ],
    compare: {
      stroke: '2,7 mm (pevný)',
      motor: 'Coreless, 10 000 ot./min',
      weight: '66 g',
    },
  },
  'mast-p60-premium-sminktetovalo-gep-allithato-lokethosszal': {
    name: 'MAST P60',
    keySpec: 'nastavitelný zdvih',
    tagline: 'všestranný',
    forWho: 'Každodenní PMU práce',
    desc: 'Bezdrátový PMU přístroj se zdvihem nastavitelným v 5 stupních (2,2-3,2 mm), takže si ho nastavíš na všechno od chloupkové metody obočí po stínování. 121 g, více než 3 hodiny provozu.',
    when: [
      'děláš obočí, rty i oční linky',
      'chceš nastavovat zdvih podle techniky',
      'chceš pracovat bez kabelu',
    ],
    compare: {
      stroke: '5 stupňů (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 ot./min',
      weight: '121 g',
    },
  },
  'mast-p60-sminktetovalo-gep': {
    name: 'MAST P60 sada',
    keySpec: '+ náhradní baterie',
    tagline: 'bez přerušení',
    forWho: 'Profi studio, dlouhý pracovní den',
    desc: 'Stejný přístroj MAST P60 s nastavitelným zdvihem, v balení s náhradní baterií. Zatímco se jedna baterie nabíjí, s druhou pracuješ dál.',
    when: [
      'máš několik klientek za sebou',
      'nechceš čekat na nabití',
      'chceš začít s kompletním balením',
    ],
    compare: {
      stroke: '5 stupňů (2,2-3,2 mm)',
      motor: 'Coreless, 11 000 ot./min',
      weight: '121 g',
    },
  },
  'faviamo-flare': {
    name: 'Faviamo Flare',
    keySpec: 'zdvih 4,2 mm',
    tagline: 'luxusní tetovací strojek',
    forWho: 'Linky, barvení, stínování',
    desc: 'Bezdrátový tetovací strojek s bezkartáčovým motorem Mcore-Pro a zdvihem 4,2 mm. 182 g, 4-5 hodin provozu, 3 režimy intenzity, v provedení růžové zlato s krystaly.',
    when: [
      'chceš i tetovat, nejen dělat PMU',
      'potřebuješ silnější zdvih',
      'chceš, aby byl přístroj ozdobou tvého pracoviště',
    ],
    compare: {
      stroke: '4,2 mm',
      motor: 'Mcore-Pro bezkartáčový',
      weight: '182 g',
    },
  },
};

export const cs: ShowcaseCopy = {
  seo: {
    name: 'PMU přístroje a přístroje na permanentní make-up',
    nameShort: 'PMU přístroje',
    description: 'Kabelové a bezdrátové přístroje na permanentní make-up, tetovací strojky a příslušenství.',
  },
  hero: {
    titleLines: ['PMU přístroj,', 'který se přizpůsobí tvé ruce.'],
    lead: 'Lehké, tiché přístroje na obočí, rty a oční linky. Pomůžeme ti vybrat ten pravý, a když je potřeba, opravíme ho.',
    imageAlt: 'Permanentní make-up přístrojem MAST v salonu',
  },
  usp: [
    { title: 'Záruka 1 rok', sub: 'na každý přístroj' },
    { title: 'Vlastní servis v Maďarsku', sub: 'rychlá oprava v Érdu' },
    { title: 'Univerzální jehlové moduly', sub: 's jehlami většiny výrobců' },
    { title: 'Osobní poradenství', sub: 'od zakladatelů' },
  ],
  models: {
    title: 'Který se hodí do tvé ruky?',
    lead: 'Tři PMU přístroje a jeden tetovací strojek. Liší se hmotností, délkou zdvihu a motorem.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technické srovnání',
    lead: 'Hlavní rozdíly na první pohled',
    labels: ['Cena', 'Délka zdvihu', 'Motor', 'Hmotnost', 'Pro koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Na co se při výběru přístroje zaměřit?',
    lead: 'Co je dobré si před nákupem promyslet.',
    imageAlt: 'Tetovací strojek Faviamo Flare na stojanu',
    items: [
      {
        title: 'Precizní linie',
        text: 'Při minimálních vibracích bude rovnoměrný microblading, pudrové obočí i pigmentace rtů.',
      },
      {
        title: 'Práce bez kabelu',
        text: 'MAST P60 a Faviamo Flare běží na baterii, takže nepřekáží žádný kabel. K sadě MAST P60 patří i náhradní baterie.',
      },
      {
        title: 'Univerzální jehlové moduly',
        text: 'Přístroje fungují s univerzálním cartridge systémem a jsou kompatibilní s jehlovými moduly většiny výrobců.',
      },
      {
        title: 'Profi přístroj za vstupní cenu',
        text: 'Ani jako začátečnice nemusíš investovat velkou částku a své vybavení můžeš kdykoli později rozšířit.',
      },
    ],
  },
  consult: {
    ...consult,
    needs: [
      'Nevíš, který si vybrat',
      'Chceš přesné informace o přístrojích',
      'Máš dotaz k jehlovým modulům',
      'Potřebuješ jen dobrou radu',
    ],
  },
  faq: {
    title: 'Časté dotazy',
    lead: 'Nejčastější dotazy k PMU přístrojům. Pokud nenajdeš odpověď, zeptej se nás přímo.',
    items: [
      {
        question: 'Jak dlouho vydrží na jedno nabití?',
        answer: 'MAST P60 více než 3 hodiny, Faviamo Flare 4-5 hodin. K sadě MAST P60 patří náhradní baterie, takže zatímco se jedna nabíjí, s druhou můžeš pracovat dál.',
      },
      {
        question: 'Který přístroj si mám vybrat jako začátečnice?',
        answer: 'Jako začátečnice je dobré zvolit snadno ovladatelný, spolehlivý přístroj. Pevný zdvih MAST Nano 2 usnadňuje učení, nastavitelný zdvih MAST P60 se pak vyvíjí spolu s tvou technikou.',
      },
      {
        question: 'Jaký je rozdíl mezi MAST P60 a sadou MAST P60?',
        answer: 'Přístroj je stejný: zdvih nastavitelný v 5 stupních, 121 g. Sada je v barvě Tiffany a patří k ní náhradní baterie, takže ani během dlouhého pracovního dne nemusíš čekat na nabití.',
      },
      {
        question: 'Jaké jehlové moduly můžu používat?',
        answer: 'Přístroje MAST fungují s univerzálním cartridge systémem a jsou kompatibilní s jehlovými moduly většiny výrobců. Pro bezpečnou práci doporučujeme kvalitní, sterilní jehlové moduly na jedno použití.',
      },
    ],
  },
  visit: {
    title: 'Vezmi si ho do ruky v Érdu.',
    text: 'Přijď do našeho showroomu a přístroje si můžeš vzít do ruky dřív, než se rozhodneš. Předem si domluv termín.',
    booking: 'Po předchozí rezervaci termínu',
    demoCta: 'Chci ukázku',
  },
};

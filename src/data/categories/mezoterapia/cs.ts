/**
 * Stránka kategorie mezoterapie (jeden produkt) - český text (překlad ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, reviews, visitSingle } from '../common.cs';

const models: Record<string, ShowcaseModelCopy> = {
  dermatechplus_noneedle_mesotherapy: {
    name: 'DermaTECH+',
    keySpec: 'bez jehel, do 800 kDa',
    tagline: 'bezjehlová mezoterapie',
    forWho: 'Aplikace účinných látek, celý rok',
    desc: 'Bezjehlový mezoterapeutický přístroj s technologií DermoPenetrate Max: mikroproudové impulzy a precizní vibrace dopraví účinnou látku do pokožky, až do velikosti molekuly 800 kDa, bez vpichů, elektrolýzy a změny pH.',
    when: [
      'chceš nabízet bezbolestnou aplikaci účinných látek',
      'chceš dělat mezoterapii i v létě',
      'chceš používat vlastní séra a ampule',
    ],
  },
};

export const cs: ShowcaseCopy = {
  seo: {
    name: 'Mezoterapeutická zařízení',
    nameShort: 'Mezoterapie',
    description: 'Bezjehlové a klasické mezoterapeutické systémy pro aplikaci účinných látek.',
  },
  hero: {
    titleLines: ['Mezoterapie bez jehel,', 'bez bolesti.'],
    lead: 'Hluboká aplikace účinných látek bez vpichů a bez rekonvalescence, pro všechny typy pleti, v kterémkoli ročním období. Zaškolíme tě, a když je potřeba, přístroj opravíme.',
    imageAlt: 'Bezjehlová mezoterapeutická hlavice DermaTECH+ v ruce',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každý nový přístroj' },
    { title: 'Vlastní servis v Maďarsku', sub: 'rychlá oprava v Érdu' },
    { title: 'Kompletní školení v ceně', sub: 'zaškolíme tě na přístroj' },
    { title: 'Osobní poradenství', sub: 'od zakladatelů' },
  ],
  models: {
    title: 'Seznam se s DermaTECH+',
    lead: 'Aplikace účinných látek na molekulární úrovni, přirozenými vodními kanály pokožky.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Proč se vyplatí koupit bezjehlový mezoterapeutický přístroj?',
    lead: 'Co je dobré si před nákupem promyslet.',
    imageAlt: 'Bezjehlový mezoterapeutický přístroj DermaTECH+',
    items: [
      {
        title: 'Bezbolestné ošetření',
        text: 'Žádné vpichy, mikroporanění ani krvácení, klientka může po ošetření hned pokračovat ve dni.',
      },
      {
        title: 'Použitelné celý rok',
        text: 'Protože se pokožka neporaní, nestane se citlivou na světlo, takže s ním můžeš ošetřovat i v létě při silném slunci.',
      },
      {
        title: 'I větší molekuly',
        text: 'Dopraví účinné látky až do 800 kDa: kyselinu hyaluronovou, peptidy, růstové faktory.',
      },
      {
        title: 'Dobře nacenitelné ošetření',
        text: 'Za bezjehlovou mezoterapii si salony obvykle účtují 10 000-25 000 Ft.',
      },
    ],
  },
  consult: consultSingle,
  faq: {
    title: 'Časté dotazy',
    lead: 'Nejčastější otázky o bezjehlové mezoterapii. Pokud nenajdeš odpověď, zeptej se nás přímo.',
    items: [
      {
        question: 'Co je technologie DermoPenetrate Max?',
        answer: 'Využívá mikroproudové impulzy a precizní vibrace k dočasnému otevření přirozených vodních kanálů kožních buněk (akvaporinů). Účinná látka se tak dostane do pokožky bez jehly, na molekulární úrovni.',
      },
      {
        question: 'Je ošetření bolestivé?',
        answer: 'Ne. Žádné vpichy, mikroporanění, pálení ani píchání. Klientka dostane příjemné, relaxační ošetření a pak může hned pokračovat ve dni.',
      },
      {
        question: 'S jakými účinnými látkami ho lze používat?',
        answer: 'S téměř jakýmkoli kosmetickým sérem a ampulí: kyselinou hyaluronovou, peptidy, vitaminem C, retinolem, niacinamidem, růstovými faktory, zesvětlujícími a regeneračními látkami.',
      },
      {
        question: 'Proč ho lze používat i v létě?',
        answer: 'Protože ošetření pokožku neporaní, nejsou žádné vpichy ani olupování, takže se pokožka nestane citlivou na světlo. Na rozdíl od jehlové mezoterapie ho lze bezpečně používat i při silném slunci.',
      },
      {
        question: 'Kolik ošetření tvoří jednu kúru?',
        answer: 'Kúra má 3-6 ošetření, jednou měsíčně. Jedno ošetření trvá 25-30 minut.',
      },
    ],
  },
  visit: visitSingle,
};

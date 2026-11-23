/**
 * Stránka kategórie mezoterapie (jeden produkt) - slovenský text (preklad ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, reviews, visitSingle } from '../common.sk';

const models: Record<string, ShowcaseModelCopy> = {
  dermatechplus_noneedle_mesotherapy: {
    name: 'DermaTECH+',
    keySpec: 'bez ihly, do 800 kDa',
    tagline: 'bezihlová mezoterapia',
    forWho: 'Aplikácia účinných látok, celý rok',
    desc: 'Bezihlové mezoterapeutické zariadenie s technológiou DermoPenetrate Max: mikroprúdové impulzy a precízna vibrácia dopravia účinnú látku do pokožky, až do veľkosti molekuly 800 kDa, bez vpichov, elektrolýzy a zmeny pH.',
    when: [
      'chceš ponúkať bezbolestnú aplikáciu účinných látok',
      'chceš robiť mezoterapiu aj v lete',
      'chceš používať vlastné séra a ampulky',
    ],
  },
};

export const sk: ShowcaseCopy = {
  seo: {
    name: 'Mezoterapeutické zariadenia',
    nameShort: 'Mezoterapia',
    description: 'Bezihlové a klasické mezoterapeutické systémy na aplikáciu účinných látok.',
  },
  hero: {
    titleLines: ['Mezoterapia bez ihly,', 'bez bolesti.'],
    lead: 'Hlboká aplikácia účinných látok bez vpichov a bez rekonvalescencie, pre všetky typy pleti, v ktoromkoľvek ročnom období. Zaškolíme ťa, a keď treba, zariadenie opravíme.',
    imageAlt: 'Bezihlová mezoterapeutická hlavica DermaTECH+ v ruke',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každé nové zariadenie' },
    { title: 'Vlastný servis v Maďarsku', sub: 'rýchla oprava v Érde' },
    { title: 'Kompletné školenie v cene', sub: 'zaškolíme ťa na zariadenie' },
    { title: 'Osobné poradenstvo', sub: 'od zakladateľov' },
  ],
  models: {
    title: 'Spoznaj DermaTECH+',
    lead: 'Aplikácia účinných látok na molekulárnej úrovni, prirodzenými vodnými kanálmi pokožky.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Prečo sa oplatí kúpiť bezihlové mezoterapeutické zariadenie?',
    lead: 'Čo je dobré si pred kúpou premyslieť.',
    imageAlt: 'Bezihlové mezoterapeutické zariadenie DermaTECH+',
    items: [
      {
        title: 'Bezbolestné ošetrenie',
        text: 'Žiadne vpichy, mikroporanenia ani krvácanie, klientka môže po ošetrení hneď pokračovať v dni.',
      },
      {
        title: 'Použiteľné celý rok',
        text: 'Keďže sa pokožka neporaní, nestane sa citlivou na svetlo, takže s ním môžeš ošetrovať aj v lete pri silnom slnku.',
      },
      {
        title: 'Aj väčšie molekuly',
        text: 'Dopraví účinné látky až do 800 kDa: kyselinu hyalurónovú, peptidy, rastové faktory.',
      },
      {
        title: 'Dobre naceniteľné ošetrenie',
        text: 'Za bezihlovú mezoterapiu si salóny zvyčajne účtujú 10 000-25 000 Ft.',
      },
    ],
  },
  consult: consultSingle,
  faq: {
    title: 'Časté otázky',
    lead: 'Najčastejšie otázky o bezihlovej mezoterapii. Ak nenájdeš odpoveď, opýtaj sa nás priamo.',
    items: [
      {
        question: 'Čo je technológia DermoPenetrate Max?',
        answer: 'Využíva mikroprúdové impulzy a precíznu vibráciu na dočasné otvorenie prirodzených vodných kanálov kožných buniek (akvaporínov). Účinná látka sa tak dostane do pokožky bez ihly, na molekulárnej úrovni.',
      },
      {
        question: 'Je ošetrenie bolestivé?',
        answer: 'Nie. Žiadne vpichy, mikroporanenia, pálenie ani pichanie. Klientka dostane príjemné, relaxačné ošetrenie a potom môže hneď pokračovať v dni.',
      },
      {
        question: 'S akými účinnými látkami sa dá používať?',
        answer: 'S takmer akýmkoľvek kozmetickým sérom a ampulkou: kyselinou hyalurónovou, peptidmi, vitamínom C, retinolom, niacínamidom, rastovými faktormi, zosvetľujúcimi a regeneračnými látkami.',
      },
      {
        question: 'Prečo sa dá používať aj v lete?',
        answer: 'Pretože ošetrenie pokožku neporaní, nie sú žiadne vpichy ani olupovanie, takže sa pokožka nestane citlivou na svetlo. Na rozdiel od ihlovej mezoterapie sa dá bezpečne používať aj pri silnom slnku.',
      },
      {
        question: 'Koľko ošetrení tvorí jednu kúru?',
        answer: 'Kúra má 3-6 ošetrení, raz mesačne. Jedno ošetrenie trvá 25-30 minút.',
      },
    ],
  },
  visit: visitSingle,
};

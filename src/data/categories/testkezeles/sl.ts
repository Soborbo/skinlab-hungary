/**
 * Kategorija naprav za telo - slovensko besedilo (prevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.sl';

const models: Record<string, ShowcaseModelCopy> = {
  'freeze-me-slim': {
    name: 'FREEZE ME SLIM',
    keySpec: '4 glave hkrati',
    tagline: 'naprava za kriolipolizo',
    forWho: 'Ciljno zmanjšanje maščobe',
    desc: 'Kriolipoliza (zamrzovanje maščobe) s 4 hkrati uporabnimi nastavki, hlajenje do -10 °C. V paketu je tudi bioimpedančna tehtnica za analizo telesa, tako da napredek stranke spremljaš v številkah.',
    when: [
      'želiš ponujati tretma trdovratnih maščobnih blazinic',
      'želiš tretirati več delov telesa hkrati',
      'želiš rezultat pokazati z meritvami',
    ],
    compare: {
      tech: 'Kriolipoliza (zamrzovanje maščobe)',
      area: 'Trebuh, pas, stegna, zadnjica, roke, hrbet',
    },
  },
  'the-shaper': {
    name: 'THE SHAPER',
    keySpec: '4 tehnologije',
    tagline: 'celostno oblikovanje telesa',
    forWho: 'Oblikovanje telesa, celulit, čvrstost',
    desc: 'Štiri tehnologije v eni napravi: vakuumska masaža z valjčki, radiofrekvenca, infrardeči laser 940 nm in ultrazvočna kavitacija 40 kHz. Za obraz in telo, z ločenimi aplikatorji.',
    when: [
      'želiš ponujati tudi tretma celulita',
      'želiš z eno napravo tretirati obraz in telo',
      'želiš več tehnologij na enem mestu',
    ],
    compare: {
      tech: 'Vakuum + valjčki, RF, IR laser, kavitacija',
      area: 'Telo in obraz',
    },
  },
};

export const sl: ShowcaseCopy = {
  seo: {
    name: 'Naprave za oblikovanje telesa',
    nameShort: 'Tretmaji telesa',
    description: 'Kriolipoliza, oblikovanje kontur in druge naprave za oblikovanje telesa in postave.',
  },
  hero: {
    titleLines: ['Naprava za telo, s katero', 'oblikuješ brez operacije.'],
    lead: 'Zamrzovanje maščobe, oblikovanje telesa in tretma celulita brez bolečin in brez okrevanja. Pomagamo ti izbrati napravo, ki ustreza tvojemu salonu, in jo po potrebi popravimo.',
    imageAlt: 'Naprava za tretmaje telesa THE SHAPER',
  },
  usp: [
    { title: '2 leti polne garancije', sub: 'za vsako novo napravo' },
    { title: 'Paket usposabljanja', sub: 'gradivo in protokoli' },
    { title: 'Lasten servis na Madžarskem', sub: 'hitro popravilo v Érdu' },
    { title: 'Obroki z 0 % EOM', sub: '50 % predplačilo + mesečni obroki' },
  ],
  models: {
    title: 'Katera ustreza tvojemu salonu?',
    lead: 'FREEZE ME SLIM ciljno deluje na maščobne blazinice, THE SHAPER pa s štirimi tehnologijami na celostno oblikovanje telesa.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Primerjava',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cena', 'Tehnologija', 'Nastavki', 'Tretirano področje', 'Komu priporočamo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zakaj se splača kupiti napravo za telo?',
    lead: 'Kaj je dobro premisliti pred nakupom.',
    imageAlt: 'Nastavek THE SHAPER v roki',
    items: [
      {
        title: 'Več tehnologij v eni napravi',
        text: 'THE SHAPER združuje vakuumsko masažo z valjčki, RF, infrardeči laser in kavitacijo, zato ti ni treba kupovati ločenih naprav.',
      },
      {
        title: 'Več področij hkrati',
        text: 'Štirje nastavki FREEZE ME SLIM delujejo hkrati, zato lahko vzporedno tretiraš več delov telesa.',
      },
      {
        title: 'Stranke, ki prihajajo na kuro',
        text: 'Zamrzovanje maščobe je običajno kura s 3, oblikovanje telesa pa s 6-10 tretmaji, zato se stranka vrača k tebi.',
      },
      {
        title: 'Pripravljen paket usposabljanja',
        text: 'Napravi so priloženi učno gradivo, protokoli tretmajev in informativna gradiva za stranke, zato že od prve stranke delaš strokovno.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Brezobrestni obroki z 0 % EOM: 50 % predplačilo, preostanek v 3 ali 6 mesečnih obrokih. Brez stroškov obdelave in brez skritih stroškov.',
  },
  consult,
  faq: {
    title: 'Pogosta vprašanja',
    lead: 'Najpogostejša vprašanja o napravah za telo. Če ne najdeš odgovora, nas vprašaj neposredno.',
    items: [
      {
        question: 'Kako deluje zamrzovanje maščobe?',
        answer: 'FREEZE ME SLIM nadzorovano ohladi maščobne celice do -10 °C. Celice kristalizirajo, telo pa jih po naravni poti postopoma razgradi in izloči. Rezultat ni takojšen, pokaže se v nekaj tednih.',
      },
      {
        question: 'Koliko tretmajev obsega kura?',
        answer: 'Pri zamrzovanju maščobe so priporočeni 3 tretmaji v mesečnih presledkih. S THE SHAPER običajno 6-10 tretmajev; natančen protokol je odvisen od tretiranega področja in stanja stranke.',
      },
      {
        question: 'Na katerih delih telesa se lahko uporablja THE SHAPER?',
        answer: 'Na obrazu in vratu za čvrstost in zmanjšanje gub. Na telesu na trebuhu, pasu, bokih, zadnjici, stegnih, nadlahteh in hrbtu za oblikovanje, zmanjšanje celulita in učvrstitev kože.',
      },
      {
        question: 'Kdaj zamrzovanje maščobe ni priporočljivo?',
        answer: 'Med nosečnostjo, pri alergiji na mraz in pri nekaterih boleznih. Pred tretmajem je treba vsako stranko oceniti, pri tem pomagajo kartoteke strank in protokoli iz paketa.',
      },
      {
        question: 'Kaj je vključeno v ceno?',
        answer: 'K obema napravama spadata celoten paket usposabljanja (učno gradivo, protokoli tretmajev, informativna gradiva za stranke) in 2 leti garancije, k FREEZE ME SLIM pa še sistem za analizo telesa. Praktično usposabljanje na živih modelih je mogoče za doplačilo.',
      },
    ],
  },
  visit,
};

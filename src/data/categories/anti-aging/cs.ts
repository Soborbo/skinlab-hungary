/**
 * Kategorie anti-aging - český text (překlad ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.cs';

const models: Record<string, ShowcaseModelCopy> = {
  'q2-biopen': {
    name: 'Bio Pen Q2',
    keySpec: 'EMS + LED',
    tagline: 'mobilní mikrojehličkové pero',
    forWho: 'Vstupní, mobilní ošetření',
    desc: 'Bezdrátové mikrojehličkové pero s EMS elektroporací, modrou/červenou LED fototerapií a 7 propracovanými ošetřovacími programy. S malou investicí můžeš začít nabízet mikrojehličkovou obnovu pleti a vpravování účinných látek.',
    when: [
      'právě zavádíš mikrojehličková ošetření',
      'chceš ho používat i k vpravování účinných látek',
      'chceš ošetření nabízet i u klientek doma',
    ],
    compare: {
      tech: 'EMS mikrojehličky + LED fototerapie',
      form: 'Bezdrátové ruční pero',
      extra: 'Modrá 470 nm / červená 630 nm LED',
      use: 'Obličej, oční okolí, pokožka hlavy, tělo',
    },
  },
  'aestiq-ai': {
    name: 'AESTIQ AI',
    keySpec: 'mikrojehličkové RF',
    tagline: 'učící AI platforma',
    forWho: 'Prémiová anti-aging služba',
    desc: 'Vakuový mikrojehličkový RF systém: vakuum stabilizuje pokožku, radiofrekvence pracuje v hlubších vrstvách. Vestavěný AI Educator tě provede krok za krokem a řízení jehel ANG™ pracuje s přednastavenou hloubkou.',
    when: [
      'chceš nabízet ošetření vrásek, jizev a strií',
      'chceš budovat službu s vysokou cenou ošetření',
      'chceš, aby ti přístroj pomáhal i s učením',
    ],
    compare: {
      tech: 'Vakuové mikrojehličkové RF',
      form: 'Stolní platforma',
      extra: 'AI Educator + řízení jehel ANG™',
      use: 'Jemné vrásky, ochablá pleť, rozšířené póry, jizvy po akné, strie',
    },
  },
};

export const cs: ShowcaseCopy = {
  seo: {
    name: 'Anti-aging přístroje',
    nameShort: 'Anti-aging',
    description: 'Vakuové mikrojehličkové RF a EMS mikrojehličkové přístroje pro omlazení pleti.',
  },
  hero: {
    titleLines: ['Anti-aging přístroj', 'pro prémiová ošetření.'],
    lead: 'Zpevnění pleti, ošetření vrásek a jizev bez operace, s mikrojehličkovou RF nebo EMS technologií. Pomůžeme ti vybrat přístroj, který se hodí do tvého salonu, a když je potřeba, opravíme ho.',
    imageAlt: 'Mikrojehličkové ošetření obličeje přístrojem Bio Pen Q2 v salonu',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každý nový přístroj' },
    { title: 'Vlastní servis v Maďarsku', sub: 'rychlá oprava v Érdu' },
    { title: 'Splátky s 0% RPSN', sub: 'na přístroje nad 100 000 Ft' },
    { title: 'Osobní poradenství', sub: 'od zakladatelů' },
  ],
  models: {
    title: 'Který se hodí do tvého salonu?',
    lead: 'Mobilní ruční pero a stolní AI platforma: pro jiný účel, v jiné cenové hladině.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Srovnání',
    lead: 'Oba přístroje patří do jiné kategorie, proto je dobré rozhodnout se podle použití',
    labels: ['Cena', 'Technologie', 'Provedení', 'Extra', 'Použití', 'Pro koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Proč se vyplatí koupit anti-aging přístroj?',
    lead: 'Co je dobré si před nákupem promyslet.',
    imageAlt: 'Mikrojehličkové pero Bio Pen Q2',
    items: [
      {
        title: 'Cílené zpevnění',
        text: 'Mikrojehličkové RF přivádí teplo přímo do hlubších vrstev pokožky, a tak zpevňuje bez operace.',
      },
      {
        title: 'Žádná rekonvalescence',
        text: 'Po většině ošetření se klientka může hned vrátit ke svým každodenním činnostem.',
      },
      {
        title: 'Vracející se klientky',
        text: 'Kolagen se obnovuje týdny, proto klientky chodí v kúrách na více ošetření.',
      },
      {
        title: 'Prémiové ceny ošetření',
        text: 'Mikrojehličkové RF a mikrojehličková obnova pleti patří mezi služby salonů s vysokou marží.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0% RPSN na přístroje nad 100 000 Ft: 50% záloha, zbytek v měsíčních splátkách. Žádný poplatek za vyřízení a žádné skryté náklady.',
  },
  consult,
  faq: {
    title: 'Časté otázky',
    lead: 'Nejčastější otázky o anti-aging přístrojích. Pokud nenajdeš odpověď, zeptej se nás přímo.',
    items: [
      {
        question: 'Jaký je rozdíl mezi AESTIQ AI a Bio Pen Q2?',
        answer: 'Bio Pen Q2 je kompaktní bezdrátové mikrojehličkové pero s EMS elektroporací a LED fototerapií. AESTIQ AI je vakuový mikrojehličkový RF systém vyšší kategorie, který spojuje radiofrekvenci, vakuovou stabilizaci pokožky, systém AI Educator a řízení jehel ANG™.',
      },
      {
        question: 'Čím začít, když právě zavádím mikrojehličková ošetření?',
        answer: 'Bio Pen Q2 je dobrý začátek: malá investice, snadno se začlení do stávající nabídky a v jediném ručním přístroji dostaneš microneedling, EMS elektroporaci a LED fototerapii 470/630 nm.',
      },
      {
        question: 'Kdy je lepší zvolit AESTIQ AI?',
        answer: 'Když chceš nabízet anti-aging ošetření vyšší kategorie, zpevnění pleti, ošetření jizev nebo zlepšení textury. Kromě mikrojehliček pracuje s RF energií, stabilizuje pokožku vakuem a AI Educator a ANG™ pomáhají i při práci obsluhy.',
      },
      {
        question: 'Je Bio Pen Q2 také radiofrekvenční přístroj?',
        answer: 'Ne, a to je důležitý rozdíl. Bio Pen Q2 používá EMS mikroproud (elektroporaci). Skutečné mikrojehličkové RF má AESTIQ AI.',
      },
      {
        question: 'Kdy je vidět výsledek?',
        answer: 'Hned po ošetření je cítit mírné zpevnění. U mikrojehličkového RF ošetření přístrojem AESTIQ AI dozrává skutečný výsledek s obnovou kolagenu během 3-6 měsíců, kúra se skládá ze 3-4 ošetření.',
      },
    ],
  },
  visit,
};

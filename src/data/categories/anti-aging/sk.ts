/**
 * Kategória anti-aging - slovenský text (preklad ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.sk';

const models: Record<string, ShowcaseModelCopy> = {
  'q2-biopen': {
    name: 'Bio Pen Q2',
    keySpec: 'EMS + LED',
    tagline: 'mobilné mikroihličkové pero',
    forWho: 'Vstupné, mobilné ošetrenia',
    desc: 'Bezdrôtové mikroihličkové pero s EMS elektroporáciou, modrou/červenou LED fototerapiou a 7 prepracovanými ošetrovacími programami. S malou investíciou môžeš začať ponúkať mikroihličkovú obnovu pleti a vpravovanie účinných látok.',
    when: [
      'práve zavádzaš mikroihličkové ošetrenia',
      'chceš ho používať aj na vpravovanie účinných látok',
      'chceš ošetrenia ponúkať aj u klientok doma',
    ],
    compare: {
      tech: 'EMS mikroihličky + LED fototerapia',
      form: 'Bezdrôtové ručné pero',
      extra: 'Modrá 470 nm / červená 630 nm LED',
      use: 'Tvár, očné okolie, pokožka hlavy, telo',
    },
  },
  'aestiq-ai': {
    name: 'AESTIQ AI',
    keySpec: 'mikroihličkové RF',
    tagline: 'učiaca AI platforma',
    forWho: 'Prémiová anti-aging služba',
    desc: 'Vákuový mikroihličkový RF systém: vákuum stabilizuje pokožku, rádiofrekvencia pracuje v hlbších vrstvách. Zabudovaný AI Educator ťa prevedie krok za krokom a riadenie ihiel ANG™ pracuje s prednastavenou hĺbkou.',
    when: [
      'chceš ponúkať ošetrenie vrások, jaziev a strií',
      'chceš budovať službu s vysokou cenou ošetrenia',
      'chceš, aby ti zariadenie pomáhalo aj s učením',
    ],
    compare: {
      tech: 'Vákuové mikroihličkové RF',
      form: 'Stolová platforma',
      extra: 'AI Educator + riadenie ihiel ANG™',
      use: 'Jemné vrásky, ochabnutá pleť, rozšírené póry, jazvy po akné, strie',
    },
  },
};

export const sk: ShowcaseCopy = {
  seo: {
    name: 'Anti-aging zariadenia',
    nameShort: 'Anti-aging',
    description: 'Vákuové mikroihličkové RF a EMS mikroihličkové zariadenia na omladenie pleti.',
  },
  hero: {
    titleLines: ['Anti-aging prístroj', 'na prémiové ošetrenia.'],
    lead: 'Spevnenie pleti, ošetrenie vrások a jaziev bez operácie, s mikroihličkovou RF alebo EMS technológiou. Pomôžeme ti vybrať zariadenie, ktoré sa hodí do tvojho salónu, a keď treba, opravíme ho.',
    imageAlt: 'Mikroihličkové ošetrenie tváre zariadením Bio Pen Q2 v salóne',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každé nové zariadenie' },
    { title: 'Vlastný servis v Maďarsku', sub: 'rýchla oprava v Érde' },
    { title: 'Splátky s 0 % RPMN', sub: 'na zariadenia nad 100 000 Ft' },
    { title: 'Osobné poradenstvo', sub: 'od zakladateľov' },
  ],
  models: {
    title: 'Ktoré sa hodí do tvojho salónu?',
    lead: 'Mobilné ručné pero a stolová AI platforma: na iný účel, v inej cenovej hladine.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Porovnanie',
    lead: 'Obe zariadenia patria do inej kategórie, preto je dobré rozhodnúť sa podľa použitia',
    labels: ['Cena', 'Technológia', 'Vyhotovenie', 'Extra', 'Použitie', 'Pre koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Prečo sa oplatí kúpiť anti-aging zariadenie?',
    lead: 'Čo je dobré si pred kúpou premyslieť.',
    imageAlt: 'Mikroihličkové pero Bio Pen Q2',
    items: [
      {
        title: 'Cielené spevnenie',
        text: 'Mikroihličkové RF privádza teplo priamo do hlbších vrstiev pokožky, a tak spevňuje bez operácie.',
      },
      {
        title: 'Žiadna rekonvalescencia',
        text: 'Po väčšine ošetrení sa klientka môže hneď vrátiť k svojim každodenným činnostiam.',
      },
      {
        title: 'Vracajúce sa klientky',
        text: 'Kolagén sa obnovuje týždne, preto klientky chodia v kúrach na viac ošetrení.',
      },
      {
        title: 'Prémiové ceny ošetrení',
        text: 'Mikroihličkové RF a mikroihličková obnova pleti patria medzi služby salónov s vysokou maržou.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0 % RPMN na zariadenia nad 100 000 Ft: 50 % záloha, zvyšok v mesačných splátkach. Žiadny poplatok za vybavenie a žiadne skryté náklady.',
  },
  consult,
  faq: {
    title: 'Časté otázky',
    lead: 'Najčastejšie otázky o anti-aging zariadeniach. Ak nenájdeš odpoveď, opýtaj sa nás priamo.',
    items: [
      {
        question: 'Aký je rozdiel medzi AESTIQ AI a Bio Pen Q2?',
        answer: 'Bio Pen Q2 je kompaktné bezdrôtové mikroihličkové pero s EMS elektroporáciou a LED fototerapiou. AESTIQ AI je vákuový mikroihličkový RF systém vyššej kategórie, ktorý spája rádiofrekvenciu, vákuovú stabilizáciu pokožky, systém AI Educator a riadenie ihiel ANG™.',
      },
      {
        question: 'Čím začať, keď práve zavádzam mikroihličkové ošetrenia?',
        answer: 'Bio Pen Q2 je dobrý začiatok: malá investícia, ľahko sa začlení do existujúcej ponuky a v jedinom ručnom zariadení dostaneš microneedling, EMS elektroporáciu a LED fototerapiu 470/630 nm.',
      },
      {
        question: 'Kedy je lepšie zvoliť AESTIQ AI?',
        answer: 'Keď chceš ponúkať anti-aging ošetrenia vyššej kategórie, spevnenie pleti, ošetrenie jaziev alebo zlepšenie textúry. Okrem mikroihličiek pracuje s RF energiou, stabilizuje pokožku vákuom a AI Educator a ANG™ pomáhajú aj pri práci obsluhy.',
      },
      {
        question: 'Je Bio Pen Q2 tiež rádiofrekvenčné zariadenie?',
        answer: 'Nie, a to je dôležitý rozdiel. Bio Pen Q2 používa EMS mikroprúd (elektroporáciu). Skutočné mikroihličkové RF má AESTIQ AI.',
      },
      {
        question: 'Kedy je vidieť výsledok?',
        answer: 'Hneď po ošetrení cítiť mierne spevnenie. Pri mikroihličkovom RF ošetrení zariadením AESTIQ AI dozrieva skutočný výsledok s obnovou kolagénu počas 3-6 mesiacov, kúra pozostáva z 3-4 ošetrení.',
      },
    ],
  },
  visit,
};

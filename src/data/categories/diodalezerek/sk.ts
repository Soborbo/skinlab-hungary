/**
 * Stránka kategórie diódových laserov - slovenský text (preklad ./hu.ts).
 * Ceny, výkon, špecifikácie a obrázky sú z produktových JSON.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.sk';

const models: Record<string, ShowcaseModelCopy> = {
  athena: {
    tagline: 'kontrola a precíznosť',
    forWho: 'Začiatok / doplnková služba',
    desc: 'Inteligentný softvér, ktorý odporučí nastavenie podľa typu pleti a chĺpkov. Stabilné, predvídateľné zariadenie pre každého, kto s epiláciou začína alebo ju dopĺňa.',
    when: [
      'hľadáš cenovo dostupné, ale profesionálne vstupné zariadenie',
      'epilácia bude doplnkovou službou',
      'predvídateľnosť je pre teba dôležitejšia ako tempo',
    ],
  },
  olympia: {
    tagline: 'víťazný výkon',
    forWho: 'Tempo s kontrolou',
    desc: 'Výstupný výkon 1200W a 5 nastaviteľných veľkostí spotu: precízna práca na malých plochách, rýchly postup na veľkých.',
    when: [
      'hľadáš silné zariadenie za reálnu cenu',
      'chceš rýchlejšie ošetrenie, ale s kontrolou',
      'máš rôznorodé klientky a partie',
    ],
  },
  helios: {
    tagline: 'skutočná sila svetla',
    forWho: 'Klinika, veľká prevádzka',
    desc: 'Náš najsilnejší model: 1600W, hlbší účinok, kratší čas ošetrenia. Pre salóny a kliniky s veľkou prevádzkou.',
    when: [
      'máš denne veľa klientok na epiláciu',
      'kratším ošetrením by si ponúkla viac termínov',
      'hľadáš najvyššiu triedu',
    ],
  },
  empire: {
    tagline: 'inteligentný systém',
    forWho: 'Diagnostika + karta klienta',
    desc: 'Diagnostika chĺpkov a pleti mikrokamerou, digitálna karta klienta s fotkami pred a po a zariadenie samo odporučí parametre.',
    when: [
      'chceš ošetrenia dokumentovať',
      'chceš nastavenie stavať na vyšetrení',
      'chceš pracovať s vrstvenými impulzmi (SHR STACK)',
    ],
  },
};

export const sk: ShowcaseCopy = {
  seo: {
    name: 'Profesionálne diódové lasery',
    nameShort: 'Diódové lasery',
    description: 'Profesionálne diódové lasery so 4 vlnovými dĺžkami na trvalé odstránenie chĺpkov.',
  },
  hero: {
    titleLines: ['Diódový laser, ktorý', 'privádza klientky späť.'],
    lead: 'Trvalá epilácia technológiou so 4 vlnovými dĺžkami, pre všetky typy pleti a chĺpkov. Pomôžeme ti vybrať zariadenie, ktoré sa hodí do tvojho salónu, zaškolíme ťa, a keď treba, opravíme ho.',
    imageAlt: 'Epilácia diódovým laserom OLYMPIA v salóne',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každé nové zariadenie' },
    { title: '8-hodinové zaškolenie na mieste', sub: '+ 6 mesiacov podpory' },
    { title: 'Vlastný servis v Maďarsku', sub: 'rýchla oprava v Érde' },
    { title: 'Splátky s 0 % RPMN', sub: '50 % záloha + mesačné splátky' },
  ],
  models: {
    title: 'Ktorý sa hodí do tvojho salónu?',
    lead: 'Všetky štyri majú 4 vlnové dĺžky. Líšia sa tempom, režimom ošetrenia a tým, koľko dokumentuješ.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technické porovnanie',
    lead: 'Hlavné parametre na prvý pohľad',
    labels: ['Cena', 'Výkon', 'Vlnové dĺžky', 'Veľkosť spotu', 'Chladenie', 'Pre koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Prečo sa oplatí kúpiť diódový laser?',
    lead: 'Čo je dobré si pred kúpou premyslieť.',
    imageAlt: 'Hlavica diódového laseru OLYMPIA počas ošetrenia',
    items: [
      {
        title: 'Rýchla návratnosť',
        text: 'Pri zhruba 3-4 klientkách za pracovný deň, cene ošetrenia 12 000 Ft a nákladoch 2 000 Ft na ošetrenie ti mesačne zostane 600 000-800 000 Ft. Zariadenie sa tak môže vrátiť zhruba za 3,3-3,7 mesiaca. Ilustratívny výpočet, nie finančný sľub.',
      },
      {
        title: 'Vracajúce sa klientky',
        text: 'Klientky si kupujú kúru 6-8 ošetrení a potom chodia raz ročne na udržiavacie ošetrenie.',
      },
      {
        title: 'Účinnejší ako IPL',
        text: 'Cielenejší, pôsobí hlbšie, stačí menej sedení. Klientka vidí výsledok skôr.',
      },
      {
        title: 'Pre všetky typy pleti',
        text: '4 vlnové dĺžky sú účinné na svetlej aj tmavej pleti, na jemných aj silných chĺpkoch.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0 % RPMN: 50 % záloha, zvyšok v 3, 6 alebo 12 mesačných splátkach. Žiadny poplatok za vybavenie a žiadne skryté náklady.',
  },
  training: {
    titleLines: ['Nebudeš sa to učiť sama.', 'Všetko ťa naučíme.'],
    text: '8-hodinové zaškolenie priamo v tvojom salóne, potom 6 mesiacov podpory. Školenie obsluhy s certifikáciou FAR a oficiálnym certifikátom.',
    cta: 'Naše školenia',
  },
  consult,
  faq: {
    title: 'Časté otázky',
    lead: 'Najčastejšie otázky o diódových laseroch. Ak nenájdeš odpoveď, opýtaj sa nás priamo.',
    items: [
      {
        question: 'Aký je rozdiel medzi zariadeniami s 1, 3 a 4 vlnovými dĺžkami?',
        answer: '1 vlnová dĺžka (808 nm) je klasika pre svetlú až stredne tmavú pleť. 3 vlnové dĺžky zvládnu aj tmavšiu pleť a jemnejšie chĺpky. 4 vlnové dĺžky (755 + 808 + 940 + 1064 nm) sú najuniverzálnejšie a účinnejšie aj na svetlé chĺpky.',
      },
      {
        question: 'Prečo je dôležitý výkon (watty)?',
        answer: 'Vyšší výkon = rýchlejšie ošetrenie, viac klientok denne. Salónu s veľkou prevádzkou odporúčame viac ako 1000W.',
      },
      {
        question: 'Bolí ošetrenie diódovým laserom?',
        answer: 'Zafírové chladenie pokožky ho robí takmer bezbolestným, väčšina klientok cíti len mierne teplo.',
      },
      {
        question: 'Ako dlho trvá jedno ošetrenie?',
        answer: 'Podpazušie 5-10 minút, nohy 20-40 minút, celé telo 60-90 minút, podľa zariadenia.',
      },
    ],
  },
  visit: {
    title: 'Vyskúšaj všetky v Érde.',
    text: 'Príď do nášho showroomu a vyskúšaj si naživo všetky štyri diódové lasery, kým sa rozhodneš.',
    booking: 'Po predchádzajúcej rezervácii termínu',
    demoCta: 'Chcem ukážku',
  },
};

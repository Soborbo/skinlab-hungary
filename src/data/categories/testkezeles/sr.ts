/**
 * Kategorija uređaja za telo - srpski tekst, latinica (prevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.sr';

const models: Record<string, ShowcaseModelCopy> = {
  'freeze-me-slim': {
    name: 'FREEZE ME SLIM',
    keySpec: '4 glave istovremeno',
    tagline: 'uređaj za kriolipolizu',
    forWho: 'Ciljano smanjenje masnoće',
    desc: 'Kriolipoliza (zamrzavanje masnoće) sa 4 istovremeno upotrebljiva nastavka, hlađenje do -10 °C. U paketu je i bioimpedansna vaga za analizu tela, pa napredak klijentkinje možeš da pratiš u brojkama.',
    when: [
      'želiš da nudiš tretman tvrdokornih masnih naslaga',
      'želiš da tretiraš više delova tela istovremeno',
      'želiš da rezultat pokažeš merenjima',
    ],
    compare: {
      tech: 'Kriolipoliza (zamrzavanje masnoće)',
      area: 'Stomak, struk, butine, zadnjica, ruke, leđa',
    },
  },
  'the-shaper': {
    name: 'THE SHAPER',
    keySpec: '4 tehnologije',
    tagline: 'potpuno oblikovanje tela',
    forWho: 'Oblikovanje tela, celulit, zatezanje',
    desc: 'Četiri tehnologije u jednom uređaju: vakuumska masaža valjcima, radiofrekvencija, infracrveni laser od 940 nm i ultrazvučna kavitacija od 40 kHz. Za lice i telo, sa posebnim aplikatorima.',
    when: [
      'želiš da nudiš i tretman celulita',
      'želiš da tretiraš i lice i telo jednim uređajem',
      'želiš više tehnologija na jednom mestu',
    ],
    compare: {
      tech: 'Vakuum + valjci, RF, IR laser, kavitacija',
      area: 'Telo i lice',
    },
  },
};

export const sr: ShowcaseCopy = {
  seo: {
    name: 'Uređaji za oblikovanje tela',
    nameShort: 'Tretmani tela',
    description: 'Kriolipoliza, oblikovanje kontura i drugi uređaji za oblikovanje tela i figure.',
  },
  hero: {
    titleLines: ['Uređaj za telo kojim', 'oblikuješ bez operacije.'],
    lead: 'Zamrzavanje masnoće, oblikovanje tela i tretman celulita bez bola i bez oporavka. Pomoći ćemo ti da izabereš uređaj koji odgovara tvom salonu i, ako treba, popraviti ga.',
    imageAlt: 'Uređaj za tretmane tela THE SHAPER',
  },
  usp: [
    { title: '2 godine pune garancije', sub: 'na svaki novi uređaj' },
    { title: 'Paket edukacije', sub: 'materijali i protokoli' },
    { title: 'Sopstveni servis u Mađarskoj', sub: 'brza popravka u Érdu' },
    { title: 'Plaćanje na rate uz 0% EKS', sub: '50% avans + mesečne rate' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'FREEZE ME SLIM ciljano deluje na masne naslage, a THE SHAPER sa četiri tehnologije na potpuno oblikovanje tela.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Poređenje',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cena', 'Tehnologija', 'Nastavci', 'Tretirana oblast', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto se isplati kupiti uređaj za telo?',
    lead: 'Šta je dobro promisliti pre kupovine.',
    imageAlt: 'Nastavak THE SHAPER u ruci',
    items: [
      {
        title: 'Više tehnologija u jednom uređaju',
        text: 'THE SHAPER spaja vakuumsku masažu valjcima, RF, infracrveni laser i kavitaciju, pa ne moraš da kupuješ zasebne uređaje.',
      },
      {
        title: 'Više oblasti istovremeno',
        text: 'Četiri nastavka FREEZE ME SLIM rade istovremeno, pa možeš paralelno da tretiraš više delova tela.',
      },
      {
        title: 'Klijentkinje koje dolaze na kuru',
        text: 'Zamrzavanje masnoće je obično kura od 3, a oblikovanje tela od 6-10 tretmana, pa ti se klijentkinja vraća.',
      },
      {
        title: 'Gotov paket edukacije',
        text: 'Uz uređaj dobijaš materijale za učenje, protokole tretmana i edukativne materijale za klijentkinje, pa od prve klijentkinje radiš stručno.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatno plaćanje na rate uz 0% EKS: 50% avans, ostatak u 3 ili 6 mesečnih rata. Bez naknade za obradu i bez skrivenih troškova.',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o uređajima za telo. Ako ne nađeš odgovor, pitaj nas direktno.',
    items: [
      {
        question: 'Kako deluje zamrzavanje masnoće?',
        answer: 'FREEZE ME SLIM kontrolisano hladi masne ćelije do -10 °C. Ćelije kristalizuju, a telo ih prirodnim putem postepeno razgrađuje i izlučuje. Rezultat nije trenutan, pojavljuje se tokom nekoliko nedelja.',
      },
      {
        question: 'Koliko tretmana ima kura?',
        answer: 'Za zamrzavanje masnoće preporučuju se 3 tretmana u razmaku od mesec dana. Sa THE SHAPER-om obično 6-10 tretmana; tačan protokol zavisi od tretirane oblasti i stanja klijentkinje.',
      },
      {
        question: 'Na kojim delovima tela može da se koristi THE SHAPER?',
        answer: 'Na licu i vratu za zatezanje i smanjenje bora. Na telu na stomaku, struku, kukovima, zadnjici, butinama, nadlakticama i leđima za oblikovanje, smanjenje celulita i zatezanje kože.',
      },
      {
        question: 'Kada se zamrzavanje masnoće ne preporučuje?',
        answer: 'U trudnoći, kod alergije na hladnoću i kod nekih bolesti. Pre tretmana svaku klijentkinju treba proceniti, a u tome pomažu kartoni klijenata i protokoli iz paketa.',
      },
      {
        question: 'Šta je uključeno u cenu?',
        answer: 'Uz oba uređaja dobijaš kompletan paket edukacije (materijali za učenje, protokoli tretmana, edukativni materijali za klijentkinje) i 2 godine garancije, a uz FREEZE ME SLIM i sistem za analizu tela. Praktična obuka na živim modelima moguća je uz doplatu.',
      },
    ],
  },
  visit,
};

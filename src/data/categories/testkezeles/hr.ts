/**
 * Kategorija uređaja za tijelo - hrvatski tekst (prijevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.hr';

const models: Record<string, ShowcaseModelCopy> = {
  'freeze-me-slim': {
    name: 'FREEZE ME SLIM',
    keySpec: '4 glave istodobno',
    tagline: 'uređaj za kriolipolizu',
    forWho: 'Ciljano smanjenje masnoće',
    desc: 'Kriolipoliza (zamrzavanje masnoće) s 4 istodobno upotrebljiva nastavka, hlađenje do -10 °C. U paketu je i bioimpedancijska vaga za analizu tijela, pa napredak klijentice možeš pratiti u brojkama.',
    when: [
      'želiš nuditi tretman tvrdokornih masnih naslaga',
      'želiš tretirati više dijelova tijela istodobno',
      'želiš rezultat pokazati mjerenjima',
    ],
    compare: {
      tech: 'Kriolipoliza (zamrzavanje masnoće)',
      area: 'Trbuh, struk, bedra, stražnjica, ruke, leđa',
    },
  },
  'the-shaper': {
    name: 'THE SHAPER',
    keySpec: '4 tehnologije',
    tagline: 'potpuno oblikovanje tijela',
    forWho: 'Oblikovanje tijela, celulit, zatezanje',
    desc: 'Četiri tehnologije u jednom uređaju: vakuumska masaža valjcima, radiofrekvencija, infracrveni laser od 940 nm i ultrazvučna kavitacija od 40 kHz. Za lice i tijelo, s posebnim aplikatorima.',
    when: [
      'želiš nuditi i tretman celulita',
      'želiš tretirati i lice i tijelo jednim uređajem',
      'želiš više tehnologija na jednom mjestu',
    ],
    compare: {
      tech: 'Vakuum + valjci, RF, IR laser, kavitacija',
      area: 'Tijelo i lice',
    },
  },
};

export const hr: ShowcaseCopy = {
  seo: {
    name: 'Uređaji za oblikovanje tijela',
    nameShort: 'Tretmani tijela',
    description: 'Kriolipoliza, oblikovanje kontura i drugi uređaji za oblikovanje tijela i figure.',
  },
  hero: {
    titleLines: ['Uređaj za tijelo kojim', 'oblikuješ bez operacije.'],
    lead: 'Zamrzavanje masnoće, oblikovanje tijela i tretman celulita bez boli i bez oporavka. Pomoći ćemo ti odabrati uređaj koji odgovara tvom salonu i, ako treba, popraviti ga.',
    imageAlt: 'Uređaj za tretmane tijela THE SHAPER',
  },
  usp: [
    { title: '2 godine potpunog jamstva', sub: 'na svaki novi uređaj' },
    { title: 'Paket edukacije', sub: 'materijali i protokoli' },
    { title: 'Vlastiti servis u Mađarskoj', sub: 'brz popravak u Érdu' },
    { title: 'Obročna otplata uz 0% EKS', sub: '50% predujam + mjesečne rate' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'FREEZE ME SLIM ciljano djeluje na masne naslage, a THE SHAPER s četiri tehnologije na potpuno oblikovanje tijela.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Usporedba',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cijena', 'Tehnologija', 'Nastavci', 'Tretirano područje', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto se isplati kupiti uređaj za tijelo?',
    lead: 'Što je dobro promisliti prije kupnje.',
    imageAlt: 'Nastavak THE SHAPER u ruci',
    items: [
      {
        title: 'Više tehnologija u jednom uređaju',
        text: 'THE SHAPER spaja vakuumsku masažu valjcima, RF, infracrveni laser i kavitaciju, pa ne moraš kupovati zasebne uređaje.',
      },
      {
        title: 'Više područja istodobno',
        text: 'Četiri nastavka FREEZE ME SLIM rade istodobno, pa možeš paralelno tretirati više dijelova tijela.',
      },
      {
        title: 'Klijentice koje dolaze na kuru',
        text: 'Zamrzavanje masnoće obično je kura od 3, a oblikovanje tijela od 6-10 tretmana, pa ti se klijentica vraća.',
      },
      {
        title: 'Gotov paket edukacije',
        text: 'Uz uređaj dobivaš materijale za učenje, protokole tretmana i edukativne materijale za klijentice, pa od prve klijentice radiš stručno.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatna obročna otplata uz 0% EKS: 50% predujam, ostatak u 3 ili 6 mjesečnih rata. Bez naknade za obradu i bez skrivenih troškova.',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o uređajima za tijelo. Ako ne nađeš odgovor, pitaj nas izravno.',
    items: [
      {
        question: 'Kako djeluje zamrzavanje masnoće?',
        answer: 'FREEZE ME SLIM kontrolirano hladi masne stanice do -10 °C. Stanice kristaliziraju, a tijelo ih prirodnim putem postupno razgrađuje i izlučuje. Rezultat nije trenutačan, pojavljuje se tijekom nekoliko tjedana.',
      },
      {
        question: 'Koliko tretmana ima kura?',
        answer: 'Za zamrzavanje masnoće preporučuju se 3 tretmana u razmaku od mjesec dana. S THE SHAPER-om obično 6-10 tretmana; točan protokol ovisi o tretiranom području i stanju klijentice.',
      },
      {
        question: 'Na kojim se dijelovima tijela može koristiti THE SHAPER?',
        answer: 'Na licu i vratu za zatezanje i smanjenje bora. Na tijelu na trbuhu, struku, bokovima, stražnjici, bedrima, nadlakticama i leđima za oblikovanje, smanjenje celulita i zatezanje kože.',
      },
      {
        question: 'Kada se zamrzavanje masnoće ne preporučuje?',
        answer: 'U trudnoći, kod alergije na hladnoću i kod nekih bolesti. Prije tretmana svaku klijenticu treba procijeniti, a u tome pomažu kartoni klijenata i protokoli iz paketa.',
      },
      {
        question: 'Što je uključeno u cijenu?',
        answer: 'Uz oba uređaja dobivaš potpuni paket edukacije (materijali za učenje, protokoli tretmana, edukativni materijali za klijentice) i 2 godine jamstva, a uz FREEZE ME SLIM i sustav za analizu tijela. Praktična obuka na živim modelima moguća je uz nadoplatu.',
      },
    ],
  },
  visit,
};

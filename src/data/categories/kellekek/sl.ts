/**
 * Kategorija pripomočkov (katalog) - slovensko besedilo (prevod ./hu.ts).
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.sl';

export const sl: ShowcaseCopy = {
  seo: {
    name: 'Potrošni material in pripomočki',
    nameShort: 'Pripomočki',
    description: 'Igelni moduli in odsesovalnik dima.',
  },
  hero: {
    titleLines: ['Igelni moduli in pripomočki', 'za vsakdanje delo.'],
    lead: 'Sterilni igelni moduli za enkratno uporabo za naprave za trajno ličenje in odsesovalnik dima za carbon peeling. Originalni izdelki proizvajalcev, z dostavo na dom ali osebnim prevzemom.',
    imageAlt: 'Igelni moduli Faviamo v darilni škatli',
  },
  usp: [
    { title: 'Originalni izdelki proizvajalcev', sub: 'brez ponaredkov' },
    { title: 'Dostava Foxpost ali GLS', sub: 'v paketnik ali na dom' },
    { title: 'Osebni prevzem v Érdu', sub: 'v našem razstavnem salonu' },
    { title: 'Osebno svetovanje', sub: 'od ustanoviteljev' },
  ],
  catalog: {
    title: 'Pripomočki',
    lead: 'Igelni moduli in dodatki za tvoje naprave.',
    groups: [
      {
        title: 'Igelni moduli',
        short: 'Igelni moduli',
        subtitle: 'Sterilni, posamično pakirani igelni moduli za enkratno uporabo za naprave za trajno ličenje, v več velikostih, v izvedbi 1RL in 3RL.',
      },
      {
        title: 'Dodatki za carbon peeling',
        short: 'Odsesovalnik dima',
        subtitle: 'Odsesovalnik dima za laserske tretmaje in carbon peeling, s filtrom HEPA in filtrom z aktivnim ogljem.',
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Zakaj kupiti pri nas?',
    lead: 'Kaj je dobro vedeti pred naročilom.',
    imageAlt: 'Igelni moduli Faviamo v škatli',
    items: [
      {
        title: 'Originalni igelni moduli',
        text: 'Mast Oceanheart in Faviamo, originalni izdelki proizvajalcev, ne ponaredki.',
      },
      {
        title: 'Sterilni, za enkratno uporabo',
        text: 'Igelni moduli so pakirani posamično in sterilno, zato za vsako stranko odpreš novega.',
      },
      {
        title: 'Udoben prevzem',
        text: 'V paketnik Foxpost ali z GLS na dom, ali osebno v našem razstavnem salonu v Érdu.',
      },
      {
        title: 'Pomagamo ti izbrati',
        text: 'Če ne veš, katera velikost igle ustreza tvoji tehniki, nas vprašaj.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Ne veš, kateri igelni modul potrebuješ?',
    needs: [
      'Ne veš, katero velikost potrebuješ',
      'Imaš vprašanje o združljivosti',
      'Želiš natančne informacije o izdelku',
      'Potrebuješ le dober nasvet',
    ],
  },
  faq: {
    title: 'Pogosta vprašanja',
    lead: 'Najpogostejša vprašanja o pripomočkih. Če ne najdeš odgovora, nas vprašaj neposredno.',
    items: [
      {
        question: 'Katere igelne module prodajate?',
        answer: 'Igelne module Mast Oceanheart in Faviamo, z debelino igle od 0,18 do 0,35 mm, v izvedbi 1RL in 3RL. Razpoložljive velikosti izbereš na strani izdelka.',
      },
      {
        question: 'Čemu služi odsesovalnik dima?',
        answer: 'Pri laserskih tretmajih in carbon peelingu odsesava nastali dim. Deluje s filtrom HEPA in filtrom z aktivnim ogljem ter ima vgrajeno LED osvetlitev.',
      },
      {
        question: 'Kako prejmem naročilo?',
        answer: 'Pošljemo ga v paketnik Foxpost ali z GLS na dom, lahko pa ga prevzameš tudi osebno v našem razstavnem salonu v Érdu.',
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Prevzemi ga osebno v Érdu.',
    text: 'Naročilo lahko prevzameš v našem razstavnem salonu, in če imaš vprašanja, ti pomagamo kar na mestu.',
    demoCta: 'Želim termin',
  },
};

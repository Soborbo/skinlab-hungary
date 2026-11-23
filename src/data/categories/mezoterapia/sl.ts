/**
 * Stran kategorije mezoterapije (en izdelek) - slovensko besedilo (prevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, reviews, visitSingle } from '../common.sl';

const models: Record<string, ShowcaseModelCopy> = {
  dermatechplus_noneedle_mesotherapy: {
    name: 'DermaTECH+',
    keySpec: 'brez igel, do 800 kDa',
    tagline: 'mezoterapija brez igel',
    forWho: 'Vnos učinkovin, vse leto',
    desc: 'Naprava za mezoterapijo brez igel s tehnologijo DermoPenetrate Max: mikrotokovni impulzi in natančna vibracija vnesejo učinkovino v kožo, do velikosti molekule 800 kDa, brez vbodov, elektrolize in spremembe pH.',
    when: [
      'bi ponujala neboleč vnos učinkovin',
      'bi mezoterapijo ponujala tudi poleti',
      'bi uporabljala lastne serume in ampule',
    ],
  },
};

export const sl: ShowcaseCopy = {
  seo: {
    name: 'Mezoterapevtske naprave',
    nameShort: 'Mezoterapija',
    description: 'Sistemi za mezoterapijo brez igel in klasično mezoterapijo za vnos učinkovin.',
  },
  hero: {
    titleLines: ['Mezoterapija brez igel,', 'brez bolečin.'],
    lead: 'Globok vnos učinkovin brez vbodov in brez časa okrevanja, za vse tipe kože, v katerem koli letnem času. Usposobimo te in napravo po potrebi popravimo.',
    imageAlt: 'Nastavek DermaTECH+ za mezoterapijo brez igel v roki',
  },
  usp: [
    { title: '2 leti polne garancije', sub: 'za vsako novo napravo' },
    { title: 'Lasten servis na Madžarskem', sub: 'hitro popravilo v Érdu' },
    { title: 'Celotno usposabljanje v ceni', sub: 'usposobimo te za napravo' },
    { title: 'Osebno svetovanje', sub: 'od ustanoviteljev' },
  ],
  models: {
    title: 'Spoznaj DermaTECH+',
    lead: 'Vnos učinkovin na molekularni ravni, skozi naravne vodne kanale kože.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Zakaj se splača kupiti napravo za mezoterapijo brez igel?',
    lead: 'Kaj je dobro premisliti pred nakupom.',
    imageAlt: 'Naprava DermaTECH+ za mezoterapijo brez igel',
    items: [
      {
        title: 'Neboleč tretma',
        text: 'Brez vbodov, mikropoškodb ali krvavitev, stranka lahko po tretmaju takoj nadaljuje svoj dan.',
      },
      {
        title: 'Uporabna vse leto',
        text: 'Ker se koža ne poškoduje, ne postane fotoobčutljiva, zato lahko z njo delaš tudi poleti, na močnem soncu.',
      },
      {
        title: 'Tudi večje molekule',
        text: 'Vnese učinkovine do 800 kDa: hialuronsko kislino, peptide, rastne faktorje.',
      },
      {
        title: 'Tretma, ki se dobro zaračuna',
        text: 'Saloni za tretma mezoterapije brez igel običajno zaračunajo 10 000-25 000 Ft.',
      },
    ],
  },
  consult: consultSingle,
  faq: {
    title: 'Pogosta vprašanja',
    lead: 'Najpogostejša vprašanja o mezoterapiji brez igel. Če ne najdeš odgovora, nas vprašaj neposredno.',
    items: [
      {
        question: 'Kaj je tehnologija DermoPenetrate Max?',
        answer: 'Uporablja mikrotokovne impulze in natančno vibracijo, da začasno odpre naravne vodne kanale kožnih celic (akvaporine). Tako učinkovina prodre v kožo brez igle, na molekularni ravni.',
      },
      {
        question: 'Ali je tretma boleč?',
        answer: 'Ne. Brez vbodov, mikropoškodb, pekočega ali zbadajočega občutka. Stranka dobi prijeten, sproščujoč tretma in lahko takoj zatem nadaljuje svoj dan.',
      },
      {
        question: 'S katerimi učinkovinami se lahko uporablja?',
        answer: 'S skoraj katerim koli kozmetičnim serumom in ampulo: hialuronsko kislino, peptidi, vitaminom C, retinolom, niacinamidom, rastnimi faktorji, učinkovinami za posvetlitev in regeneracijo.',
      },
      {
        question: 'Zakaj se lahko uporablja tudi poleti?',
        answer: 'Ker tretma ne poškoduje kože, ni vbodov in luščenja, zato koža ne postane fotoobčutljiva. V nasprotju z mezoterapijo z iglami se lahko varno uporablja tudi na močnem soncu.',
      },
      {
        question: 'Koliko tretmajev obsega en paket?',
        answer: 'Paket obsega 3-6 tretmajev, enkrat mesečno. En tretma traja 25-30 minut.',
      },
    ],
  },
  visit: visitSingle,
};

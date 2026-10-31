/**
 * Arckezelő rendszerek kategóriaoldal (egytermékes) - magyar szöveg (képek, ikonok: ./index.ts).
 *
 * Forrás: az ElitePod System termékoldal leírása és GYIK-je.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, financeTexts, reviews, visitSingle } from '../common.hu';

const models: Record<string, ShowcaseModelCopy> = {
  elitepod: {
    name: 'ElitePod System',
    keySpec: '4 az 1-ben',
    tagline: 'a ragyogás platformja',
    forWho: 'Arc, nyak, dekoltázs',
    desc: 'Négy technológia egy készülékben: oxigénaktiválás (Bohr), TriPolar rádiófrekvencia, ultrahangos hatóanyag-bevitel és vibrációs revitalizáció. A beépített bőranalízis kamera alapján személyre szabott programot ajánl.',
    when: [
      'azonnal látható ragyogást adnál a vendégnek',
      'bőranalízissel indítanád a kezelést',
      'kúraszerű, prémium arcprogramot építenél',
    ],
  },
};

export const hu: ShowcaseCopy = {
  seo: {
    name: 'Okos arckezelő rendszerek',
    nameShort: 'Arckezelő rendszerek',
    description: 'Komplex, intelligens arckezelő platformok bőranalízissel és pod technológiával.',
  },
  hero: {
    titleLines: ['Arckezelő rendszer,', 'amitől ragyog a bőr.'],
    lead: 'Hidratálás, feszesítés és ragyogás egy kompakt platformon, beépített bőranalízissel. Betanítunk, és ha kell, megjavítjuk.',
    imageAlt: 'ElitePod System arckezelő rendszer állványon',
  },
  usp: [
    { title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { title: 'Gépkezelői alapoktatás', sub: 'az árban benne' },
    { title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { title: '0% THM részletfizetés', sub: '50% előleg + havi részletek' },
  ],
  models: {
    title: 'Ismerd meg az ElitePod Systemet',
    lead: 'Revitalizáló, ragyogásfokozó és regeneráló program, minden bőrtípusra.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Miért éri meg arckezelő rendszert venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    imageAlt: 'ElitePod System kezelőfej kézben',
    items: [
      {
        title: 'Azonnali eredmény',
        text: 'Már az első kezelés után látható a bőrfény, a finomabb textúra és a mély hidratáltság.',
      },
      {
        title: 'Négy technológia, egy gép',
        text: 'Oxigén, RF, ultrahang és vibráció, így egy géppel több kezeléstípust kínálhatsz.',
      },
      {
        title: 'Személyre szabott program',
        text: 'A kamera méri a hidratáltságot és a faggyútermelést, és ez alapján ajánl programot.',
      },
      {
        title: 'Kis helyen elfér',
        text: 'Kompakt, kb. 6,4 kg-os készülék, kisebb kezelőben is jól használható.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Kamatmentes részletfizetés 0% THM mellett: 50% előleg, a fennmaradó összeg 3 havi részletben. Nincs kezelési díj és nincs rejtett költség.',
  },
  consult: consultSingle,
  faq: {
    title: 'Gyakori kérdések',
    lead: 'A leggyakoribb kérdések az ElitePod Systemről. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Mit jelent a 4 az 1-ben technológia?',
        answer: 'Négy bőrmegújító technológia egy készülékben: oxigénaktiválás (Bohr-technológia), TriPolar rádiófrekvencia, ultrahangos hatóanyag-bevitel és vibrációs revitalizáció.',
      },
      {
        question: 'Hogyan működik a beépített bőranalízis?',
        answer: 'A szenzorok és a kamera valós időben mérik a bőr hidratáltságát, faggyútermelését és szerkezeti állapotát, és a készülék ez alapján ajánl személyre szabott programot.',
      },
      {
        question: 'Milyen területeken használható?',
        answer: 'Arcon, nyakon és dekoltázson. Három fő program érhető el: revitalizáló, ragyogásfokozó és regeneráló, minden bőrtípusra.',
      },
      {
        question: 'Milyen oktatás jár a géphez?',
        answer: 'Az árban benne van a gépkezelői alapoktatás, tananyaggal, kezelési protokollokkal és vendégdokumentációs mintákkal. Igény szerint élő modelles gyakorlati képzés is kérhető, felár ellenében.',
      },
    ],
  },
  visit: visitSingle,
};

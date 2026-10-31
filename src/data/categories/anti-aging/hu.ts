/**
 * Anti-aging kategóriaoldal - magyar szöveg (képek, ikonok, adatforrások: ./index.ts).
 *
 * Forrás: a korábbi kategóriaoldal jóváhagyott tartalma (előnyök, összehasonlítás,
 * a designer GYIK-je tegezésre igazítva) és a termék-JSON-ok. Ár, kép a JSON-ból jön.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.hu';

const models: Record<string, ShowcaseModelCopy> = {
  'q2-biopen': {
    name: 'Bio Pen Q2',
    keySpec: 'EMS + LED',
    tagline: 'a mobil mikrotűs pen',
    forWho: 'Belépő, mobil kezelések',
    desc: 'Vezeték nélküli mikrotűs pen EMS elektroporációval és kék/vörös LED fényterápiával. Kis befektetéssel indíthatod el a mikrotűs bőrmegújító és hatóanyag-bevitel kezeléseket.',
    when: [
      'most vezetnéd be a mikrotűs kezeléseket',
      'hatóanyag-bevitelre is használnád',
      'házhoz is vinnéd a kezelést',
    ],
    compare: {
      tech: 'EMS mikrotű + LED fényterápia',
      form: 'Vezeték nélküli kézi pen',
      extra: 'Kék 470 nm / vörös 630 nm LED',
      use: 'Arc, szemkörnyék, fejbőr, test',
    },
  },
  'aestiq-ai': {
    name: 'AESTIQ AI',
    keySpec: 'mikrotűs RF',
    tagline: 'a tanító AI-platform',
    forWho: 'Prémium anti-aging szolgáltatás',
    desc: 'Vákuumos mikrotűs RF rendszer: a vákuum stabilizálja a bőrt, a rádiófrekvencia a mélyebb rétegekben dolgozik. A beépített AI Educator lépésről lépésre vezet, az ANG™ tűvezérlés előre beállított mélységgel dolgozik.',
    when: [
      'ránc-, heg- és striakezelést kínálnál',
      'magas kezelési árú szolgáltatást építenél',
      'a gép a tanulásban is segítsen',
    ],
    compare: {
      tech: 'Vákuumos mikrotűs RF',
      form: 'Asztali platform',
      extra: 'AI Educator + ANG™ tűvezérlés',
      use: 'Ráncok, aknés hegek, striák, textúra',
    },
  },
};

export const hu: ShowcaseCopy = {
  seo: {
    name: 'Anti-aging készülékek',
    nameShort: 'Anti-aging',
    description: 'Vákuumos mikrotűs RF és EMS mikrotűs bőrfiatalító készülékek.',
  },
  hero: {
    titleLines: ['Anti-aging gép, amivel', 'prémium kezelést adhatsz.'],
    lead: 'Bőrfeszesítés, ránc- és hegkezelés műtét nélkül, mikrotűs RF vagy EMS technológiával. Segítünk kiválasztani a szalonodhoz illő gépet, és ha kell, megjavítjuk.',
    imageAlt: 'Mikrotűs arckezelés Bio Pen Q2-vel a szalonban',
  },
  usp: [
    { title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { title: '0% THM részletfizetés', sub: '100 000 Ft feletti gépekre' },
    { title: 'Személyes tanácsadás', sub: 'az alapítóktól' },
  ],
  models: {
    title: 'Melyik illik a te szalonodhoz?',
    lead: 'Egy mobil kézi pen és egy asztali AI-platform: más célra, más árszinten.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Összehasonlítás',
    lead: 'A két gép más kategória, ezért a felhasználás alapján érdemes dönteni',
    labels: ['Ár', 'Technológia', 'Kialakítás', 'Extra', 'Alkalmazás', 'Kinek ajánljuk'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Miért éri meg anti-aging gépet venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    imageAlt: 'Bio Pen Q2 mikrotűs pen',
    items: [
      {
        title: 'Célzott feszesítés',
        text: 'A mikrotűs RF a hőt közvetlenül a mélyebb bőrrétegekbe juttatja, így műtét nélkül feszesít.',
      },
      {
        title: 'Nincs leállás',
        text: 'A legtöbb kezelés után a vendég azonnal visszatérhet a mindennapjaihoz.',
      },
      {
        title: 'Visszatérő vendégek',
        text: 'A kollagén hetek alatt épül újra, ezért a vendégek kúraszerűen, több alkalomra járnak.',
      },
      {
        title: 'Prémium kezelési árak',
        text: 'A mikrotűs RF és a mikrotűs bőrmegújítás a szalonok magas árrésű szolgáltatásai közé tartozik.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Kamatmentes részletfizetés 0% THM mellett 100 000 Ft feletti gépekre: 50% előleg, a fennmaradó összeg havi részletekben. Nincs kezelési díj és nincs rejtett költség.',
  },
  consult,
  faq: {
    title: 'Gyakori kérdések',
    lead: 'A leggyakoribb kérdések az anti-aging gépekről. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Mi a különbség az AESTIQ AI és a Bio Pen Q2 között?',
        answer: 'A Bio Pen Q2 kompakt, vezeték nélküli mikrotűs pen EMS elektroporációval és LED fényterápiával. Az AESTIQ AI magasabb kategóriájú vákuumos mikrotűs RF rendszer, amely rádiófrekvenciát, vákuumos bőrstabilizálást, AI Educator rendszert és ANG™ tűvezérlést egyesít.',
      },
      {
        question: 'Melyikkel kezdjem, ha most vezetném be a mikrotűs kezeléseket?',
        answer: 'A Bio Pen Q2 jó belépő: kis befektetés, könnyen beilleszthető a meglévő kínálatba, és egyetlen kézi eszközben kapsz microneedlinget, EMS elektroporációt és 470/630 nm-es LED fényterápiát.',
      },
      {
        question: 'Mikor érdemes inkább az AESTIQ AI-t választanom?',
        answer: 'Ha magasabb kategóriájú anti-aging, bőrfeszesítő, heg- vagy textúrajavító kezelést kínálnál. A mikrotűk mellett RF energiával dolgozik, vákuummal stabilizálja a bőrt, az AI Educator és az ANG™ pedig a kezelő munkáját is segíti.',
      },
      {
        question: 'A Bio Pen Q2 is rádiófrekvenciás készülék?',
        answer: 'Nem, és ez fontos különbség. A Bio Pen Q2 EMS mikroáramot (elektroporációt) használ. Valódi mikrotűs RF az AESTIQ AI-ban van.',
      },
      {
        question: 'Mikor látható az eredmény?',
        answer: 'Közvetlenül a kezelés után enyhe feszesedés érezhető, a valódi eredmény a kollagén újraképződésével 4-6 hét alatt alakul ki. Kúraszerű kezeléssel a hatás fokozható.',
      },
    ],
  },
  visit,
};

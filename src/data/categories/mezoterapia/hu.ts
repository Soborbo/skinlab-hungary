/**
 * Mezoterápia kategóriaoldal (egytermékes) - magyar szöveg (képek, ikonok: ./index.ts).
 *
 * Forrás: a DermaTECH+ termékoldal leírása és GYIK-je. A régi kategóriaoldalnak
 * nem volt saját tartalma.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, financeTexts, reviews, visitSingle } from '../common.hu';

const models: Record<string, ShowcaseModelCopy> = {
  dermatechplus_noneedle_mesotherapy: {
    name: 'DermaTECH+',
    keySpec: 'tű nélkül, 800 kDa-ig',
    tagline: 'a tű nélküli mezoterápia',
    forWho: 'Hatóanyag-bevitel, egész évben',
    desc: 'Tű nélküli mezoterápiás készülék DermoPenetrate Max technológiával: mikroáram-impulzusok és precíziós vibráció juttatják a hatóanyagot a bőrbe, akár 800 kDa molekulaméretig, szúrás, elektrolízis és pH-változás nélkül.',
    when: [
      'fájdalommentes hatóanyag-bevitelt kínálnál',
      'nyáron is mezoterápiát adnál',
      'a saját szérumaidat, ampulláidat használnád',
    ],
  },
};

export const hu: ShowcaseCopy = {
  seo: {
    name: 'Mezoterápiás eszközök',
    nameShort: 'Mezoterápia',
    description: 'Tű nélküli és klasszikus mezoterápiás hatóanyagbeviteli rendszerek.',
  },
  hero: {
    titleLines: ['Mezoterápia tű nélkül,', 'fájdalom nélkül.'],
    lead: 'Mély hatóanyag-bevitel szúrás és gyógyulási idő nélkül, minden bőrtípusra, az év bármely szakában. Betanítunk, és ha kell, megjavítjuk.',
    imageAlt: 'DermaTECH+ tű nélküli mezoterápiás kezelőfej kézben',
  },
  usp: [
    { title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { title: 'Saját magyar szerviz', sub: 'gyors javítás Érden' },
    { title: '0% THM részletfizetés', sub: '50% előleg + havi részletek' },
    { title: 'Személyes tanácsadás', sub: 'az alapítóktól' },
  ],
  models: {
    title: 'Ismerd meg a DermaTECH+-t',
    lead: 'Hatóanyag-bevitel molekuláris szinten, a bőr természetes vízcsatornáin keresztül.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Miért éri meg tű nélküli mezoterápiás gépet venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    imageAlt: 'DermaTECH+ tű nélküli mezoterápiás készülék',
    items: [
      {
        title: 'Fájdalommentes kezelés',
        text: 'Nincs szúrás, mikrosérülés vagy vérzés, a vendég a kezelés után azonnal folytathatja a napját.',
      },
      {
        title: 'Egész évben használható',
        text: 'Mivel nem sérül a bőr, nem válik fényérzékennyé, ezért nyáron, erős napsütésben is kezelhetsz vele.',
      },
      {
        title: 'Nagyobb molekulák is',
        text: 'Akár 800 kDa-os hatóanyagot is bejuttat: hialuronsavat, peptideket, növekedési faktorokat.',
      },
      {
        title: 'Jól árazható kezelés',
        text: 'Tű nélküli mezoterápiás kezelésért jellemzően 10-25 000 Ft-ot kérnek el a szalonok.',
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
    lead: 'A leggyakoribb kérdések a tű nélküli mezoterápiáról. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Mi az a DermoPenetrate Max technológia?',
        answer: 'Mikroáram-impulzusokat és precíziós vibrációt alkalmaz, hogy ideiglenesen megnyissa a bőrsejtek természetes vízcsatornáit (aquaporinokat). Így a hatóanyag tű nélkül, molekuláris szinten jut a bőrbe.',
      },
      {
        question: 'Fájdalmas a kezelés?',
        answer: 'Nem. Nincs szúrás, mikrosérülés, égő vagy szúró érzés. A vendég kellemes, relaxáló kezelést kap, és utána azonnal folytathatja a napját.',
      },
      {
        question: 'Milyen hatóanyagokkal használható?',
        answer: 'Szinte bármilyen kozmetikai szérummal és ampullával: hialuronsavval, peptidekkel, C-vitaminnal, retinollal, niacinamiddal, növekedési faktorokkal, világosító és regeneráló hatóanyagokkal.',
      },
      {
        question: 'Miért használható nyáron is?',
        answer: 'Mert a kezelés nem sérti a bőrt, nincs szúrás és hámlás, így a bőr nem válik fényérzékennyé. A tűs mezoterápiával szemben erős napsütésben is biztonságosan használható.',
      },
    ],
  },
  visit: visitSingle,
};

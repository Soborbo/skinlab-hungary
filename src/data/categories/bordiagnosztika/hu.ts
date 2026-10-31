/**
 * Bőrdiagnosztika kategóriaoldal (egytermékes) - magyar szöveg (képek, ikonok: ./index.ts).
 *
 * Forrás: a SKINETIC AI+ termékoldal leírása, GYIK-je és csomagtartalma.
 * Orvosi diagnózist nem ígérünk (a termékoldal GYIK-je szerint sem helyettesíti).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consultSingle, financeTexts, reviews, visitSingle } from '../common.hu';

const models: Record<string, ShowcaseModelCopy> = {
  'skinetic-ai-plus': {
    name: 'SKINETIC AI+',
    keySpec: '15 MP, 8 képalkotó mód',
    tagline: 'a látványos bőranalízis',
    forWho: 'Konzultáció, dokumentáció',
    desc: 'AI-alapú bőranalizáló rendszer 15 MP-es kamerával és 8 képalkotó móddal. Pontszámokkal, grafikonokkal és problématérképpel mutatja meg a vendégnek a bőre állapotát, az előtte-utána összehasonlítás pedig a kezelés eredményét.',
    when: [
      'objektív felméréssel kezdenéd a kezelést',
      'a vendég saját szemével lássa, mire van szüksége',
      'dokumentálnád a kezelések eredményét',
    ],
  },
};

export const hu: ShowcaseCopy = {
  seo: {
    name: 'AI bőrdiagnosztikai rendszer',
    nameShort: 'Bőrdiagnosztika',
    description: 'AI-alapú bőranalízis és bőrdiagnosztikai rendszerek.',
  },
  hero: {
    titleLines: ['Bőrdiagnosztika, amivel', 'a vendég is látja a bőrét.'],
    lead: 'Objektív bőrállapot-felmérés, látványos konzultáció és dokumentálható eredmények mesterséges intelligenciával. Betanítunk, és ha kell, megjavítjuk.',
    imageAlt: 'Bőranalízis SKINETIC AI+ rendszerrel gépkezelői képzésen',
  },
  usp: [
    { title: '2 év teljes körű garancia', sub: 'minden új gépre' },
    { title: 'Gépkezelői oktatás', sub: 'tanúsítvánnyal, az árban' },
    { title: 'Magyar nyelvű szoftver', sub: 'kozmetológussal készült' },
    { title: '0% THM részletfizetés', sub: '50% előleg + havi részletek' },
  ],
  models: {
    title: 'Ismerd meg a SKINETIC AI+-t',
    lead: 'Arc- és fejbőrmikroszkóppal, 15,6"-os érintőképernyős tablettel, magyar menüvel.',
    copy: models,
  },
  reviews,
  whyBuy: {
    title: 'Miért éri meg bőrdiagnosztikai rendszert venni?',
    lead: 'Amit a vásárlás előtt érdemes végiggondolni.',
    imageAlt: 'SKINETIC AI+ bőrdiagnosztikai rendszer a kezelőben',
    items: [
      {
        title: 'Meggyőzőbb konzultáció',
        text: 'A vendég közérthető riportot kap, és maga is látja, miért javaslod az adott kezelést.',
      },
      {
        title: 'Látható fejlődés',
        text: 'Az előtte-utána összehasonlítás megmutatja a kezelések eredményét, ez a visszatérés legjobb érve.',
      },
      {
        title: 'Több paraméter egyszerre',
        text: 'Textúra, hidratáltság, pórusok, faggyú, pigmentáció, ráncok és bőrpír egy vizsgálatban.',
      },
      {
        title: 'Rendezett dokumentáció',
        text: 'A riportok PDF-ben exportálhatók, az adatok felhőben tárolódnak.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Kamatmentes részletfizetés 0% THM mellett: 50% előleg, a fennmaradó összeg 3 vagy 6 havi részletben. Nincs kezelési díj és nincs rejtett költség.',
  },
  consult: consultSingle,
  faq: {
    title: 'Gyakori kérdések',
    lead: 'A leggyakoribb kérdések a bőrdiagnosztikáról. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Mit vizsgál a rendszer?',
        answer: 'Egyszerre több bőrparamétert: textúrát, hidratáltságot, pórusokat, faggyútermelést és -eloszlást, pigmentációt, UV-terheléshez kapcsolódó eltéréseket, finom és mélyebb ráncokat, bőrpírt, valamint az aknéra és a komedókra jellemző elváltozásokat.',
      },
      {
        question: 'Helyettesíti az orvosi diagnózist?',
        answer: 'Nem. A SKINETIC AI+ kozmetikai és esztétikai célú, nem invazív bőrállapot-felmérő rendszer. Az értékelés a szakember munkáját támogatja, de betegségek diagnosztizálására nem szolgál.',
      },
      {
        question: 'Magyar nyelvű a szoftver?',
        answer: 'Igen, a felület magyar nyelvű, és kozmetológus közreműködésével készült, így a menük és a riportok a hazai szalongyakorlathoz igazodnak.',
      },
      {
        question: 'Mi jár a készülékhez?',
        answer: 'Az arc- és fejbőrmikroszkóp, a 15,6"-os érintőképernyős tablet, gépkezelői oktatás tanúsítvánnyal és 2 év teljes körű garancia.',
      },
    ],
  },
  visit: visitSingle,
};

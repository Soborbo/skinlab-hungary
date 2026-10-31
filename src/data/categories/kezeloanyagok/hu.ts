/**
 * Kezelőanyagok kategóriaoldal (katalógus-változat) - magyar szöveg (képek, ikonok,
 * csoportok sorrendje: ./index.ts).
 *
 * Forrás: a korábbi kategóriaoldal jóváhagyott tartalma (csoportcímek, előnyök,
 * bizalmi jelvények). Gépígéret (garancia, betanítás, szerviz) nem kerülhet ide:
 * egy krémre vagy ampullára egyik sem igaz. Szállítási határidőt nem vállalunk.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.hu';

export const hu: ShowcaseCopy = {
  seo: {
    name: "M'ONDUNIQ professzionális kozmetikumok",
    nameShort: "M'ONDUNIQ",
    description: "M'ONDUNIQ professzionális kezelőanyagok: hydra-liquidek, hatóanyag-koktélok és exoszómás készítmények.",
  },
  hero: {
    titleLines: ["M'ONDUNIQ kezelőanyagok", 'a gépeid mellé.'],
    lead: 'Aqua-peeling hydra-liquidek, hatóanyag-koktélok, exoszómás készítmények és a teljes LaserIQ carbon peeling protokoll. Hivatalos forgalmazóként eredeti termékeket adunk.',
    imageAlt: "A Skinlab csapata a M'ONDUNIQ professzionális kozmetikumok standján",
  },
  usp: [
    { title: 'Eredeti, hivatalos termékek', sub: 'hivatalos forgalmazótól' },
    { title: 'Foxpost vagy GLS szállítás', sub: 'automatába vagy házhoz' },
    { title: 'Személyes átvétel Érden', sub: 'a bemutatótermünkben' },
    { title: 'Teljes protokollok', sub: 'az előkészítéstől az otthoni ápolásig' },
  ],
  catalog: {
    title: 'Kezelőanyagok protokollok szerint',
    lead: 'Termékvonalanként, a kezelés lépéssorrendjében, hogy lásd, mi hiányzik még a munkádhoz.',
    groups: [
      {
        title: "M'ONDUNIQ LaserIQ: carbon peeling és lézeres protokoll",
        subtitle: 'A kezelési protokoll lépéssorrendjében: bőrelőkészítés, a carbon peeling kezelés, az azonnali regeneráció, végül az otthon folytatható ápolás.',
      },
      {
        title: 'AquametiQ hydra-liquidek: aqua-peeling kezelőfolyadékok',
        subtitle: 'Hidrodermabráziós és aqua-peeling gépekbe töltendő hatóanyagos kezelőfolyadékok. Négy változat: savas előkészítő, hidratáló, világosító és ozmotikus öblítővíz.',
      },
      {
        title: 'Hatóanyag-koktélok, szérumok és maszkok',
        subtitle: 'Mikrotűs mezoterápiához, nano kezelésekhez, elektroporációhoz, oxigéninfúzióhoz és hidegplazmás protokollokhoz.',
      },
      {
        title: 'Savas hámlasztás és anti-aging arcápolás',
        subtitle: "A 10% fitinsavas koncentrátum a kabinos hámlasztáshoz; a HI'FUsion Longevity szérum és krém, a LEPIREV™ szemkörnyékápoló és a Vitamino'MASK fiatalító arcmaszk a bőr hidratálására és a ráncok láthatóságának mérséklésére.",
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Miért tőlünk vásárolj kezelőanyagot?',
    lead: 'Amit érdemes tudni a rendelés előtt.',
    imageAlt: "M'ONDUNIQ HI'FUsion Longevity szérum és arckrém a szalonpulton, a háttérben arckezelő géppel",
    items: [
      {
        title: 'Eredeti, hivatalos termékek',
        text: 'Hivatalos forgalmazóként közvetlenül a gyártótól szerezzük be a termékeket.',
      },
      {
        title: 'Teljes protokollok, nem külön tételek',
        text: 'A bőrelőkészítéstől az otthoni fenntartásig minden lépéshez van készítmény, egymásra épülő rendszerben.',
      },
      {
        title: 'A gépeidhez illesztve',
        text: 'Carbon peeling, hidrodermabrázió, mikrotűs kezelés, hidegplazma, mezoterápia: a kezelőanyag-ellátás egy helyen.',
      },
      {
        title: 'Kényelmes átvétel',
        text: 'Foxpost automatába vagy GLS-sel házhoz, illetve személyesen az érdi bemutatótermünkben.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Nem tudod, melyik kezelőanyag kell?',
    needs: [
      'Nem tudod, melyik illik a gépedhez',
      'Protokollt állítanál össze',
      'Kérdésed van egy termékről',
      'Csak egy jó tanácsra van szükséged',
    ],
  },
  faq: {
    title: 'Gyakori kérdések',
    lead: 'A leggyakoribb kérdések a kezelőanyagokról. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Melyik kezelőanyag illik a gépemhez?',
        answer: 'Carbon peelinghez és ND:YAG lézerhez a LaserIQ vonal, hidrodermabráziós és aqua-peeling gépekhez az AquametiQ hydra-liquidek valók. A hatóanyag-koktélok mikrotűs, mezoterápiás, elektroporációs, oxigénes és hidegplazmás kezelésekhez készültek.',
      },
      {
        question: 'Hogyan kapom meg a rendelést?',
        answer: 'Foxpost automatába vagy GLS-sel házhoz küldjük, de személyesen is átveheted az érdi bemutatótermünkben.',
      },
      {
        question: 'Eredetiek a termékek?',
        answer: "Igen. A M'ONDUNIQ hivatalos forgalmazójaként közvetlenül a gyártótól szerezzük be a termékeket.",
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Vedd át személyesen Érden.',
    text: 'A rendelésedet átveheted a bemutatótermünkben, és ha kérdésed van, a helyszínen is segítünk.',
    demoCta: 'Időpontot kérek',
  },
};

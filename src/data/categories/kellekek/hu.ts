/**
 * Kellékek kategóriaoldal (katalógus-változat) - magyar szöveg (képek, ikonok,
 * csoportok sorrendje: ./index.ts).
 *
 * A régi oldal OxyGenX pod és HydraLiquid tartalma kimaradt (mindkettő
 * archivált), ahogy a nem igazolt „mennyiségi kedvezmény” ígéret is.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.hu';

export const hu: ShowcaseCopy = {
  seo: {
    name: 'Kellékek és kiegészítők',
    nameShort: 'Kellékek',
    description: 'Tűmodulok és füstelszívó.',
  },
  hero: {
    titleLines: ['Tűmodulok és kellékek', 'a napi munkához.'],
    lead: 'Steril, egyszer használatos tűmodulok sminktetováló gépekhez és füstelszívó a carbon peelinghez. Eredeti gyártói termékek, házhoz szállítással vagy személyes átvétellel.',
    imageAlt: 'Faviamo tűmodulok díszdobozban',
  },
  usp: [
    { title: 'Eredeti gyártói termékek', sub: 'nem utángyártmány' },
    { title: 'Foxpost vagy GLS szállítás', sub: 'automatába vagy házhoz' },
    { title: 'Személyes átvétel Érden', sub: 'a bemutatótermünkben' },
    { title: 'Személyes tanácsadás', sub: 'az alapítóktól' },
  ],
  catalog: {
    title: 'Kellékek',
    lead: 'Tűmodulok és kiegészítők a gépeidhez.',
    groups: [
      {
        title: 'Tűmodulok',
        subtitle: 'Steril, egyenként csomagolt, egyszer használatos tűmodulok sminktetováló gépekhez, több méretben, 1RL és 3RL kiszerelésben.',
      },
      {
        title: 'Carbon peeling kiegészítők',
        subtitle: 'Füstelszívó lézeres és carbon peeling kezelésekhez, HEPA és aktív szén szűrővel.',
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Miért tőlünk vásárolj kelléket?',
    lead: 'Amit érdemes tudni a rendelés előtt.',
    imageAlt: 'Faviamo tűmodulok a dobozukban',
    items: [
      {
        title: 'Eredeti tűmodulok',
        text: 'Mast Oceanheart és Faviamo, eredeti gyártói termékek, nem utángyártmányok.',
      },
      {
        title: 'Steril, egyszer használatos',
        text: 'A tűmodulok egyenként, sterilen csomagoltak, így minden vendégnél újat bontasz.',
      },
      {
        title: 'Kényelmes átvétel',
        text: 'Foxpost automatába vagy GLS-sel házhoz, illetve személyesen az érdi bemutatótermünkben.',
      },
      {
        title: 'Segítünk választani',
        text: 'Ha nem tudod, melyik tűméret illik a technikádhoz, kérdezz minket.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Nem tudod, melyik tűmodul kell?',
    needs: [
      'Nem tudod, melyik méret kell',
      'Kérdésed van a kompatibilitásról',
      'Pontos infót kérsz egy termékről',
      'Csak egy jó tanácsra van szükséged',
    ],
  },
  faq: {
    title: 'Gyakori kérdések',
    lead: 'A leggyakoribb kérdések a kellékekről. Ha nem találod a választ, kérdezz minket közvetlenül.',
    items: [
      {
        question: 'Milyen tűmodulokat forgalmaztok?',
        answer: 'Mast Oceanheart és Faviamo tűmodulokat, 0,18 és 0,35 mm közötti tűvastagságban, 1RL és 3RL kiszerelésben. Az elérhető méreteket a termékoldalon választhatod ki.',
      },
      {
        question: 'Mire jó a füstelszívó?',
        answer: 'Lézeres és carbon peeling kezelésnél elszívja a keletkező füstöt. HEPA és aktív szén szűrővel működik, beépített LED világítással.',
      },
      {
        question: 'Hogyan kapom meg a rendelést?',
        answer: 'Foxpost automatába vagy GLS-sel házhoz küldjük, de személyesen is átveheted az érdi bemutatótermünkben.',
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

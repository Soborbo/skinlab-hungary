/**
 * Kategorie příslušenství (katalogová varianta) - český text (překlad ./hu.ts).
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.cs';

export const cs: ShowcaseCopy = {
  seo: {
    name: 'Spotřební materiál a příslušenství',
    nameShort: 'Příslušenství',
    description: 'Jehlové moduly a odsavač kouře.',
  },
  hero: {
    titleLines: ['Jehlové moduly a doplňky', 'pro každodenní práci.'],
    lead: 'Sterilní jednorázové jehlové moduly pro přístroje na permanentní make-up a odsavač kouře pro carbon peeling. Originální výrobky od výrobce, s doručením domů nebo osobním odběrem.',
    imageAlt: 'Jehlové moduly Faviamo v dárkové krabičce',
  },
  usp: [
    { title: 'Originální výrobky od výrobce', sub: 'žádné napodobeniny' },
    { title: 'Doprava Foxpost nebo GLS', sub: 'do boxu nebo domů' },
    { title: 'Osobní odběr v Érdu', sub: 'v našem showroomu' },
    { title: 'Osobní poradenství', sub: 'od zakladatelů' },
  ],
  catalog: {
    title: 'Příslušenství',
    lead: 'Jehlové moduly a příslušenství k tvým přístrojům.',
    groups: [
      {
        title: 'Jehlové moduly',
        short: 'Jehlové moduly',
        subtitle: 'Sterilní, jednotlivě balené jednorázové jehlové moduly pro přístroje na permanentní make-up, v několika velikostech, v provedení 1RL a 3RL.',
      },
      {
        title: 'Příslušenství pro carbon peeling',
        short: 'Odsavač kouře',
        subtitle: 'Odsavač kouře pro laserová ošetření a carbon peeling, s filtrem HEPA a filtrem s aktivním uhlím.',
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'Proč kupovat příslušenství u nás?',
    lead: 'Co je dobré vědět před objednávkou.',
    imageAlt: 'Jehlové moduly Faviamo v krabičce',
    items: [
      {
        title: 'Originální jehlové moduly',
        text: 'Mast Oceanheart a Faviamo, originální výrobky od výrobce, žádné napodobeniny.',
      },
      {
        title: 'Sterilní, jednorázové',
        text: 'Jehlové moduly jsou baleny jednotlivě a sterilně, takže pro každou klientku otevřeš nový.',
      },
      {
        title: 'Pohodlné převzetí',
        text: 'Do boxu Foxpost nebo s GLS domů, případně osobně v našem showroomu v Érdu.',
      },
      {
        title: 'Pomůžeme ti vybrat',
        text: 'Pokud nevíš, která velikost jehly se hodí k tvé technice, zeptej se nás.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Nevíš, který jehlový modul potřebuješ?',
    needs: [
      'Nevíš, jakou velikost potřebuješ',
      'Máš otázku ke kompatibilitě',
      'Chceš přesné informace o výrobku',
      'Potřebuješ jen dobrou radu',
    ],
  },
  faq: {
    title: 'Časté dotazy',
    lead: 'Nejčastější otázky o příslušenství. Pokud nenajdeš odpověď, zeptej se nás přímo.',
    items: [
      {
        question: 'Jaké jehlové moduly prodáváte?',
        answer: 'Jehlové moduly Mast Oceanheart a Faviamo, s tloušťkou jehly od 0,18 do 0,35 mm, v provedení 1RL a 3RL. Dostupné velikosti si vybereš na stránce produktu.',
      },
      {
        question: 'K čemu slouží odsavač kouře?',
        answer: 'Při laserových ošetřeních a carbon peelingu odsává vznikající kouř. Pracuje s filtrem HEPA a filtrem s aktivním uhlím a má vestavěné LED osvětlení.',
      },
      {
        question: 'Jak dostanu objednávku?',
        answer: 'Pošleme ji do boxu Foxpost nebo s GLS domů, ale můžeš si ji vyzvednout i osobně v našem showroomu v Érdu.',
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Vyzvedni si ji osobně v Érdu.',
    text: 'Objednávku si můžeš vyzvednout v našem showroomu, a když máš otázky, pomůžeme ti přímo na místě.',
    demoCta: 'Chci termín',
  },
};

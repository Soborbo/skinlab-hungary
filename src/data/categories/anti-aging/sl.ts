/**
 * Stran kategorije anti-aging - slovensko besedilo (prevod ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.sl';

const models: Record<string, ShowcaseModelCopy> = {
  'q2-biopen': {
    name: 'Bio Pen Q2',
    keySpec: 'EMS + LED',
    tagline: 'mobilno pero z mikroiglicami',
    forWho: 'Začetni, mobilni tretmaji',
    desc: 'Brezžično pero z mikroiglicami, EMS elektroporacijo, modro/rdečo LED fototerapijo in 7 izdelanimi programi tretmajev. Z majhno naložbo lahko začneš izvajati tretmaje obnove kože z mikroiglicami in vnašanja aktivnih učinkovin.',
    when: [
      'zdaj uvajaš tretmaje z mikroiglicami',
      'bi ga uporabljala tudi za vnašanje učinkovin',
      'bi tretmaje izvajala tudi na domu strank',
    ],
    compare: {
      tech: 'EMS mikroiglice + LED fototerapija',
      form: 'Brezžično ročno pero',
      extra: 'Modra 470 nm / rdeča 630 nm LED',
      use: 'Obraz, predel okoli oči, lasišče, telo',
    },
  },
  'aestiq-ai': {
    name: 'AESTIQ AI',
    keySpec: 'RF z mikroiglicami',
    tagline: 'AI platforma, ki uči',
    forWho: 'Premium anti-aging storitev',
    desc: 'Vakuumski RF sistem z mikroiglicami: vakuum stabilizira kožo, radiofrekvenca pa deluje v globljih plasteh. Vgrajeni AI Educator te vodi korak za korakom, upravljanje igel ANG™ pa deluje s prednastavljeno globino.',
    when: [
      'bi ponujala tretmaje gub, brazgotin in strij',
      'bi gradila storitev z visoko ceno tretmaja',
      'želiš, da ti naprava pomaga tudi pri učenju',
    ],
    compare: {
      tech: 'Vakuumski RF z mikroiglicami',
      form: 'Namizna platforma',
      extra: 'AI Educator + upravljanje igel ANG™',
      use: 'Drobne gube, ohlapna koža, razširjene pore, brazgotine po aknah, strije',
    },
  },
};

export const sl: ShowcaseCopy = {
  seo: {
    name: 'Anti-aging naprave',
    nameShort: 'Anti-aging',
    description: 'Vakuumske RF naprave z mikroiglicami in EMS naprave z mikroiglicami za pomlajevanje kože.',
  },
  hero: {
    titleLines: ['Anti-aging naprava', 'za premium tretmaje.'],
    lead: 'Učvrstitev kože, tretma gub in brazgotin brez operacije, z RF tehnologijo z mikroiglicami ali EMS tehnologijo. Pomagamo ti izbrati napravo, ki ustreza tvojemu salonu, in jo po potrebi popravimo.',
    imageAlt: 'Tretma obraza z mikroiglicami z napravo Bio Pen Q2 v salonu',
  },
  usp: [
    { title: '2 leti polne garancije', sub: 'za vsako novo napravo' },
    { title: 'Lasten servis na Madžarskem', sub: 'hitro popravilo v Érdu' },
    { title: 'Obroki z 0 % EOM', sub: 'za naprave nad 100 000 Ft' },
    { title: 'Osebno svetovanje', sub: 'od ustanoviteljev' },
  ],
  models: {
    title: 'Katera ustreza tvojemu salonu?',
    lead: 'Mobilno ročno pero in namizna AI platforma: za drug namen, v drugem cenovnem razredu.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Primerjava',
    lead: 'Napravi spadata v različni kategoriji, zato se je najbolje odločiti glede na uporabo',
    labels: ['Cena', 'Tehnologija', 'Izvedba', 'Dodatno', 'Uporaba', 'Komu priporočamo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zakaj se splača kupiti anti-aging napravo?',
    lead: 'Kaj je dobro premisliti pred nakupom.',
    imageAlt: 'Pero z mikroiglicami Bio Pen Q2',
    items: [
      {
        title: 'Ciljana učvrstitev',
        text: 'RF z mikroiglicami dovaja toploto neposredno v globlje plasti kože in jo tako učvrsti brez operacije.',
      },
      {
        title: 'Brez okrevanja',
        text: 'Po večini tretmajev se stranka lahko takoj vrne k vsakdanjim opravilom.',
      },
      {
        title: 'Stranke, ki se vračajo',
        text: 'Kolagen se obnavlja več tednov, zato stranke prihajajo na serijo več tretmajev.',
      },
      {
        title: 'Premium cene tretmajev',
        text: 'RF z mikroiglicami in obnova kože z mikroiglicami spadata med storitve salonov z visoko maržo.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Brezobrestni obroki z 0 % EOM za naprave nad 100 000 Ft: 50 % predplačilo, preostanek v mesečnih obrokih. Brez stroškov obdelave in brez skritih stroškov.',
  },
  consult,
  faq: {
    title: 'Pogosta vprašanja',
    lead: 'Najpogostejša vprašanja o anti-aging napravah. Če ne najdeš odgovora, nas vprašaj neposredno.',
    items: [
      {
        question: 'Kakšna je razlika med AESTIQ AI in Bio Pen Q2?',
        answer: 'Bio Pen Q2 je kompaktno brezžično pero z mikroiglicami, EMS elektroporacijo in LED fototerapijo. AESTIQ AI je vakuumski RF sistem z mikroiglicami višjega razreda, ki združuje radiofrekvenco, vakuumsko stabilizacijo kože, sistem AI Educator in upravljanje igel ANG™.',
      },
      {
        question: 'S katero naj začnem, če zdaj uvajam tretmaje z mikroiglicami?',
        answer: 'Bio Pen Q2 je dober začetek: majhna naložba, preprosto se vključi v obstoječo ponudbo, v eni ročni napravi pa dobiš microneedling, EMS elektroporacijo in LED fototerapijo 470/630 nm.',
      },
      {
        question: 'Kdaj je bolje izbrati AESTIQ AI?',
        answer: 'Če bi ponujala anti-aging tretmaje, učvrstitev kože, tretmaje brazgotin ali izboljšanje teksture višjega razreda. Poleg mikroigel deluje z RF energijo, kožo stabilizira z vakuumom, AI Educator in ANG™ pa pomagata tudi pri delu terapevtke.',
      },
      {
        question: 'Je tudi Bio Pen Q2 radiofrekvenčna naprava?',
        answer: 'Ne, in to je pomembna razlika. Bio Pen Q2 uporablja EMS mikrotok (elektroporacijo). Pravi RF z mikroiglicami ima AESTIQ AI.',
      },
      {
        question: 'Kdaj je viden rezultat?',
        answer: 'Takoj po tretmaju je čutiti rahlo učvrstitev. Pri RF tretmaju z mikroiglicami z napravo AESTIQ AI pravi rezultat dozori z obnovo kolagena v 3-6 mesecih, serija pa obsega 3-4 tretmaje.',
      },
    ],
  },
  visit,
};

/**
 * Stran kategorije hydrafacial - slovensko besedilo (prevod ./hu.ts).
 * Cene, specifikacije in slike prihajajo iz JSON-ov izdelkov.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.sl';

const models: Record<string, ShowcaseModelCopy> = {
  hydrascanpro: {
    name: 'HydraScan PRO+',
    keySpec: '7 nastavkov',
    tagline: 'pametna analiza kože',
    forWho: 'AI analiza, premium kabina',
    desc: 'Večnamenska naprava, osredotočena na hidrodermabrazijo, s 4K kamero in analizo kože z umetno inteligenco. Na podlagi analize priporoči tretma, izdelke in domačo nego, digitalna kartoteka strank pa vse dokumentira.',
    when: [
      'bi tretma začela z analizo kože',
      'bi prihodek povečala tudi s priporočanjem izdelkov',
      'bi dokumentirala napredek stranke',
    ],
    compare: {
      tech: 'Hidrodermabrazija + AI analiza kože',
      heads: '7 nastavkov',
      ai: '4K kamera s tremi spektri (pribl. 2 min)',
    },
  },
  'hidra-mist-elite': {
    name: 'HydraMIST Elite',
    keySpec: '11 v 1',
    tagline: 'vsestranski sistem',
    forWho: 'Veliko tretmajev z ene naprave',
    desc: '11 možnosti tretmaja v eni napravi: vakuumska hidrodermabrazija, vnos učinkovin s kisikom, radiofrekvenčno učvrstitev in LED kupola s kisikom, v kateri lahko med tretmajem igra glasba.',
    when: [
      'bi z ene naprave ponujala veliko tretmajev obraza',
      'bi ponujala tudi tretmaje s kisikom in RF',
      'bi strankam ponudila premium doživetje',
    ],
    compare: {
      tech: 'Hidrodermabrazija + kisik + RF',
      heads: '11 funkcij (vakuum, UZ, RF, kisik, LED)',
      ai: 'Ne',
    },
  },
  hydralume: {
    name: 'HydraLUME V10',
    keySpec: '12 glav + LED',
    tagline: 'center za nego obraza',
    forWho: 'LED terapija, nega lasišča',
    desc: 'Samostoječi center za nego obraza na kolesih z vortex hidrodermabrazijo, petimi krilnimi LED paneli in 12 nastavki. Globinsko čiščenje, učvrstitev, tretma aken in nega lasišča z ene naprave.',
    when: [
      'bi zgradila celovit protokol pomlajevanja',
      'bi ponujala tudi LED svetlobno terapijo',
      'je nega lasišča del tvoje ponudbe',
    ],
    compare: {
      tech: 'Vortex hidrodermabrazija + LED',
      heads: '12 nastavkov + 5 krilnih LED panelov',
      ai: 'Ne',
    },
  },
};

export const sl: ShowcaseCopy = {
  seo: {
    name: 'Hidrodermabrazija in večnamenske naprave',
    nameShort: 'Hydrafacial naprave',
    description: 'Hidrodermabrazijske in kombinirane kozmetične naprave.',
  },
  hero: {
    titleLines: ['Hydrafacial naprava,', 'ob kateri koža zasije.'],
    lead: 'Globinsko čiščenje, vlaženje in pomlajevanje kože v eni napravi, z vidnim rezultatom že po prvem tretmaju. Pomagamo ti izbrati napravo, ki ustreza tvojemu salonu, te usposobimo in jo po potrebi popravimo.',
    imageAlt: 'Usposabljanje za delo z napravo HydraScan PRO+ v Skinlab razstavnem salonu',
  },
  usp: [
    { title: '2 leti polne garancije', sub: 'za vsako novo napravo' },
    { title: 'Individualno usposabljanje', sub: 'v našem razstavnem salonu' },
    { title: 'Lasten servis na Madžarskem', sub: 'hitro popravilo v Érdu' },
    { title: 'Obroki z 0 % EOM', sub: '50 % predplačilo + mesečni obroki' },
  ],
  models: {
    title: 'Katera ustreza tvojemu salonu?',
    lead: 'Vse tri temeljijo na hidrodermabraziji. Razlika je v številu nastavkov, dodatnih tehnologijah in v tem, ali potrebuješ analizo kože.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehnična primerjava',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cena', 'Tehnologija', 'Nastavki', 'AI analiza kože', 'Garancija', 'Komu priporočamo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zakaj se splača kupiti hydrafacial napravo?',
    lead: 'Kaj je dobro premisliti pred nakupom.',
    imageAlt: 'Hidrodermabrazijski tretma obraza s Skinlab napravo v salonu',
    items: [
      {
        title: 'Takojšen rezultat',
        text: 'Že po prvem tretmaju je koža vidno lepša in bolj sijoča. Stranka razliko občuti takoj.',
      },
      {
        title: 'Vsestranski tretmaji',
        text: 'Čiščenje, vlaženje, anti-aging in tretma pigmentnih madežev z eno napravo.',
      },
      {
        title: 'Tretma, ki se dobro zaračuna',
        text: 'Saloni lahko za hydrafacial tretma zaračunajo 15 000-30 000 Ft, zato se naprava lahko hitro povrne.',
      },
      {
        title: 'Analiza kože pred stranko',
        text: '4K kamera naprave HydraScan PRO+ pokaže stanje kože in na podlagi tega priporoči tretma in domačo nego.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Brezobrestni obroki z 0 % EOM: 50 % predplačilo, preostanek v 3 ali 6 mesečnih obrokih. Brez stroškov obdelave in brez skritih stroškov.',
  },
  training: {
    titleLines: ['Tega se ne boš učila sama.', 'Naučimo te vsega.'],
    text: 'Individualno usposabljanje za delo z napravo v našem razstavnem salonu: predamo ti lastno preizkušeno tehniko, tudi po usposabljanju pa lahko računaš na našo strokovno podporo.',
    cta: 'Naša usposabljanja',
  },
  consult,
  faq: {
    title: 'Pogosta vprašanja',
    lead: 'Najpogostejša vprašanja o hydrafacial tretmaju. Če ne najdeš odgovora, nas vprašaj neposredno.',
    items: [
      {
        question: 'Kakšna je razlika med klasičnim čiščenjem obraza in hydrafacialom?',
        answer: 'Hydrafacial deluje z vakuumsko tehnologijo, ki poleg globinskega čiščenja zagotavlja tudi infuzijo seruma. Je neboleč, ne povzroča rdečice in stranka lahko takoj nadaljuje svoj dan. Po klasičnem čiščenju je obraz pogosto več dni rdeč.',
      },
      {
        question: 'Kako pogosto se lahko izvaja hydrafacial tretma?',
        answer: 'Vzdrževalni tretma se običajno priporoča vsakih 4-6 tednov. Kot paket se za izboljšanje stanja kože lahko izvaja tudi tedensko. Je zelo nežen postopek.',
      },
      {
        question: 'Ali je primeren za vse tipe kože?',
        answer: 'Da. Hydrafacial je eden najnežnejših tretmajev obraza, uporaben tudi na občutljivi koži in pri rozacei. Ne priporoča se le pri aktivnih vnetnih aknah.',
      },
    ],
  },
  visit: {
    title: 'Preizkusi jo v živo v Érdu.',
    text: 'Pridi v naš razstavni salon in si oglej naprave v živo, preden se odločiš.',
    booking: 'Po predhodnem dogovoru',
    demoCta: 'Želim predstavitev',
  },
};

/**
 * Kategorija ND:YAG laserjev - Slovenian copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.sl';

const models: Record<string, ShowcaseModelCopy> = {
  pixelcarbonlezer: {
    name: 'PIXEL',
    keySpec: '4 nastavki · 1200 mJ',
    tagline: 'kompaktni carbon laser',
    forWho: 'Kompakten začetek, carbon peeling',
    desc: 'Namizni Q-switched ND:YAG laser s 4 nastavki za tretma (532, 755, 1064 in 1320 nm): carbon peeling, izboljšanje videza kože, posvetlitev pigmenta in tetovaž v enem sistemu. Zaprto vodno hlajenje, 4,3" zaslon na dotik, prostor najde tudi na majhni površini.',
    when: [
      'bi ponudbo razširila s carbon peelingom',
      'imaš v prostoru za tretmaje malo prostora',
      'bi začela z manjšo naložbo',
    ],
    compare: {
      waves: '532 + 755 + 1064 + 1320 nm (4 nastavki)',
      screen: '4,3" zaslon na dotik',
      cooling: 'Zaprt sistem vodnega hlajenja',
    },
  },
  frame: {
    name: 'FRAME',
    keySpec: '4 valovne dolžine',
    tagline: 'pametni laser z Androidom',
    forWho: 'Tetovaže, pigmentne lise, carbon',
    desc: 'ND:YAG laser z Androidom, 13,3" zaslonom na dotik, 4 valovnimi dolžinami in vgrajenim hlajenjem nastavka. Za odstranjevanje tetovaž in pigmentnih lis ter za carbon peeling.',
    when: [
      'bi ponujala tudi odstranjevanje tetovaž',
      'bi delala z več barvami',
      'si želiš velik, pregleden uporabniški vmesnik',
    ],
    compare: {
      waves: '4 valovne dolžine',
      screen: '13,3" zaslon na dotik z Androidom',
      cooling: 'Vgrajeno hlajenje nastavka',
    },
  },
};

export const sl: ShowcaseCopy = {
  seo: {
    name: 'Q-switched ND:YAG laserske naprave',
    nameShort: 'ND:YAG laserji',
    description: 'Laserji za odstranjevanje tetovaž in pigmentnih lis.',
  },
  hero: {
    titleLines: ['ND:YAG laser, s katerim', 'izgine tudi tetovaža.'],
    lead: 'Odstranjevanje tetovaž in pigmentnih lis ter carbon peeling s tehnologijo Q-switched. Pomagamo ti izbrati napravo, ki ustreza tvojemu salonu, te usposobimo in jo po potrebi popravimo.',
    imageAlt: 'Tretma carbon peeling z laserjem PIXEL ND:YAG, z zaščitnimi očali',
  },
  usp: [
    { title: '2 leti polne garancije', sub: 'za vsako novo napravo' },
    { title: 'Usposabljanje s certifikatom FAR', sub: 'v majhni skupini, z modelom' },
    { title: 'Lasten servis na Madžarskem', sub: 'hitro popravilo v Érdu' },
    { title: 'Obroki z 0 % EOM', sub: '50 % predplačilo + mesečni obroki' },
  ],
  models: {
    title: 'Kateri ustreza tvojemu salonu?',
    lead: 'Oba sta Q-switched ND:YAG laserja. Razlika je v številu valovnih dolžin, uporabniškem vmesniku in hlajenju.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehnična primerjava',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cena', 'Valovne dolžine', 'Zaslon', 'Hlajenje nastavka', 'Komu priporočamo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zakaj kupiti ND:YAG laser?',
    lead: 'Kaj je dobro premisliti pred nakupom.',
    imageAlt: 'Laserska naprava PIXEL ND:YAG v razstavnem salonu',
    items: [
      {
        title: 'Kos je tudi težkim barvam',
        text: 'Q-switched ND:YAG laser obravnava tudi zelene in modre tetovaže, ki jih je težje odstraniti.',
      },
      {
        title: 'Carbon peeling',
        text: 'Znan tudi kot Hollywood peeling: takojšen sij, manjše pore, bolj uravnotežena mastna koža.',
      },
      {
        title: 'Tretma pigmentnih lis',
        text: 'Posvetlitev sončnih in starostnih peg ter trajnega ličenja, s pravilno izbiro valovne dolžine.',
      },
      {
        title: 'Visoka marža',
        text: 'Saloni lahko za odstranjevanje tetovaže zaračunajo 15-50 000 Ft na obisk, za carbon peeling pa 8-15 000 Ft.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Brezobrestni obroki z 0 % EOM: 50 % predplačilo, preostanek v 3 ali 6 mesečnih obrokih. Brez stroškov obdelave in brez skritih stroškov.',
  },
  training: {
    titleLines: ['Tega se ne boš učila sama.', 'Naučimo te vsega.'],
    text: 'Usposabljanje za upravljavce Q-switched ND:YAG laserja za največ 4 osebe: pravilna izbira valovnih dolžin in parametrov, carbon peeling, odstranjevanje trajnega ličenja in pigmentnih lis, s prakso na modelu. Prejmeš certifikat, registriran v FAR, s številko B.',
    cta: 'Podrobnosti usposabljanja',
  },
  consult,
  faq: {
    title: 'Pogosta vprašanja',
    lead: 'Najpogostejša vprašanja o ND:YAG laserjih. Če ne najdeš odgovora, nas vprašaj neposredno.',
    items: [
      {
        question: 'Katero napravo naj izberem?',
        answer: 'PIXEL je kompaktna namizna naprava za začetek s 4 nastavki za tretma (532, 755, 1064 in 1320 nm): carbon peeling, izboljšanje videza kože, posvetlitev pigmenta in tetovaž v enem sistemu. FRAME s 4 valovnimi dolžinami, zaslonom na dotik z Androidom in vgrajenim hlajenjem nastavka pokriva tretmaje tetovaž, pigmentnih lis in carbon peeling.',
      },
      {
        question: 'Koliko obiskov je potrebnih za popolno odstranitev tetovaže?',
        answer: 'Odvisno od velikosti, barve in starosti tetovaže. V povprečju je potrebnih 6-12 tretmajev v razmikih 6-8 tednov. Črna in temne barve izginejo hitreje.',
      },
      {
        question: 'Ali je odstranjevanje tetovaže boleče?',
        answer: 'Z ustreznim hlajenjem je nelagodje zmerno. Mnogi ga primerjajo z izdelavo tetovaže: neprijetno, a znosno. Uporabiš lahko tudi anestetično kremo.',
      },
      {
        question: 'Kaj je carbon peeling in komu je priporočen?',
        answer: 'Pri carbon peelingu naneseš na obraz masko iz oglja in jo odstraniš z laserjem. Priporočen je za mastno kožo, nagnjeno k aknam, in razširjene pore. Rezultat je viden takoj, brez časa okrevanja.',
      },
    ],
  },
  visit,
};

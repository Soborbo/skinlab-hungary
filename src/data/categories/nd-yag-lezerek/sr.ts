/**
 * Kategorija ND:YAG lasera - Serbian (Latin) copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.sr';

const models: Record<string, ShowcaseModelCopy> = {
  pixelcarbonlezer: {
    name: 'PIXEL',
    keySpec: '4 nastavka · 1200 mJ',
    tagline: 'kompaktni carbon laser',
    forWho: 'Kompaktan početak, carbon peeling',
    desc: 'Stoni Q-switched ND:YAG laser sa 4 nastavka za tretman (532, 755, 1064 i 1320 nm): carbon peeling, poboljšanje izgleda kože, posvetljivanje pigmenta i tetovaža u jednom sistemu. Zatvoreno vodeno hlađenje, ekran osetljiv na dodir od 4,3", staje i na malo prostora.',
    when: [
      'želiš da proširiš ponudu carbon peelingom',
      'u prostoriji za tretmane imaš malo mesta',
      'želiš da kreneš sa manjim ulaganjem',
    ],
    compare: {
      waves: '532 + 755 + 1064 + 1320 nm (4 nastavka)',
      screen: 'Ekran osetljiv na dodir od 4,3"',
      cooling: 'Zatvoreni sistem vodenog hlađenja',
    },
  },
  frame: {
    name: 'FRAME',
    keySpec: '4 talasne dužine',
    tagline: 'pametni laser sa Androidom',
    forWho: 'Tetovaže, pigmentne fleke, carbon',
    desc: 'ND:YAG laser sa Androidom, ekranom osetljivim na dodir od 13,3", 4 talasne dužine i ugrađenim hlađenjem nastavka. Za uklanjanje tetovaža i pigmentnih fleka, kao i za carbon peeling.',
    when: [
      'želiš da nudiš i uklanjanje tetovaža',
      'radila bi sa više boja',
      'želiš veliki, pregledan korisnički interfejs',
    ],
    compare: {
      waves: '4 talasne dužine',
      screen: 'Android ekran osetljiv na dodir od 13,3"',
      cooling: 'Ugrađeno hlađenje nastavka',
    },
  },
};

export const sr: ShowcaseCopy = {
  seo: {
    name: 'Q-switched ND:YAG laserski uređaji',
    nameShort: 'ND:YAG laseri',
    description: 'Laseri za uklanjanje tetovaža i pigmentnih fleka.',
  },
  hero: {
    titleLines: ['ND:YAG laser sa kojim', 'nestaje i tetovaža.'],
    lead: 'Uklanjanje tetovaža i pigmentnih fleka i carbon peeling Q-switched tehnologijom. Pomoći ćemo ti da izabereš uređaj koji odgovara tvom salonu, obučićemo te i, ako treba, popraviti ga.',
    imageAlt: 'Carbon peeling tretman laserom PIXEL ND:YAG, sa zaštitnim naočarima',
  },
  usp: [
    { title: '2 godine pune garancije', sub: 'na svaki novi uređaj' },
    { title: 'Obuka sa FAR sertifikatom', sub: 'u maloj grupi, sa modelom' },
    { title: 'Sopstveni servis u Mađarskoj', sub: 'brza popravka u Érdu' },
    { title: 'Plaćanje na rate uz 0% EKS', sub: '50% avans + mesečne rate' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'Oba su Q-switched ND:YAG laseri. Razlika je u broju talasnih dužina, korisničkom interfejsu i hlađenju.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehničko poređenje',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cena', 'Talasne dužine', 'Ekran', 'Hlađenje nastavka', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto kupiti ND:YAG laser?',
    lead: 'Šta je dobro promisliti pre kupovine.',
    imageAlt: 'Laserski uređaj PIXEL ND:YAG u izložbenom salonu',
    items: [
      {
        title: 'Uklanja i teške boje',
        text: 'Q-switched ND:YAG laser tretira i zelene i plave tetovaže, koje se teže uklanjaju.',
      },
      {
        title: 'Carbon peeling',
        text: 'Poznat i kao Hollywood peeling: trenutni sjaj, manje pore, uravnoteženija masna koža.',
      },
      {
        title: 'Tretman pigmentnih fleka',
        text: 'Posvetljivanje sunčanih i staračkih fleka i trajne šminke, uz pravilan izbor talasne dužine.',
      },
      {
        title: 'Visoka marža',
        text: 'Saloni za uklanjanje tetovaže mogu da naplate 15-50 000 Ft po tretmanu, a za carbon peeling 8-15 000 Ft.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatno plaćanje na rate uz 0% EKS: 50% avans, ostatak u 3 ili 6 mesečnih rata. Bez naknade za obradu i bez skrivenih troškova.',
  },
  training: {
    titleLines: ['Nećeš to učiti sama.', 'Naučićemo te svemu.'],
    text: 'Obuka za rukovaoce Q-switched ND:YAG laserom za najviše 4 osobe: pravilan izbor talasnih dužina i parametara, carbon peeling, uklanjanje trajne šminke i pigmentnih fleka, uz praksu na modelu. Dobijaš sertifikat registrovan u FAR-u, sa B brojem.',
    cta: 'Detalji obuke',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o ND:YAG laserima. Ako ne pronađeš odgovor, pitaj nas direktno.',
    items: [
      {
        question: 'Koji uređaj da izaberem?',
        answer: 'PIXEL je kompaktan stoni uređaj za početak sa 4 nastavka za tretman (532, 755, 1064 i 1320 nm): carbon peeling, poboljšanje izgleda kože, posvetljivanje pigmenta i tetovaža u jednom sistemu. FRAME sa 4 talasne dužine, Android ekranom osetljivim na dodir i ugrađenim hlađenjem nastavka pokriva tretmane tetovaža, pigmentnih fleka i carbon peeling.',
      },
      {
        question: 'Koliko je tretmana potrebno za potpuno uklanjanje tetovaže?',
        answer: 'Zavisi od veličine, boje i starosti tetovaže. U proseku je potrebno 6-12 tretmana, u razmacima od 6-8 nedelja. Crna i tamne boje nestaju brže.',
      },
      {
        question: 'Da li je uklanjanje tetovaže bolno?',
        answer: 'Uz odgovarajuće hlađenje nelagodnost je umerena. Mnogi je porede sa izradom tetovaže: neprijatno, ali podnošljivo. Može da se koristi i krema za anesteziju.',
      },
      {
        question: 'Šta je carbon peeling i kome se preporučuje?',
        answer: 'Kod carbon peelinga na lice naneseš masku od ugljena i uklanjaš je laserom. Preporučuje se za masnu kožu sklonu aknama i proširene pore. Rezultat je odmah vidljiv, bez vremena oporavka.',
      },
    ],
  },
  visit,
};

/**
 * Kategorija ND:YAG lasera - Croatian copy (translation of ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.hr';

const models: Record<string, ShowcaseModelCopy> = {
  pixelcarbonlezer: {
    name: 'PIXEL',
    keySpec: '4 nastavka · 1200 mJ',
    tagline: 'kompaktni carbon laser',
    forWho: 'Kompaktni početak, carbon peeling',
    desc: 'Stolni Q-switched ND:YAG laser s 4 nastavka za tretman (532, 755, 1064 i 1320 nm): carbon peeling, poboljšanje izgleda kože, posvjetljivanje pigmenta i tetovaža u jednom sustavu. Zatvoreno vodeno hlađenje, zaslon osjetljiv na dodir od 4,3", stane i na malo mjesta.',
    when: [
      'želiš ponudu proširiti carbon peelingom',
      'u prostoriji za tretmane imaš malo mjesta',
      'želiš krenuti s manjim ulaganjem',
    ],
    compare: {
      waves: '532 + 755 + 1064 + 1320 nm (4 nastavka)',
      screen: 'Zaslon osjetljiv na dodir od 4,3"',
      cooling: 'Zatvoreni sustav vodenog hlađenja',
    },
  },
  frame: {
    name: 'FRAME',
    keySpec: '4 valne duljine',
    tagline: 'pametni laser s Androidom',
    forWho: 'Tetovaže, pigmentne mrlje, carbon',
    desc: 'ND:YAG laser s Androidom, zaslonom osjetljivim na dodir od 13,3", 4 valne duljine i ugrađenim hlađenjem nastavka. Za uklanjanje tetovaža i pigmentnih mrlja te za carbon peeling.',
    when: [
      'želiš nuditi i uklanjanje tetovaža',
      'radila bi s više boja',
      'želiš veliko, pregledno korisničko sučelje',
    ],
    compare: {
      waves: '4 valne duljine',
      screen: 'Android zaslon osjetljiv na dodir od 13,3"',
      cooling: 'Ugrađeno hlađenje nastavka',
    },
  },
};

export const hr: ShowcaseCopy = {
  seo: {
    name: 'Q-switched ND:YAG laserski uređaji',
    nameShort: 'ND:YAG laseri',
    description: 'Laseri za uklanjanje tetovaža i pigmentnih mrlja.',
  },
  hero: {
    titleLines: ['ND:YAG laser s kojim', 'nestaje i tetovaža.'],
    lead: 'Uklanjanje tetovaža i pigmentnih mrlja te carbon peeling Q-switched tehnologijom. Pomoći ćemo ti odabrati uređaj koji odgovara tvom salonu, obučit ćemo te i, ako treba, popraviti ga.',
    imageAlt: 'Carbon peeling tretman laserom PIXEL ND:YAG, sa zaštitnim naočalama',
  },
  usp: [
    { title: '2 godine potpunog jamstva', sub: 'na svaki novi uređaj' },
    { title: 'Edukacija s FAR certifikatom', sub: 'u maloj grupi, s modelom' },
    { title: 'Vlastiti servis u Mađarskoj', sub: 'brz popravak u Érdu' },
    { title: 'Obročna otplata uz 0% EKS', sub: '50% predujam + mjesečne rate' },
  ],
  models: {
    title: 'Koji odgovara tvom salonu?',
    lead: 'Oba su Q-switched ND:YAG laseri. Razlika je u broju valnih duljina, korisničkom sučelju i hlađenju.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Tehnička usporedba',
    lead: 'Glavne razlike na prvi pogled',
    labels: ['Cijena', 'Valne duljine', 'Zaslon', 'Hlađenje nastavka', 'Kome preporučujemo'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Zašto kupiti ND:YAG laser?',
    lead: 'Što je dobro promisliti prije kupnje.',
    imageAlt: 'Laserski uređaj PIXEL ND:YAG u izložbenom salonu',
    items: [
      {
        title: 'Uklanja i teške boje',
        text: 'Q-switched ND:YAG laser tretira i zelene i plave tetovaže, koje se teže uklanjaju.',
      },
      {
        title: 'Carbon peeling',
        text: 'Poznat i kao Hollywood peeling: trenutačan sjaj, manje pore, uravnoteženija masna koža.',
      },
      {
        title: 'Tretman pigmentnih mrlja',
        text: 'Posvjetljivanje sunčanih i staračkih mrlja te trajnog make-upa, uz pravilan odabir valne duljine.',
      },
      {
        title: 'Visoka marža',
        text: 'Saloni za uklanjanje tetovaže mogu naplatiti 15-50 000 Ft po tretmanu, a za carbon peeling 8-15 000 Ft.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Beskamatna obročna otplata uz 0% EKS: 50% predujam, ostatak u 3 ili 6 mjesečnih rata. Bez naknade za obradu i bez skrivenih troškova.',
  },
  training: {
    titleLines: ['Nećeš to učiti sama.', 'Naučit ćemo te svemu.'],
    text: 'Edukacija za rukovatelje Q-switched ND:YAG laserom za najviše 4 osobe: pravilan odabir valnih duljina i parametara, carbon peeling, uklanjanje trajnog make-upa i pigmentnih mrlja, uz praksu na modelu. Dobivaš certifikat registriran u FAR-u, s B-brojem.',
    cta: 'Detalji edukacije',
  },
  consult,
  faq: {
    title: 'Česta pitanja',
    lead: 'Najčešća pitanja o ND:YAG laserima. Ako ne pronađeš odgovor, pitaj nas izravno.',
    items: [
      {
        question: 'Koji uređaj da odaberem?',
        answer: 'PIXEL je kompaktni stolni uređaj za početak s 4 nastavka za tretman (532, 755, 1064 i 1320 nm): carbon peeling, poboljšanje izgleda kože, posvjetljivanje pigmenta i tetovaža u jednom sustavu. FRAME s 4 valne duljine, Android zaslonom osjetljivim na dodir i ugrađenim hlađenjem nastavka pokriva tretmane tetovaža, pigmentnih mrlja i carbon peeling.',
      },
      {
        question: 'Koliko je tretmana potrebno za potpuno uklanjanje tetovaže?',
        answer: 'Ovisi o veličini, boji i starosti tetovaže. U prosjeku je potrebno 6-12 tretmana, u razmacima od 6-8 tjedana. Crna i tamne boje nestaju brže.',
      },
      {
        question: 'Je li uklanjanje tetovaže bolno?',
        answer: 'Uz odgovarajuće hlađenje nelagoda je umjerena. Mnogi je uspoređuju s izradom tetovaže: neugodno, ali podnošljivo. Može se koristiti i krema za anesteziju.',
      },
      {
        question: 'Što je carbon peeling i kome se preporučuje?',
        answer: 'Kod carbon peelinga na lice naneseš masku od ugljena i uklanjaš je laserom. Preporučuje se za masnu kožu sklonu aknama i proširene pore. Rezultat je odmah vidljiv, bez vremena oporavka.',
      },
    ],
  },
  visit,
};

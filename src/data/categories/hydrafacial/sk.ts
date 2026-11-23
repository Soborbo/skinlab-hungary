/**
 * Stránka kategórie hydrafacial - slovenský text (preklad ./hu.ts).
 * Ceny, špecifikácie a obrázky sú z produktových JSON.
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews } from '../common.sk';

const models: Record<string, ShowcaseModelCopy> = {
  hydrascanpro: {
    name: 'HydraScan PRO+',
    keySpec: '8 hlavíc',
    tagline: 'inteligentná analýza pleti',
    forWho: 'AI analýza, prémiová kabína',
    desc: 'Multifunkčné zariadenie postavené na hydrodermabrázii so 4K kamerou a analýzou pleti s umelou inteligenciou. Podľa analýzy odporučí ošetrenie, produkty aj domácu starostlivosť a digitálna karta klienta všetko zdokumentuje.',
    when: [
      'chceš ošetrenie začínať analýzou pleti',
      'chceš zvýšiť tržby aj odporúčaním produktov',
      'chceš dokumentovať pokroky klientky',
    ],
    compare: {
      tech: 'Hydrodermabrázia + AI analýza pleti',
      heads: '8 hlavíc (vrátane LED masky)',
      ai: '4K kamera s tromi spektrami (cca 2 min)',
    },
  },
  'hidra-mist-elite': {
    name: 'HydraMIST Elite',
    keySpec: '11 v 1',
    tagline: 'všestranný systém',
    forWho: 'Veľa ošetrení z jedného zariadenia',
    desc: '11 možností ošetrenia v jednom zariadení: vákuová hydrodermabrázia, kyslíková aplikácia účinných látok, rádiofrekvenčné spevnenie a LED kyslíková kupola, v ktorej môže počas ošetrenia hrať hudba.',
    when: [
      'chceš ponúkať veľa ošetrení pleti z jedného zariadenia',
      'chceš ponúkať aj kyslíkové a RF ošetrenia',
      'chceš klientkam dopriať prémiový zážitok',
    ],
    compare: {
      tech: 'Hydrodermabrázia + kyslík + RF',
      heads: '11 funkcií (vákuum, UZ, RF, kyslík, LED)',
      ai: 'Nie',
    },
  },
  hydralume: {
    name: 'HydraLUME V10',
    keySpec: '12 hlavíc + LED',
    tagline: 'centrum starostlivosti o pleť',
    forWho: 'LED terapia, starostlivosť o pokožku hlavy',
    desc: 'Stojanové pojazdné centrum starostlivosti o pleť s vortex hydrodermabráziou, piatimi krídlovými LED panelmi a 12 hlavicami. Hĺbkové čistenie, spevnenie, ošetrenie akné a starostlivosť o pokožku hlavy z jedného zariadenia.',
    when: [
      'chceš zostaviť kompletný omladzujúci protokol',
      'chceš ponúkať aj LED svetelnú terapiu',
      'starostlivosť o pokožku hlavy patrí do tvojej ponuky',
    ],
    compare: {
      tech: 'Vortex hydrodermabrázia + LED',
      heads: '12 hlavíc + 5 krídlových LED panelov',
      ai: 'Nie',
    },
  },
};

export const sk: ShowcaseCopy = {
  seo: {
    name: 'Hydrodermabrázia a multifunkčné zariadenia',
    nameShort: 'Hydrafacial zariadenia',
    description: 'Hydrodermabrázne a kombinované kozmetické zariadenia.',
  },
  hero: {
    titleLines: ['Hydrafacial zariadenie,', 'po ktorom pleť žiari.'],
    lead: 'Hĺbkové čistenie, hydratácia a omladenie pleti v jednom zariadení, s viditeľným výsledkom hneď po prvom ošetrení. Pomôžeme ti vybrať zariadenie, ktoré sa hodí do tvojho salónu, zaškolíme ťa, a keď treba, opravíme ho.',
    imageAlt: 'Školenie obsluhy HydraScan PRO+ v showroome Skinlab',
  },
  usp: [
    { title: 'Plná záruka 2 roky', sub: 'na každé nové zariadenie' },
    { title: 'Individuálne školenie obsluhy', sub: 'v našom showroome' },
    { title: 'Vlastný servis v Maďarsku', sub: 'rýchla oprava v Érde' },
    { title: 'Splátky s 0 % RPMN', sub: '50 % záloha + mesačné splátky' },
  ],
  models: {
    title: 'Ktoré sa hodí do tvojho salónu?',
    lead: 'Všetky tri stoja na hydrodermabrázii. Líšia sa počtom hlavíc, doplnkovými technológiami a tým, či potrebuješ analýzu pleti.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Technické porovnanie',
    lead: 'Hlavné rozdiely na prvý pohľad',
    labels: ['Cena', 'Technológia', 'Hlavice', 'AI analýza pleti', 'Záruka', 'Pre koho'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'Prečo sa oplatí kúpiť hydrafacial zariadenie?',
    lead: 'Čo je dobré si pred kúpou premyslieť.',
    imageAlt: 'Hydrodermabrázne ošetrenie pleti zariadením Skinlab v salóne',
    items: [
      {
        title: 'Okamžitý výsledok',
        text: 'Hneď po prvom ošetrení je pleť viditeľne krajšia a žiarivejšia. Klientka rozdiel cíti okamžite.',
      },
      {
        title: 'Všestranné ošetrenia',
        text: 'Čistenie, hydratácia, anti-aging a ošetrenie pigmentových škvŕn jedným zariadením.',
      },
      {
        title: 'Dobre naceniteľné ošetrenie',
        text: 'Za hydrafacial ošetrenie si salóny môžu účtovať 15 000-30 000 Ft, takže sa zariadenie môže rýchlo vrátiť.',
      },
      {
        title: 'Analýza pleti pred klientkou',
        text: '4K kamera HydraScan PRO+ ukáže stav pleti a podľa neho odporučí ošetrenie aj domácu starostlivosť.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Bezúročné splátky s 0 % RPMN: 50 % záloha, zvyšok v 3 alebo 6 mesačných splátkach. Žiadny poplatok za vybavenie a žiadne skryté náklady.',
  },
  training: {
    titleLines: ['Nebudeš sa to učiť sama.', 'Všetko ťa naučíme.'],
    text: 'Individuálne školenie obsluhy v našom showroome: odovzdáme ti vlastnú osvedčenú techniku a aj po školení sa môžeš spoľahnúť na našu odbornú podporu.',
    cta: 'Naše školenia',
  },
  consult,
  faq: {
    title: 'Časté otázky',
    lead: 'Najčastejšie otázky o ošetrení hydrafacial. Ak nenájdeš odpoveď, opýtaj sa nás priamo.',
    items: [
      {
        question: 'Aký je rozdiel medzi klasickým čistením pleti a hydrafacial?',
        answer: 'Hydrafacial pracuje s vákuovou technológiou, ktorá okrem hĺbkového čistenia zabezpečuje aj infúziu séra. Je bezbolestný, nespôsobuje začervenanie a klientka môže hneď pokračovať v dni. Po klasickom čistení býva tvár často niekoľko dní červená.',
      },
      {
        question: 'Ako často sa dá hydrafacial ošetrenie robiť?',
        answer: 'Udržiavacie ošetrenie sa zvyčajne odporúča každé 4-6 týždňov. Ako kúru ho na zlepšenie stavu pleti možno robiť aj každý týždeň. Je to veľmi šetrný postup.',
      },
      {
        question: 'Hodí sa pre všetky typy pleti?',
        answer: 'Áno. Hydrafacial je jedno z najšetrnejších ošetrení pleti, dá sa použiť aj na citlivú pleť a rosaceu. Neodporúča sa iba pri aktívnom zápalovom akné.',
      },
    ],
  },
  visit: {
    title: 'Vyskúšaj si to naživo v Érde.',
    text: 'Príď do nášho showroomu a pozri si zariadenia naživo, kým sa rozhodneš.',
    booking: 'Po predchádzajúcej rezervácii termínu',
    demoCta: 'Chcem ukážku',
  },
};

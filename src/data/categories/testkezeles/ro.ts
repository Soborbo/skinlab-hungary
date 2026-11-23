/**
 * Pagina categoriei de aparate pentru corp - text în limba română (traducerea ./hu.ts).
 */
import type { ShowcaseModelCopy } from '@/lib/category-showcase';
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { compareHelp, consult, financeTexts, reviews, visit } from '../common.ro';

const models: Record<string, ShowcaseModelCopy> = {
  'freeze-me-slim': {
    name: 'FREEZE ME SLIM',
    keySpec: '4 capete simultan',
    tagline: 'aparatul de criolipoliză',
    forWho: 'Reducerea țintită a grăsimii',
    desc: 'Criolipoliză (înghețarea grăsimii) cu 4 capete de tratament utilizabile simultan, cu răcire până la -10 °C. Pachetul include și un cântar de analiză corporală prin bioimpedanță, astfel poți urmări progresul clientei în cifre.',
    when: [
      'vrei să oferi tratarea depozitelor de grăsime rezistente',
      'vrei să tratezi mai multe zone ale corpului simultan',
      'vrei să arăți rezultatul prin măsurători',
    ],
    compare: {
      tech: 'Criolipoliză (înghețarea grăsimii)',
      area: 'Abdomen, talie, coapse, fese, brațe, spate',
    },
  },
  'the-shaper': {
    name: 'THE SHAPER',
    keySpec: '4 tehnologii',
    tagline: 'remodelarea corporală completă',
    forWho: 'Remodelare, celulită, fermitate',
    desc: 'Patru tehnologii într-un singur aparat: masaj cu vacuum și role, radiofrecvență, laser infraroșu de 940 nm și cavitație ultrasonică de 40 kHz. Pentru față și corp, cu aplicatoare separate.',
    when: [
      'vrei să oferi și tratamente pentru celulită',
      'vrei să tratezi și fața, și corpul cu un singur aparat',
      'vrei mai multe tehnologii într-un singur loc',
    ],
    compare: {
      tech: 'Vacuum + role, RF, laser IR, cavitație',
      area: 'Corp și față',
    },
  },
};

export const ro: ShowcaseCopy = {
  seo: {
    name: 'Aparate de remodelare corporală',
    nameShort: 'Tratamente corporale',
    description: 'Criolipoliză, remodelarea conturului și alte aparate pentru modelarea corpului și a siluetei.',
  },
  hero: {
    titleLines: ['Aparat pentru corp:', 'modelezi fără operație.'],
    lead: 'Înghețarea grăsimii, remodelare corporală și tratarea celulitei fără durere și fără timp de recuperare. Te ajutăm să alegi aparatul potrivit salonului tău și, dacă e nevoie, îl reparăm.',
    imageAlt: 'Aparatul de tratament corporal THE SHAPER',
  },
  usp: [
    { title: 'Garanție completă 2 ani', sub: 'pentru fiecare aparat nou' },
    { title: 'Pachet de instruire', sub: 'materiale de curs și protocoale' },
    { title: 'Service propriu în Ungaria', sub: 'reparații rapide la Érd' },
    { title: 'Rate cu DAE 0%', sub: 'avans 50% + rate lunare' },
  ],
  models: {
    title: 'Care se potrivește salonului tău?',
    lead: 'FREEZE ME SLIM lucrează țintit pe depozitele de grăsime, THE SHAPER cu patru tehnologii pe remodelarea corporală completă.',
    copy: models,
  },
  reviews,
  compare: {
    title: 'Comparație',
    lead: 'Diferențele principale dintr-o privire',
    labels: ['Preț', 'Tehnologie', 'Capete de tratament', 'Zona tratată', 'Recomandat pentru'],
    help: compareHelp,
  },
  whyBuy: {
    title: 'De ce merită să cumperi un aparat pentru corp?',
    lead: 'Ce merită să gândești înainte de cumpărare.',
    imageAlt: 'Capul de tratament THE SHAPER în mână',
    items: [
      {
        title: 'Mai multe tehnologii, un singur aparat',
        text: 'THE SHAPER combină masajul cu vacuum și role, RF, laserul infraroșu și cavitația, astfel nu trebuie să cumperi aparate separate.',
      },
      {
        title: 'Mai multe zone simultan',
        text: 'Cele patru capete ale FREEZE ME SLIM lucrează simultan, astfel poți trata în paralel mai multe zone ale corpului.',
      },
      {
        title: 'Cliente care vin pentru o cură',
        text: 'Înghețarea grăsimii este de obicei o cură de 3 ședințe, iar remodelarea corporală de 6-10 ședințe, așa că clienta revine la tine.',
      },
      {
        title: 'Pachet de instruire gata făcut',
        text: 'Materialele de curs, protocoalele de tratament și materialele de informare pentru cliente vin odată cu aparatul, astfel lucrezi profesionist încă de la prima clientă.',
      },
    ],
  },
  finance: {
    ...financeTexts,
    lead: 'Rate fără dobândă cu DAE 0%: avans 50%, restul în 3 sau 6 rate lunare. Fără comision de administrare și fără costuri ascunse.',
  },
  consult,
  faq: {
    title: 'Întrebări frecvente',
    lead: 'Cele mai frecvente întrebări despre aparatele pentru corp. Dacă nu găsești răspunsul, întreabă-ne direct.',
    items: [
      {
        question: 'Cum funcționează înghețarea grăsimii?',
        answer: 'FREEZE ME SLIM răcește controlat celulele adipoase, până la -10 °C. Celulele se cristalizează, iar organismul le descompune și le elimină treptat, pe cale naturală. Rezultatul nu este imediat, apare în decurs de câteva săptămâni.',
      },
      {
        question: 'Câte ședințe are o cură?',
        answer: 'La înghețarea grăsimii sunt recomandate 3 ședințe, la interval de o lună. Cu THE SHAPER, de obicei 6-10 ședințe; protocolul exact depinde de zona tratată și de starea clientei.',
      },
      {
        question: 'Pe ce zone ale corpului se poate folosi THE SHAPER?',
        answer: 'Pe față și gât pentru fermitate și reducerea ridurilor. Pe corp, pe abdomen, talie, șolduri, fese, coapse, brațe și spate pentru remodelare, reducerea celulitei și fermitatea pielii.',
      },
      {
        question: 'Când nu este recomandată înghețarea grăsimii?',
        answer: 'În sarcină, în caz de alergie la frig și în cazul anumitor boli. Înainte de tratament, fiecare clientă trebuie evaluată; fișele de client și protocoalele din pachet te ajută în acest sens.',
      },
      {
        question: 'Ce include prețul?',
        answer: 'Ambele aparate vin cu pachetul complet de instruire (materiale de curs, protocoale de tratament, materiale de informare pentru cliente) și 2 ani de garanție, iar FREEZE ME SLIM și cu sistemul de analiză corporală. Instruirea practică pe modele reale se poate solicita contra cost.',
      },
    ],
  },
  visit,
};

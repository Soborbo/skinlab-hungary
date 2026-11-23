/**
 * Pagina categoriei de produse de tratament (varianta catalog) - text în limba română (traducerea ./hu.ts).
 * Fără promisiuni pentru aparate (garanție, instruire, service) și fără termen de livrare.
 */
import type { ShowcaseCopy } from '@/lib/types/category-showcase';
import { consult, reviews, visit } from '../common.ro';

export const ro: ShowcaseCopy = {
  seo: {
    name: "Cosmetice profesionale M'ONDUNIQ",
    nameShort: "M'ONDUNIQ",
    description: "Produse profesionale de tratament M'ONDUNIQ: hydra-liquiduri, cocktailuri de substanțe active și formule cu exozomi.",
  },
  hero: {
    titleLines: ["Produse M'ONDUNIQ", 'pentru aparatele tale.'],
    lead: 'Hydra-liquiduri pentru aqua peeling, cocktailuri de substanțe active, formule cu exozomi și protocolul complet LaserIQ pentru carbon peeling. Ca distribuitor oficial, livrăm produse originale.',
    imageAlt: "Lichid de tratament M'ONDUNIQ AquametiQ Acid Prime pe o placă de piatră, cu o ramură verde",
  },
  usp: [
    { title: 'Produse originale, oficiale', sub: 'de la distribuitorul oficial' },
    { title: 'Livrare Foxpost sau GLS', sub: 'la locker sau la domiciliu' },
    { title: 'Ridicare personală la Érd', sub: 'în showroomul nostru' },
    { title: 'Protocoale complete', sub: 'de la pregătire la îngrijirea acasă' },
  ],
  catalog: {
    title: 'Produse de tratament pe protocoale',
    lead: 'Pe linii de produse, în ordinea pașilor de tratament, ca să vezi ce îți mai lipsește în munca ta.',
    groups: [
      {
        title: "M'ONDUNIQ LaserIQ: protocol de carbon peeling și laser",
        short: 'Protocol LaserIQ',
        subtitle: 'Pentru toate laserele noastre Nd:YAG (PIXEL, MOSAIC, THE FRAME), în ordinea pașilor din protocol: pregătirea pielii, tratamentul de carbon peeling, regenerarea imediată și, la final, îngrijirea care continuă acasă.',
      },
      {
        title: 'Hydra-liquiduri AquametiQ: lichide pentru aqua peeling',
        short: 'Lichide AquametiQ',
        subtitle: 'Lichide de tratament cu substanțe active, pentru aparatele de hidrodermabraziune și aqua peeling. Patru variante: pregătire acidă, hidratantă, iluminatoare și apă de clătire osmotică.',
      },
      {
        title: 'Cocktailuri de substanțe active, seruri și măști',
        short: 'Cocktailuri, seruri',
        subtitle: 'Pentru mezoterapie cu microace, tratamente nano, electroporație, infuzie de oxigen și protocoale cu plasmă rece.',
      },
      {
        title: 'Exfoliere acidă și îngrijire facială anti-aging',
        short: 'Îngrijire anti-aging',
        subtitle: "Concentratul cu 10% acid fitic pentru exfolierea în cabinet; serul și crema HI'FUsion Longevity, crema pentru zona ochilor LEPIREV™ și masca facială de întinerire Vitamino'MASK, pentru hidratarea pielii și reducerea vizibilității ridurilor.",
      },
    ],
  },
  reviews,
  whyBuy: {
    title: 'De ce să cumperi produse de tratament de la noi?',
    lead: 'Ce merită să știi înainte de comandă.',
    imageAlt: "Serul și crema de față M'ONDUNIQ HI'FUsion Longevity pe tejgheaua salonului, cu un aparat de tratament facial în fundal",
    items: [
      {
        title: 'Produse originale, oficiale',
        text: 'Ca distribuitor oficial, achiziționăm produsele direct de la producător.',
      },
      {
        title: 'Protocoale complete, nu produse separate',
        text: 'De la pregătirea pielii până la întreținerea acasă, există un produs pentru fiecare pas, într-un sistem în care pașii se completează.',
      },
      {
        title: 'Potrivite aparatelor tale',
        text: 'Carbon peeling, hidrodermabraziune, microneedling, plasmă rece, mezoterapie: toate produsele de tratament într-un singur loc.',
      },
      {
        title: 'Livrare comodă',
        text: 'La un locker Foxpost sau la domiciliu cu GLS, ori personal în showroomul nostru de la Érd.',
      },
    ],
  },
  consult: {
    ...consult,
    title: 'Nu știi ce produs de tratament îți trebuie?',
    needs: [
      'Nu știi care se potrivește aparatului tău',
      'Ai vrea să alcătuiești un protocol',
      'Ai o întrebare despre un produs',
      'Ai nevoie doar de un sfat bun',
    ],
  },
  faq: {
    title: 'Întrebări frecvente',
    lead: 'Cele mai frecvente întrebări despre produsele de tratament. Dacă nu găsești răspunsul, întreabă-ne direct.',
    items: [
      {
        question: 'Ce produs de tratament se potrivește aparatului meu?',
        answer: 'Pentru carbon peeling și laser Nd:YAG, linia LaserIQ; pentru aparatele de hidrodermabraziune și aqua peeling, hydra-liquidurile AquametiQ. Cocktailurile de substanțe active sunt create pentru tratamente cu microace, mezoterapie, electroporație, oxigen și plasmă rece.',
      },
      {
        question: 'Cum primesc comanda?',
        answer: 'O trimitem la un locker Foxpost sau la domiciliu cu GLS, dar o poți ridica și personal din showroomul nostru de la Érd.',
      },
      {
        question: 'Produsele sunt originale?',
        answer: "Da. Ca distribuitor oficial M'ONDUNIQ, achiziționăm produsele direct de la producător.",
      },
    ],
  },
  visit: {
    ...visit,
    title: 'Ridic-o personal la Érd.',
    text: 'Îți poți ridica comanda din showroomul nostru, iar dacă ai întrebări, te ajutăm pe loc.',
    demoCta: 'Cer o programare',
  },
};

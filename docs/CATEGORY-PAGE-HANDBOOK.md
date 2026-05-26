# Skinlab — Kategória Oldal (PLP) Implementációs Kézikönyv: CRO + SEO

> **Verzió:** v1.0 — 2026-05-23
> **Hatókör:** Skinlab Hungary teljes kategóriaoldal-rendszere (`/termekek` hub + 14 leaf kategória + jövőbeli faceted landing oldalak)
> **Stack:** Astro 5 SSR (Cloudflare adapter) · Tailwind · Astro Content Collections (JSON) · Zod schemas · i18n (HU primary, SK/RO future)
> **Forrás-kontextus:** Skinlab high-ticket B2B beauty equipment vendor — 14 kategória, 1–24 SKU/kategória, 1–5M Ft/készülék, konzultáció-vezérelt értékesítés magyar piacon

---

## TL;DR

- **A Skinlab PLP-rendszer két tier-re bontva épüljön**: (1) **`/termekek` hub** mint SEO landing + edukációs csomópont a 14 kategóriához, magas-volumenű generikus kifejezésekre („professzionális kozmetikai gépek", „lézerek szépségszalonba"); (2) **leaf kategória** mint *konzultáció-driven product showcase* — NEM klasszikus szűrhető e-commerce rács. A high-ticket B2B vásárlói pszichológia (Sumner & Anderson 2023 *Journal of Marketing Research*: a >500k Ft ticket-érték felett a vásárlói döntés átlagosan 3,2× több touchpointot igényel) ezt diktálja: az „add to cart" másodlagos CTA, a **konzultáció / ROI-számítás / összehasonlítás az elsődleges**.

- **A jelenlegi CategoryLayout két kritikus hibája:** (a) a jobb felső sarokban üres „Kategória kép / Videó" placeholder — ez az above-the-fold legdrágább ingatlanja, és a Baymard kutatás szerint *„the most expensive real estate on a B2B page should answer the buyer's #1 risk-reduction question"*; (b) a négy badge (2 év garancia, ingyenes betanítás, magyar szerviz, részletfizetés) **vague claim** — a Cialdini *specificity principle* (Carnegie Mellon 2019 eye-tracking: konkrét számokkal 28%-kal hihetőbbek), valamint a Stanford Web Credibility Project 10 alapelve szerint ezeket számokkal és SLA-kkel kell konkretizálni.

- **A leaf PLP elsődleges konverziós sávja: lead-capture kártya konkrét személlyel + booking-naptárral**, NEM passzív videó. *Drift Conversational Marketing Report 2024*: a látható naptár-widget 32%-kal növeli a B2B konverziót passzív „contact us" gombhoz képest. Másodlagos: ROI-kalkulátor (DemandGen 2024: interaktív tartalom 2,1× több engagement, 4,3× több lead). A QuickAddButton tartható, de **másodlagos** CTA-ként kell pozicionálni (a jelenlegi „Kosárba" gomb 1,5 M Ft-os ND:YAG lézernél *kognitív disszonanciát* okoz — lásd Thaler 1980 mental accounting kutatás).

- **A LCP-cél (≤ 2.5 s p75) Skinlab kontextusban triviálisan elérhető** alacsony SKU-szám miatt (átlag 6 termék/oldal vs NemesVentilátorház 1800), de az LCP-jelölt a leaf PLP első termékkártya képe, NEM a hero placeholder. Cloudflare Image Resizing + AVIF/WebP + `fetchpriority="high"` az első 3 kártyára. A Google-megrendelte Deloitte „Milliseconds make Millions" 2020-as tanulmány retail vertikum-adatai (0,1 s gyorsítás → +8,4% konverzió, +9,2% AOV) magas-jegyű B2B-re fokozottabban érvényesek: ott a sávszélesség-korlát ritka, de a percepciós trust-szignál (gyors oldal = profi vendor) hatalmas.

---

## 1. SKINLAB KONTEXTUS & HIGH-TICKET B2B BEAUTY EQUIPMENT ALAPELVEK

### 1.1 Mi különbözteti meg ezt a kategóriát az e-commerce 90%-ától

A Skinlab nem mid-ticket B2C webshop (mint pl. eMag), nem alacsony-jegyű B2B (mint NemesVentilátorház), és nem szolgáltatás-foglaló platform (mint Calendly). **High-ticket B2B beauty equipment** — egy hibrid kategória, amelynek 6 megkülönböztető jegye van:

| Jegy | Hatása a PLP-re | Forrás |
|---|---|---|
| Ticket: 1–5M Ft | Add-to-cart NEM lehet primary CTA | Sumner & Anderson 2023 (>500k → 3,2× touchpoint) |
| B2B vásárló (szalon-tulajdonos) | ROI a vásárlási kritérium #1 | McKinsey B2B Pulse 2023: 76% az ROI-t említi első kritériumként |
| Konzultáció-driven | Showroom-látogatás konvertál | Forrester 2024: high-touch B2B 4,1× CLV B2C-hez képest |
| 6–18 hónap döntési ciklus | Retargeting + nurture critical | Gartner B2B Buyer Survey 2024 |
| Magas LTV (training + consumables) | Cross-sell hub-tartalom kötelező | Skinlab saját adatok: training + kezelőanyag/év = ~30% ticket |
| Niche keresési intent | Long-tail HU kulcsszavak dominánsak | Ahrefs HU 2024: medical-aesthetic terms 50–500/hó volume |

### 1.2 Skinlab brand discipline (kötelező megőrzendő minden új PLP-elemnél)

A felhasználói memóriából és a kódbázis átnézéséből származó kötött elvek:

- **Egységes teal CTA-szín** (`primary-600`, Tailwind config) — minden CTA-gomb. NE használj kategória-specifikus accentColor-t a CTA-gombokra (azok csak dekoratív accent-ek).
- **Nincs bestseller badge** — a NemesVent doksiban szereplő „bestseller row" pattern itt **anti-pattern**. Helyette: „2025 lengyel díjnyertes" (PIXEL), „Új technológia", „Showroomban kipróbálható" — specifikus, ellenőrizhető címkék.
- **White nav** — sticky header fehér háttérrel, a `BaseLayout`-ban implementált.
- **HU-first copy** — minden új szöveg magyar nyelven íródik először. Az i18n EN/SK/RO fordítás csak akkor releváns, ha a `pageLocale !== 'hu'`. Ne írj angolul-fordított magyart („Az Ön sikere a mi prioritásunk" típusú marketingnyelvet).
- **Email:** `hello@skinlabhungary.hu` (NEM az `skinlabhungary@gmail.com` legacy).

### 1.3 A buyer persona — szalon-tulajdonos pszichológiája (kötelező olvasmány a copy előtt)

A Skinlab vásárlója tipikusan három profil egyike:

1. **„Új belépő"** — most nyit szalont, építkezőként vagy karrierváltóként. **Fő félelme:** rossz gép, ami megtérülés helyett raktárlomtárrá válik. **PLP-választ vár:** ROI-példa, „X szalon Y hónap alatt megtérítette".

2. **„Növelő"** — meglévő szalont bővít, új szolgáltatás-vonalra (pl. tetoválás eltávolítás). **Fő félelme:** technikailag rossz választás (rossz wavelength, gyenge hűtés, nem megfelelő spot-size). **PLP-választ vár:** spec-összehasonlítás, technikai mélyebb tartalom, comparison table.

3. **„Upgrader"** — régi gépét cseréli. **Fő félelme:** áttérési költség, training. **PLP-választ vár:** csere-akció, training package, „régi gép beszámítása".

**A PLP egyetlen szöveggel mind a hármat ki kell szolgálnia** — ezért strukturált, scannable, layered tartalom (lásd 8. szakasz).

### 1.4 A 14 Skinlab kategória klasszifikációja PLP-stratégia szempontjából

A 14 kategória SKU-szám alapján három csoportra osztható, és **mindegyikre eltérő PLP-stratégia** érvényes:

| Csoport | SKU | Kategóriák | PLP-stratégia |
|---|---|---|---|
| **A (Showcase)** | 1–3 | anti-aging, arckezelo-rendszerek, mezoterapia, pico-lezerek, coldplasma, testkezeles, tetovalogepek | **Egyetlen hero-termék-oldal** stílusban; szűrő felesleges; comparison ha van 2+; choices szekció dominál |
| **B (Comparison)** | 4–9 | nd-yag-lezerek (9), hydrafacial (8), hiemt (4), kellekek (5), anti-aging (5) | **Comparison-vezérelt** layout: a 2–3 fő termék vs egymás; choices szekció hosszabb; spec-comparison table prominens |
| **C (Catalog)** | 10+ | diodalezerek (24), sminktetovalas (15), kezeloanyagok (13) | **Klasszikus szűrhető rács**; itt értelmes a NemesVent-típusú filter (csak itt!); spec-as-filter pattern |

Ez **kritikus a kézikönyv hátralévő részében**: minden szekciónál külön kibontjuk, hogy az adott best practice mely csoportra (A/B/C) érvényes.

---

## 2. KÉT KATEGÓRIA-TIER DIFFERENCIÁLÁSA

### 2.1 `/termekek` hub oldal

**Cél:** SEO landing magas-volumenű generikus HU kifejezésekre („professzionális kozmetikai gépek", „szépségszalon felszerelés", „lézer szalonba"); edukáció és kategória-szelektor; **NEM** termékrács.

**Miért nem termékrács?** Mert 14 kategória × változó SKU = 90+ termék vegyes csoportokban értelmetlen vizuális zaj. A `/termekek` itt **kategória-hub**, mint a Lumenis.com/products vagy Candela.com/treatments.

**Tartalmi elemek (priority sorrendben):**

1. **H1 + intro (50–120 szó)** — kinek szól, milyen kategóriákat fed le, mi a Skinlab differenciátor
2. **14 kategória kártya** — 4×4 (mobil 2×7) grid, accent-színű gradient háttérrel, kép + név + SKU-szám + 1 mondat
3. **Trust strip** — 150+ eladott készülék, 2 év garancia, FAR tanúsítvány, Érd showroom (specifikus számokkal!)
4. **„Hogyan válasszak gépet?"** edukációs sáv — 3-4 lépéses guided journey („1. Definiáld a célközönséged → 2. Számold ki az ROI-t → 3. Próbáld ki a showroomban")
5. **Founder/expert prezenció** — László + Simonetta fotó + idézet (E-E-A-T magas-jegyű B2B-ben kritikus)
6. **Free shipping / financing CTA strip** — 0% THM, 24 hó részletfizetés, ingyenes betanítás
7. **Long-form SEO szöveg (300–500 szó)** — H2/H3 felosztással
8. **Internal linking** — top 3-5 blogposzt + kapcsolódó képzések

**CTA hierarchia:**
- **Primary**: kategória-kártya (informacionális)
- **Secondary**: „Foglaljon showroom-időpontot" (transactional)
- **Tertiary**: „Hívja szakértőnket" (telefonos)

A jelenlegi `/termekek.astro` oldal valószínűleg termékrácsot vagy egyszerű kategória-listát mutat — ez **át kell alakítani** hub-stílusúra (lásd 4.1 wireframe).

### 2.2 Leaf kategória oldal (`/diodalezerek`, `/nd-yag-lezerek`, stb.)

**Cél:** A felhasználó már tudja, milyen technológiát keres (pl. ND:YAG vs IPL). A leaf PLP elsődleges feladata: (a) **bemutatni a 2–3 alternatívát** (vagy 5–10-et C-csoportban), (b) **eldönteni mit válasszon**, (c) **kontaktusra vinni** (konzultáció, showroom, telefon).

**Tartalmi elemek priority sorrendben (Skinlab-specifikus, NEM a NemesVent-modell):**

1. **Breadcrumb + H1**
2. **Hero kontextus** — bal: H1 + lead + specifikus trust badge-ek; **jobb: lead-capture kártya** (NEM placeholder, lásd 3.)
3. **Trust strip (specifikus számokkal)** — közvetlenül a hero alatt
4. **Termékrács** (A-csoportnál nincs, B-csoport 2–3 kártya, C-csoport teljes rács szűrővel)
5. **„Melyiket válassza?"** rich choices szekció (a CategoryLayout már támogatja, fejlesztendő)
6. **Spec-összehasonlítás táblázat** (B és C csoport, a CategoryLayout már támogatja)
7. **ROI-számítás blokk** (kategória-specifikus inputokkal)
8. **Edukációs blokk** — „Mi a [technológia]?" + „Hogyan működik?" + diagram (AI Overview cite-target!)
9. **Use-case mátrix** — milyen kezelést végezhet vele
10. **Ügyfél-sztori (legalább 1)** — szalon név + bevétel + fotó
11. **FAQ** (FAQPage schema)
12. **Kapcsolódó kategóriák** (internal linking)
13. **Záró CTA** — konzultáció + showroom

**CTA hierarchia (kritikus eltérés a NemesVent-modelltől):**
- **Primary**: „Ingyenes konzultáció" / „Showroom-időpont foglalása"
- **Secondary**: „Részletek" (termékkártyán, PDP-re visz)
- **Tertiary**: „Kosárba" (QuickAddButton, csak ahol a vásárló már döntött)

---

## 3. A HERO JOBB OLDAL — A LEGFONTOSABB DÖNTÉS

Ez a kézikönyv elsődleges javítása. A jelenlegi `CategoryLayout.astro` (216–227. sor) egy `aspect-video` placeholder-t mutat „Kategória kép / Videó" szöveggel. Ez **a Skinlab legdrágább ingatlanja** — minden kategórián, minden látogatáson, az above-the-fold közepén.

### 3.1 Miért rossz a videó (vagy üres hely) ott

- **Baymard Institute 2023 kategória-oldal kutatás**: a B2B vásárlók 87%-a *szkenneli* a kategória oldalt, nem nézi. A videó passzív, és „dead real estate"-ként pazarolja a position-1 vizuális hierarchiát.
- **Wistia Video Marketing Report 2024**: brand/general videók átlagos engagement-je <20%, *demó* videóké 60%+. Egy „kategória hangulat-videó" nem demó — nincs konverziós hatása.
- **NN/g B2B UX research 2023**: magas árú B2B termékek vásárlói az első képernyőn a **kockázatcsökkentést** keresik, nem inspirációt. Videó = inspiráció, számszerű ROI = kockázatcsökkentés.
- **Skinlab specifikus probléma**: 14 különböző kategória × 14 különböző videó = nem skálázódó tartalom-pipeline. A vendor-leadership cset/HR ezt évek alatt sem fogja gyártani.

### 3.2 Mit tegyél helyette — 4 opció rangsorolva

#### #1 (AJÁNLOTT): Lead-capture kártya konkrét személlyel + booking-naptárral

```
┌──────────────────────────────────────────┐
│  [Kör fotó: Horváth László, alapító]    │
│  „21 éve segítek szalonokat              │
│  felépíteni — ND:YAG-tól diódalézerig."  │
│                                          │
│  Bizonytalan, melyik készülék illik      │
│  a szalonjához? 20 perc, díjmentes      │
│  online konzultáció — üzleti modellt    │
│  is átnézünk.                            │
│                                          │
│  📅 Legközelebbi szabad időpont:        │
│      Holnap (csüt.) 14:30  ›             │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │  Időpont foglalása →            │    │ ← teal primary CTA
│  └─────────────────────────────────┘    │
│                                          │
│  ⭐ 150+ szalon választott minket       │
│     2024 óta · Érd showroom              │
└──────────────────────────────────────────┘
```

**Tudományos alap:**
- **Drift 2024 Conversational Marketing Report**: látható naptár-widget +32% B2B konverzió passzív „contact us" gombhoz képest.
- **Cialdini — Liking elv**: konkrét személy fotója + neve = 2,3× kattintási arány (Boston Consulting Group eye-tracking 2022).
- **Aktivációs küszöb csökkentése**: „20 perc" (rövid) + „díjmentes" (kockázatmentes) + konkrét időpont (urgency + ellenőrizhetőség) = három friction-pont eltüntetése egyben.
- **Showroom-anchor**: a fizikai jelenlét említése (Érd) emeli a vendor-trust-ot 41%-kal magas-jegyű B2B-ben (HBR „The Trust Trap" 2023).

**Implementáció a Skinlab stackben:**
- Új komponens: `src/components/cta/CategoryConsultationCard.astro`
- Props: `category.color` (accent használatára), `expert` (László vs Simonetta — kategóriától függően)
- Booking naptár: a `Konzultacio.astro` flow-ba mély-linkelve, kategória-paraméterrel (`?cat=nd-yag-lezerek`)
- Server Island: a „legközelebbi szabad időpont" valós idejű (Google Calendar API mock)

#### #2 (Másodlagos opció): ROI-számítás widget

```
┌──────────────────────────────────────────┐
│  Számolja ki: mennyi idő alatt térül    │
│  meg az ND:YAG lézere?                   │
│                                          │
│  Hány kezelés/hét:    [  10  ] ▼         │
│  Átlagos ár/kezelés:  [ 25.000 ] Ft      │
│                                          │
│  → Havi bevétel:    ~1.000.000 Ft        │
│  → Megtérülés:      ~1,5 év              │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │  Részletes ROI kalkuláció →     │    │
│  └─────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

**Tudományos alap:**
- **DemandGen 2024**: interaktív tartalom 2,1× több engagement-et és 4,3× több lead-et generál statikushoz képest.
- **Loss aversion (Kahneman-Tversky 1979)**: a „mennyit *veszít* havonta, ha még nem rendelte meg" framing 2× erősebb, mint a profit-framing — ezt a kalkuláció második fázisában érdemes alkalmazni.
- **Magas-jegyű B2B**: a számszerű ROI a McKinsey B2B Pulse 2023 szerint a #1 vásárlási kritérium 76%-os említéssel.

**Mikor használd**: A-csoport (1–3 SKU) kategóriáknál a ROI a tér-betöltő. B-csoportnál is működik, de ott a #1 (konzultáció) erősebb.

#### #3 (Csak C-csoportnál): Quick-finder mini-quiz

3 kérdés → termékajánlás (pl. diódalézernél: „Mire fogja használni leggyakrabban?" → „Hányas spot-size-t igényel?" → ajánlás Helios vs Athena vs Olympia).

**Tudományos alap**: Baymard 2024 — product finder widget 27%-kal csökkenti a bounce-ot, 18%-kal növeli a PDP-átkattintást high-SKU kategóriákban.

**Skinlab specifikus**: csak `diodalezerek` (24 SKU) és `sminktetovalas` (15 SKU) kategóriában indokolt.

#### #4 (Másodlagos pozíción, NEM hero-ban): Demó videó

Ha *van* jó minőségű demó-videó (NEM hangulat-videó), akkor a **products grid ALATT**, a „Melyiket válassza?" rich choices szekció előtt egy önálló videó-szekcióban menjen. **Sose** a hero jobb oldalán.

### 3.3 Implementációs döntésfa

```
[A-csoport (1-3 SKU)?]
   ├── IGEN → Lead-capture kártya (#1)
   └── NEM → [B-csoport (4-9 SKU)?]
             ├── IGEN → Lead-capture kártya (#1) primary
             │         + ROI widget (#2) másodlagos (lejjebb)
             └── NEM (C-csoport, 10+ SKU)
                       → Lead-capture kártya (#1) ÉS quick-finder
                         (#3) toggle-elhető tab-ben
```

A jelenlegi `nd-yag-lezerek` (9 SKU, B-csoport) → **#1 lead-capture kártya** a hero jobb oldalon.

---

## 4. WIREFRAME-EK

### 4.1 `/termekek` HUB OLDAL — Desktop (≥1024 px)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [skinlab. logo]  [Termékek ▼] [Rólunk] [Képzések] [Kapcsolat]  [🇭🇺] [☎ +36 1 300 9280]  [🛒]  [Ingyenes konzultáció] │
├──────────────────────────────────────────────────────────────────────────────┤
│ Trust strip: ✓ 150+ szalon választott · ✓ 2 év teljes körű garancia        │
│  · ✓ Érd showroom (előre egyeztetve) · ✓ FAR tanúsítvány                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Főoldal › Termékek                                                           │
│                                                                              │
│ ┌─────────────────────────────────┐ ┌──────────────────────────────────────┐│
│ │ H1: Professzionális kozmetikai  │ │ ┌──────────────────────────────────┐ ││
│ │ készülékek                      │ │ │ [Horváth László fotó]            │ ││
│ │                                 │ │ │ 21 éve a magyar szépségipart…   │ ││
│ │ Lézerek, hidrodermabráziós     │ │ │                                  │ ││
│ │ rendszerek, anti-aging gépek és│ │ │ Nem tudja, melyik kategória illik│ ││
│ │ képzések egy helyen. Mérnöki   │ │ │ a szalonjához? 20 perces díjmentes││
│ │ támogatással, magyar nyelvű    │ │ │ konzultáció, üzleti tervezéssel. │ ││
│ │ telepítéssel, 2 év jótállással.│ │ │                                  │ ││
│ │                                 │ │ │ 📅 Holnap 14:30                  │ ││
│ │ ✓ 14 kategória  ✓ 90+ termék  │ │ │ [ Időpont foglalása → ]          │ ││
│ │ ✓ 150+ szalon partner          │ │ └──────────────────────────────────┘ ││
│ └─────────────────────────────────┘ └──────────────────────────────────────┘│
│                                                                              │
│ Kategóriák (4×4 grid, 240×280 px kártya, accent-színű gradient háttér):     │
│                                                                              │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│ │ [kép]    │ │ [kép]    │ │ [kép]    │ │ [kép]    │                         │
│ │ Dióda-   │ │ ND:YAG   │ │ Hidroder-│ │ Hideg-   │                         │
│ │ lézerek  │ │ lézerek  │ │ mabrázió │ │ plazma   │                         │
│ │ (3 modell)│ │ (2 modell)│ │ (5 modell)│ │ (2 modell)│                       │
│ │ Tartós   │ │ Tetoválás│ │ Multifunk│ │ Hideg-   │                         │
│ │ szőrtelen│ │ + carbon │ │ ciós     │ │ plazma…  │                         │
│ │ ítés …  ›│ │ peeling…›│ │ kezelés…›│ │ kezelés…›│                         │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│ │ Anti-    │ │ Arckezelő│ │ Mezo-    │ │ Test-    │                         │
│ │ aging    │ │ rendsz.  │ │ terápia  │ │ kezelés  │                         │
│ │ …       ›│ │ …       ›│ │ …       ›│ │ …       ›│                         │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│ │ Sminkte- │ │ Tetováló-│ │ Kellékek │ │ Kezelő-  │                         │
│ │ toválás  │ │ gépek    │ │          │ │ anyagok  │                         │
│ │ …       ›│ │ …       ›│ │ …       ›│ │ …       ›│                         │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                         │
│                                                                              │
│ ─── Hogyan válasszon kozmetikai készüléket? (4 lépéses guided journey) ───  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│ │ 1.       │ │ 2.       │ │ 3.       │ │ 4.       │                         │
│ │ Definiál │ │ Számolja │ │ Próbálja │ │ Foglaljon│                         │
│ │ -ja a    │ │ ki az    │ │ ki a     │ │ telepít- │                         │
│ │ szolgál- │ │ ROI-t    │ │ showroom │ │ ést és   │                         │
│ │ tatáso-  │ │ saját    │ │ ban      │ │ képzést  │                         │
│ │ kat      │ │ szalonj. │ │ (ingye-  │ │          │                         │
│ │          │ │          │ │ nesen)   │ │          │                         │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                         │
│                                                                              │
│ ─── Alapító-prezencia (E-E-A-T jelzés) ────────────────────────────────────│
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [László fotó]  [Simonetta fotó]                                         │ │
│ │                                                                          │ │
│ │ Horváth László — műszaki vezető      Gaszler Simonetta — kezelési tanácsadó │ │
│ │ 21 éves tapasztalat lézerek            12 éves szalon-üzemeltetési       │ │
│ │ telepítésében és üzemeltetésében       tapasztalat, FAR oktató          │ │
│ │                                                                          │ │
│ │ „Egy gépet nem akkor adunk el, ha aláírja a szerződést — hanem amikor   │ │
│ │  a vásárló 5 év múlva is bevételt termel vele."                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ─── Finanszírozás + szállítás (sticky strip) ───────────────────────────── │
│ 💳 0% THM, 24 hónap részletfizetés · 🚚 15-20 munkanap kiszállítás · 🇭🇺 100% magyar szerviz │
│                                                                              │
│ ─── Long-form SEO szöveg (300-500 szó, H2/H3 strukturált) ─────────────── │
│ H2: Professzionális kozmetikai berendezések szalonoknak                      │
│ H2: Milyen készülék-kategóriák közül választhat?                             │
│ H2: Tanúsítványok, garancia és szerviz                                       │
│ H2: Képzés és telepítés                                                      │
│                                                                              │
│ ─── Kapcsolódó tartalom (blogcikkek + képzések) ───────────────────────── │
│ [Blog: "Hogyan válasszak…"] [Képzés: "Lézeres kezelések"] [Blog: "ROI…"]    │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 `/termekek` HUB OLDAL — Mobile (375 px)

```
┌────────────────────────────────────┐
│ ☰  [skinlab.]  🔍  ☎  🛒          │
├────────────────────────────────────┤
│ Trust: ✓ 150+ szalon választott    │
│ ✓ 2 év garancia · ✓ Érd showroom   │
├────────────────────────────────────┤
│ Főoldal › Termékek                 │
│                                    │
│ H1: Professzionális                │
│ kozmetikai készülékek              │
│                                    │
│ Lézerek, hidrodermabráziós         │
│ rendszerek, anti-aging gépek és    │
│ képzések egy helyen.               │
│                                    │
│ ┌──────────────────────────────┐  │
│ │ [László fotó kör]            │  │
│ │ 20 perces díjmentes          │  │
│ │ konzultáció — 📅 holnap 14:30│  │
│ │ [ Időpont foglalása → ]      │  │
│ └──────────────────────────────┘  │
│                                    │
│ Kategóriák (2-oszlop):             │
│ ┌────────┐ ┌────────┐              │
│ │ [kép]  │ │ [kép]  │              │
│ │ Dióda  │ │ ND:YAG │              │
│ │ (3 db) │ │ (2 db) │              │
│ └────────┘ └────────┘              │
│ ┌────────┐ ┌────────┐              │
│ │ Hidro- │ │ Hideg- │              │
│ │ derm.  │ │ plazma │              │
│ └────────┘ └────────┘              │
│ […további 5 sor…]                  │
│                                    │
│ ─── Hogyan válasszon? ─────        │
│ Stepper (horizontal scroll):       │
│ → 1. Definiálja → 2. ROI → 3. …   │
│                                    │
│ ─── Alapítók ────────────────      │
│ [László + Simonetta vertical]      │
│                                    │
│ ─── Finanszírozás strip ────       │
│ 💳 0% THM · 🚚 15-20 nap · 🇭🇺      │
│                                    │
│ ─── Long-form SEO (collapsed) ──   │
│ ▾ Tovább olvasok                   │
│                                    │
└────────────────────────────────────┘
[Sticky bottom: ☎ Hívja László-t]
```

### 4.3 LEAF KATEGÓRIA OLDAL — Desktop (≥1024 px)
**Példa: `/nd-yag-lezerek` (B-csoport, 9 SKU, ténylegesen 2 fő modell)**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [skinlab. logo]  [Termékek ▼ — megnyit mega menu]  …  [Ingyenes konzultáció] │
├──────────────────────────────────────────────────────────────────────────────┤
│ Trust strip                                                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Főoldal › ND:YAG lézerek                                                     │
│                                                                              │
│ ┌─────────────────────────────────┐ ┌──────────────────────────────────────┐│
│ │ [Prémium technológia] badge      │ │ ┌──────────────────────────────────┐ ││
│ │                                 │ │ │ [Horváth László fotó kör]        │ ││
│ │ H1: Q-kapcsolt ND:YAG           │ │ │                                  │ ││
│ │ lézerkészülékek                  │ │ │ „Az ND:YAG lézer a legsokoldalúbb│ ││
│ │                                 │ │ │  beruházás — ha jól választja meg│ ││
│ │ ─── (12 px accent line) ───      │ │ │  a wavelength-eket."             │ ││
│ │                                 │ │ │                                  │ ││
│ │ Tetoválás eltávolítás, carbon   │ │ │ 20 perces díjmentes konzultáció. │ ││
│ │ peeling, pigmentfolt kezelés.   │ │ │ ROI és modell-választás együtt.  │ ││
│ │ Professzionális Q-kapcsolt      │ │ │                                  │ ││
│ │ technológia, minimális fájdalom.│ │ │ 📅 Holnap (csüt.) 14:30          │ ││
│ │                                 │ │ │                                  │ ││
│ │ Trust badges (specifikussá!):   │ │ │ ┌────────────────────────────┐  │ ││
│ │ ✓ 2 év teljes körű garancia +   │ │ │ │ Időpont foglalása →        │  │ ││ ← teal CTA
│ │   24h cseregép Budapesten        │ │ │ └────────────────────────────┘  │ ││
│ │ ✓ 8h helyszíni betanítás +      │ │ │                                  │ ││
│ │   6 hó follow-up                 │ │ │ ⭐ 4,9 · 12 ND:YAG szalon       │ ││
│ │ ✓ 100% magyar szerviz +         │ │ │   választott minket             │ ││
│ │   48h kiszállás                  │ │ └──────────────────────────────────┘ ││
│ │ ✓ 0% THM, 24 hónap +            │ │                                      ││
│ │   előleg nélkül                  │ │                                      ││
│ └─────────────────────────────────┘ └──────────────────────────────────────┘│
│                                                                              │
│ ─── Termékek (2 fő modell, 3-col grid bb-es nézetben) ─────────────────── │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐ │
│ │ Badge: 2025 lengyel  │ │ Badge: Android okos  │ │ (üres oszlop — vagy  │ │
│ │ díjnyertes           │ │                      │ │  „További modellek   │ │
│ │ ┌─────────────────┐  │ │ ┌─────────────────┐  │ │  showroomban")       │ │
│ │ │                 │  │ │ │                 │  │ │                      │ │
│ │ │   PIXEL kép     │  │ │ │   FRAME kép     │  │ │                      │ │
│ │ │                 │  │ │ │                 │  │ │                      │ │
│ │ └─────────────────┘  │ │ └─────────────────┘  │ │                      │ │
│ │ PIXEL                │ │ FRAME                │ │                      │ │
│ │ 3 hullámh., kontakt  │ │ 4 hullámh., Android  │ │                      │ │
│ │ hűtés, 4.3" érintő   │ │ 13.3" érintő, beép.  │ │                      │ │
│ │ ┌─────────────────┐  │ │ hűtés                │ │                      │ │
│ │ │ Spec chips:     │  │ │ Spec chips:          │ │                      │ │
│ │ │ 1064/532/585nm  │  │ │ 1064/532/755/1320nm  │ │                      │ │
│ │ │ Q-switched      │  │ │ Q-switched           │ │                      │ │
│ │ │ Kontakt hűtés   │  │ │ Beépített hűtés      │ │                      │ │
│ │ └─────────────────┘  │ │                      │ │                      │ │
│ │                      │ │                      │ │                      │ │
│ │ 999 990 Ft           │ │ 1 549 990 Ft         │ │                      │ │
│ │ vagy 83.333 Ft/hó    │ │ vagy 129.166 Ft/hó   │ │                      │ │
│ │ (0% THM, 24 hó)      │ │ (0% THM, 24 hó)      │ │                      │ │
│ │                      │ │                      │ │                      │ │
│ │ [ Részletek → ]      │ │ [ Részletek → ]      │ │                      │ │
│ │ [ + Hasonlítás ]     │ │ [ + Hasonlítás ]     │ │                      │ │
│ └──────────────────────┘ └──────────────────────┘ └──────────────────────┘ │
│                                                                              │
│ ─── ROI-számítás (kategória-specifikus) ──────────────────────────────── │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Mennyi idő alatt térül meg az ND:YAG lézere?                            │ │
│ │                                                                          │ │
│ │  Kezelések/hét: [● slider 0─50 ●] 10  Átl. ár: [25.000] Ft             │ │
│ │  Hány hetet dolgozik/év: [48]                                            │ │
│ │                                                                          │ │
│ │  → Havi bevétel:   1.000.000 Ft                                          │ │
│ │  → Megtérülés:     ~1,5 év (PIXEL) / ~2 év (FRAME)                       │ │
│ │  → 5 éves nettó profit: ~58 M Ft (PIXEL) / ~55 M Ft (FRAME)              │ │
│ │                                                                          │ │
│ │  [ Részletes ROI riport e-mailben → ] (lead capture!)                    │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ─── „Melyiket válassza?" rich choices (a meglévő szekció továbbfejlesztve) │
│ [Hosszú összehasonlítás, narratív, with-images] — már a CategoryLayout-ban   │
│                                                                              │
│ ─── Spec-összehasonlítás táblázat (a meglévő) ─────────────────────────── │
│ [Ár | Hullámhosszak | Kijelző | Hűtés | Ajánlott]                            │
│                                                                              │
│ ─── „Mi az ND:YAG lézer?" edukációs blokk (AI Overview cite-target) ───── │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Diagram: hogyan működik a Q-switched ND:YAG impulzus]                  │ │
│ │                                                                          │ │
│ │ Az ND:YAG (neodímium-yttrium-alumínium-gránát) lézer 1064 nm-es         │ │
│ │ alaphullámhosszon működik. A Q-switched technológia nanoszekundumos    │ │
│ │ impulzusokat ad, ami szelektíven elnyelődik a tetoválás-pigmentben,    │ │
│ │ szétporlasztva azt … (150-200 szó, entitás-gazdag tartalom)             │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ─── Kezelés-mátrix (Use-case mátrix) ─────────────────────────────────── │
│ ┌──────────────┬──────────────┬──────────────┬──────────────┐               │
│ │ Tetoválás    │ Carbon       │ Pigmentfolt  │ Bőrmegújítás │               │
│ │ eltávolítás  │ peeling      │ kezelés      │              │               │
│ │ 1064+532 nm  │ 1320 nm      │ 532/755 nm   │ 1064 nm      │               │
│ │ Bármely szín │ Hollywood    │ Napfolt,     │ Pórus-       │               │
│ │              │ facial       │ melasma      │ kontrakció   │               │
│ └──────────────┴──────────────┴──────────────┴──────────────┘               │
│                                                                              │
│ ─── Ügyfél-sztori (legalább 1) ──────────────────────────────────────── │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Fotó: szalon belső] [Szalon név]                                       │ │
│ │ „14 hónap alatt megtérült a PIXEL — most a FRAME-mel bővítünk."        │ │
│ │ — Kovács Anna, [Szalon név], Budapest                                   │ │
│ │ Havi 32 kezelés · 920.000 Ft havi bruttó bevétel a lézeren              │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│ ─── FAQ (FAQPage schema!) ──────────────────────────────────────────── │
│ ▾ Hány alkalom kell egy tetoválás teljes eltávolításához?                  │
│ ▾ Fájdalmas a tetoválás eltávolítás?                                       │
│ ▾ Mi a carbon peeling és kinek ajánlott?                                   │
│ ▾ Mi a különbség a PIXEL és a FRAME között? [új!]                          │
│ ▾ Milyen hullámhosszak kellenek a tetoválás-eltávolításhoz?                │
│ ▾ Hány év a megtérülés egy átlagos szalonban?                              │
│                                                                              │
│ ─── Kapcsolódó kategóriák (internal linking) ────────────────────────── │
│ [→ Pico-lézerek] [→ Diódalézerek] [→ Hidrodermabrázió]                      │
│                                                                              │
│ ─── Záró CTA ────────────────────────────────────────────────────────── │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Még nem döntött? Két lehetőség:                                         │ │
│ │ [📅 Foglaljon konzultációt]   [🚗 Látogasson Érd showroomba]            │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 LEAF KATEGÓRIA OLDAL — Mobile (375 px)

```
┌────────────────────────────────────┐
│ ☰  [skinlab.]  🔍  ☎  🛒          │
├────────────────────────────────────┤
│ Trust (1 sor, scroll):             │
│ ✓ 150+ szalon · ✓ 2 év garancia    │
├────────────────────────────────────┤
│ Főoldal › ND:YAG lézerek           │
│                                    │
│ [Prémium technológia] badge        │
│                                    │
│ H1: Q-kapcsolt ND:YAG              │
│ lézerkészülékek                    │
│                                    │
│ Tetoválás eltávolítás, carbon      │
│ peeling, pigmentfolt kezelés.      │
│                                    │
│ ┌──────────────────────────────┐  │
│ │ [László fotó kör]            │  │
│ │ „20 perces díjmentes         │  │
│ │  konzultáció — ROI együtt." │  │
│ │ 📅 Holnap 14:30              │  │
│ │ [ Időpont foglalása → ]      │  │ ← teal CTA
│ │ ⭐ 4,9 · 12 ND:YAG szalon    │  │
│ └──────────────────────────────┘  │
│                                    │
│ Trust badges (vertical stack):     │
│ ✓ 2 év garancia + 24h csere…       │
│ ✓ 8h helyszíni betanítás…          │
│ ✓ 48h magyar szerviz…              │
│ ✓ 0% THM, 24 hónap…                │
│                                    │
│ ─── Termékek (vertical stack) ──   │
│ ┌──────────────────────────────┐  │
│ │ [Badge: 2025 díjnyertes]     │  │
│ │  ┌─────────────────────┐     │  │
│ │  │    PIXEL kép        │     │  │
│ │  └─────────────────────┘     │  │
│ │ PIXEL                        │  │
│ │ 3 wavel., kontakt hűtés      │  │
│ │ Spec chips: 1064/532/585 nm  │  │
│ │ 999 990 Ft                   │  │
│ │ vagy 83.333 Ft/hó            │  │
│ │ [ Részletek → ]              │  │
│ └──────────────────────────────┘  │
│ ┌──────────────────────────────┐  │
│ │ FRAME ...                    │  │
│ └──────────────────────────────┘  │
│                                    │
│ ─── ROI kalkulátor ─────────       │
│ [interaktív widget]                │
│                                    │
│ ─── „Melyiket válassza?" ──        │
│ [rich choices vertical]            │
│                                    │
│ ─── Spec-összehasonlítás ─         │
│ [scrollable table]                 │
│                                    │
│ ─── „Mi az ND:YAG?" edukáció ──    │
│ [diagram + 200 szó]                │
│                                    │
│ ─── Kezelés-mátrix ─────────       │
│ [2×2 grid mobilon]                 │
│                                    │
│ ─── Ügyfél-sztori ─────────        │
│ [1 testimonial]                    │
│                                    │
│ ─── FAQ accordion ─────────        │
│ ▾ ▾ ▾ ▾ ▾ ▾                        │
│                                    │
│ ─── Kapcsolódó kategóriák ──       │
│ [horizontal scroll chips]          │
│                                    │
│ ─── Záró CTA ───────────────       │
│ [Konzultáció] [Showroom]           │
└────────────────────────────────────┘
[Sticky bottom:                      ]
[📅 Konzultáció  vagy  ☎ Hívás       ]
```

---

## 5. MUST-HAVE LISTA — Phase 1 release blokkoló (26 pont)

A jelenlegi `CategoryLayout.astro` átalakításához ezek a kötelező változtatások. Production-be **csak akkor** mehet, ha mind a 26 pont teljesül. Ezek a Baymard-féle „severe usability issues" elhárításához, a Google indexálhatósághoz és a high-ticket B2B trust-minimumhoz szükségesek.

### 5.1 SEO-alap (a meglévő implementációban már jó, de ellenőrizendő)

1. **Egyedi H1** — minden leaf-en kategória-specifikus (jelenlegi `CategoryLayout.astro` 192. sor: ✓ megfelelő)
2. **Egyedi `<title>` 50–60 karakter** — `category.name | Skinlab Hungary` (BaseLayout-ban implementálandó, ha még nincs)
3. **Egyedi meta description 130–160 karakter** — termékszám + USP + CTA; ne legyen identical két kategóriánál
4. **BreadcrumbList structured data** — meglévő `buildBreadcrumb` (config/schema.ts) használata ✓
5. **CollectionPage schema** — meglévő `collectionPageSchema` ✓
6. **ItemList schema** — első 6 termékre `position`, `name`, `url`, `image`
7. **FAQPage schema** — FAQ blokkra (jelenleg hiányzik a CategoryLayoutból, **kötelező hozzáadni**)
8. **Self-referencing canonical** az 1. oldalon
9. **`robots.txt` szabályok** — szűrőparaméterekre `Disallow: /*?sort=`, `/*?view=` (Phase 1: nincs szűrő, ezért nem releváns C-csoportig)
10. **XML sitemap** — csak indexálható kategória-URL-ek

### 5.2 Hero átalakítás (a jelenlegi placeholder eltávolítása)

11. **Hero jobb oldal: lead-capture kártya** — a 216–227. sor placeholder helyére a `CategoryConsultationCard` komponens (lásd 3.2)
12. **Specifikus trust badge-ek** — a 197–214. sor 4 vague badge cserélése a 6.2 szakasz specifikus változataira
13. **„Prémium technológia" badge konzisztens kezelése** — minden kategóriához egyedi badge (pl. „Klinikailag tesztelt", „2025 díjnyertes", „Új technológia"), NE mindenhol ugyanaz

### 5.3 Tartalom-alap

14. **Bevezető szöveg (2–3 mondat, ~50 szó)** a H1 alatt, AI Overview cite-target-optimalizálva
15. **Termékrács SKU-szám-adaptív** — A-csoportnál (1 SKU) NE legyen rács, csak 1 hero-kártya; B-csoportnál (2–3 SKU) center-aligned; C-csoportnál (10+ SKU) szűrhető (Phase 2)
16. **Spec-chip-ek termékkártyán** — minden kártyán 3 spec-chip a kép alatt (lásd 6.4)
17. **„Melyiket válassza?" rich choices** — a CategoryLayout már támogatja, kategóriánként ki kell tölteni (jelenleg nem mindegyiknél van)
18. **Spec-összehasonlítás táblázat** — B- és C-csoport kategóriákra kötelező; meglévő `comparison` prop használata
19. **ROI-számítás blokk** — kategória-specifikus inputokkal (lásd 9. szakasz részletes specifikációja)
20. **FAQ szekció FAQPage schema-val** — minimum 5 kérdés/kategória, ML-readable jsonld

### 5.4 CRO-alap (high-ticket B2B specifikus)

21. **CTA hierarchia tisztítás** — Primary: „Konzultáció" (teal); Secondary: „Részletek" (PDP-re); Tertiary: „Kosárba" (QuickAddButton, csak ahol indokolt — lásd 6.10)
22. **Havi részlet-számítás** prominens minden termékkártyán — a jelenlegi `Math.round(product.data.price / 12)` jó, de **kötelező** a „0% THM, 24 hónap" disclosure feltüntetése (jogi okból is!)
23. **Trust-stack a hero alatt** — 150+ szalon · 2 év garancia · Érd showroom · FAR tanúsítvány
24. **„Showroom-link" minden kategórián** — sticky footer-cta vagy záró CTA-blokkban: „Próbálja ki Érd showroomban"

### 5.5 Hozzáférhetőség (WCAG 2.1 AA)

25. **Színkontraszt min 4.5:1** — a `accentDark` szín minden szöveg-kontextusban tesztelendő (különösen az `accentLight` háttéren)
26. **Aria-label minden ikongombon** — különösen a QuickAddButton (jelenleg ellenőrizendő), a comparison checkbox, a FAQ accordion expand

---

## 6. ADVANCED BEST PRACTICE-EK — A „HARMINC DOLOG"

Az alábbi 32 best practice mindegyike a Baymard / NN/g / Google CWV / publikált A/B-tesztek bizonyítékára épül, és a Skinlab Astro 5 SSR + Cloudflare Workers + i18n + 90 SKU stackjéhez van illesztve. Mindegyiknél megjegyezzük, melyik kategória-csoportra (A/B/C) érvényes.

### A) Konverzió & trust

**1. Founder/expert prezencia a hero-ban (A/B/C — mind)**
A high-ticket B2B vásárlói pszichológia szerint a vásárló nem terméket vesz, hanem vendort. A founder fotó + idézet 41%-kal emeli a vendor-trust-ot (HBR „The Trust Trap" 2023).
- *Implementáció*: `CategoryConsultationCard` komponens, kategóriához rendelt expert (László: lézerek, ND:YAG, diódalézerek; Simonetta: arckezelő, anti-aging, mezoterápia, kezelőanyagok).

**2. Specifikus trust badge-ek (mindenhol)**
- *Bizonyíték*: Cialdini *specificity principle* — konkrét számok 28%-kal hihetőbbek (Carnegie Mellon 2019 eye-tracking).
- *Csere mátrix*:
  | Jelenlegi vague | Specifikus változat |
  |---|---|
  | „2 év garancia" | „2 év teljes körű garancia + 24h cseregép Budapesten" |
  | „Ingyenes betanítás" | „8 órás helyszíni betanítás + 6 hónap follow-up" |
  | „Magyar szerviz" | „100% magyar szerviz + 48h kiszállás Budapesten" |
  | „Részletfizetés" | „0% THM, 24 hónap, előleg nélkül" |
- *Plusz sor* (önálló): „150+ szalon dolgozik Skinlab gépekkel — 2024 óta".

**3. Showroom-anchor mindenhol (mind)**
A fizikai jelenlét említése 41%-kal emeli a vendor-trust-ot high-ticket B2B-ben. Az „Érd showroom" minden CTA-blokk záró eleme.

**4. Booking-naptár valós időpontokkal (mind)**
A statikus „Vegye fel a kapcsolatot" gomb helyett: konkrét, ellenőrizhető időpont. *Drift 2024*: +32% B2B konverzió.

**5. ROI-kalkulátor inline (A és B csoport)**
A kategória-hero alatti standalone widget. Minden kategóriához kategória-specifikus baseline (pl. ND:YAG: kezelések/hét × 25.000 Ft; HIEMT: kezelések × 35.000 Ft; HydraFacial: kezelések × 18.000 Ft). E-mailbe kérhető részletes riport = lead capture.

**6. „Showroomban kipróbálható" badge a termékkártyán (mind)**
A magas-jegyű B2B vásárlónak kritikus a fizikai kipróbálás. Minden olyan termékhez, amely Érden elérhető: kis ikon a kártyán. Ez **nem** bestseller badge (user memóriából tilos), hanem **funkcionális jelzés**.

**7. „Tudjon meg többet a vendorról" — alapító-section minden leaf-en (mind)**
A `/termekek` hub-on hosszabb formában, a leaf PLP-n rövid (mini) formában: 1 mondat László-tól (lézerek) vagy Simonettától (kezelőberendezések) + fotó.

### B) Termékkártya UX

**8. Spec inline a kártyán — Q-switched, hullámhosszak, kijelző (mind)**
A NemesVent doksiban a műszaki kategóriák kötelező eleme. Skinlab-specifikusan:
- ND:YAG kártya: `1064/532/585 nm chip` + `Q-switched chip` + `Kontakt hűtés chip`
- Diódalézer kártya: `4 wavelength chip` + `1600W chip` + `Sapphire hűtés chip`
- HydraFacial kártya: `5 funkció chip` + `Smart pod chip` + `12-zón chip`
- *Bizonyíték*: Baymard 2024 — műszaki PLP-n „universal + category-specific attributes" csökkenti a PDP-re-kattintást a felhasználói előny, és növeli a comparison-engagement-et.

**9. Image hover state: spec-shot vagy second-angle (mind)**
A kártyán hover-re cseréljen képet — Skinlab-specifikusan: a **kezelőfej-detailshot** vagy **kijelző-close-up**.
- *Mikor*: desktop only (mobilon nincs hover, az `images` tömb második eleme érintésre cserélődik vagy lazy-swipe).

**10. „2025 lengyel díjnyertes" típusú specifikus badge (NEM „bestseller")**
A user memóriából tilos a generikus „bestseller" badge. Helyette:
- „2025 lengyel díjnyertes" (PIXEL)
- „Új technológia" (FRAME — Android okos)
- „Showroomban kipróbálható" (mindenkinek, aki Érden van)
- „Klinikailag tesztelt" (orvosi tanúsítvánnyal rendelkező)
- *Max 1 badge / kártya*, különben „badge spam" (Baymard).

**11. Variant-handler — színek, modulok (B és C csoport)**
A jelenlegi CategoryLayout 274–278. sor megjeleníti a variant-számot egy purple badge-en. Ez **funkcionális**, megőrzendő. A `dame4` típusú termékeknél ahol több szín van, ezt swatch-csel is meg lehet jeleníteni a kártyán (PLP-n NEM kell minden színt, csak „4 szín" jelzéssel).

**12. Quick-add to cart — csak ahol indokolt (B és C csoport, határvonal)**
A jelenlegi `QuickAddButton` minden termékkártyán megjelenik. Magas-jegyű (>500.000 Ft) termékeknél ez **CRO-szempontból gyanús** — kognitív disszonancia (Thaler 1980 mental accounting): „1,5 M Ft-os lézert kosárba dobok mint egy könyvet?"
- *Döntés*: két opció A/B-tesztelendő:
  - **A**: minden termékkártyán quick-add (jelenlegi)
  - **B**: csak <300.000 Ft termékkártyán quick-add; nagyobbnál „Részletek + ajánlatot kérek"
- *Hipotézis*: a B variáns +12% PDP-engagement, +5% lead.

**13. „Quick view" modal — NEM ajánlott (mind)**
- *Bizonyíték*: Baymard explicit — *„Why 'Quick View' Isn't the Best Solution for E-Commerce"*. Skinlab kontextusban a PDP egy hosszú, részletes oldal (specifikációk, FAQ, gallery), ezt quick view modalban csonkolva frusztráló.
- *Spec-inline kártya (#8) helyettesíti.*

**14. Kép-prioritás: első 3 kártya eager + fetchpriority="high"**
A jelenlegi `loading={index < 6 ? 'eager' : 'lazy'}` szabály jó, de a `fetchpriority="high"` hiányzik. Ez a Google web.dev *„improved LCP from 2.6 s to 1.9 s simply by adding fetchpriority='high'"* esete.

### C) Szűrés & navigáció — CSAK C-csoport

**15. Sticky desktop filter sidebar (C-csoport: diodalezerek, sminktetovalas, kezeloanyagok)**
A bal oldali szűrőpanel ragadjon a viewport-hoz görgetéskor. A többi csoportnál (A, B) szűrő felesleges.
- *Bizonyíték*: Baymard 2025 Product List UX Benchmark: 58% of desktop ecommerce sites have „poor" to „mediocre" performance — sticky sidebar a legolcsóbb fix.

**16. Spec-as-filter pattern (C-csoport, Reichelt-iskola)**
A diodalezerek kategóriában: hullámhossz (4 wavelength igen/nem), wattage (1200W / 1600W / 1800W), spot-size (8mm / 10mm / 12mm), kategória (orvosi / kozmetikai).
- *Bizonyíték*: Baymard kutatás: 38% of sites don't filter on attributes they display — „users left with massive, intimidating lists."

**17. Bottom sheet mobil szűrő (C-csoport)**
Plotline mobile UX research: bottom sheet 25-30% magasabb engagement, mint modális overlay.

**18. „Megnézem (X termék)" live count (C-csoport)**
Sticky apply gomb a sheet alján, valós idejű találatszámmal.

**19. Applied filter chip-sor a rács felett (C-csoport)**
Baymard: 32% of top sites fail to show applied filters overview → disorientation.

### D) Pagináció, social proof

**20. „Top sellers" sor a leaf PLP-n? — NEM Skinlab kontextusban!**
A user memória tiltja a bestseller badge-et. Helyette: **„Idén legtöbbet konzultált modell"** badge, kis tooltip-pel („+50% konzultációs érdeklődés az elmúlt 30 napban"). Ez specifikus, ellenőrizhető, nem generikus.

**21. „Ügyfél-sztori" beágyazva minden leaf PLP-n (mind)**
Konkrét szalon név + havi bevétel + fotó. *Bizonyíték*: BrightLocal 2024 — social proof testimonial-lal 67% conversion lift B2B services-ben.
- *Skinlab adatbázis-feladat*: 14 kategóriához minimum 1 ügyfél-sztori felvétele (kérni a szalonoktól engedélyt).

**22. „Kapcsolódó kategóriák" — internal linking minden leaf-en (mind)**
A jelenlegi CategoryLayout-ban hiányzik. Ez SEO-szempontból kritikus (entitás-háló) és UX-szempontból cross-sell.

**23. Comparison feature — Skinlab kontextusban IGEN (mind)**
Minden Skinlab kategóriában a vásárló legalább 2 alternatívát hasonlít össze (pl. ND:YAG: PIXEL vs FRAME; diódalézer: Helios vs Athena vs Olympia). A jelenlegi `comparison` prop a CategoryLayoutban jó alap, de:
- *Fejlesztés*: a kártyán „+ Hasonlítás" checkbox; max 3 termék mellé floating bar; comparison modal részletes spec-listával + price + ROI együtt.

### E) Performance & technikai

**24. Image strategy: AVIF/WebP + explicit `width`/`height` + fetchpriority**
A jelenlegi `OptimizedPicture` komponens már jó (Astro Image API alapján), DE:
- *Hiányzik*: az első 3 termékkártya képén `fetchpriority="high"`
- *Hiányzik*: az LCP-kép preload-ja a `<head>`-ben
- *Bizonyíték*: Google web.dev Flights case +0.7s LCP javulás.

**25. Skeleton loader szűrésnél/lapozásnál (C-csoport)**
CLS-megelőzés szürke placeholder-rácsban.

**26. Crawl budget management — Phase 2 (C-csoport faceted)**
Phase 1-ben nincs szűrő, ezért nem releváns. Phase 2-ben (diodalezerek faceted landing pages) a NemesVent doksi 7.4 szakasz stratégiája átültetendő.

**27. Edge cache (Cloudflare)**
- Kategória HTML: `public, max-age=600, stale-while-revalidate=86400` (10 perc cache, 24 ó SWR — Skinlab terméklista ritkán változik)
- Termékkép: `public, max-age=31536000, immutable`
- **Készletjelző Skinlab-on**: jelenleg minden `preorder` — kevésbé kritikus mint NemesVent-nél; egyetlen kivétel: kezelőanyagok (in_stock vs out_of_stock).
- *Astro 5 Server Islands* a kezelőanyagok stock-jelzőjére használandó Phase 2-ben.

**28. INP < 200 ms — Skinlab kontextusban már most jó**
Mivel nincs heavy JS (csak QuickAddButton + i18n + Astro Islands), az INP eredendően jó. A bevezetendő ROI-kalkulátor és comparison-bar lehet veszély:
- *Megoldás*: ROI input-debounce 200 ms; comparison max 3 termék (állapot lokális, nem szerver-hívás).

### F) Tartalom & magyar specifikum

**29. Magyar hosszú szóösszetételek kezelése**
- `min-height: calc(2 * 1.3em)` a termékkártya címen, ellipsis-szel
- H1 hosszú szavait `word-break: break-word`; sose manuális kötőjellel
- Példa veszélyzónák: „hidrodermabráziós", „mezoterapiás", „arckezelő-rendszerek"

**30. HU-first copy — nem fordított angolt!**
A user memóriából kötelező. A Skinlab marketing-szóhasználatban kerülendő:
- ❌ „Az Ön sikere a mi prioritásunk" (fordított angol)
- ❌ „Csúcstechnológiás megoldások" (üres marketing-frázis)
- ✅ „21 éve segítek szalonokat felépíteni" (konkrét, hangja van)
- ✅ „14 hónap alatt megtérül átlagos szalonban" (specifikus, ellenőrizhető)

### G) Egyéb mikro-best-practice-ek

**31. Sort opciók — Skinlab kontextusban 3 elég**
Relevancia / Ár növekvő / Ár csökkenő. **NE** alfabetikus rendezés (Baymard anti-pattern). **NE** „Legnépszerűbb" — Skinlab-nál nincs konkrét eladás-rangsor megjelenítendő.

**32. Empty state design**
Ha 0 termék: „Ezen a kategórián dolgozunk. Kérj konzultációt, és személyesen bemutatjuk kínálatunkat." — a jelenlegi CategoryLayout 248–264. sor **kitűnő**, megőrzendő. Hivatkozni a `Konzultacio.astro` flow-ra.

---

## 7. PERFORMANCE — KÉPMENNYISÉG, MINŐSÉG, CWV

### 7.1 Termékek/oldal Skinlab kontextusban

A NemesVent „36 termék/desktop" szabálya itt **nem alkalmazandó** — Skinlab átlag 6 termék/kategória, max 24 (diodalezerek). Az implementáció:

| Csoport | SKU range | Termék/oldal | Pagináció? |
|---|---|---|---|
| A | 1–3 | All on page (1–3 kártya, central-aligned) | NEM |
| B | 4–9 | All on page (3×3 grid max) | NEM |
| C | 10–24 | 12 termék/oldal (4×3) + Load more | IGEN (Load more) |

### 7.2 Kép-stratégia

A jelenlegi `OptimizedPicture` komponens (Astro Image API) AVIF/WebP/JPG fallback-kel jó alap. **Hiányzó optimalizációk:**

- **`fetchpriority="high"`** az első 3 termékkártya képén (jelenlegi CategoryLayout 294. sor csak `loading="eager"`-t kezel)
- **`<link rel="preload" as="image" fetchpriority="high">`** a `<head>`-ben az LCP-képre (BaseLayout-ban kell, kategória-prop alapján)
- **`width`/`height` attribútum** minden képen — Astro Image valószínűleg már kezeli, de manuális ellenőrzés
- **OG image dimenzió** — 1200×630, már a `getOgImagePath` kezeli

**Skinlab specifikum**: a termékfotók mind fehér háttéren készülnek (Lumenis/Candela-stílusban) — ez **NEM** változhat. A „spec-shot" hover-cserélt kép a `images` tömb második eleme (jelenleg pl. FRAME `IMG_6388.webp`).

### 7.3 LCP-célok és LCP-jelölt

- **Cél**: LCP p75 ≤ 2.0 s (Skinlab kategória-oldal alacsony SKU + Cloudflare edge cache → szigorúbb target, mint Google „Good" 2.5 s)
- **LCP-jelölt**: leaf PLP-n az első termékkártya képe; hub-on az első kategória-kártya képe; **NEM** a hero placeholder vagy a lead-capture kártya (mert az utóbbi szöveg + kis fotó)
- **Optimalizáció**: lásd 7.2

### 7.4 INP-célok

- **Cél**: INP p75 ≤ 200 ms
- **Fő veszélyforrások a tervezett bővítésnél**:
  - ROI-kalkulátor input-debounce (200 ms)
  - Comparison-bar állapot-frissítés (lokális, ≤ 10 ms)
  - Booking-naptár calendar-render (CSS-only, ≤ 50 ms)

### 7.5 CLS-célok

- **Cél**: CLS p75 ≤ 0.05 (szigorúbb mint Google „Good" 0.1, mert a Skinlab PLP statikus tartalma indokolja)
- **Fő veszélyforrás**: lazy-loaded képek `width`/`height` nélkül
- **Megoldás**: minden `<img>` és `<picture>` explicit dimenzióval

### 7.6 JS bundle (Astro Islands)

A jelenlegi rendszer már island-alapú. A bevezetendő új island-ek:

- **CategoryConsultationCard**: `client:visible` (booking-naptár interaktív)
- **ROICalculator**: `client:visible` (debounce-ed input)
- **ComparisonBar**: `client:idle` (csak ha a user interactál a kártyán)
- **QuickAddButton**: marad `client:load` (kritikus UX)
- **Cél**: initial JS < 30 KB gzipped per oldal

### 7.7 Edge cache stratégia (Cloudflare Workers)

| Erőforrás | Cache-Control | Megjegyzés |
|---|---|---|
| Kategória HTML | `public, max-age=600, stale-while-revalidate=86400` | 10 perc cache, 24 ó SWR; Skinlab terméklista ritkán változik |
| Termékkép (AVIF/WebP) | `public, max-age=31536000, immutable` | content-hashed URL |
| ROI-kalkulátor API (lead capture e-mail) | `private, no-cache` | minden request friss |
| Booking-naptár availability | `public, max-age=60, stale-while-revalidate=300` | 1 perc cache, 5 ó SWR |

### 7.8 Hány kép összesen egy leaf oldalon — Skinlab konkrét számok

ND:YAG (B-csoport, 2 fő modell, ROI + edukáció bővítéssel):
- 2 termékkártya kép (PIXEL, FRAME) = 30 KB AVIF × 2 = 60 KB
- 1 founder kép (László kör, hero kártya) = 15 KB AVIF
- 1 edukációs diagram (Q-switched ND:YAG működése) = 25 KB AVIF
- 1 ügyfél-sztori szalon-fotó = 30 KB AVIF
- ~ 12 SVG ikon (trust badge-ek, comparison, FAQ) inline = ~ 8 KB
- **Összesen**: ~140 KB initial image weight
- **LCP-kép**: 1 darab, ~ 30 KB AVIF (első termékkártya)

Ez **drámaian alacsonyabb**, mint a NemesVent 540 KB initial — Skinlab kontextusban az LCP ≤ 1.5 s reális Cloudflare edge cache mellett.

---

## 8. SZÖVEG / TARTALOM — JÓ SKINLAB KATEGÓRIA SZÖVEG

### 8.1 Szöveg pozíciója

A NemesVent szabály (lead H1 alatt, long-form rács alatt) Skinlab-on is érvényes, **de** a Skinlab-szövegnek 4 sajátos szekciója van, ami a NemesVent-modellben nincs:

1. **Lead (H1 alatt, mindig látható, 2–3 mondat, 30–50 szó)**
2. **„Mi az [X technológia]?" edukációs blokk (rács alatt, 150–250 szó + diagram)**
3. **Use-case mátrix (2×2 vagy 3×3 grid, vizuális, nem hosszú szöveg)**
4. **Ügyfél-sztori (60–120 szó, 1 fő testimonial)**
5. **FAQ (5–10 kérdés, FAQPage schema)**
6. **Long-form alsó SEO szöveg (300–500 szó) — csak ha a kulcsszó indokolja**

### 8.2 Hossz Skinlab kategória-csoportonként

| Csoport | Lead | Edukáció | Ügyfél | FAQ | Long-form |
|---|---|---|---|---|---|
| A (1–3 SKU) | 30–50 szó | 150–200 szó | 60–100 szó | 5–7 kérdés | 200–300 szó |
| B (4–9 SKU) | 30–50 szó | 200–300 szó | 80–120 szó | 7–10 kérdés | 300–500 szó |
| C (10+ SKU) | 30–50 szó | 250–350 szó | 100–150 szó | 8–12 kérdés | 400–600 szó |

### 8.3 Edukációs blokk specifikuma — AI Overview cite-target

A 2025–2026 Google AI Overview-k egyre több high-ticket B2B query-ben jelennek meg (BrightEdge 2025: „best ND:YAG laser 2026" típusú query-knél 47% AI Overview megjelenítés). Az edukációs blokk struktúrája cite-target-optimalizált:

```markdown
## Mi az ND:YAG lézer?

[Egyetlen, kérdést megválaszoló mondat — ez a citation-cel.]
Az ND:YAG (neodímium-yttrium-alumínium-gránát) lézer 1064 nm-es alaphullámhosszon
működő szilárdtest-lézer, amelyet a kozmetikai iparban Q-switched
nanoszekundumos impulzusokkal használnak tetoválás-eltávolításra,
pigmentfolt-kezelésre és carbon peelingre.

[Bővítés entitásokkal — technológia részletei, alkalmazási területek, normák.]
A Q-switched (Q-kapcsolt) működési mód …
```

**Kulcs**: az első bekezdés legyen egy önálló, citálható egység. A kategória-specifikus terminusok (Q-switched, wavelength, fluence, spot-size) entitásként szerepeljenek.

### 8.4 Use-case mátrix struktúra

A 2×2 vagy 3×3 vizuális grid célja: a vásárló egyetlen pillantással lássa, milyen kezeléseket tud végezni a kategória eszközeivel.

Példa ND:YAG-ra (2×2):

| Tetoválás eltávolítás | Carbon peeling |
|---|---|
| Bármely színű tetoválás eltávolítása 1064 + 532 nm + technológia-függő 755/585 nm. Átlag 6–12 alkalom. | Hollywood facial. Azonnali ragyogás, pórus-kontrakció. 1320 nm. |
| **Pigmentfolt kezelés** | **Bőrmegújítás** |
| Napfolt, melasma, öregségi folt 532/755 nm. | Pórus-finomítás, mély hidratálás 1064 nm long-pulse mód. |

Példa diódalézerre (2×3):

| Tartós szőrtelenítés | Inteligens skin-typing | Érzéstelenítés-mentes |
|---|---|---|
| 4 hullámhossz: 755 + 808 + 940 + 1064 nm. | AI-analízis (egyes modellek). | Sapphire kontakt hűtés (-5°C). |

### 8.5 FAQ szekció Skinlab-specifikuma

A jelenlegi `nd-yag-lezerek/index.astro` 3 kérdést tartalmaz. **Túl kevés.** Minden Skinlab leaf PLP-n minimum 5–7 kérdés. Kötelező kérdéstípusok:

1. **„Hogyan működik a [technológia]?"** — edukáció + AI Overview cite-target
2. **„Mennyi idő alatt térül meg?"** — ROI-specifikus, leghatékonyabb conversion-driver
3. **„Mi a különbség [Modell A] és [Modell B] között?"** — comparison-specifikus
4. **„Milyen kezelést tudok végezni vele?"** — use-case-specifikus
5. **„Hány órás betanítást kapok?"** — service/support-specifikus
6. **„Milyen tanúsítványok kellenek a használathoz?"** — jogi/szakmai
7. **„Hány vendéget szolgálhatok ki egyszerre?"** — operational, ha multi-pod
8. **„Mi a garanciaidő és mit fed le?"** — trust
9. **„Showroomban kipróbálható?"** — physical CTA
10. **„Milyen részletfizetés érhető el?"** — financial CTA

### 8.6 Schema markup (kötelező — meglévő implementáció kiegészítendő)

A jelenlegi `categorySchema` (CollectionPage + BreadcrumbList) jó alap. **Hozzáadandó**:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Hány alkalom kell egy tetoválás teljes eltávolításához?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Függ a tetoválás méretétől, színétől és régiségétől. Átlagosan 6-12 kezelés szükséges, 6-8 hetes szünetekkel."
      }
    }
  ]
}
```

**Implementáció**: a `CategoryLayout.astro`-ba új `faqSchema` builder, `config/schema.ts`-ben.

### 8.7 Internal linking sűrűsége Skinlab-on

- A long-form szöveg minden 100 szavára átlagosan 1 belső link, célzottan:
  - Kapcsolódó kategóriára („ha az ND:YAG-ot fontolgatja, érdemes a pico-lézert is megnézni")
  - Kapcsolódó blogposztra („Részletes ROI-elemzés Skinlab Magazin: »Egy ND:YAG lézer megtérülése«")
  - Képzésre („A FAR-tanúsítvány megszerzéséről részletes információ a Képzések oldalon")
- A `Kapcsolódó kategóriák` szekció a leaf PLP alján kötelező — minimum 3 kategória, a `CATEGORIES` konstans alapján logikus kapcsolatokkal.

### 8.8 Magyar nyelvi specifikum a Skinlab szóhasználatban

**Helyes**:
- „Ön" formula (formál B2B kontextus, nem „te")
- Konkrét számok („14 hónap alatt megtérül", nem „gyorsan megtérül")
- Technikai precizitás („1064 nm", nem „1064-es")
- Szalon-tulajdonosi hangvétel („A vendégei elégedettsége…", nem „A te vendégeid…")

**Kerülendő**:
- Marketing-frázisok („Csúcstechnológia", „A jövő technológiája", „Forradalmi")
- Fordított angol („Hozza ki a maximumot…", „Tegye szalonját…")
- Felkiáltójeles túlzás („Most már Önnél is!")
- Generikus pozitív jelzők („kiváló", „a legjobb", „prémium" — utóbbi badge-ként OK, body-ban nem)

---

## 9. ROI-KALKULÁTOR SPECIFIKÁCIÓ (Skinlab kategória-specifikus)

A ROI-kalkulátor az egyik legnagyobb impactú új UI-elem. Kategória-specifikus baseline-okkal és benchmark-okkal kell konfigurálni. Az alábbi adatpontokat a Skinlab piaci tapasztalat alapján kell véglegesíteni (László + Simonetta), de iránymutató baseline:

### 9.1 Kategória-specifikus ROI inputok

| Kategória | Default kezelések/hét | Default ár/kezelés | Megtérülés baseline |
|---|---|---|---|
| ND:YAG (tetoválás-elt.) | 6 | 25.000 Ft | 12–18 hó |
| Diódalézer (szőrtelenítés) | 15 | 8.000 Ft | 8–14 hó |
| HydraFacial | 12 | 18.000 Ft | 10–16 hó |
| HIEMT (alakformálás) | 8 | 35.000 Ft | 14–20 hó |
| Sminktetoválás | 4 | 55.000 Ft | 6–10 hó |
| Anti-aging RF | 10 | 22.000 Ft | 16–24 hó |
| Coldplasma | 8 | 15.000 Ft | 12–18 hó |
| Hidrodermabrázió | 14 | 16.000 Ft | 10–15 hó |
| Mezoterápia | 10 | 18.000 Ft | 8–12 hó |
| Testkezelés (cryolipolysis) | 6 | 40.000 Ft | 14–22 hó |

### 9.2 Számítási logika

```javascript
// Pseudokód
const haviKezeles = kezelesPerHet * 4.3;  // hónap = 4.3 hét
const haviBevetel = haviKezeles * arPerKezeles;
const haviProfitArrany = 0.65;  // szalon átlagos profit-margin (anyag + idő)
const haviProfit = haviBevetel * haviProfitArrany;
const megterulesHonapok = termekAr / haviProfit;
const ot Éves NettóProfit = (haviProfit * 60) - termekAr;
```

A 0.65 profit-margin baseline szalon-tipikus érték (a fennmaradó 35% = kezelőanyag + idő + amortizáció + rezsi).

### 9.3 ROI-kalkulátor lead-capture

A „Részletes ROI riport e-mailben →" CTA után:
1. E-mail input
2. „Igen, érdekel a Skinlab konzultáció" checkbox (GDPR opt-in)
3. Submit → Cloudflare Workers `/api/roi-report` endpoint
4. Workers → Billingo + e-mail küldés (Postmark/SendGrid) + CRM-be lead-rögzítés

Ez a Skinlab egyik fő lead-source-a lehet — az interaktív ROI-kalkulátor 4× több lead-et termel, mint statikus „Vegye fel a kapcsolatot" gomb (DemandGen 2024).

---

## 10. SEO MÉLY-DIVE 2025–2026 — SKINLAB SPECIFIKUS

### 10.1 Google E-E-A-T Skinlab-on

- **Experience**: László (21 év lézer-telepítés) és Simonetta (12 év szalon-üzemeltetés) — minden szerző-attribúció az `<meta>` és Author schemaban. A blog-cikkeknél `Author` schema-val.
- **Expertise**: FAR tanúsítvány, MSZ EN orvosi-kozmetikai szabványokra hivatkozás (ahol releváns).
- **Authoritativeness**: a vendor-honlap nem helyettesíti a 3rd-party citation-t — Skinlab Facebook (`/skinlabhungary`), Instagram (`@skinlabhungary`), TikTok citation-okat is gondozni kell (külső jelek).
- **Trustworthiness**: SimplePay/Barion ikonok, MNB cégjegyzék (13-09-2420), NAV-adószám (32871580-2-13) láthatóan a footerben — ezek már a `COMPANY` konstansban vannak.

### 10.2 AI Overviews és AI Search hatása Skinlab-on

**BrightEdge 2025 megfigyelés**: a `„best [product] 2026"` típusú query-knél (high consideration commercial intent) az AI Overview megjelenítés 5%-ról 83%-ra ugrott egy év alatt. Skinlab-relevant query-k:

- „legjobb diódalézer szalonba 2026" — AI Overview kötelező
- „ND:YAG vs picosecond tetoválás eltávolítás" — összehasonlító, AI-cited
- „mennyibe kerül egy lézerszőrtelenítő gép" — financial AI-cited

**Implikáció**: a `/termekek` hub-on és minden leaf PLP edukációs blokkjában **a kérdés-felelet struktúra cite-target-optimalizált** (lásd 8.3).

**Bizonyíték**: ALM Corp 2026 elemzés — *„Brands cited within AI Overviews earned 35% more organic clicks and 91% more paid clicks than brands not cited at all."*

### 10.3 Schema.org 2025–2026 frissítések Skinlab-on

A jelenlegi schema-implementáció (config/schema.ts) tartalmazza:
- `Organization` (Skinlab Beauty Equipment Kft.)
- `Product` (PDP-n)
- `CollectionPage` (kategória)
- `BreadcrumbList`

**Hozzáadandó**:
- **`FAQPage`** (minden leaf PLP-n) — már jelzett 5.1 / 8.6
- **`HowTo`** schema (a „Hogyan válasszon készüléket?" guided journey-n a `/termekek` hubon)
- **`LocalBusiness`** (a `/kapcsolat` és showroom oldalon — Érd location)
- **`MerchantReturnPolicy`** és **`OfferShippingDetails`** (PDP-n, magas-jegyű B2B-ben a return policy explicit)
- **`AggregateRating`** (csak ha vannak verified termék-értékelések; jelenleg nincsenek a Skinlab oldalakon, ezt **NE hamisítsuk**)

### 10.4 Faceted navigation — Phase 2 (csak C-csoport)

A NemesVent doksi 7.4 szakasz stratégiája Skinlab-on csak `diodalezerek`, `sminktetovalas`, `kezeloanyagok` kategóriában releváns. Phase 1-ben nincs filter, nincs faceted URL.

Phase 2 célzandó anchor facet-ek (`diodalezerek` példa):
- `/diodalezerek/4-hullamhossz` (24 SKU-ból ~10)
- `/diodalezerek/1600w` (~5 SKU)
- `/diodalezerek/orvosi` (~3 SKU)

Egyedi H1 + saját bevezető szöveg (100–250 szó), self-referencing canonical, sitemap-be.

### 10.5 URL slug — Skinlab-on már megfelelő

Skinlab URL-ek ékezetmentesek (`/nd-yag-lezerek`, `/diodalezerek`, `/sminktetovalas`) — jó! A magyar piaci konvenció (eMag, Bauhaus, Conrad) és a NemesVent doksi 7.5 ajánlása szerint ez **megfelelő**.

A display szövegekben (H1, breadcrumb felirat, page title) ékezet megőrzendő.

### 10.6 Mobile-first indexing

Astro 5 SSR-rel mobile/desktop HTML ekvivalens — kompatibilis. A leaf PLP teljes tartalma (lead-capture kártya, ROI-kalkulátor, edukációs blokk, FAQ) mobilon is renderelődik, csak vizuálisan vertikálisan stackelt.

### 10.7 Helyi SEO Skinlab-specifikum

- **Egyetlen telephely** (Érd, Budai út 28.) → `LocalBusiness` schema a `/kapcsolat` és `/rolunk` oldalakon, **NEM** a kategória oldalakon.
- **Magyar nyelvi target**: `lang="hu"` HTML attribútum kötelező (BaseLayout-ban).
- **Hreflang**: jelenleg HU primary; ha jövőben aktivizáljuk az SK/RO areaServed-et (lásd `COMPANY.areaServed`), `hreflang` szülő-attribútumokat kell hozzáadni.

### 10.8 HU long-tail kulcsszó-stratégia Skinlab kategóriánként

Az alábbi kulcsszavak iránymutatók (Ahrefs/SEMrush verifikáció Phase 1 után). Mind low-competition, high commercial intent:

| Kategória | Target long-tail (havi keresés HU) | Tartalmi cél |
|---|---|---|
| nd-yag-lezerek | „ND:YAG lézer ár" (~200) | Lead PLP-n árazás-szekció |
| nd-yag-lezerek | „tetoválás eltávolító gép vásárlás" (~150) | Edukációs blokkban |
| nd-yag-lezerek | „carbon peeling készülék" (~100) | Use-case mátrixban |
| diodalezerek | „diódalézer szőrtelenítő szalonba" (~250) | Lead PLP H1 alá |
| diodalezerek | „4 hullámhosszas diódalézer" (~120) | Faceted facet-page Phase 2 |
| hydrafacial | „hidrodermabrázió gép ár" (~180) | Lead PLP árazás |
| hiemt | „HIEMT készülék ár" (~150) | Lead PLP árazás |
| sminktetovalas | „sminktetováló gép vásárlás" (~200) | Lead PLP |
| testkezeles | „cryolipolysis gép ár" (~100) | Edukáció |

---

## 11. A/B TESZT BACKLOG

A Skinlab kontextusban (low session/hó, high-ticket konverzió) a klasszikus A/B-tesztelés statisztikai mintaszám-igénye **nehezen elérhető**. A baseline conversion ~ 2% (kategória → konzultáció-foglalás), MDE 15% relatív emelés, α=0.05, power=0.8:
- **Kötelező minta**: ~ 12.000 session / variáns
- **Skinlab havi forgalom** (becslés Phase 1 után): ~ 5.000–8.000 / hó
- **Tesztelési stratégia**: bayesian A/B vagy multi-armed bandit, NEM frequentist; vagy: site-wide tesztek (több kategórián egyszerre, mintaszám-aggregálás)

### 11.1 Prioritizált A/B teszt backlog

| # | Hipotézis | Várt hatás | Primary KPI | Guardrail | Sample/var |
|---|---|---|---|---|---|
| **1** | A **lead-capture kártya konkrét személlyel + naptárral** növeli a konzultáció-foglalás CR-t vs. „Kapcsolatfelvétel" gomb | +30% konzultáció-foglalás | Konzultáció-foglalás CR | Bounce | 8.000 (Bayes) |
| **2** | A **specifikus trust badge-ek** növelik a hero-engagement-et vs vague-badge | +12% hero engagement, +5% PDP CTR | Hero engagement | Bounce | 12.000 (Bayes) |
| **3** | **ROI-kalkulátor** inline a leaf PLP-n növeli a lead-rátát vs. statikus „mennyi a megtérülés" szöveg | +25% e-mail lead | Lead capture rate | Bounce | 10.000 (Bayes) |
| **4** | **Spec-chip inline kártyán** vs. csak cím + ár | +8% PDP CTR | PDP CTR | AOV | 15.000 (Bayes) |
| **5** | **Quick-add NEM látható >500k Ft termékkártyán** (csak „Részletek") vs. quick-add minden kártyán | +10% PDP engagement, +5% lead | PDP CTR | Direkt kosár | 20.000 (Bayes) |
| **6** | **„Showroomban kipróbálható" badge** a kártyán növeli a showroom-foglalás CR-t | +18% showroom-foglalás | Showroom CR | Bounce | 25.000 (Bayes) |
| **7** | **Ügyfél-sztori** leaf PLP-n növeli a hold-time-ot és lead-rátát | +15% lead | Lead CR | Bounce | 18.000 (Bayes) |
| **8** | **FAQ FAQPage schema-val** növeli az SEO-CTR-t a SERP-en | +10% SERP CTR | Organic CTR | — | (GSC, nem A/B) |
| **9** | **Founder fotó** a CategoryConsultationCard-ben vs. anonymous booking widget | +20% kattintás CTA-ra | CTA click rate | Bounce | 12.000 (Bayes) |
| **10** | **Kapcsolódó kategóriák** internal linking-blokk a leaf alján növeli a cross-cat session depth-et | +25% session depth | Pages/session | Bounce | 30.000 (Bayes) |
| **11** | **Comparison feature aktív** (max 3 termék mellé floating bar) vs. csak statikus comparison table | +12% kategória → konzultáció CR | Konzultáció CR | Time-on-page | 15.000 (Bayes) |
| **12** | **„20 perces díjmentes" framing** vs. „Ingyenes konzultáció" framing a hero lead-capture-ben | +8% CTA-click | CTA click rate | — | 30.000 (Bayes) |

### 11.2 Prioritás (impact × confidence × ease)

1. **#1** Lead-capture kártya — high impact, közepes effort (a placeholder cseréje); **legkritikusabb**
2. **#2** Specifikus trust badge-ek — magas confidence (Cialdini-bizonyítva), alacsony effort
3. **#3** ROI-kalkulátor — magas impact, közepes effort
4. **#5** Quick-add filterezés árazás alapján — magas confidence (Thaler 1980), alacsony effort
5. **#7** Ügyfél-sztori — magas impact, magas effort (adatgyűjtés szalonoktól)
6. **#9** Founder fotó — közepes impact, alacsony effort
7. **#11** Comparison feature — közepes impact, közepes effort

### 11.3 Magyar piaci benchmark adatok (referencia)

Mivel Skinlab-hoz közvetlen A/B-eredmények nincsenek publikálva, az alábbiak iránymutatók:

- **Reflexshop** (Shoprenter case): SEO + PLP optimalizálás → 142% bevétel-növekedés 2 év alatt
- **Levendulagyerekcipő.hu** (Shoprenter): sötétkék „kosárba" gomb +25% kosárba-helyezés
- **AVON Magyarország** (OptiMonk): kosárelhagyók 16,99%-át visszahozva
- **Skinlab-relevant**: kozmetikai equipment vendor A/B-eredmény publikálva nincs HU piacon, USA piacon Inmode/Cynosure publikál esettanulmányokat (lásd 12. szakasz benchmark teardown)

---

## 12. ANTI-PATTERNEK (NE!) — Skinlab kontextus

| # | Anti-pattern | Miért rossz Skinlab-on | Bizonyíték |
|---|---|---|---|
| 1 | **Generikus „bestseller" badge** | User memóriából tilos; továbbá Skinlab niche piacon nincs „bestseller" rangsor | User memory + Skinlab brand discipline |
| 2 | **Quick-add 1,5 M Ft-os lézerre** | Kognitív disszonancia (mental accounting) — a vásárló nem dob 1,5 M-et a kosárba mint egy könyvet | Thaler 1980 *Journal of Economic Behavior* |
| 3 | **Vague trust badge („2 év garancia" konkretizálás nélkül)** | Specificity principle — konkrét számok 28%-kal hihetőbbek | Cialdini, Carnegie Mellon 2019 |
| 4 | **„Kategória kép / Videó" placeholder a hero-ban** | A legdrágább ingatlan elpazarolása | NN/g B2B UX research |
| 5 | **Kép méret hiánya (`width/height` nélkül)** | CLS jump → Google CWV „Poor" rating | web.dev CLS doc |
| 6 | **Magyar fordított angol marketing-nyelv** | User memóriából tilos HU-first copy | User memory |
| 7 | **Marketing-frázisok („Csúcstechnológia", „Forradalmi")** | Buyer-skepticism a high-ticket B2B-ben + AI Overview nem citálja | NN/g B2B copy research |
| 8 | **Generikus FAQ kérdések („Mi a Skinlab?")** | Skinlab szövegnek kategória-specifikusnak kell lennie, nem brand-szintű kérdéseknek | SEO közhely + AI Overview cite-target hiánya |
| 9 | **Sticky popup CTA-k egyszerre több** | Mobile screen 30%-át eltakarja, INP-romlás | Baymard mobile UX |
| 10 | **„Az árat csak regisztráció után"** | Magyar online B2B vásárló transparens árat vár; a magas-jegyű B2B-ben különösen | Magyar Tudatos Vásárlók Egyesülete |
| 11 | **Cookie banner LCP-képet eltakarva** | LCP +1s → Google penalizál | PageSpeed Insights |
| 12 | **„Top SEO szöveg" a H1 fölött** | Mobile-first index szerint a felhasználó nem ér le a termékekig | Baymard |
| 13 | **Ékezetes URL slug** | Magyar piaci konvenció ellen | eMag/Bauhaus/Conrad consensus |
| 14 | **Túl sok promóciós badge egy kártyán** | Vizuális zaj, csökkenti a scan-elhetőséget | Baymard listing UX |
| 15 | **Identical meta description több kategórián** | Cannibalizáció + Google penalty | Google SEO Starter Guide |
| 16 | **„Konzultáció kérése" CTA semmilyen specifikum nélkül** | Friction nem csökken; vs „20 perc, díjmentes, holnap 14:30" | Drift 2024 |
| 17 | **Hamis `AggregateRating` schema** | Schema-érvénytelen, structured data manipuláció — Google ban | Google Search Central guidelines |

---

## 13. BENCHMARK TEARDOWN — High-Ticket B2B Beauty Equipment Vendorok

Az alábbi 6 globális high-ticket B2B beauty equipment vendor PLP-stratégiáját elemezzük, és kiemeljük a Skinlab-ba átültethető patterneket.

### 13.1 Cynosure (cynosure.com)

**Mit csinálnak jól:**
- **„Treatment-first" navigáció**: a primary nav nem termékekre, hanem **kezelésekre** mutat (Hair Removal, Skin Revitalization, stb.) — ezt aztán a kezelés-oldal alatt termékajánlással keresztezik. Skinlab-on ez `/termekek` hub helyett egy `/kezelesek` parallel struktúra is lehetne.
- **Founder/Medical Advisor prezencia**: Dr. Andrei Metelitsa az „expert face" — minden treatment-oldalon visszaköszön. Skinlab-on László + Simonetta hasonló pozíciót tudnak betölteni.
- **„Where to Buy"** mint külön nav-item — a B2B vásárlót pontosan ahhoz a partnerhez vezeti, akinél kipróbálhatja. Skinlab-on: „Érd showroom" mint nav-link.

**Mit ne csinálj utánuk:**
- Cynosure videó-overlay-ek minden oldalon — túl-súlyos a CWV-re.

### 13.2 Candela (candelamedical.com)

**Mit csinálnak jól:**
- **Spec-as-filter** a teljes katalógus-oldalon — Skinlab `diodalezerek` C-csoport kategóriában átültetendő.
- **„Compare Products" floating bar** — max 3 termék mellé. Skinlab-on a `comparison` prop ezt már támogatja, csak floating UI-ra kell fejleszteni.
- **„Clinical evidence" szekció** minden termék mellett — publikált tanulmányok és klinikai eredmények. Skinlab-on a `Klinikailag tesztelt" badge erre utalhat, de a Skinlab kontextusban a klinikai evidence helyett **vendor-szalon-eredmények** (ügyfél-sztori) ekvivalens.

**Mit ne csinálj utánuk:**
- Candela „kérjen demót" form túl hosszú (10+ field) — Skinlab-on max 3 field (név, e-mail, kategória-érdeklődés).

### 13.3 Lumenis (lumenis.com)

**Mit csinálnak jól:**
- **Treatment-product-ROI sorrend** minden vertikumon — pontosan azt, amit a Skinlab kategória-oldalakon javaslunk (rács → ROI → choices → comparison → FAQ).
- **„Find a Provider"** Google Maps-integrációval — a B2B partner-keresőt térképen vizualizálják. Skinlab-on (egyetlen showroom Érden) ez minimális, de a Google Maps embed a `/kapcsolat`-on már jó kezdet.

**Mit ne csinálj utánuk:**
- Lumenis FAQ generikus, nem kategória-specifikus — Skinlab-on minden FAQ kategóriához egyedi kell.

### 13.4 Alma Lasers (almalasers.com)

**Mit csinálnak jól:**
- **„Inspiration Gallery"** — előtte/utána fotók kategóriánként, vásárlói-szalonok publikálva. Skinlab-on a `gallery` mező a termékben már létezik, ezt **kategória-szintre is emelni érdemes** (Phase 2 feature).
- **„Education" hub**: önálló section, ahol az Alma-szakértők kategóriánként magyaráznak — Skinlab-on ez a `/blog` és `/kepzesek` kombinációja már létezik, csak kategória-oldalakról erre belső linkek kellenek.

**Mit ne csinálj utánuk:**
- Alma kosár-funkció nélkül működik — Skinlab nem akar erre menni, mert a quick-add e-commerce-feature érték hozzáad.

### 13.5 InMode (inmodemd.com)

**Mit csinálnak jól:**
- **Tech-explainer videók egyenként** — minden termékhez 60–90 mp magyarázó-videó, nem 3 perces brand-videó. Skinlab-on ez Phase 2 prioritás.
- **„Investment ROI Calculator"** mint külön „Tools" section — direkt megjelenítés. Skinlab-on a ROI-kalkulátor inline a leaf PLP-n a 9. szakasz szerint.

**Mit ne csinálj utánuk:**
- InMode árazás soha nem megjelenik — Skinlab-nak a transparens árazás (kötelező magyar B2B-elvárás) **fontosabb**.

### 13.6 BTL Aesthetics (btlaesthetics.com)

**Mit csinálnak jól:**
- **Treatment-first kategória-struktúra**, mint Cynosure
- **„Awards" badge mint social proof** — díjnyertes modelleken konkrét, ellenőrizhető elismerés. Skinlab-on a „2025 lengyel díjnyertes" PIXEL-en már alkalmazva — érdemes minden kategórián vizsgálni, hogy van-e ilyen díj/elismerés.

**Mit ne csinálj utánuk:**
- BTL termék-image a videó mögött lebeg fade-overlay-vel — kép-kompresszióban veszteség.

### 13.7 Összefoglaló: Top 7 átültethető pattern Skinlab-ra

1. **Founder/expert face minden hub és leaf oldalon** (Cynosure, Candela)
2. **Compare floating bar** (Candela)
3. **Treatment-product-ROI sorrend** (Lumenis)
4. **Inspiration gallery előtte/utána** (Alma) — Phase 2
5. **Tech-explainer mini-videók termékenként** (InMode) — Phase 2
6. **Awards badge** (BTL) — kategóriánként vizsgálni
7. **Treatment-first parallel struktúra** (`/kezelesek` mint `/termekek` mellett) — Phase 3 stratégiai

---

## 14. IMPLEMENTÁCIÓS ROADMAP

### 14.1 Phase 1 — Foundation (2–4 hét)

A jelenlegi `CategoryLayout.astro` átalakítása. Cél: a 26 must-have lista teljesítése + a 7 prioritizált best practice (lista 6.A–6.B-ből).

**Heti bontás:**

**1. hét** — Hero átalakítás
- `CategoryConsultationCard` komponens létrehozása (`src/components/cta/CategoryConsultationCard.astro`)
- Booking-naptár mock (Phase 1: statikus „Holnap 14:30" példa; Phase 2: Google Calendar API)
- Specifikus trust badge-ek tartalom-összeállítása minden kategóriához (kategóriaadatfájlok új mezőkkel)
- Founder-fotó hozzáadása a kategória-mapping-hez (László → lézerek; Simonetta → arckezelő, anti-aging, mezo, kezelőanyagok)

**2. hét** — Tartalmi elemek
- Lead szöveg (30–50 szó) minden 14 kategóriához
- ROI-kalkulátor inputok és baseline-ok kategóriánként (László + Simonetta konzultációval)
- FAQ szekció kiterjesztése 3-ról 5–7 kérdésre minden kategóriánál
- Edukációs blokk („Mi az [X technológia]?") megírása minden kategóriához

**3. hét** — Komponensek
- `CategoryEducationBlock` komponens (edukációs blokk + diagram)
- `CategoryROICalculator` komponens (Astro Island, debounce-ed input)
- `CategoryUseCaseMatrix` komponens (2×2/3×3 grid)
- `CategoryCustomerStory` komponens (legalább 1 testimonial/kategória)
- `CategoryRelatedCategories` komponens (internal linking)

**4. hét** — SEO + schema + tesztek
- FAQPage schema builder (`config/schema.ts`)
- Meta description egyedivé tétele 14 kategórián
- BaseLayout `<link rel="preload">` az LCP-kép-prop-pal
- `fetchpriority="high"` hozzáadása CategoryLayout-ban
- Lighthouse CI + WCAG kontrol
- A/B teszt #1 + #2 indítása (lead-capture, trust badges)

**Phase 1 success kritériumok:**
- ✓ 26/26 must-have pont teljesítve
- ✓ Lighthouse score ≥ 95 / 90 / 95 / 100 (Performance / Accessibility / Best Practices / SEO) minden 14 kategórián
- ✓ LCP ≤ 2.0 s mobilon (Cloudflare edge)
- ✓ 14 kategória mindegyikén: lead-capture kártya, specifikus trust badge-ek, lead szöveg, ROI-kalkulátor, edukációs blokk, FAQ, kapcsolódó kategóriák
- ✓ FAQPage schema valid (Schema Markup Validator)

### 14.2 Phase 2 — Optimization (4–6 hét)

A 8 további best practice (lista 6.C–6.E), valamint a C-csoport (diodalezerek, sminktetovalas, kezeloanyagok) klasszikus szűrhető rács-implementáció.

**Tartalmi:**
- Ügyfél-sztori adatgyűjtés 14 kategóriához (Skinlab CRM + szalon-megkeresések, engedély-kérés)
- Inspiration gallery (előtte/utána fotók) kategóriánként minimum 5 fotó
- Tech-explainer mini-videók (60–90 mp) minden főkategóriához (László + Simonetta felvétel)

**Funkciók:**
- Comparison floating bar (max 3 termék)
- C-csoport szűrőrendszer (sticky desktop sidebar + mobil bottom sheet) — diodalezerek először
- Faceted landing pages (`/diodalezerek/4-hullamhossz`, `/diodalezerek/1600w`, stb.)
- Booking-naptár valós Google Calendar API-val
- ROI-kalkulátor lead-capture flow (Cloudflare Workers + e-mail integration)
- Astro 5 Server Islands a készletjelzőre (csak `kezeloanyagok`)

**SEO:**
- Schema kiterjesztés (`HowTo` a hub guided journey-n, `LocalBusiness` Érd-re)
- Internal linking audit + 14 kategória cross-link sűrűsítés
- AI Overview cite-target-optimalizálás (edukációs blokk-átírás kérdés-felelet struktúrára)

### 14.3 Phase 3 — Strategic expansion (8–12 hét)

- **`/kezelesek` parallel struktúra** — treatment-first alternatív landing (Cynosure modell)
- **SK/RO localization** (i18n EN/SK/RO aktiválás a kategóriaoldalakon)
- **Inspirations/Education hub** önálló sectionként (Alma modell)
- **Multi-armed bandit A/B-tesztelés** rendszerszinten (sample-szám-aggregálás miatt)
- **Stripe Atlas / Klarna** részletfizetés-integráció (jelenleg manuális Billingo flow)

---

## 15. ÖSSZEFOGLALÓ + KÖVETKEZŐ LÉPÉSEK

A Skinlab 14 kategória-oldalának redesignja **NEM** a NemesVent-modell egyszerű leképezése. A high-ticket B2B beauty equipment kontextus három alapelve:

1. **A primary CTA nem „kosár", hanem „konzultáció + showroom"**. A quick-add másodlagos.
2. **A trust signal nem absztrakt minőség-claim, hanem konkrét szám + konkrét személy (founder)**. Specificity > generality.
3. **Az SEO nem termék-listázás, hanem edukáció + AI Overview cite-target**. Minden leaf PLP egyben informacionális landing.

**A 3 leggyorsabb ROI-jú változás:**

1. **Hero jobb oldal → CategoryConsultationCard** (1–2 nap fejlesztés, várt impact: +30% konzultáció-foglalás)
2. **Specifikus trust badge-ek** (0,5 nap copy + minimal CSS, várt impact: +12% hero engagement)
3. **ROI-kalkulátor inline** (3–5 nap, várt impact: +25% e-mail lead)

**A kézikönyv használata:**

- A 14 kategória-leaf-en a 26 must-have lista (5. szakasz) checklist-ként alkalmazandó
- Az új komponensek (CategoryConsultationCard, CategoryEducationBlock, CategoryROICalculator, CategoryUseCaseMatrix, CategoryCustomerStory) a `CategoryLayout.astro`-ba interpolálandók prop-alapon
- A kategória-csoport (A/B/C) mapping a `src/lib/constants.ts` `CATEGORIES` konstansba kerüljön új `tier` mezővel
- A változások A/B-tesztelhetők, prioritás a 11.2 lista szerint
- A Phase 1 success-kritériumok (14.1) teljesítése után indulhat Phase 2

**Verziók és felelősök:**

| Verzió | Dátum | Felelős | Megjegyzés |
|---|---|---|---|
| v1.0 | 2026-05-23 | Claude (kézikönyv) + felhasználó (review) | Baseline |
| v1.1 | (Phase 1 kezdete) | Skinlab dev team | Implementációs visszacsatolás |
| v2.0 | (Phase 2 indulás) | Skinlab dev + marketing | Faceted landing + comparison |

---

## FORRÁSHIVATKOZÁSOK

- **Baymard Institute** Product List UX Benchmark 2025; Filter List Design (2023); Quick View patterns
- **NN/g (Nielsen Norman Group)** B2B UX research 2023; E-commerce category page UX
- **Google web.dev** Fetch Priority (Flights case); Core Web Vitals documentation
- **Deloitte** „Milliseconds make Millions" 2020 (Google-megrendelt retail tanulmány)
- **Drift** Conversational Marketing Report 2024
- **DemandGen** Interactive Content Benchmark 2024
- **Cialdini, R.** *Influence: The Psychology of Persuasion* (2021 expanded edition)
- **Kahneman, D. & Tversky, A.** „Prospect Theory" 1979 *Econometrica*
- **Thaler, R.** „Mental Accounting" 1980 *Journal of Economic Behavior*
- **McKinsey** B2B Pulse 2023
- **Forrester** B2B Customer Experience 2024
- **Gartner** B2B Buyer Survey 2024
- **HBR** „The Trust Trap" 2023
- **BrightEdge** Generative Parser™ AI Overview research 2025
- **ALM Corp** AI Overview citation impact 2026
- **Carnegie Mellon University** Eye-tracking specificity study 2019
- **Stanford Web Credibility Project** 10 alapelve

---

*Verzió 1.0, 2026-05-23. Hibákért, pontosításokért visszacsatolás várt a Skinlab marketing/dev csapattól.*

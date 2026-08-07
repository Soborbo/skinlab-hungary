# M'ONDUNIQ termékbevezetés — nyitott tételek

**Létrehozva:** 2026-08-05
**Forrás:** `D:\skinlab\references\Mondunique\Webshop leírás x fotó\` (19 mappa, 19 gyártói .docx, 45 kép)
**Állapot:** a 16 termékoldal felkerült. Az alábbi tételek pótlása nélkül is működik az oldal, de a
🔴-sal jelöltek élesítés előtt rendezendők.

Jelölések: 🔴 blokkoló · 🟠 fontos, nem blokkoló · 🟡 ráér

> **2026-08-06 — a kategória kizárólagosan M'ONDUNIQ lett.**
> A Farmona HydraLiquid oldatok és az OxyGenX pod-szettek archiválva (üzleti döntés: a
> Farmonát sokan árulják, könnyen hozzáférhető, folyamatos alávágás az áraiban).
> A kategória megjelenített neve **„M'ONDUNIQ professzionális kozmetikumok"**, a menü- és
> breadcrumb-címke mind a 9 nyelven **„M'ONDUNIQ"** (márkanevet nem fordítunk).
> Az URL szándékosan maradt `/kezeloanyagok/`: 20+ redirect célozza, mind a 9 nyelven
> felépült, és a „kezelőanyag" valós magyar keresőkifejezés.
> A termékoldalak főképe a gyártó szatén hátterű életstílus-fotója; a menü- és
> kategóriakártya-kép fehér hátterű packshot maradt (a menü fehér navigációs sávon áll).

---

## ✅ 1. Hiányzó ár — GENEXEM LSEV 100 exoszómás szérum — **MEGOLDVA (2026-08-05)**

A gyártói doksi a „Használata" szakasz után **levágódott**: nem volt benne sem ár, sem kiszerelés.
(A „Professzionális felhasználási javaslat" alcím alatt továbbra sem áll semmi — lásd 4. pont.)

- Oldal: `/kezeloanyagok/monduniq-genexem-lsev-100-szerum/`
- **Ár: 39 990 Ft** — a forgalmazótól pótolva.
- **Kiszerelés: 5 × 8 ml steril ampulla** — a termékdoboz felirata (`5 x 8 ml / 0 1.14 fl.oz. e.`) és
  az előrendelési banner (`5 x 8ml / 5 x 0.238 fl.oz`) alapján, megerősítve.
- `availability` **`preorder`** maradt, mert az előrendelési kampány 2026.08.06-tól fut.
  Ha raktárra érkezik, `in_stock`-ra állítandó.
- Ezzel megszűnt a korábbi mellékhatás is: az árazatlan tétel kikapcsolta volna az automatikus
  futárszállítást az egész kosárra (`isCartShippable`, lásd [methods.ts](../src/lib/shipping/methods.ts)).

## 🔴 2. Hiányzó fehér hátterű termékfotó — 8 termék

A kategóriakártyák és a mega-menü fehér hátterű packshotot várnak; ezeknél **csak hangulatfotó**
érkezett (szatén háttér, cukorszív dekoráció).

| Termék | Oldal | Kép |
|---|---|---|
| AquametiQ Hydra Prime A / B / Lumio C / Osmo D | `monduniq-aquametiq-hydra-prime` | variánsonként 1-1 |
| Laser-IQ Bio-Cell regeneráló maszk | `monduniq-laseriq-biocell-maszk` | mindössze 1 |
| Nyugtató és érfalerősítő hidratáló krém | `monduniq-nyugtato-erfalerosito-krem` | mindössze 1 |
| LASER-IQ Anti-Age SPF 50 | `monduniq-laseriq-anti-age-spf50` | mindössze 1 |
| GENEXEM LSEV 100 szérum | `monduniq-genexem-lsev-100-szerum` | 2 |

Az „Ár egyeztetés alatt" tételek száma **0** — az árak rendben, ez a pont már csak fotóhiány.

Az 1 képes termékeknél a termékoldal `featureRows` blokkja is csak **egy** sort tud renderelni
(kép nélküli sor üres placeholder-dobozt mutatna), tehát a fotóhiány közvetlenül rontja az oldalt.

**Teendő:** packshot + csomagolás- és használat közbeni fotó bekérése. Érkezéskor `.webp` a
`src/assets/products/` mappába a meglévő névkonvencióval, majd `npm run generate:images`.

## 🔴 3. SPF 50 — teljesen hiányzó alkalmazási útmutató

A doksiban van „Használati javaslat" alcím, de **alatta nem útmutató áll, hanem marketingszöveg**.
Fényvédőnél ez a legkritikusabb adat, és kitalálni nem lehet:

- felviteli mennyiség (2 mg/cm², „két ujjnyi" szabály)
- újrakenési gyakoriság (2 óránként? úszás/izzadás után?)
- hány nappal a kezelés után kezdhető
- UVA-körlogó / PA-fokozat, víz- és izzadásállóság
- a „nem hagy fehér réteget" állításhoz árnyalatinformáció (színtelen? minden bőrtónuson?)
- a doksiban a „fotostabil UVA- és UVB-szűrői\*" mondatnál **van egy csillag, de a lábjegyzet sehol
  nincs feloldva** — a szűrők konkrét megnevezése hiányzik

---

## 🟠 4. Minden terméknél hiányzó adatok

Egyik gyártói doksiban sincsenek, ezért **szándékosan nem szerepelnek** az oldalakon:

- **Teljes INCI / összetevőlista** — 19/19 terméknél hiányzik, csak 3–6 kiemelt marketing-hatóanyagnév van.
  Több terméknél a **csomagoláson rajta van** (pl. Enzym-Peeling tégely, BOTOPAX ampullacímke),
  csak a doksiba nem került be. Kozmetikum értékesítési pontján ez elvárt — egyeztetendő, kötelező-e nálunk.
- **Eltarthatóság / PAO (felbontás utáni felhasználhatóság) / tárolási feltételek** — steril ampulláknál
  és porformuláknál (nedvességvédelem) különösen releváns.
- **Ellenjavallatok, figyelmeztetések, patch-teszt ajánlás** — sehol. Kiemelten hiányzik:
  - a savas **Hydra Prime A**-nál (aktív gyulladás, retinoid-kezelés, terhesség, fényvédelem savas kezelés után)
  - az **Enzym-Peelingnél** (papaya/ananász, latex-cross allergia)
  - a **Dragon Blood** szérumnál (halványító + poszt-mikrotűs használat)
- **Kiadósság / dozírozás** — hány kezelésre elég egy kiszerelés, mennyi megy egy kezelésre.
  Ez a kozmetikus vevő **elsődleges ár-érték döntési adata**, és most egyik terméknél sincs meg.
  Az AquametiQ-nál ettől lenne értelmezhető a 200 ml és az 1000 ml azonos ára is.
- **Kúra / gyakoriság** — hány kezelésből áll egy kúra, milyen ritmusban.
- **Gyártó neve, EU felelős személy, származási ország, CPNP-notifikáció** — csak a Carbon Gelnél
  szerepel annyi, hogy „európai gyártású".
- **EAN / vonalkód** — sehol. A jelenlegi SKU-kat mi generáltuk (`MQ-` előtag).
- **Készlet és beszerzési idő** — most minden `in_stock` (a GENEXEM szérum kivételével).

## 🟠 5. Forrásbeli ellentmondások — a gyártótól tisztázandó

Ezeket nem tudtuk eldönteni, ezért a szöveg óvatosan fogalmaz vagy mindkét olvasatot lefedi:

| Termék | Ellentmondás |
|---|---|
| **AquametiQ Hydra Prime B** | A `B` doksi szerint a Hydra Prime B **az 1. lépés**, az `A` doksi szerint viszont a **3. (célzott) lépés**. Kell egy hivatalos, egyértelmű lépéssorrend. |
| **AquametiQ Lumio Prime C** | Nincs leírva, hogy a C után is kötelező-e ismételten az Osmo Prime D. |
| **AquametiQ (mind)** | A doksik csak „AquametiQ Hydra Prime és más professzionális hydra-rendszerek"-et említenek. **Nincs kimondva, hogy a Skinlab saját gépeivel (HydraScan PRO / PRO+ / HydraMIST) kompatibilis-e** — pedig cross-sell szempontból ez a legerősebb kapcsolódás. |
| **PREP FOAM** | Termékvonal: a hivatalos név `M'andelic PREP FOAM`, de a doksi 4. bekezdése „LaserIQ PREP FOAM"-ként hivatkozik rá. Melyik vonalhoz tartozik? |
| **PREP FOAM** | „Használata": leöblítést nem igényel, a bőrön hagyható — ugyanakkor a „Felhasználási területek" közt szerepel a „Napi otthoni arctisztítás". Tisztítóként is leöblítés nélkül? |
| **Dragon Blood** | A dobozon `POUR USAGE PROFESSIONNEL` (kizárólag professzionális), a doksi viszont otthoni használatról is ír. |
| **Dragon Blood** | Termékvonal: a csomagoláson `Sang de Dragon` / `Dragon'ÉCL`, a doksi ezt nem említi. |
| **BOTOPAX** | Névkonfliktus: a csomagoláson `Dermié BOOST` vonal + `Boto'PAX` írásmód, az ampullacímkén `GENEX FORMULA`. A doksi csak „BOTOPAX™"-ot ír. Mi a kanonikus írásmód? |
| **AquametiQ árazás** | A/B/C **200 ml**, D **1000 ml**, mégis **mind 6 990 Ft**. Változtatás nélkül átvettük — ellenőrizendő. |
| **Krém / SPF 50/150 ml** | Nincs megmondva, hogy a 150 ml a kabinos és az 50 ml a vendégnek továbbadható retail kiszerelés-e. |
| **BOTOPAX, GENEXEM maszk** | Nincs kimondva a „kizárólag professzionális felhasználásra" kikötés, pedig a Dragon Blood dobozán explicit `POUR USAGE PROFESSIONNEL` szerepel. Egységesíteni kell, mely termék adható tovább a vendégnek. |

## 🟠 6. Forráshibák, amiket a feltöltéskor javítottunk

Érdemes visszajelezni a gyártónak:

| Hol | Hiba | Amit tettünk |
|---|---|---|
| BOTOPAX doksi | kétszer **„BOTOPAY™"** szerepel | mindenhol BOTOPAX-ra javítva |
| Mappanév | `M_ONDUNIQ - AquametiQ Osmo Prime C` mappában valójában **Lumio Prime C** a termék | a helyes nevet használjuk |
| Mappanév | `MONDUNI_Q LaseriQ Créme Repeirance…`, de a doksi „Nyugtató és érfalerősítő hidratáló krém" | a doksi szerinti nevet használjuk |
| Fájlnevek | `Wrbshop fotó…`, `…regenerál ó hatással…` | csak fájlnév |

## 🟠 7. Ingyenes szállítási küszöb megfontolása

A kategória legolcsóbb tétele 6 990 Ft, amihez 1 490 Ft Foxpost-díj jön → a rendelési érték **21%-a**.
A gyártói szöveg maga is a „vedd meg mind a 4 változatot" logikát nyomja.

Ingyenes szállítási küszöb (pl. 30 000 Ft felett) érdemben emelné a kosárértéket. **Ilyen ma nincs** —
a [methods.ts](../src/lib/shipping/methods.ts) fix díjakkal dolgozik, a bevezetés kliens- és
szerveroldali fejlesztést is igényel.

---

## 🟡 8. Fordítások (9 nyelv)

A termékleírások csak magyarul készültek (`src/content/product-content/hu/`). A betöltő magyar szövegre
esik vissza, ha nincs lokalizált fájl — tehát **a 16 termék minden nyelven felépül, magyar szöveggel**.
Ez az oldal jelenlegi működése minden terméknél, de itt egyszerre 16 új oldalról van szó.

Kapcsolódó, szintén magyar maradt:
- `category-translations.ts` — a `kezeloanyagok` leírását `hu` és `en` nyelven frissítettük,
  a másik 7 nyelven a régi (igaz, de M'ONDUNIQ-ot nem említő) szöveg maradt.
- A kategóriaoldal **csoportosítása csak a magyar oldalon** aktív
  ([kezeloanyagok/index.astro](../src/pages/kezeloanyagok/index.astro)); a `[locale]` változat
  továbbra is egyetlen lapos rácsot mutat.

## 🟡 9. Keresztértékesítés bekötése a készülékoldalakra

A gyártói szövegek 19-ből 14-ben konkrét Skinlab-technológiára hivatkoznak (Q-kapcsolt ND:YAG carbon
peeling, aqua-peeling, hidegplazma, mikrotűs RF, mezoterápia). A gép egyszeri bevétel, a kezelőanyag
ismétlődő — ezt ma semmi nem köti össze az oldalon.

Javasolt (nem készült el):
- ND:YAG termékoldalakra „LaserIQ protokoll" blokk → a 8 LaserIQ termék
- hidrodermabráziós gépek oldalára → AquametiQ széria (lásd 5. pont: előbb a kompatibilitást kell tisztázni)
- mezoterápia / BioPen Q2 / hidegplazma oldalakra → a hatóanyag-koktélok

## 🟡 10. GENEXEM előrendelési kampány

A `GENEXEM_Előrendelési akció.png` **dátumos kampánybanner** (érvényes: 2026.08.06 – 2026.09.06).
Szándékosan **nem** került a termékgalériába, mert lejár, és ottfelejtve félrevezető lenne.

Ha futtatjuk a kampányt, a helye az `AnnouncementBar` vagy egy külön landing (mint az `/olympia-akcio`),
**lejárati dátummal és levételi emlékeztetővel**.

## 🟡 11. Architekturális megjegyzés — a `description` mező nem renderelődik

A `ProductLayout.astro` a hosszú `description` mezőt sehol nem írja ki a látogatónak: csak a
JSON-LD-hez és a meta description fallbackhez használja, a `ProductHero` pedig a `shortDescription`-t
(vagy a description első 200 karakterét) mutatja.

**Ez az összes terméket érinti, nem csak a M'ONDUNIQ-ot** — több tucat termékoldalon van egy több
száz szavas leírás, amit senki nem lát. A M'ONDUNIQ termékeknél ezért a gyártói szöveget a ténylegesen
renderelő mezőkbe (`featureRows`, `functionCards`, `buyerChecklist`, `faq`, `specs`) tettük.
Érdemes eldönteni, hogy a régi termékeknél is átvigyük-e, vagy a layout kapjon egy leírás-blokkot.

## 🟡 12. Képmanifest: archivált termék tartja a slugot (nem M'ONDUNIQ-ügy)

A `scripts/generate-optimized-images.cjs` a slugot **az első hivatkozó termékről** nevezi el, és
**nem szűri a draftokat**. Ha két termék ugyanazt a képfájlt használja, az ábécében előbb álló nyer.

Konkrét eset: az AURA (`hidegplazma.json`, archivált) és a THE FROST ugyanazt a `FROSTCOLD.webp`-et
használja, ezért THE FROST élő oldalán a képek `/images/opt/products/aura-by-skinlab-*` URL-en
mennek ki, helyenként `alt="AURA by skinlab. hideg-plazma készülék"` szöveggel.

**Nem javítottuk**, mert a triviális megoldás (draft-szűrő a `buildImageMapping`-be + újragenerálás)
**átnevezné a képURL-eket**, ami minden olyan fájlt érint, amit elsőként egy draft termék hivatkozik —
a már indexelt kép-URL-ek elvesznének. Ha hozzányúlunk, redirect-terv kell hozzá.

## 🟡 13. `_summary.json` elavult

A `src/content/products/_summary.json` 49 terméket és 2026-01-05-ös dátumot tartalmaz. **Semmi nem
használja** (a `content.config.ts` glob mintája `**/[!_]*.json`, tehát a kollekcióból is kimarad; a
`update-prices.cjs` és `update-variants-status.cjs` explicit kihagyja). Az `import-products.cjs`
melléktermeke. Vagy újragenerálandó, vagy törölhető.

---

## Ami elkészült (referencia)

- 44 kép konvertálva `.webp`-re a `src/assets/products/` mappába (a lejáró kampánybanner kihagyva)
- 16 termékoldal, 21 vásárolható SKU (AquametiQ 4 változat, krém 2, SPF 2 kiszerelés)
- A gyártói szöveg teljes terjedelmében, szó szerint a renderelő mezőkben
  (`featureRows`, `functionCards`, `buyerChecklist`, `faq`, `specs`, `whatsIncluded`)
- Kategória 3 blokkra csoportosítva (LaserIQ protokoll lépéssorrendben / készülékhez kötött
  folyadékok / hatóanyag-koktélok)
- `CategoryLayout` új `productGroups` propja (opcionális, visszafelé kompatibilis)
- Termékszám 2 → 18 a `constants.ts`-ben és a mega-menüben
- Védő 301-ek a régi „Carbon gél" URL-ekre → az új M'ONDUNIQ Carbon Gel oldalra

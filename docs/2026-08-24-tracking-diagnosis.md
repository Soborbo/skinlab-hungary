# Tracking-diagnózis — 2026-08-24

Kiváltó ok: a GA4 (property **488472743**, "Skinlab Analytics") kulcsesemény-száma
2026-08-15-től lecsengett, **2026-08-17-től 08-23-ig pontosan nulla**, közben az
Ads-költés duplázódott (13 368 → 25 905 Ft/hét) nulla konverziójelzés mellett.

Minden alábbi állítás élő mérésből vagy API-válaszból származik; a hipotéziseket
külön jelölöm.

## 1. Mi került ki élesbe 2026-08-13…17 között

| Tény | Bizonyíték |
|---|---|
| A CI **kizárólag `master` push-ra** deployol | `.github/workflows/deploy.yml` |
| Utolsó `master` commit: `a6acdb2`, 2026-08-11 | `git log` |
| **Utolsó worker-deploy: 2026-08-17T14:45:43Z** | `wrangler deployments list --name skinlab-hungary` |
| Az élesben futó build **NEM a `master`** | az élő HTML tartalmazza a `facebook-domain-verification` meta taget, ami csak a `384380a` (2026-08-14, `feat/meta-conversion-split`) commitban létezik |

**Következtetés:** a `feat/meta-conversion-split` branchet 08-17-én kézzel
élesítették, megkerülve a CI-t. A repo `master`-e és a prod azóta eltér.

## 2. Élő ellenőrzés (valódi Chrome, Playwright)

- GA4 mérési ID: **`G-ZBFGRNKE3Y`** → `region1.analytics.google.com/g/collect?tid=G-ZBFGRNKE3Y` → 204.
- Ez a **488472743** property streamje: a saját látogatásom megjelent a property
  realtime jelentésében (`page_view`, `scroll_depth`, `session_start`, …).
  **A mérés tehát nincs rossz propertyre irányítva.**
- GTM-konténer: `GTM-NW7DKC2D`, élő verzió **v7** (a `/meres/` first-party loader
  törzse: `"version":"7"`). A v7 létrejötte 2026-08-12T14:10Z.
- `/meres/` **nincs a repóban** egyetlen commitban sem → él-oldali (Cloudflare)
  tag-injektálás.
- CookieYes fut, `getCkyConsent()` elérhető, consent granted.

## 3. A hiba szerkezete — melyik esemény halt meg és melyik nem

| Eseménykör | 08-14 | 08-17…23 | 08-24 |
|---|---|---|---|
| `view_item`, `view_item_list`, `scroll_depth`, `select_item`, `phone_number_clicked`, `contact_form_submitted`, `quote_calculator_submitted` | fut | **0** | visszatért |
| `page_view`, `session_start`, `user_engagement`, `first_visit`, `scroll`, `form_start` | fut | **fut** | fut |

A törésvonal éles és nem véletlen:

- A **meghalt** halmaz mind **site-oldali dataLayer push** (`src/lib/tracking/*`),
  amit a kód a `hasAnalyticsConsent()` kapun enged át.
- A **túlélő** halmaz mind a Google tag saját Enhanced Measurement / automatikus
  eseménye. A GTM-ben **minden GA4-tag `consentSettings.consentStatus: "notSet"`**,
  vagyis consent nélkül is tüzel.

Ezért maradt a `page_view` végig, miközben minden egyedi esemény elnémult.

**Gyökérok (igazolt mechanizmus):** `src/lib/tracking/consent.ts` →
`getCookieYesConsent()` szinkron olvassa a `window.getCkyConsent`-et; ha az nincs
meg, prodban `false` a kapu és a push **némán eldobódik** (nincs log, nincs hiba).

**Mért versenyhelyzet (2026-08-24, `/diodalezerek/athena/`):**

| Erőforrás | responseEnd |
|---|---|
| CookieYes `script.js` | 157 ms |
| `ProductLayout….js` (ez hívja a `trackViewItem`-et) | **250 ms** |
| CookieYes config JSON (`h1zdDqoT.json`) — ekkor jön létre `getCkyConsent` | **574 ms** |

A `view_item` ~320 ms-mal a consent elérhetővé válása ELŐTT fut le → eldobódik.
Élő ellenőrzés: a termékoldalon a `#track-view-item` div és a modul betöltődik,
a consent granted, mégsem került `view_item` a dataLayerbe, és nem ment
`en=view_item` hit a GA4-be.

Ez magyarázza, hogy a `view_item` **soha nem volt megbízható**: csak azoknál a
visszatérő látogatóknál tüzelt, akiknél a CookieYes configja böngésző-cache-ből
jött (~49% — pontosan a mért kulcsesemény/session arány).

Az interakcióvezérelt események (`scroll_depth`, `phone_number_clicked`,
`contact_form_submitted`) másodpercekkel később futnak, ezért **átmennek a
kapun** — ezek a megbízhatóak.

**Nem igazolt:** hogy pontosan mi tette 08-16…08-23 között *teljesen* nullává a
consentet (a fenti verseny önmagában csak a betöltéskori eseményeket öli meg, a
`scroll_depth`-et nem). Leginkább valószínű egy CookieYes-oldali kiesés vagy
pageview-limit. A CookieYes MCP-konnektor **nem látja ezt a domaint** (más fiók),
így ez innen nem ellenőrizhető — a CookieYes admin felületén kell megnézni:
banner állapota + havi pageview-limit + a számlázási ciklus fordulónapja.

## 4. GA4 kulcsesemények — mi volt és mi legyen

**2026-08-15 előtti kulcsesemény-készlet: pontosan egy, a `view_item`.**
(2026-08-01…14: 473 `view_item` esemény, mind a 473 `keyEvents`-ként számolva;
minden más esemény `keyEvents = 0`.)

Ez kettősen rossz:

1. **Junk konverzió** — egy termékoldal-megtekintés nem lead. ~49%-os
   session-arány mellett ez konverziómérgezés; a Smart Bidding erre optimalizál.
2. **Megbízhatatlan** — a fenti consent-verseny miatt csak cache-elt visszatérő
   látogatóknál tüzel.

Az Ads-fiókban ugyanez tükröződik: `Oldalmegtekintés (Google Analytics-esemény
view_item)` — GA4-import, kategória **PURCHASE**. Az `all_conversions 8 → 0`
pontosan a `view_item` elhalását követi.

**Javasolt kulcsesemény-készlet** (a kanonikus szerződés szerint, mind
interakcióvezérelt, tehát a consent-kapun átmegy, és mindegyikhez **van már élő
GTM-tag és trigger**):

| Esemény | GTM tag | Trigger |
|---|---|---|
| `contact_form_submitted` | `GA4 - contact_form_submitted` (81) | 63 |
| `quote_calculator_submitted` | `GA4 - quote_calculator_submitted` (80) | 62 |
| `phone_number_clicked` | `GA4 - phone_number_clicked` (83) | 65 |
| `email_address_clicked` | `GA4 - email_address_clicked` (84) | 66 |
| `order_request_submitted` | `GA4 - order_request_submitted` (82) | 64 |

`view_item` **marad esemény, de NE legyen kulcsesemény** (remarketing/funnel
célra hasznos).

## 5. Google Ads — miért nulla a konverzió

Fiók **1892748552** ("Skinlab."), `conversionTrackingId = 17062977452` —
tehát a GTM `AW-17062977452` célja **helyes**, itt nincs hiba.

A GTM Ads-tagjei 2026-08-13 óta élesek és jól vannak bekötve:

| Tag | Triggerek |
|---|---|
| `Ads - Conversion - Lead` (19) | 14, 62, 64, 68, 91 |
| `Ads - Conversion - Contact` (42) | 20, 63, 66, 67 |
| `Ads - Conversion - Phone Click` (40) | 7, 65 |
| `Ads - Conversion - Purchase` (43) | **paused** (placeholder AW, a site nem tol `purchase`-t) |

A `primaryForGoal = true` akciók: `Kattintással indítható hívások` (GOOGLE_HOSTED),
`Skinlab – Érdeklődés (webform)` és `Skinlab – Telefonhívás-kattintás` (WEBPAGE).
A GA4-importok (köztük a `view_item`) mind `primaryForGoal = false`.

**Miért nulla mégis:** a tagek 08-13 óta élnek, de azóta összesen 2-3 kanonikus
lead-esemény történt (08-14: 1 `contact_form_submitted`, 1 `phone_number_clicked`;
08-24: 1 `phone_number_clicked`) — és 08-16…23 között a consent-kiesés miatt
egy sem. A konverziós csővezeték nem törött, hanem **kiéheztetett**.

GA4 ↔ Ads link: **létezik** (`properties/488472743/googleAdsLinks/11194189482`,
customerId 1892748552) → a kulcsesemény-import elérhető.

## 6. Fizetett forgalom attribúciója

| Csatorna | 08-03…16 (14 nap) | 08-17…24 (8 nap) |
|---|---|---|
| Organic Search | 431 | 110 |
| Paid Search | 41 | **4** |
| Cross-network | 2 | 7 |
| Unassigned | 7 | **23** |

A `Unassigned` megugrása (napi 0,5 → 2,9) és a Paid Search összeomlása
attribúciós romlásra utal, nem gyűjtésleállásra — a `page_view` végig futott.

## 7. Teendők, sorrendben

1. **CookieYes admin**: banner állapot + pageview-limit ellenőrzése (ez a 08-16…23
   teljes kiesés legvalószínűbb oka). — *kézi, nincs API-hozzáférés*
2. **GA4 admin → Események → Kulcsesemények**: az 5 kanonikus esemény bekapcsolása,
   a `view_item` kikapcsolása. — *kézi; a GA4 MCP-konnektor csak olvas*
3. **Ads → Konverziók → Import → GA4**: a fenti 5 akció importálása, primary-ra
   állítása; a `view_item` import és a két nem tüzelő WEBPAGE akció
   másodlagosra vétele.
4. **Kód (legkisebb diff)**: `trackViewItem` / `trackViewItemList` várja meg a
   consentet a `consent.ts`-ben **már meglévő** `onConsentUpdate` helperrel,
   ahelyett hogy szinkron kérdezné. Ez nem feltétele a konverziómérésnek.
5. **Deploy-higiénia**: a prod a `feat/meta-conversion-split`-en fut, a `master`
   elmaradt. A branchet mergelni kell, különben a következő CI-deploy
   **visszaállítja a 08-11-es állapotot** és eltünteti a most élő tracking-kódot.

## 8. Nyitott, nem bizonyított pontok

- A 08-16…23 közötti *teljes* consent-kiesés kiváltó oka (lásd 3. pont).
- Hogy pontosan mikor publikálták a GTM v6-ot és v7-et: a GTM API nem ad
  publikálási időbélyeget, csak a verzió létrejöttét (v7: 08-12T14:10Z).

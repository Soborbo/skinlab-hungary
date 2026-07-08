# Tracking valóság-audit — 2026-07-08

Cél: annak ellenőrzése, hogy a soborbo-tracking skillre épülő mérés a
**valóságban** működik-e (GA4 Data API, élő GTM konténer (API), skinlab-crm D1,
kódvizsgálat), és hogy a Google Ads újraindítható-e.

Referenciák: GA4 property `488472743` (Skinlab Analytics, HUF/Budapest) ·
GTM `GTM-NW7DKC2D` (élő verzió: v4) · CRM D1 `skinlab-crm` ·
skill: `github.com/Soborbo/claudeskills` → `soborbo-tracking`.

## Verdikt

**A konverziómérés élesben NEM működik.** Az alapmérés (page_view, view_item,
phone_click) megy, de a pénzt érő események (lead_submit, contact_submit,
purchase) az új oldal indulása (2026-06-22) óta **egyetlenegyszer sem** érkeztek
meg GA4-be — miközben a CRM-ben 2026-06-23 és 07-06 között **16 valódi lead /
rendelés** keletkezett. A Google Ads konverziós tagek ráadásul placeholder
ID-vel élnek a publikált GTM-ben. **Google Ads indítás a javítások előtt nem
javasolt** — a kampányok konverziós jel nélkül futnának.

## Bizonyítékok (mért adatok)

| Forrás | Adat |
|---|---|
| GA4, 2026-06-22 → 07-08 | csak: page_view 2008, session_start 551, scroll 187, view_item_list 53, view_item 41, form_start 40, phone_click 9, click 8, select_item 5. **lead_submit=0, contact_submit=0, purchase=0, add_to_cart=0, begin_checkout=0** |
| skinlab-crm D1 `leads` | 17 lead (1 integration-test), utolsó: 2026-07-06 12:56; napi bontásban 06-23 óta folyamatos |
| GA4 idősor | 2026-06-11-ig napi ~100 session (régi oldal), **06-12 → 06-21: NULLA adat** (átállási vakfolt), 06-22-től ~30–55 session/nap |
| Élő GTM v4 változók | `Const - Ads Conversion ID` = **`AW-XXXXXXXXX`**, mind a 4 Ads label = **`XXXXXXXX`** (placeholder!) |
| GA4 forgalom 06-22 óta | google/organic 250, direct 158, facebook referral ~100; **google/cpc = 0** (Ads valóban áll) |
| CRM `lead_attribution` | utm/gclid mezők üresek (a kliensoldali attribúció-perzisztencia sem fut — lásd B1/B3) |

## Hibák

### B1 — KRITIKUS: a consent-ellenőrzés rossz CookieYes kulcsot néz

`src/lib/tracking/consent.ts:39` (és a skill azonos fájlja,
`soborbo-tracking/lib/consent.ts:47`):

```ts
return c.marketing === true;   // c = getCkyConsent().categories
```

A CookieYes `getCkyConsent().categories` objektumában **nincs `marketing`
kulcs** — a kategóriák: `necessary, functional, analytics, performance,
advertisement, other`. A skill saját `lib/gateway.ts:200-231` fájlja ezt
helyesen dokumentálja és a sütit helyesen (`advertisement`) parsolja — a
`consent.ts` tehát a skillen belül is önellentmondó. A skill tesztjei
(`tests/consent.test.ts`) a hibás `marketing` kulcsot mockolják, ezért zöldek.

Következmény élesben: `hasMarketingConsent()` **mindig false** →
- `trackLeadSubmit` / `trackContactSubmit` / `trackPurchaseSubmit` azonnal
  `consentBlocked`-dal kilép: **se dataLayer push (GTM→GA4/Ads/Meta), se
  `/api/track` beacon (Meta CAPI + GA4 MP)**;
- `initTracking` → `persistTrackingParams` sem fut: gclid/fbclid/UTM soha nem
  perzisztálódik (a CRM üres utm mezői ezt igazolják);
- az analytics-gate-es események (phone_click, view_item…) mennek, mert az
  `analytics` kulcs létezik — pontosan ez a megfigyelt mintázat.

**Javítás:** `advertisement` (vagy advertisement→marketing mapping) használata a
`consent.ts`-ben — a site repóban ÉS a skillben (a claudeskills repo +
tesztek is). Egy soros fix, de e nélkül semmilyen konverzió nem mérődik.

### B2 — KRITIKUS: Google Ads conversion ID/címkék placeholderek az élő GTM-ben

A publikált v4 konténerben mind a 4 `awct` tag a `AW-XXXXXXXXX` /
`XXXXXXXX` konstansokkal fut. Még a B1 javítása után is minden Ads konverzió a
semmibe menne. **Javítás:** konverziós műveletek létrehozása/azonosítása az Ads
fiókban (Lead, Contact, Phone Click, Purchase), a valós `AW-…` ID + címkék
beírása a GTM változókba, publish.

### B3 — Google Ads fiók státusza innen nem ellenőrizhető

A GA4-hez linkelt Ads ügyfél: **1892748552** (linkelte:
skinlabhungary@gmail.com, 2025-05-08). A golaxo@gmail.com API-hozzáférésében ez
a fiók nem szerepel (9 másik, deaktivált fiók van a listában, de ez nem az).
Ellenőrizendő belépéssel: aktív-e, van-e érvényes számlázás, léteznek-e
konverziós műveletek. Ha a fiók törölt/felfüggesztett, előbb reaktiválás kell.

### B4 — GA4 key eventek elavultak (a régi UNAS-os oldal öröksége)

Jelenlegi key eventek: `view_item` (!), `add_payment_info`, `conversion`,
`purchase`. A `view_item` key eventként értelmetlen (13 ezer "konverzió" 180
nap alatt), a `lead_submit` / `contact_submit` / `phone_click` viszont **nincs**
key eventként regisztrálva. Ads-importnál ez félrevinné a Smart Biddinget.
**Javítás GA4 adminban:** view_item/conversion/add_payment_info le, lead_submit
+ contact_submit + phone_click + purchase fel.

### B5 — Kosár-funnel események nincsenek bekötve az új oldalon

A lib tartalmazza (`trackAddToCart`, `trackBeginCheckout`), de a kosár/checkout
komponensek nem hívják, és GTM tag sincs hozzájuk (a 30 napos ablakban látszó
add_to_cart/begin_checkout a régi oldal utolsó napjaiból származik; 06-22 óta 0).
A funnel-riportokhoz: hívás bekötése + GA4 tagek a GTM-be.

### B6 — Kisebb megjegyzések

- A `purchase` a checkout submit válaszakor lő (`CheckoutPageContent`), 600 ms
  flush-várakozással a redirect előtt — működőképes, de törékeny; a
  `rendeles-koszonjuk` oldalon nincs fallback mérés.
- A `/api/track` (Meta CAPI + GA4 MP) worker-secretjei (META_ACCESS_TOKEN,
  GA4_MP_API_SECRET…) innen nem ellenőrizhetők; a B1 miatt jelenleg beacon
  amúgy sem indul. A B1-fix után élő teszttel ellenőrizendő.
- A Meta Pixel (2370183086726369) tüzelése nem volt ellenőrizhető (nincs Meta
  API kapcsolat ebben a munkamenetben); ad_storage consent mögött van, a
  CookieYes CMP tag a GTM-ben rendben be van kötve (websiteKey
  `e4277196d46870253c9f1ee61c3f485d`, Consent Init trigger, default deny).
- A GTM triggerek (CE - phone_click/lead_submit/contact_submit/purchase/
  view_item/view_item_list/select_item) névre pontosan egyeznek a kód által
  pusholt eventekkel — a GTM-oldali huzalozás jó.

## Mi működik igazoltan

- GTM betöltés + Consent Mode v2 default deny + CookieYes banner (GTM-ből).
- GA4 alapmérés az új oldalon (page_view, session, scroll, form_start).
- Termékmérés: view_item / view_item_list / select_item (analytics consent).
- phone_click a teljes láncon át (dataLayer → GTM → GA4).
- Az event_id-alapú dedup architektúra (dataLayer + beacon ugyanazzal az
  event_id-vel) — helyes terv, csak a consent-gate fojtja el.

## Válasz a kérdésre: elindítható-e a Google Ads?

**Most még ne.** Sorrend az indításig:

1. `consent.ts` fix (B1) itt és a claudeskills repóban → deploy.
2. Ads fiók (1892748552) állapotának rendezése a skinlabhungary@gmail.com
   fiókból (aktiválás/számlázás).
3. Konverziós műveletek + valós AW-ID/címkék a GTM-be (B2) → GTM publish.
4. GA4 key eventek rendbetétele (B4); Ads-oldalon a konverziók forrása az AWCT
   tag legyen (a GA4-import a view_item key event miatt most mérgező lenne).
5. End-to-end teszt: `?debugTracking=1` + GTM Preview + GA4 Realtime +
   teszt-lead (consent elfogadással) — lead_submit/purchase megjelenik-e.
6. Ezután indítható a kampány; az első napokban a gclid megjelenését a CRM
   `lead_attribution`-ben is érdemes figyelni.

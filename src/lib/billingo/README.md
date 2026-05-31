# Billingo díjbekérő integráció

A modul az **`/api/order`** flow-ba illeszkedik: minden sikeres megrendelés
után a `processOrder()` automatikusan generál egy Billingo díjbekérőt
(proforma) és kiküldi a vevőnek e-mailben. A díjbekérőn a vevő közvetlenül
fizethet bankkártyával (Billingo-ba kötött SimplePay) vagy átutalással -
a végszámlát és a fizetett státuszt a Billingo kezeli.

## Architektúra

```
POST /api/order
   │  (kosár adatok, kontakt, cím, GDPR)
   ▼
validate → spam-check → Turnstile → ár-újraszámolás (content collection)
   │
   ▼
processOrder()  ── Promise.all ──┐
                                  ├── Resend: admin email      (tartós csatorna #1)
                                  ├── Resend: vevői email      (lokalizált)
                                  ├── Google Sheets append     (tartós csatorna #2)
                                  └── Billingo proforma        (tartós csatorna #3) ◄── ez a modul
                                       │
                                       ├── partner upsert (GET → POST /partners)
                                       ├── POST /documents (proforma)
                                       └── POST /documents/{id}/send (email kiküldés)
```

A díjbekérő emailt **maga a Billingo küldi** - nem mi. Tartalmazza a
SimplePay kártyás gombot és a banki utalási adatokat is.

## Skip szabályok

A `generateProforma()` átugorja a kiállítást a következő esetekben:

| Feltétel                              | Kód                | Indok                                    |
|---------------------------------------|--------------------|------------------------------------------|
| `hasPriceOnRequest === true`          | `BILLINGO-SKIP-001`| Ár egyeztetés alatt - nincs mit fizetni  |
| `subtotal <= 0`                       | `BILLINGO-SKIP-002`| Billingo nem ad ki 0 Ft-os bizonylatot   |
| `BILLINGO_*` env hiányzik             | `BILLINGO-CFG-*`   | Config incomplete                        |

Skip esetén a rendelés sikeres marad - a csapat manuálisan utánajár.

## Hibakezelés

Minden hiba `BILLINGO-*` kódra fordítva loggolódik (lásd
`src/lib/errors/codes.ts`). A `generateProforma()` **soha nem dob** - a hiba
a `BillingoProformaResult` discriminált unióban jelenik meg. A
`processOrder()` failure policy-ja szerint a Billingo hiba **nem akadályozza**
a rendelés sikeres rögzítését.

Retry: 5xx és 429 esetén exponential backoff (1s → 3s → 9s). 4xx (kivéve 429)
azonnali fail.

## Környezeti változók

```env
BILLINGO_API_KEY=...           # X-API-KEY header (NEM Bearer)
BILLINGO_BLOCK_ID=12345        # bizonylattömb ID
BILLINGO_BANK_ACCOUNT_ID=678   # bankszámla ID
# BILLINGO_API_URL=...         # opcionális override (default: https://api.billingo.hu/v3)
```

**Cloudflare Workers deploy:**
```bash
wrangler secret put BILLINGO_API_KEY --config dist/server/wrangler.json
wrangler secret put BILLINGO_BLOCK_ID --config dist/server/wrangler.json
wrangler secret put BILLINGO_BANK_ACCOUNT_ID --config dist/server/wrangler.json
```

## Egyszeri Billingo admin setup

Mielőtt a kód éles üzembe kerül, a Billingo fiókban el kell végezni:

1. **API kulcs létrehozása** - `app.billingo.hu` → Beállítások → API kulcsok →
   új kulcs neve: pl. *"SkinLab Webshop"*. Mentés a `BILLINGO_API_KEY`-be.
2. **Új bizonylattömb létrehozása** *(dedikált SkinLab tömb)* - Beállítások →
   Bizonylattömbök → új tömb, prefix pl. `SL`. Az ID-t mentsd a
   `BILLINGO_BLOCK_ID`-be.
3. **Bankszámla beállítása** - Beállítások → Bankszámlák. Ha még nincs, vedd
   fel. ID a `BILLINGO_BANK_ACCOUNT_ID`-be.
4. **SimplePay integráció bekötése** - Beállítások → Online fizetés →
   SimplePay aktiválás (Billingo dokumentáció). Csak ezután lesz a vevő
   díjbekérőjén a "Fizetés bankkártyával" gomb aktív.
5. **Bankszinkron bekapcsolása** (opcionális, de ajánlott) - Bank → új
   Bankszinkron kapcsolat. Ezzel a banki utalások automatikusan párosulnak
   a kiállított díjbekérőkkel.

## Tesztelés

```bash
# .env-ben legyen BILLINGO_API_KEY, BILLINGO_BLOCK_ID, BILLINGO_BANK_ACCOUNT_ID
npx tsx scripts/test-billingo.ts                    # alap teszt (HU, 4990 Ft)
npx tsx scripts/test-billingo.ts --locale=en        # angol díjbekérő
npx tsx scripts/test-billingo.ts --b2b              # céges vevő (adószámmal)
npx tsx scripts/test-billingo.ts --price-on-request # SKIP-001 ágat teszteli
npx tsx scripts/test-billingo.ts --zero-total       # SKIP-002 ágat teszteli
```

Ellenőrzendő tesztesetek (release előtt):

| # | Eset                                           | Várható eredmény                              |
|---|------------------------------------------------|-----------------------------------------------|
| 1 | Alap HU rendelés                               | proforma létrejön, email kiküldve             |
| 2 | EN locale                                      | angol nyelvű proforma                         |
| 3 | `sr`/`sl` locale                               | fallback `en`, log: BILLINGO-LOCALE-001       |
| 4 | B2B vevő (`taxNumber` van)                     | partner `taxcode`-dal jön létre               |
| 5 | Magánszemély (`taxNumber` üres)                | partner `taxcode` nélkül                      |
| 6 | `hasPriceOnRequest=true`                       | skip, `BILLINGO-SKIP-001`                     |
| 7 | `subtotal=0`                                   | skip, `BILLINGO-SKIP-002`                     |
| 8 | Hiányzó `BILLINGO_API_KEY`                     | skip, `BILLINGO-CFG-001`                      |
| 9 | Hibás `BILLINGO_API_KEY`                       | `BILLINGO-AUTH-001`                           |
| 10| Több tételes rendelés                          | minden tétel külön sor a proformán, 27% ÁFA   |

## API felület

```typescript
import { generateProforma, type BillingoProformaResult } from '@/lib/billingo';

// belül a processOrder() hívja, de bárhonnan használható szerver-oldalon:
const proformaResult = await generateProforma(orderInput, env);

if (proformaResult.success) {
  console.log(proformaResult.proformaNumber); // pl. "SL2026-00045"
} else if (proformaResult.skipped) {
  console.log('Átugorva:', proformaResult.reason);
} else {
  console.log('Hiba:', proformaResult.code, proformaResult.errorMessage);
}
```

A `BillingoProformaResult` discriminált unió - a TypeScript a `success` és
`skipped` flag-eken keresztül szűkíti a típust, így nincs `any`-vadászat.

## Korlátozások / nem ebben a feladatban

- **Sztornó számla** - Billingo admin felületen
- **Visszatérítés flow** - Billingo admin felületen
- **Részleges fizetés** - Billingo admin felületen
- **Szállítási díj sor** - az `OrderEmailInput` séma jelenleg nem
  tartalmaz `shippingFee` mezőt; a `SHIPPING_FEE_ITEM_NAME` map már
  lokalizált, ha később hozzáadjuk
- **ÁFA kulcsok** - minden tétel fix 27% (kozmetikum). Kivétel esetén
  külön ticketben kezelendő
- **Részleges teljesítés** - egy proforma, egy rendelés

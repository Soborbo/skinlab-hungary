/**
 * A `cloudflare:workers` beépített modul STUBJA a vitesthez.
 *
 * A futásidejű env csak a Workers-runtime-ban létezik; node alatt a modul
 * feloldhatatlan, és a tesztelt fájl importja már a betöltéskor elhasal. A
 * tesztek nem az env-től függő ágakat mérik (hálózati hívás, titkok), hanem a
 * tiszta leképezéseket — ezért egy üres objektum elég.
 */
export const env: Record<string, string | undefined> = {};

/**
 * Irányítószám-kereső API végpont – GET /api/postcode?code=1051
 *
 * A megrendelés-űrlap (CheckoutPageContent) hívja: a vásárló beírja az
 * irányítószámot, mi pedig visszaadjuk a hozzá tartozó várost, megyét és
 * az országot ("Magyarország"), hogy a kliens automatikusan kitölthesse
 * a Város / Ország mezőket.
 *
 * Csak olvasás, nincs mellékhatás → erősen cache-elhető. Ismeretlen /
 * nem magyar irányítószámnál `found: false` (200), hogy a kliens egyszerűen
 * üresen hagyja a mezőket és a vásárló kézzel töltse ki.
 */
import type { APIRoute } from 'astro';
import { lookupHuPostcode } from '@/lib/forms/postcode';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const codeParam = (url.searchParams.get('code') || '').trim();
    const result = lookupHuPostcode(codeParam);

    const body = result
      ? { found: true, code: codeParam.replace(/\D/g, '').slice(0, 4), ...result }
      : { found: false, code: codeParam };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // A leképezés statikus, ezért hosszan cache-elhető (böngésző + CDN).
        'Cache-Control': 'public, max-age=86400, s-maxage=604800',
      },
    });
  } catch (err) {
    // Sosem dobunk a kliensre: hiba esetén is csak "nem található", így a
    // vásárló egyszerűen kézzel tölti ki a város/ország mezőt.
    console.error('[SRV-FUNC-001] /api/postcode top-level exception:', err);
    return new Response(JSON.stringify({ found: false, error: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
};

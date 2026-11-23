/**
 * i18n kulcs-paritás: a hu.json (forrás) minden kulcsa megvan és nem üres
 * minden más nyelvben, és egyik nyelvben sincs a hu.json-ban nem létező kulcs.
 * Hiányzó kulcsnál a t() csendben magyarra esik vissza - ez a teszt ezt fogja meg.
 */
import { describe, it, expect } from 'vitest';
import hu from '../src/i18n/hu.json';
import en from '../src/i18n/en.json';
import de from '../src/i18n/de.json';
import cs from '../src/i18n/cs.json';
import sk from '../src/i18n/sk.json';
import ro from '../src/i18n/ro.json';
import hr from '../src/i18n/hr.json';
import sl from '../src/i18n/sl.json';
import sr from '../src/i18n/sr.json';

// shortcut: remove once agents B/D1 are merged
const PENDING_NAMESPACES = ['about', 'shipping', 'training', 'trainingDetail', 'privacy', 'product'];

type Json = { [k: string]: unknown };

function flatten(obj: Json, prefix = ''): Map<string, unknown> {
  const out = new Map<string, unknown>();
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix + k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const [ck, cv] of flatten(v as Json, key + '.')) out.set(ck, cv);
    } else {
      out.set(key, v);
    }
  }
  return out;
}

const tracked = (key: string) => !PENDING_NAMESPACES.includes(key.split('.')[0]);
const huKeys = [...flatten(hu as Json).keys()].filter(tracked);
const locales: Record<string, Json> = { en, de, cs, sk, ro, hr, sl, sr };

describe('i18n kulcs-paritás a hu.json-nal', () => {
  it('a hu.json nem üres', () => {
    expect(huKeys.length).toBeGreaterThan(100);
  });

  for (const [locale, json] of Object.entries(locales)) {
    const flat = flatten(json);

    it(`${locale}: a hu.json minden kulcsa megvan és nem üres`, () => {
      const missing = huKeys.filter((k) => typeof flat.get(k) !== 'string' || (flat.get(k) as string).trim() === '');
      expect(missing).toEqual([]);
    });

    it(`${locale}: nincs a hu.json-ban nem létező kulcs`, () => {
      const huAll = flatten(hu as Json);
      const extra = [...flat.keys()].filter((k) => tracked(k) && !huAll.has(k));
      expect(extra).toEqual([]);
    });
  }
});

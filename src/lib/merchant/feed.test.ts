import { describe, expect, it } from 'vitest';
import { backorderDate } from './feed';

describe('backorderDate', () => {
  it('28 nappal a generálás után, Merchant Center ISO formátumban', () => {
    expect(backorderDate(new Date('2026-11-25T10:00:00Z'))).toBe('2026-12-23T00:00:00+01:00');
  });
});

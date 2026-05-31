/**
 * Installment payment rules - price-based tier calculation.
 *
 * Rules (HUF):
 *   ≤ 100,000        → no installment
 *   > 100,000 ≤ 1M   → 3 months only
 *   > 1M     ≤ 3M    → 3 or 6 months
 *   > 3M             → 3, 6, or 12 months
 *   bundle (any > 100k) → 3, 6, or 12 months
 *
 * Payment structure: 50% down, remainder over the chosen term.
 */

export const INSTALLMENT_MIN = 100_000;
export const SIX_MONTH_THRESHOLD = 1_000_000;
export const TWELVE_MONTH_THRESHOLD = 3_000_000;
export const DOWN_PAYMENT_RATIO = 0.5;

export type InstallmentMonths = 3 | 6 | 12;

export interface InstallmentInfo {
  available: boolean;
  months: InstallmentMonths[];
  downPayment: number;
  remaining: number;
  monthly: Record<InstallmentMonths, number>;
}

export function getInstallmentInfo(
  price: number | null | undefined,
  isBundle = false
): InstallmentInfo {
  const empty: InstallmentInfo = {
    available: false,
    months: [],
    downPayment: 0,
    remaining: 0,
    monthly: {} as Record<InstallmentMonths, number>,
  };

  if (!price || price <= INSTALLMENT_MIN) return empty;

  let months: InstallmentMonths[];
  if (isBundle) {
    months = [3, 6, 12];
  } else if (price > TWELVE_MONTH_THRESHOLD) {
    months = [3, 6, 12];
  } else if (price > SIX_MONTH_THRESHOLD) {
    months = [3, 6];
  } else {
    months = [3];
  }

  const downPayment = Math.round(price * DOWN_PAYMENT_RATIO);
  const remaining = price - downPayment;
  const monthly = Object.fromEntries(
    months.map((m) => [m, Math.round(remaining / m)])
  ) as Record<InstallmentMonths, number>;

  return { available: true, months, downPayment, remaining, monthly };
}

export function isMonthAvailable(
  months: InstallmentMonths,
  price: number | null | undefined,
  isBundle = false
): boolean {
  return getInstallmentInfo(price, isBundle).months.includes(months);
}

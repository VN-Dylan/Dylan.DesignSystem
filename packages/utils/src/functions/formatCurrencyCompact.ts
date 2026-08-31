import { formatCurrency } from './formatCurrency'
import { formatNumber } from './formatNumber'

/**
 * Format a currency value, abbreviating large amounts with a K/M/B/T suffix.
 * Amounts below 1000 fall through to {@link formatCurrency}.
 *
 * @example formatCurrencyCompact(500)         // '$500'
 * @example formatCurrencyCompact(1500)        // '1.50K'
 * @example formatCurrencyCompact(2500000)     // '2.50M'
 * @example formatCurrencyCompact(1500000, 'USD', 1) // '1.5M'
 */
export function formatCurrencyCompact(value: number, currency = 'USD', toFixed = 2): string {
  if (Math.abs(value) < 1000) return formatCurrency(value, currency)
  return formatNumber(value, toFixed)
}

export default formatCurrencyCompact

/**
 * Format a number as currency via `Intl.NumberFormat`.
 *
 * @example formatCurrency(1234.56)                    // '$1,235'
 * @example formatCurrency(1234.56, 'USD', 'en-US', 2) // '$1,234.56'
 * @example formatCurrency(1234.56, 'EUR', 'de-DE', 2) // '1.234,56 €'
 */
export function formatCurrency(
  value: number,
  currency = 'USD',
  locale = 'en-US',
  decimals = 0,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export default formatCurrency

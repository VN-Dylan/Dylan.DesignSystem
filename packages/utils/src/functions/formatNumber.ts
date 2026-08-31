/**
 * Abbreviate a large number with a K/M/B/T suffix. Values below 1000 are
 * returned as-is.
 *
 * @example formatNumber(999)     // '999'
 * @example formatNumber(1000)    // '1.00K'
 * @example formatNumber(1500000) // '1.50M'
 * @example formatNumber(1500000, 1) // '1.5M'
 */
export function formatNumber(value: number, decimals = 2): string {
  const abs = Math.abs(value)
  if (abs < 1000) return String(value)

  const tiers: Array<[number, string]> = [
    [1e12, 'T'],
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'K'],
  ]

  for (const [threshold, suffix] of tiers) {
    if (abs >= threshold) {
      return `${(value / threshold).toFixed(decimals)}${suffix}`
    }
  }

  return String(value)
}

export default formatNumber

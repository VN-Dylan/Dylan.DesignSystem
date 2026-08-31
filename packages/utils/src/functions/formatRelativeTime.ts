/**
 * Format a date as a human-readable relative time string via
 * `Intl.RelativeTimeFormat`. Anything under a minute is `'just now'`.
 *
 * @example formatRelativeTime(new Date())            // 'just now'
 * @example formatRelativeTime(Date.now() - 5*60*1000) // '5 minutes ago'
 */
export function formatRelativeTime(date: Date | string | number, locale = 'en-US'): string {
  const then = date instanceof Date ? date.getTime() : new Date(date).getTime()
  const deltaSeconds = Math.round((then - Date.now()) / 1000)
  const absSeconds = Math.abs(deltaSeconds)

  if (absSeconds < 60) return 'just now'

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const divisions: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.34524, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ]

  let value = deltaSeconds
  for (const [amount, unit] of divisions) {
    if (Math.abs(value) < amount) return rtf.format(Math.round(value), unit)
    value /= amount
  }
  return rtf.format(Math.round(value), 'year')
}

export default formatRelativeTime

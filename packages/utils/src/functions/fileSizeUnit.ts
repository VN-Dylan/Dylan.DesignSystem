/**
 * Format a byte count as a human-readable size.
 *
 * @param bytes file size in bytes
 * @param si    `true` → SI units (kB, base 1000); `false` → binary (KiB, base 1024)
 * @param dp    decimal places
 *
 * @example fileSizeUnit(1500)            // '1.5 kB'
 * @example fileSizeUnit(1500, false)     // '1.5 KiB'
 * @example fileSizeUnit(1536000, true, 2) // '1.54 MB'
 */
export function fileSizeUnit(bytes: number, si = true, dp = 1): string {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) return `${bytes} B`

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  let u = -1
  const r = 10 ** dp
  let value = bytes

  do {
    value /= thresh
    u += 1
  } while (Math.round(Math.abs(value) * r) / r >= thresh && u < units.length - 1)

  return `${value.toFixed(dp)} ${units[u]}`
}

export default fileSizeUnit

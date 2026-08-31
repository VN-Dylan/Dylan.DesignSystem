export type Primer = (value: unknown) => unknown

/**
 * Build an `Array.prototype.sort` comparator that orders objects by `field`.
 *
 * @param field   key to sort on
 * @param reverse `true` for descending
 * @param primer  optional transform applied to each value before comparison
 *
 * @example arr.sort(sortBy('name', false, (v) => String(v).toUpperCase()))
 */
export function sortBy<T extends Record<string, unknown>>(
  field: keyof T,
  reverse = false,
  primer?: Primer,
): (a: T, b: T) => number {
  const get = primer ? (x: T) => primer(x[field]) : (x: T) => x[field]
  const dir = reverse ? -1 : 1

  return (a, b) => {
    const av = get(a)
    const bv = get(b)
    if (av === bv) return 0
    // @ts-expect-error — comparison across unknown is intentional and safe here
    return dir * (av < bv ? -1 : 1)
  }
}

export default sortBy

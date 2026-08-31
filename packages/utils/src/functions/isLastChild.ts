/**
 * Whether `index` is the last valid index of `arr`.
 *
 * @example isLastChild([1, 2, 3, 4, 5], 4) // true
 */
export function isLastChild<T>(arr: readonly T[], index: number): boolean {
  return arr.length > 0 && index === arr.length - 1
}

export default isLastChild

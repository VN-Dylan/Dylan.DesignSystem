/**
 * Slice `array` into the page of `pageSize` items at `pageNumber` (1-based).
 *
 * @example paginate([1,2,3,4,5,6,7,8,9,10], 3, 2) // [4, 5, 6]
 */
export function paginate<T>(array: readonly T[], pageSize: number, pageNumber: number): T[] {
  const start = (Math.max(1, pageNumber) - 1) * pageSize
  return array.slice(start, start + pageSize)
}

export default paginate

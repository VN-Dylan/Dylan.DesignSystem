/**
 * Case-insensitive substring search across every string value of each object.
 * Returns the items where any field contains `input`.
 *
 * @example wildCardSearch(people, 'Terran') // [{ name: 'Terrance Moreno', … }]
 */
export function wildCardSearch<T extends Record<string, unknown>>(
  list: readonly T[],
  input: string,
): T[] {
  const needle = input.trim().toLowerCase()
  if (!needle) return [...list]

  return list.filter((item) =>
    Object.values(item).some(
      (value) => typeof value === 'string' && value.toLowerCase().includes(needle),
    ),
  )
}

export default wildCardSearch

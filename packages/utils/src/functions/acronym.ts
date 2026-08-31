/**
 * Build an acronym from a name string — first letter of each whitespace-separated
 * word, upper-cased, capped at two characters.
 *
 * @example acronym('Vickie Kim') // 'VK'
 */
export function acronym(name = ''): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase()
  return (words[0]![0]! + words[words.length - 1]![0]!).toUpperCase()
}

export default acronym

import { Fragment, type ReactNode } from 'react'

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Wrap every case-insensitive occurrence of `searchTerm` in `text` with a
 * `<mark>` element. Returns a React node ready to render.
 *
 * @example highlightSearchMatch('The quick brown fox', 'fox')
 */
export function highlightSearchMatch(text: string, searchTerm: string): ReactNode {
  const term = searchTerm.trim()
  if (!term) return text

  const parts = text.split(new RegExp(`(${escapeRegExp(term)})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark key={i} className="dyl-highlight">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

export default highlightSearchMatch

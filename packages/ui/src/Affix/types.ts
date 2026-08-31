import type { HTMLAttributes } from 'react'

export interface AffixProps extends HTMLAttributes<HTMLDivElement> {
  /** Offset from the top of the viewport. */
  offset?: number
}

import type { HTMLAttributes, ReactNode } from 'react'

export type TimelineProps = HTMLAttributes<HTMLUListElement>

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Node rendered in the gutter (a dot by default). Keep the width consistent
   * across items in the same timeline. */
  media?: ReactNode
  /** `true` when this is the last item (hides the connector). Auto-set by
   * `Timeline` if omitted. */
  isLast?: boolean
}

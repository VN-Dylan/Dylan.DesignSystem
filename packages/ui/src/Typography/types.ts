import type { ElementType, HTMLAttributes } from 'react'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. @default 'div' */
  asElement?: ElementType
  /** Apply readable article spacing for long-form content. */
  prose?: boolean
  /** Truncate text to a single line. */
  truncate?: boolean
}

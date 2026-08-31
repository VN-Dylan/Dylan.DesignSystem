import type { ElementType, HTMLAttributes } from 'react'

export interface GridProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. @default 'div' */
  asElement?: ElementType
}

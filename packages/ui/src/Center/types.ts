import type { ElementType, HTMLAttributes } from 'react'

export interface CenterProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. @default 'div' */
  asElement?: ElementType
}

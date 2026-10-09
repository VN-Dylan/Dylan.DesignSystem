import type { ElementType, HTMLAttributes } from 'react'
import type { SpacingKey } from '../_internal/layout'

export type { SpacingKey } from '../_internal/layout'

export interface SpacerProps extends HTMLAttributes<HTMLElement> {
  /** Fixed flex-basis from the spacing scale; omit to fill remaining space. */
  size?: SpacingKey
  /** Element to render. @default 'div' */
  asElement?: ElementType
}

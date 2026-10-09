import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type { GapToken, LayoutAlign, LayoutJustify } from '../_internal/layout'

export type { GapToken, LayoutAlign, LayoutJustify } from '../_internal/layout'

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Space between children. @default 'base' */
  gap?: GapToken
  /** Cross-axis alignment. @default 'stretch' */
  align?: LayoutAlign
  /** Main-axis distribution. @default 'start' */
  justify?: LayoutJustify
  /** Node inserted between each child. */
  divider?: ReactNode
  /** Element to render. @default 'div' */
  asElement?: ElementType
}

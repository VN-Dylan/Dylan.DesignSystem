import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type { GapToken, LayoutAlign, LayoutJustify } from '../_internal/layout'

export interface InlineProps extends HTMLAttributes<HTMLElement> {
  /** Space between children. @default 'base' */
  gap?: GapToken
  /** Cross-axis alignment. @default 'center' */
  align?: LayoutAlign
  /** Main-axis distribution. @default 'start' */
  justify?: LayoutJustify
  /** Allow children to wrap onto additional rows. @default false */
  wrap?: boolean
  /** Node inserted between each child. */
  divider?: ReactNode
  /** Element to render. @default 'div' */
  asElement?: ElementType
}

import type { ElementType, HTMLAttributes } from 'react'
import type { GapToken, SpacingKey } from '../_internal/layout'

export interface ResponsiveGridValue {
  base: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export type GridColumns = number | ResponsiveGridValue
export type GridSpan = number | ResponsiveGridValue
export type GridMinChildWidth = SpacingKey | string

export interface GridProps extends HTMLAttributes<HTMLElement> {
  /** Number of columns at one or more breakpoints. */
  columns?: GridColumns
  /** Minimum child width used by an auto-fit grid. */
  minChildWidth?: GridMinChildWidth
  /** Space between grid cells. @default 'base' */
  gap?: GapToken
  /** Element to render. @default 'div' */
  asElement?: ElementType
}

export interface GridItemProps extends HTMLAttributes<HTMLElement> {
  /** Number of columns occupied at one or more breakpoints. @default 1 */
  span?: GridSpan
  /** Number of rows occupied. @default 1 */
  rowSpan?: number
  /** Element to render. @default 'div' */
  asElement?: ElementType
}

import type { HTMLAttributes, ReactNode } from 'react'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerSpacing = 'none' | 'tight' | 'base'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** The orientation of the divider. @default 'horizontal' */
  orientation?: DividerOrientation
  /** Outer spacing owned by the divider. @default 'base' */
  spacing?: DividerSpacing
  /** Centered horizontal label. */
  label?: ReactNode
  /** Additional CSS classes to apply to the divider. @default '' */
  className?: string
}

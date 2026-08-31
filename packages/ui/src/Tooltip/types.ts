import type { HTMLAttributes, ReactNode } from 'react'
import type { FloatingSidePlacement } from '../_internal/floatingPlacement'

export type TooltipPlacement = FloatingSidePlacement

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'title'> {
  /** Whether to disable tooltip toggle. */
  disabled?: boolean
  /** Whether to display tooltip by default. @default false */
  open?: boolean
  /** Tooltip placement. @default 'top' */
  placement?: TooltipPlacement
  /** Tooltip content. @default '' */
  title?: string | ReactNode
  /** Class for tooltip wrapper. */
  wrapperClass?: string
  children?: ReactNode
}

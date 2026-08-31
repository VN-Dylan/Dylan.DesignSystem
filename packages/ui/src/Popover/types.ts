import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { FloatingSidePlacement } from '../_internal/floatingPlacement'

export type PopoverPlacement = FloatingSidePlacement
export type PopoverTrigger = 'click' | 'hover'

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Controlled open state of Popover. @default false */
  open?: boolean
  /** Tooltip placement. @default 'bottom' */
  placement?: PopoverPlacement
  /** Callback when Popover open state is changed. */
  onOpenChange?: (open: boolean) => void
  /** Customize trigger element. */
  renderTrigger?: string | ReactNode
  /** Popover trigger content. @default '' */
  title?: string | ReactNode
  /** Popover trigger type. @default 'click' */
  trigger?: PopoverTrigger
  /** Popover width. */
  width?: number
  /** Popover panel style. */
  style?: CSSProperties
  children?: ReactNode
}

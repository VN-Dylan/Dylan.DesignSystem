import type { ReactNode } from 'react'

export interface ActionBarProps {
  /** Whether the bar is shown. @default false */
  open: boolean
  /** Called when the open state changes (e.g. Escape). */
  onOpenChange?: (open: boolean) => void
  /** Close when Escape is pressed. @default true */
  shouldCloseOnEsc?: boolean
  /** Fixed width in pixels. Defaults to a responsive max-width. */
  width?: number
  /** Class appended to the bar content. */
  contentClassName?: string
  children?: ReactNode
}

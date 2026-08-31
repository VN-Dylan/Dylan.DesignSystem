import type { ReactNode } from 'react'
import type { PopoverPlacement } from '../Popover'

export interface PopoverFilterOption {
  label: string
  value: string
}

export interface PopoverFilterProps {
  /** Selectable options. */
  data: PopoverFilterOption[]
  /** Selected values (controlled). */
  value?: string[]
  /** Initial selection for uncontrolled usage. */
  defaultValue?: string[]
  /** Called with the next selected values. */
  onChange?: (values: string[]) => void
  /** Popover heading. */
  title?: ReactNode
  /** @default 'bottom-start' */
  placement?: PopoverPlacement
  /** Search field placeholder. @default 'Search…' */
  inputPlaceholder?: string
  /** Show the reset link. @default true */
  showReset?: boolean
  /** Popover width. @default 240 */
  width?: number | string
  /** Custom trigger. Defaults to a "Filter" button with a count badge. */
  renderTrigger?: (state: { count: number; open: boolean }) => ReactNode
}

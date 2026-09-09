import type { HTMLAttributes, ReactNode } from 'react'
import type { PopoverPlacement } from '../Popover'

export interface GuestCategory {
  /** Stable key for this guest category. */
  key: string
  /** Visible category label. */
  label: string
  /** Optional helper text shown beneath the label. */
  description?: string
  /** Minimum count for this category. Defaults to 0. */
  min?: number
  /** Maximum count for this category. Defaults to 16. */
  max?: number
}

export type GuestCounts = Record<string, number>

export interface GuestSelectorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Guest categories shown in the popover. */
  categories?: GuestCategory[]
  /** Controlled counts keyed by category key. */
  value?: GuestCounts
  /** Initial counts for uncontrolled usage. */
  defaultValue?: GuestCounts
  /** Callback fired when a category count changes. */
  onChange?: (value: GuestCounts) => void
  /** Maximum total count across all categories. */
  totalMax?: number
  /** Custom trigger summary renderer. */
  renderSummary?: (value: GuestCounts, categories: GuestCategory[]) => ReactNode
  /** Trigger text when every category is at its minimum. @default 'Add guests' */
  placeholder?: string
  /** Whether the selector is disabled. @default false */
  disabled?: boolean
  /** Popover placement. @default 'bottom-start' */
  placement?: PopoverPlacement
}

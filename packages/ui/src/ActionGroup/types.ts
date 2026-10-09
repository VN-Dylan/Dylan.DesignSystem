import type { HTMLAttributes } from 'react'

export type ActionGroupAlign = 'end' | 'start' | 'between' | 'center'

export interface ActionGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Where the main actions sit. `end` is the convention for forms, dialogs and
   * drawers (primary action last, closest to the reading end). @default 'end'
   */
  align?: ActionGroupAlign
  /**
   * Below the `sm` breakpoint, stack the actions full-width with the primary
   * action on top. @default true
   */
  stackOnMobile?: boolean
  /** Draw a top hairline and top padding (form / panel footer). @default false */
  divided?: boolean
}

/**
 * Slot for actions that must be kept apart from the main ones — typically a
 * destructive `Delete`. Pinned to the opposite (start) edge.
 */
export type ActionGroupStartProps = HTMLAttributes<HTMLDivElement>

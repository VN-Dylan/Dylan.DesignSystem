import type { HTMLAttributes } from 'react'

export interface NavToggleProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** State of NavToggle. @default false */
  toggled?: boolean
}

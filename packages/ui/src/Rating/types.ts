import type { HTMLAttributes } from 'react'

export type RatingSize = 'sm' | 'md' | 'lg'

export interface RatingProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'defaultValue' | 'onChange'> {
  /** Controlled rating value. */
  value?: number
  /** Initial rating value for uncontrolled Rating. */
  defaultValue?: number
  /** Callback fired when the committed rating changes. */
  onChange?: (value: number) => void
  /** Maximum number of stars. @default 5 */
  max?: number
  /** Allow half-star display and selection. @default false */
  allowHalf?: boolean
  /** Render as a non-interactive rating image. @default false */
  readOnly?: boolean
  /** Disable rating interaction. */
  disabled?: boolean
  /** Visual size. @default 'md' */
  size?: RatingSize
  /** Callback fired with the previewed value while hovering, or null on leave. */
  onHoverChange?: (value: number | null) => void
  /** Form field name. Renders a hidden input when the rating is interactive. */
  name?: string
}

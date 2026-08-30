import type { SVGAttributes } from 'react'
import type { IconType } from 'react-icons'

export interface IconProps extends Omit<SVGAttributes<SVGElement>, 'children'> {
  /** Any `react-icons` icon component, e.g. `TbHome` from `react-icons/tb`. */
  as: IconType
  /** Square size in pixels or any CSS length. Defaults to `1em` (inherits font size). */
  size?: number | string
  /** Accessible label. When omitted the icon is marked `aria-hidden`. */
  label?: string
}

/**
 * Renders a `react-icons` glyph with consistent sizing and a11y semantics.
 * This is the single icon primitive the design system exposes; feature code
 * should not import from `react-icons` directly.
 */
export function Icon({ as: Component, size = '1em', label, ...rest }: IconProps) {
  return (
    <Component
      width={size}
      height={size}
      focusable="false"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...rest}
    />
  )
}

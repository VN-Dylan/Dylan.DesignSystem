import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { NavToggleProps } from './types'
import './NavToggle.scss'

/**
 * NavToggle renders the animated hamburger glyph used by expandable navigation.
 */
export const NavToggle = forwardRef<HTMLSpanElement, NavToggleProps>(function NavToggle(
  { toggled = false, className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      data-toggled={toggled || undefined}
      className={classNames('dyl-nav-toggle', className)}
      aria-hidden="true"
      {...rest}
    >
      <span className="dyl-nav-toggle__line" />
      <span className="dyl-nav-toggle__line" />
      <span className="dyl-nav-toggle__line" />
    </span>
  )
})

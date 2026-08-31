import { forwardRef } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { DividerProps } from './types'
import './Divider.scss'

/**
 * Divider creates a visual separation between content sections.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = 'horizontal', className = '', role = 'separator', ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={role}
      aria-orientation={orientation}
      data-orientation={orientation}
      className={classNames('dyl-divider', className)}
      {...rest}
    />
  )
})

import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { SpacerProps } from './types'
import './Spacer.scss'

/** Spacer fills remaining flex space or reserves one fixed spacing token. */
export const Spacer = forwardRef<HTMLElement, SpacerProps>(function Spacer(
  { size, asElement: Element = 'div', className, 'aria-hidden': ariaHidden = true, ...rest },
  ref,
) {
  return (
    <Element
      ref={ref}
      aria-hidden={ariaHidden}
      data-size={size}
      className={classNames('dyl-spacer', className)}
      {...rest}
    />
  )
})

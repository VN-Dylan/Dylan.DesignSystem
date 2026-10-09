import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { ContainerProps } from './types'
import './Container.scss'

/** Container centers content within one of the design system's named widths. */
export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { asElement: Element = 'div', size = 'default', gutter = true, className, ...rest },
  ref,
) {
  return (
    <Element
      ref={ref}
      data-size={size}
      data-gutter={gutter || undefined}
      className={classNames('dyl-container', className)}
      {...rest}
    />
  )
})

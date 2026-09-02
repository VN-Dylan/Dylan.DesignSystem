import { createElement, forwardRef, type ElementType } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { ContainerProps } from './types'
import './Container.scss'

/**
 * Container fixes content width to the current responsive breakpoint.
 */
export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { asElement = 'div', className, ...rest },
  ref,
) {
  return createElement(asElement as ElementType, {
    ref,
    className: classNames('dyl-container', className),
    ...rest,
  })
})

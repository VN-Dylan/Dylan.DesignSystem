import { forwardRef } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { GridProps } from './types'
import './Grid.scss'

/**
 * Thin grid primitive for Tailwind grid utilities.
 */
export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  { asElement: Element = 'div', className, ...rest },
  ref,
) {
  return <Element ref={ref} className={classNames('dyl-grid', className)} {...rest} />
})

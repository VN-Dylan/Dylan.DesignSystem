import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { CenterProps } from './types'
import './Center.scss'

/** Center places its children at the center of both axes. */
export const Center = forwardRef<HTMLElement, CenterProps>(function Center(
  { asElement: Element = 'div', className, ...rest },
  ref,
) {
  return <Element ref={ref} className={classNames('dyl-center', className)} {...rest} />
})

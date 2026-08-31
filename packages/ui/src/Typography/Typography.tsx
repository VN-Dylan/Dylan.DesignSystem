import { forwardRef } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { TypographyProps } from './types'
import './Typography.scss'

/**
 * Native typography wrapper with design-system heading, text, list, overflow,
 * and prose styling.
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  { asElement: Element = 'div', prose = false, truncate = false, className, ...rest },
  ref,
) {
  return (
    <Element
      ref={ref}
      data-prose={prose || undefined}
      data-truncate={truncate || undefined}
      className={classNames('dyl-typography', className)}
      {...rest}
    />
  )
})

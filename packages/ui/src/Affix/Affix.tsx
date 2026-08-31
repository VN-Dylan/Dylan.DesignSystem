import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { AffixProps } from './types'
import './Affix.scss'

/**
 * Affix renders elements that stick near the top of the viewport.
 */
export const Affix = forwardRef<HTMLDivElement, AffixProps>(function Affix(
  { offset, className, style, ...rest },
  ref,
) {
  const affixStyle = {
    ...style,
    top: offset ?? 0,
  } satisfies CSSProperties

  return (
    <div
      ref={ref}
      data-offset={offset != null || undefined}
      className={classNames('dyl-affix', className)}
      style={affixStyle}
      {...rest}
    />
  )
})

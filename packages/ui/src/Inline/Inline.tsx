import { Children, Fragment, forwardRef, type ReactNode } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { InlineProps } from './types'
import './Inline.scss'

const intersperse = (children: ReactNode, divider: ReactNode) => {
  const items = Children.toArray(children)

  return items.flatMap((child, index) =>
    index === 0 ? [child] : [<Fragment key={`divider-${index}`}>{divider}</Fragment>, child],
  )
}

/** Inline arranges children in a row using the shared layout spacing scale. */
export const Inline = forwardRef<HTMLElement, InlineProps>(function Inline(
  {
    gap = 'base',
    align = 'center',
    justify = 'start',
    wrap = false,
    divider,
    asElement: Element = 'div',
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Element
      ref={ref}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap || undefined}
      className={classNames('dyl-inline', className)}
      {...rest}
    >
      {divider == null ? children : intersperse(children, divider)}
    </Element>
  )
})

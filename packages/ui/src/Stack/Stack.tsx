import { Children, Fragment, forwardRef, type ReactNode } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { StackProps } from './types'
import './Stack.scss'

const intersperse = (children: ReactNode, divider: ReactNode) => {
  const items = Children.toArray(children)

  return items.flatMap((child, index) =>
    index === 0 ? [child] : [<Fragment key={`divider-${index}`}>{divider}</Fragment>, child],
  )
}

/** Stack arranges children vertically using the shared layout spacing scale. */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    gap = 'base',
    align = 'stretch',
    justify = 'start',
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
      className={classNames('dyl-stack', className)}
      {...rest}
    >
      {divider == null ? children : intersperse(children, divider)}
    </Element>
  )
})

import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Container } from '../Container'
import type { SectionProps } from './types'
import './Section.scss'

/** Section owns page-level vertical rhythm and optional content containment. */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    spacing = 'base',
    tone = 'default',
    contained = true,
    containerSize = 'default',
    asElement: Element = 'section',
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Element
      ref={ref}
      data-spacing={spacing}
      data-tone={tone}
      data-contained={contained || undefined}
      className={classNames('dyl-section', className)}
      {...rest}
    >
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </Element>
  )
})

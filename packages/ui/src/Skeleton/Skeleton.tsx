import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { SkeletonProps } from './types'
import './Skeleton.scss'

/**
 * Placeholder preview for content that is loading.
 */
export const Skeleton = forwardRef<HTMLElement, SkeletonProps>(function Skeleton(
  {
    animation = true,
    asElement: Element = 'span',
    height,
    variant = 'block',
    width,
    className,
    style,
    ...rest
  },
  ref,
) {
  const skeletonStyle = {
    ...style,
    width,
    height,
  } satisfies CSSProperties

  return (
    <Element
      ref={ref}
      aria-hidden="true"
      data-animation={animation || undefined}
      data-variant={variant}
      className={classNames('dyl-skeleton', className)}
      style={skeletonStyle}
      {...rest}
    />
  )
})

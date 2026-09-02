import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { IconFrameProps } from './types'
import './IconFrame.scss'

/**
 * IconFrame displays an icon inside a consistent decorative frame.
 */
export const IconFrame = forwardRef<HTMLSpanElement, IconFrameProps>(function IconFrame(
  {
    variant = 'default',
    size = 40,
    className,
    children,
    style,
    role,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const frameStyle = {
    ...style,
    width: size,
    height: size,
  } satisfies CSSProperties

  return (
    <span
      ref={ref}
      data-variant={variant}
      role={role ?? (ariaLabel ? 'img' : undefined)}
      aria-label={ariaLabel}
      className={classNames('dyl-icon-frame', className)}
      style={frameStyle}
      {...rest}
    >
      <span className="dyl-icon-frame__layer" aria-hidden />
      <span className="dyl-icon-frame__content">{children}</span>
    </span>
  )
})

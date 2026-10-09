import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { AspectRatioProps } from './types'
import './AspectRatio.scss'

type AspectRatioStyle = CSSProperties & { '--dyl-aspect-ratio'?: number }

/** AspectRatio reserves a stable media box using the native aspect-ratio property. */
export const AspectRatio = forwardRef<HTMLElement, AspectRatioProps>(function AspectRatio(
  { ratio = 16 / 9, asElement: Element = 'div', className, style, ...rest },
  ref,
) {
  const aspectRatioStyle = {
    '--dyl-aspect-ratio': ratio,
    ...style,
  } satisfies AspectRatioStyle

  return (
    <Element
      ref={ref}
      data-ratio={ratio}
      className={classNames('dyl-aspect-ratio', className)}
      style={aspectRatioStyle}
      {...rest}
    />
  )
})

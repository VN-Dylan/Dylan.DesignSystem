import { forwardRef, type ElementType, type HTMLAttributes } from 'react'

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `span`. */
  as?: ElementType
}

const style = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
} as const

/**
 * Hides content visually while keeping it available to assistive technology.
 * The design system's baseline a11y primitive.
 */
export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(function VisuallyHidden(
  { as: Tag = 'span', style: styleProp, ...rest },
  ref,
) {
  return <Tag ref={ref} style={{ ...style, ...styleProp }} {...rest} />
})

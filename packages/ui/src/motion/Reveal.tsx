import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { useMotionComponent } from './motionComponent'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import type { RevealProps } from './types'
import './motion.scss'

/**
 * Reveals content once as it enters the viewport. Importing this primitive
 * requires the optional `framer-motion` peer dependency.
 */
export const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  { as: Component = 'div', delay = 0, y = 16, duration = 0.5, className, children, ...rest },
  ref,
) {
  const MotionComponent = useMotionComponent(Component)
  const reducedMotion = usePrefersReducedMotion()
  const resolvedClassName = classNames('dyl-reveal', className)

  if (reducedMotion) {
    return (
      <Component ref={ref} className={resolvedClassName} {...rest}>
        {children}
      </Component>
    )
  }

  return (
    <MotionComponent
      ref={ref}
      className={resolvedClassName}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
})

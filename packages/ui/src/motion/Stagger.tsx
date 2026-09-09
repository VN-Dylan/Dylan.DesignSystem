import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { useMotionComponent } from './motionComponent'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import type { StaggerItemProps, StaggerProps } from './types'
import './motion.scss'

const StaggerRoot = forwardRef<HTMLElement, StaggerProps>(function Stagger(
  { as: Component = 'div', gap = 0.08, delayChildren = 0, className, children, ...rest },
  ref,
) {
  const MotionComponent = useMotionComponent(Component)
  const reducedMotion = usePrefersReducedMotion()
  const resolvedClassName = classNames('dyl-stagger', className)

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
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren } },
      }}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
})

const Item = forwardRef<HTMLElement, StaggerItemProps>(function StaggerItem(
  { as: Component = 'div', y = 16, className, children, ...rest },
  ref,
) {
  const MotionComponent = useMotionComponent(Component)
  const reducedMotion = usePrefersReducedMotion()
  const resolvedClassName = classNames('dyl-stagger__item', className)

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
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
})

/**
 * Orchestrates staggered child entrances. Compose with `Stagger.Item`.
 */
export const Stagger = Object.assign(StaggerRoot, { Item })

import { forwardRef, useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { classNames } from '@vn-dylan/utils'
import { composeRefs } from '../_internal/composeRefs'
import { useMotionComponent } from './motionComponent'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import type { ParallaxProps } from './types'
import './motion.scss'

const clampSpeed = (speed: number) => Math.min(Math.max(speed, -1), 1)

/**
 * Applies a subtle scroll-linked vertical translation. Importing this primitive
 * requires the optional `framer-motion` peer dependency.
 */
export const Parallax = forwardRef<HTMLDivElement, ParallaxProps>(function Parallax(
  { speed = 0.2, className, children, ...rest },
  ref,
) {
  const localRef = useRef<HTMLDivElement>(null)
  const MotionComponent = useMotionComponent('div')
  const reducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: localRef })
  const distance = clampSpeed(speed) * 48
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const resolvedClassName = classNames('dyl-parallax', className)

  if (reducedMotion) {
    return (
      <div ref={composeRefs(localRef, ref)} className={resolvedClassName} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <MotionComponent
      ref={composeRefs(localRef, ref)}
      className={resolvedClassName}
      style={{ y }}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
})

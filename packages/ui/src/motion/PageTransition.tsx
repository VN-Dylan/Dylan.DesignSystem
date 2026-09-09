import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { useMotionComponent } from './motionComponent'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import type { PageTransitionProps } from './types'
import './motion.scss'

/**
 * Route-content wrapper with AnimatePresence-friendly mount/unmount variants.
 * Importing this primitive requires the optional `framer-motion` peer dependency.
 */
export const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(
  function PageTransition({ transitionKey, className, children, ...rest }, ref) {
    const MotionComponent = useMotionComponent('div')
    const reducedMotion = usePrefersReducedMotion()
    const resolvedClassName = classNames('dyl-page-transition', className)

    if (reducedMotion) {
      return (
        <div ref={ref} key={transitionKey} className={resolvedClassName} {...rest}>
          {children}
        </div>
      )
    }

    return (
      <MotionComponent
        ref={ref}
        key={transitionKey}
        className={resolvedClassName}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        {...rest}
      >
        {children}
      </MotionComponent>
    )
  },
)

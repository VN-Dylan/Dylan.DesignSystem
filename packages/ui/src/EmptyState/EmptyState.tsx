import { forwardRef, type CSSProperties } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { EmptyStateProps } from './types'
import './EmptyState.scss'

/**
 * EmptyState presents an illustration, decorative pattern, and empty message.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { variant = 'wave', size = 300, illustration, offset = 0, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-variant={variant}
      className={classNames('dyl-empty-state', className)}
      {...rest}
    >
      <div className="dyl-empty-state__canvas" style={{ width: size, height: size }}>
        <div className="dyl-empty-state__pattern" aria-hidden />
        {illustration != null && (
          <div className="dyl-empty-state__illustration">{illustration}</div>
        )}
      </div>
      {children != null && (
        <div className="dyl-empty-state__content" style={{ marginTop: offset } as CSSProperties}>
          {children}
        </div>
      )}
    </div>
  )
})

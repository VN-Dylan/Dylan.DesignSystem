import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Spinner } from '../Spinner'
import type { LoadingProps } from './types'
import './Loading.scss'

/**
 * Loading overlays a loader over its children while work is in progress.
 */
export const Loading = forwardRef<HTMLElement, LoadingProps>(function Loading(
  {
    asElement: Element = 'div',
    customLoader,
    loading = false,
    spinnerClass,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Element
      ref={ref}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      className={classNames('dyl-loading', className)}
      {...rest}
    >
      {children}
      {loading && (
        <span className="dyl-loading__indicator" role="status" aria-label="Loading">
          {customLoader ?? <Spinner aria-hidden role="presentation" className={spinnerClass} />}
        </span>
      )}
    </Element>
  )
})

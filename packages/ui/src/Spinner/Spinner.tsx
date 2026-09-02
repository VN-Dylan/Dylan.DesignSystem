import { forwardRef, isValidElement, type CSSProperties } from 'react'
import { CgIcons, Icon, type IconType } from '@vn-dylan/icons'
import { classNames } from '@vn-dylan/utils'
import type { SpinnerIndicator, SpinnerProps } from './types'
import './Spinner.scss'

const renderIndicator = (indicator: SpinnerIndicator) => {
  if (isValidElement(indicator) || indicator == null) return indicator
  if (typeof indicator === 'function') return <Icon as={indicator as IconType} />
  return indicator
}

/**
 * Spinner indicates that a section, component, or page is loading.
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    indicator = CgIcons.CgSpinner,
    isSpining = true,
    size = 20,
    className,
    style,
    role = 'status',
    'aria-label': ariaLabel = 'Loading',
    ...rest
  },
  ref,
) {
  const resolvedClassName =
    typeof className === 'function' ? className({ spinning: isSpining }) : className

  const spinnerStyle = {
    ...style,
    width: size,
    height: size,
    fontSize: size,
  } satisfies CSSProperties

  return (
    <span
      ref={ref}
      role={role}
      aria-label={ariaLabel}
      aria-busy={isSpining || undefined}
      data-spining={isSpining || undefined}
      className={classNames('dyl-spinner', resolvedClassName)}
      style={spinnerStyle}
      {...rest}
    >
      <span className="dyl-spinner__indicator" aria-hidden>
        {renderIndicator(indicator)}
      </span>
    </span>
  )
})

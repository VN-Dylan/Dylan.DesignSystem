import { forwardRef, useEffect, useState } from 'react'
import { HiIcons, Icon } from '@vn-dylan/icons'
import { classNames } from '@vn-dylan/utils'
import type { AlertProps, AlertType } from './types'
import './Alert.scss'

const DEFAULT_DURATION = 2000

const iconByType: Record<AlertType, keyof typeof HiIcons> = {
  info: 'HiInformationCircle',
  warning: 'HiExclamationTriangle',
  success: 'HiCheckCircle',
  danger: 'HiXCircle',
}

/**
 * Alert feeds back user action or system status.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    title,
    showIcon = false,
    customIcon,
    type = 'warning',
    closable = false,
    customClose,
    'rounded-sm': roundedSm = true,
    onClose,
    triggerByToast = false,
    duration = DEFAULT_DURATION,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [dismissed, setDismissed] = useState(false)
  const icon = customIcon ?? <Icon as={HiIcons[iconByType[type]]} />
  const close = customClose ?? <Icon as={HiIcons.HiXMark} />

  useEffect(() => {
    if (!triggerByToast) return
    setDismissed(false)
    const timer = window.setTimeout(() => setDismissed(true), duration)
    return () => window.clearTimeout(timer)
  }, [duration, triggerByToast])

  if (dismissed) return null

  return (
    <div
      ref={ref}
      role="alert"
      data-type={type}
      data-rounded-sm={roundedSm || undefined}
      data-toast={triggerByToast || undefined}
      className={classNames('dyl-alert', className)}
      {...rest}
    >
      {showIcon && (
        <span className="dyl-alert__icon" aria-hidden>
          {icon}
        </span>
      )}
      <div className="dyl-alert__content">
        {title != null && <div className="dyl-alert__title">{title}</div>}
        {children != null && <div className="dyl-alert__description">{children}</div>}
      </div>
      {closable && (
        <button
          type="button"
          className="dyl-alert__close"
          aria-label="Close alert"
          onClick={(e) => {
            setDismissed(true)
            onClose?.(e)
          }}
        >
          {close}
        </button>
      )}
    </div>
  )
})

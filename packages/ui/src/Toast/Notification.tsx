import { forwardRef } from 'react'
import { TbIcons } from '@vn-dylan/icons'
import { classNames } from '@vn-dylan/utils'
import type { NotificationProps, NotificationType } from './types'

const icons: Record<NotificationType, React.ReactNode> = {
  info: <TbIcons.TbInfoCircle />,
  success: <TbIcons.TbCircleCheck />,
  warning: <TbIcons.TbAlertTriangle />,
  danger: <TbIcons.TbAlertOctagon />,
}

/**
 * The card rendered inside a toast (also usable inline). Pass to `toast.push`.
 */
export const Notification = forwardRef<HTMLDivElement, NotificationProps>(function Notification(
  { type = 'info', title, customIcon, closable = true, width, onClose, children },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      data-type={type}
      className="dyl-notification"
      style={width ? { width } : undefined}
    >
      <span className="dyl-notification__icon" aria-hidden>
        {customIcon ?? icons[type]}
      </span>
      <div className="dyl-notification__body">
        {title != null && <div className="dyl-notification__title">{title}</div>}
        {children != null && <div className="dyl-notification__message">{children}</div>}
      </div>
      {closable && (
        <button
          type="button"
          className={classNames('dyl-notification__close')}
          aria-label="Dismiss notification"
          onClick={onClose}
        >
          <TbIcons.TbX aria-hidden />
        </button>
      )}
    </div>
  )
})

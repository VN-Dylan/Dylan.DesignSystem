import type { HTMLAttributes, MouseEvent, ReactNode } from 'react'

export type AlertType = 'info' | 'warning' | 'success' | 'danger'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onClose'> {
  /** Alert title. */
  title?: ReactNode | string
  /** Display icon based on type. @default false */
  showIcon?: boolean
  /** Replace default icon to custom icon. */
  customIcon?: ReactNode
  /** The status of the alert. @default 'warning' */
  type?: AlertType
  /** Display close button. @default false */
  closable?: boolean
  /** Replace default close. */
  customClose?: ReactNode | string
  /** Whether the Alert have round border radius. @default true */
  'rounded-sm'?: boolean
  /** Callback when Alert is closed. */
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void
  /** identifier for toast trigger (for toast purpose). @default false */
  triggerByToast?: boolean
  /** Interval of dismiss (for toast purpose). @default 2000 */
  duration?: number
}

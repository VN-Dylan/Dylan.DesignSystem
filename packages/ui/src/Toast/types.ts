import type { ReactNode } from 'react'

export type ToastPlacement =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

export type NotificationType = 'info' | 'success' | 'warning' | 'danger'

export interface NotificationProps {
  /** Semantic type — drives the icon and accent. */
  type?: NotificationType
  /** Bold heading. */
  title?: ReactNode
  /** Replace the default type icon. */
  customIcon?: ReactNode
  /** Show the close button. @default true */
  closable?: boolean
  /** Fixed width. */
  width?: number | string
  /** Called when the close button is pressed. */
  onClose?: () => void
  children?: ReactNode
}

export interface ToastOptions {
  /** Auto-dismiss after N ms. `0` disables. @default 3000 */
  duration?: number
  /** Where the toast stack renders. @default 'top-end' */
  placement?: ToastPlacement
}

export interface ToastEntry extends Required<ToastOptions> {
  id: string
  content: ReactNode
}

import type { ReactNode } from 'react'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface DrawerProps {
  /** Whether the drawer is shown. */
  isOpen: boolean
  /** Which edge the drawer slides from. @default 'right' */
  placement?: DrawerPlacement
  /** Width for left/right placement. @default 400 */
  width?: string | number
  /** Height for top/bottom placement. @default 400 */
  height?: string | number
  /** Header title. */
  title?: ReactNode
  /** Footer content. */
  footer?: ReactNode
  /** Show the close (×) button. @default true */
  closable?: boolean
  /** Prevent body scroll while open. @default true */
  lockScroll?: boolean
  /** Close on backdrop click. @default true */
  shouldCloseOnOverlayClick?: boolean
  /** Close on Escape. @default true */
  shouldCloseOnEsc?: boolean
  onClose?: (reason: 'button' | 'overlay' | 'escape') => void
  onOpen?: () => void
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  overlayClassName?: string
  'aria-label'?: string
  children?: ReactNode
}

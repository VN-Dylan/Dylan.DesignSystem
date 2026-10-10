import type { ReactNode } from 'react'

export interface DialogProps {
  /** Whether the dialog is shown. */
  isOpen: boolean
  /** Called when the dialog requests to close (close button, overlay, Esc). */
  onClose?: (event: 'button' | 'overlay' | 'escape') => void
  /** Called once after the dialog opens. */
  onOpen?: () => void
  /** Dialog width. @default 520 */
  width?: string | number
  /** Dialog height. Never exceeds the visible viewport; the body scrolls instead. */
  height?: string | number
  /** Header title, pinned above the scrolling body. Labels the dialog. */
  title?: ReactNode
  /**
   * Footer actions (Cancel / Save), pinned below the scrolling body so they are
   * always visible. Typically an `ActionGroup`.
   */
  footer?: ReactNode
  /** Show the close (×) button. @default true */
  closable?: boolean
  /** Prevent body scroll while open. @default true */
  lockScroll?: boolean
  /** Close when the backdrop is clicked. @default true */
  shouldCloseOnOverlayClick?: boolean
  /** Close when Escape is pressed. @default true */
  shouldCloseOnEsc?: boolean
  /** Class appended to the dialog panel. */
  contentClassName?: string
  /** Class appended to the header. */
  headerClass?: string
  /** Class appended to the scrolling body. */
  bodyClass?: string
  /** Class appended to the footer. */
  footerClass?: string
  /** Class appended to the backdrop. */
  overlayClassName?: string
  /** Accessible label when the dialog has no visible heading. */
  'aria-label'?: string
  /** Id of the element that labels the dialog. */
  'aria-labelledby'?: string
  children?: ReactNode
}

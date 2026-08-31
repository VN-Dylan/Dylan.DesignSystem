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
  /** Dialog height. */
  height?: string | number
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
  /** Class appended to the backdrop. */
  overlayClassName?: string
  /** Accessible label when the dialog has no visible heading. */
  'aria-label'?: string
  /** Id of the element that labels the dialog. */
  'aria-labelledby'?: string
  children?: ReactNode
}

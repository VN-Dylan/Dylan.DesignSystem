import type { ReactNode } from 'react'
import type { ButtonProps } from '../Button'
import type { DialogProps } from '../Dialog'

export type ConfirmDialogType = 'info' | 'success' | 'warning' | 'danger'

export interface ConfirmDialogProps extends Omit<DialogProps, 'children'> {
  /** Cancel button text. @default 'Cancel' */
  cancelText?: string
  /** Apply Button props to cancel button. */
  cancelButtonProps?: ButtonProps
  /** Apply Button props to confirm button. */
  confirmButtonProps?: ButtonProps
  /** Confirm button text. @default 'Confirm' */
  confirmText?: string
  /** Callback function after click on cancel button. */
  onCancel?: () => void
  /** Callback function after click on confirm button. */
  onConfirm?: () => void
  /** Title of confirmation. @default 'info' */
  title?: string
  /** Type of confirmation. @default 'info' */
  type?: ConfirmDialogType
  children?: ReactNode
}

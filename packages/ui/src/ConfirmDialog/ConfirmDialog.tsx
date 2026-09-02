import { forwardRef, useId } from 'react'
import { HiIcons, Icon } from '@vn-dylan/icons'
import { classNames } from '@vn-dylan/utils'
import { Button } from '../Button'
import { Dialog } from '../Dialog'
import type { ConfirmDialogProps, ConfirmDialogType } from './types'
import './ConfirmDialog.scss'

const iconByType: Record<ConfirmDialogType, keyof typeof HiIcons> = {
  info: 'HiInformationCircle',
  success: 'HiCheckCircle',
  warning: 'HiExclamationTriangle',
  danger: 'HiXCircle',
}

/**
 * ConfirmDialog is a premade dialog for confirmation flows.
 */
export const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(function ConfirmDialog(
  {
    cancelText = 'Cancel',
    cancelButtonProps,
    confirmButtonProps,
    confirmText = 'Confirm',
    onCancel,
    onConfirm,
    title = 'info',
    type = 'info',
    children,
    contentClassName,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...dialogProps
  },
  ref,
) {
  const generatedTitleId = useId()
  const titleId = ariaLabelledBy ?? generatedTitleId
  const confirmClassName = confirmButtonProps?.className

  return (
    <Dialog
      contentClassName={classNames('dyl-confirm-dialog__panel', contentClassName)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel == null ? titleId : undefined}
      {...dialogProps}
    >
      <div ref={ref} className="dyl-confirm-dialog" data-type={type}>
        <span className="dyl-confirm-dialog__icon" aria-hidden>
          <Icon as={HiIcons[iconByType[type]]} />
        </span>
        <div className="dyl-confirm-dialog__content">
          <h2
            id={ariaLabelledBy == null ? titleId : undefined}
            className="dyl-confirm-dialog__title"
          >
            {title}
          </h2>
          {children != null && <div className="dyl-confirm-dialog__body">{children}</div>}
          <div className="dyl-confirm-dialog__actions">
            <Button {...cancelButtonProps} onClick={onCancel}>
              {cancelButtonProps?.children ?? cancelText}
            </Button>
            <Button
              variant="solid"
              {...confirmButtonProps}
              className={
                typeof confirmClassName === 'function'
                  ? (state) => classNames('dyl-confirm-dialog__confirm', confirmClassName(state))
                  : classNames('dyl-confirm-dialog__confirm', confirmClassName)
              }
              onClick={onConfirm}
            >
              {confirmButtonProps?.children ?? confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
})

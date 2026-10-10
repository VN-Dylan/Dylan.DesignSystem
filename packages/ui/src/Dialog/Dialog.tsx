import { useEffect, useId, useRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Portal } from '../_internal/Portal'
import { useFocusTrap } from '../_internal/useFocusTrap'
import type { DialogProps } from './types'
import { useUiMessages } from '../LocaleProvider'
import './Dialog.scss'

const toCssSize = (value: string | number | undefined) =>
  typeof value === 'number' ? `${value}px` : value

/**
 * A modal overlay that forces the user to interact before returning to the
 * page. Renders through a portal, traps focus, and closes on Esc / backdrop
 * click (both configurable). The panel never grows past the visible viewport:
 * `title` and `footer` stay pinned while only the body scrolls.
 */
export function Dialog({
  isOpen,
  onClose,
  onOpen,
  width = 520,
  height,
  title,
  footer,
  closable = true,
  lockScroll = true,
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEsc = true,
  contentClassName,
  headerClass,
  bodyClass,
  footerClass,
  overlayClassName,
  children,
  ...aria
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const openedRef = useRef(false)
  const titleId = useId()
  const t = useUiMessages('dialog')

  useFocusTrap(panelRef, isOpen)

  useEffect(() => {
    if (isOpen && !openedRef.current) {
      openedRef.current = true
      onOpen?.()
    }
    if (!isOpen) openedRef.current = false
  }, [isOpen, onOpen])

  useEffect(() => {
    if (!isOpen || !lockScroll || typeof document === 'undefined') return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen, lockScroll])

  useEffect(() => {
    if (!isOpen || !shouldCloseOnEsc) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.('escape')
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, shouldCloseOnEsc, onClose])

  if (!isOpen) return null

  return (
    <Portal>
      <div
        className={classNames('dyl-dialog__overlay', overlayClassName)}
        onMouseDown={(e) => {
          if (shouldCloseOnOverlayClick && e.target === e.currentTarget) onClose?.('overlay')
        }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title != null && aria['aria-label'] == null ? titleId : undefined}
          tabIndex={-1}
          className={classNames('dyl-dialog__panel', contentClassName)}
          style={{ width: toCssSize(width), height: toCssSize(height) }}
          {...aria}
        >
          {closable && (
            <button
              type="button"
              className="dyl-dialog__close"
              aria-label={t.close}
              onClick={() => onClose?.('button')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          {title != null && (
            <header className={classNames('dyl-dialog__header', headerClass)}>
              <h2 id={titleId} className="dyl-dialog__title">
                {title}
              </h2>
            </header>
          )}
          <div className={classNames('dyl-dialog__body', bodyClass)}>{children}</div>
          {footer != null && (
            <footer className={classNames('dyl-dialog__footer', footerClass)}>{footer}</footer>
          )}
        </div>
      </div>
    </Portal>
  )
}

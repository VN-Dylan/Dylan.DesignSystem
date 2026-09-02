import { useEffect, useRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Portal } from '../_internal/Portal'
import { useFocusTrap } from '../_internal/useFocusTrap'
import type { DialogProps } from './types'
import './Dialog.scss'

const toCssSize = (value: string | number | undefined) =>
  typeof value === 'number' ? `${value}px` : value

/**
 * A modal overlay that forces the user to interact before returning to the
 * page. Renders through a portal, traps focus, and closes on Esc / backdrop
 * click (both configurable).
 */
export function Dialog({
  isOpen,
  onClose,
  onOpen,
  width = 520,
  height,
  closable = true,
  lockScroll = true,
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEsc = true,
  contentClassName,
  overlayClassName,
  children,
  ...aria
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const openedRef = useRef(false)

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
          tabIndex={-1}
          className={classNames('dyl-dialog__panel', contentClassName)}
          style={{ width: toCssSize(width), height: toCssSize(height) }}
          {...aria}
        >
          {closable && (
            <button
              type="button"
              className="dyl-dialog__close"
              aria-label="Close dialog"
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
          <div className="dyl-dialog__body">{children}</div>
        </div>
      </div>
    </Portal>
  )
}

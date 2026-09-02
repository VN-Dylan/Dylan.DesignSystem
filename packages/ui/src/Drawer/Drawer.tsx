import { useEffect, useId, useRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import { Portal } from '../_internal/Portal'
import { useFocusTrap } from '../_internal/useFocusTrap'
import type { DrawerProps } from './types'
import './Drawer.scss'

const toCssSize = (v: string | number | undefined) => (typeof v === 'number' ? `${v}px` : v)

/**
 * A panel that slides in from a screen edge for supplementary content or forms.
 * Modal: renders through a portal, traps focus, closes on Esc / backdrop.
 */
export function Drawer({
  isOpen,
  placement = 'right',
  width = 400,
  height = 400,
  title,
  footer,
  closable = true,
  lockScroll = true,
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEsc = true,
  onClose,
  onOpen,
  headerClass,
  bodyClass,
  footerClass,
  overlayClassName,
  children,
  ...aria
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const openedRef = useRef(false)
  const titleId = useId()

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
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
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

  const isHorizontal = placement === 'left' || placement === 'right'
  const panelStyle = isHorizontal ? { width: toCssSize(width) } : { height: toCssSize(height) }

  return (
    <Portal>
      <div
        className={classNames('dyl-drawer__overlay', overlayClassName)}
        onMouseDown={(e) => {
          if (shouldCloseOnOverlayClick && e.target === e.currentTarget) onClose?.('overlay')
        }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title != null ? titleId : undefined}
          tabIndex={-1}
          data-placement={placement}
          className="dyl-drawer__panel"
          style={panelStyle}
          {...aria}
        >
          {(title != null || closable) && (
            <header className={classNames('dyl-drawer__header', headerClass)}>
              <div id={titleId} className="dyl-drawer__title">
                {title}
              </div>
              {closable && (
                <button
                  type="button"
                  className="dyl-drawer__close"
                  aria-label="Close drawer"
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
            </header>
          )}
          <div className={classNames('dyl-drawer__body', bodyClass)}>{children}</div>
          {footer != null && (
            <footer className={classNames('dyl-drawer__footer', footerClass)}>{footer}</footer>
          )}
        </div>
      </div>
    </Portal>
  )
}

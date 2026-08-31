import { useEffect } from 'react'
import { classNames } from '@dylan-ds/utils'
import { Portal } from '../_internal/Portal'
import type { ActionBarProps } from './types'
import './ActionBar.scss'

/**
 * A floating bar of actions anchored to the bottom of the viewport — typically
 * shown when rows/items are selected.
 */
export function ActionBar({
  open,
  onOpenChange,
  shouldCloseOnEsc = true,
  width,
  contentClassName,
  children,
}: ActionBarProps) {
  useEffect(() => {
    if (!open || !shouldCloseOnEsc) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange?.(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, shouldCloseOnEsc, onOpenChange])

  if (!open) return null

  return (
    <Portal>
      <div className="dyl-action-bar" role="region" aria-label="Actions">
        <div
          className={classNames('dyl-action-bar__content', contentClassName)}
          style={width ? { width } : undefined}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}

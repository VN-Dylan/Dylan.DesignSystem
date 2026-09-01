import { useEffect, type RefObject } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const isVisible = (el: HTMLElement) => el.offsetParent !== null || el.getClientRects().length > 0

/**
 * Trap keyboard focus inside `ref` while `active`. Moves focus into the node on
 * activation and restores it to the previously focused element on deactivation.
 *
 * The node may not exist yet on the effect's first run (e.g. it renders through
 * a portal that mounts a tick later), so activation is retried on the next frame
 * until the node appears.
 */
export function useFocusTrap(ref: RefObject<HTMLElement>, active: boolean): void {
  useEffect(() => {
    if (!active) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    let node: HTMLElement | null = null
    let raf = 0

    const focusables = () =>
      node ? Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(isVisible) : []

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !node) return
      const items = focusables()
      if (items.length === 0) {
        event.preventDefault()
        node.focus()
        return
      }
      const firstItem = items[0]!
      const lastItem = items[items.length - 1]!
      const activeEl = document.activeElement

      if (event.shiftKey && (activeEl === firstItem || activeEl === node)) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && activeEl === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    const activate = () => {
      node = ref.current
      if (!node) {
        raf = requestAnimationFrame(activate)
        return
      }
      ;(focusables()[0] ?? node).focus()
      node.addEventListener('keydown', onKeyDown)
    }

    activate()

    return () => {
      cancelAnimationFrame(raf)
      node?.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [ref, active])
}

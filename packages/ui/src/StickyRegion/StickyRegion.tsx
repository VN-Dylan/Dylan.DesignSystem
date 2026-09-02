import { forwardRef, useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { classNames } from '@vn-dylan/utils'
import { composeRefs } from '../_internal/composeRefs'
import type { StickyRegionProps } from './types'
import './StickyRegion.scss'

type StickyStyle = CSSProperties & {
  top: number
}

const getScrollParent = (node: HTMLElement): HTMLElement | Window => {
  let parent = node.parentElement

  while (parent) {
    const { overflowY, overflow } = window.getComputedStyle(parent)
    if (/(auto|scroll|overlay)/.test(`${overflowY} ${overflow}`)) return parent
    parent = parent.parentElement
  }

  return window
}

const getScrollTop = (target: HTMLElement | Window) =>
  target === window ? window.scrollY : (target as HTMLElement).scrollTop

/**
 * StickyRegion keeps content pinned after it reaches the configured top offset.
 */
export const StickyRegion = forwardRef<HTMLDivElement, StickyRegionProps>(function StickyRegion(
  {
    offsetTop = 0,
    triggerOffset,
    shadow = true,
    stickyClassName,
    zIndex = 40,
    transitionDuration = 300,
    onStickyChange,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  const checkSticky = useCallback(() => {
    const node = rootRef.current
    if (!node) return

    const scrollParent = getScrollParent(node)
    const nextSticky =
      triggerOffset == null
        ? node.getBoundingClientRect().top <= offsetTop
        : getScrollTop(scrollParent) >= triggerOffset

    setIsSticky((current) => {
      if (current !== nextSticky) onStickyChange?.(nextSticky)
      return nextSticky
    })
  }, [offsetTop, onStickyChange, triggerOffset])

  useEffect(() => {
    checkSticky()
    window.addEventListener('scroll', checkSticky, true)
    window.addEventListener('resize', checkSticky)
    return () => {
      window.removeEventListener('scroll', checkSticky, true)
      window.removeEventListener('resize', checkSticky)
    }
  }, [checkSticky])

  const stickyStyle = {
    ...style,
    top: offsetTop,
    zIndex: isSticky ? zIndex : undefined,
    transitionDuration: `${transitionDuration}ms`,
  } satisfies StickyStyle

  return (
    <div
      ref={composeRefs(rootRef, ref)}
      data-sticky={isSticky || undefined}
      data-shadow={shadow || undefined}
      className={classNames('dyl-sticky-region', className, isSticky && stickyClassName)}
      style={stickyStyle}
      {...rest}
    >
      {children}
    </div>
  )
})

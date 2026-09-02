import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type Ref,
  type UIEvent,
} from 'react'
import { classNames } from '@vn-dylan/utils'
import type { ScrollFlexSizeProps, ScrollPosition, ScrollProps } from './types'
import './Scroll.scss'

const assignRef = <T,>(ref: Ref<T> | undefined, value: T | null) => {
  if (typeof ref === 'function') ref(value)
  else if (ref) (ref as MutableRefObject<T | null>).current = value
}

const isAtBottom = (element: HTMLDivElement) =>
  element.scrollTop + element.clientHeight >= element.scrollHeight - 1

const isAtTop = (element: HTMLDivElement) => element.scrollTop <= 0

const ScrollRoot = forwardRef<HTMLDivElement, ScrollProps>(function Scroll(
  {
    contentClassName,
    edgeShadow = false,
    offsetScrollbars = false,
    onScrollPositionChange,
    onBottomReached,
    onTopReached,
    scrollbarSize,
    scrollHideDelay,
    scrollbars = 'vertical',
    type,
    viewportRef,
    viewportProps,
    className,
    children,
    style,
    ...rest
  },
  ref,
) {
  const viewportNode = useRef<HTMLDivElement | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [scrolling, setScrolling] = useState(false)
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 })

  const {
    className: viewportClassName,
    onScroll: viewportOnScroll,
    ...viewportRest
  } = viewportProps ?? {}

  const setViewportNode = useCallback(
    (node: HTMLDivElement | null) => {
      viewportNode.current = node
      assignRef(viewportRef, node)
    },
    [viewportRef],
  )

  const updatePosition = useCallback(
    (element: HTMLDivElement) => {
      const next = { x: element.scrollLeft, y: element.scrollTop }
      setPosition(next)
      onScrollPositionChange?.(next)
      if (isAtTop(element)) onTopReached?.()
      if (isAtBottom(element)) onBottomReached?.()
    },
    [onBottomReached, onScrollPositionChange, onTopReached],
  )

  useEffect(() => {
    if (!viewportNode.current) return
    updatePosition(viewportNode.current)
  }, [updatePosition])

  useEffect(
    () => () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    },
    [],
  )

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    viewportOnScroll?.(event)
    updatePosition(event.currentTarget)
    setScrolling(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    if (scrollHideDelay != null) {
      hideTimer.current = setTimeout(() => setScrolling(false), scrollHideDelay)
    }
  }

  const scrollStyle = {
    ...style,
    '--dyl-scrollbar-size': scrollbarSize,
  } satisfies CSSProperties & { '--dyl-scrollbar-size'?: number | string }

  return (
    <div
      ref={ref}
      data-edge-shadow={edgeShadow || undefined}
      data-offset-scrollbars={offsetScrollbars || undefined}
      data-scrollbars={scrollbars}
      data-scrolling={scrolling || undefined}
      data-type={type}
      data-scroll-x={position.x > 0 || undefined}
      data-scroll-y={position.y > 0 || undefined}
      className={classNames('dyl-scroll', className)}
      style={scrollStyle}
      {...rest}
    >
      <div
        ref={setViewportNode}
        className={classNames('dyl-scroll__viewport', viewportClassName)}
        onScroll={handleScroll}
        {...viewportRest}
      >
        <div className={classNames('dyl-scroll__content', contentClassName)}>{children}</div>
      </div>
    </div>
  )
})

const FlexSize = forwardRef<HTMLDivElement, ScrollFlexSizeProps>(function ScrollFlexSize(
  { className, ...rest },
  ref,
) {
  return (
    <ScrollRoot ref={ref} className={classNames('dyl-scroll--flex-size', className)} {...rest} />
  )
})

/**
 * Scrollable viewport with optional styled scrollbars and scroll-position callbacks.
 */
export const Scroll = Object.assign(ScrollRoot, { FlexSize })

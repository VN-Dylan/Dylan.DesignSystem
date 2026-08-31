import type { ComponentProps, HTMLAttributes, Ref } from 'react'

export type Scrollbars = 'horizontal' | 'vertical' | 'both'
export type OffsetScrollbars = boolean | 'horizontal' | 'vertical' | 'present'
export type ScrollType = 'auto' | 'always' | 'scroll' | 'hover' | 'never'

export interface ScrollPosition {
  x: number
  y: number
}

export interface ScrollProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional class names for styling the content area. */
  contentClassName?: string
  /** Displays a shadow on the top/bottom or left/right edges when content is scrollable. @default false */
  edgeShadow?: boolean
  /** Offsets scrollbars from the content. @default false */
  offsetScrollbars?: OffsetScrollbars
  /** Callback triggered whenever the scroll position changes. */
  onScrollPositionChange?: (position: ScrollPosition) => void
  /** Callback fired when the user scrolls to the bottom of the content. */
  onBottomReached?: () => void
  /** Callback fired when the user scrolls to the top of the content. */
  onTopReached?: () => void
  /** Specifies the thickness of the scrollbar. */
  scrollbarSize?: number | string
  /** Time to delay hiding the scrollbar after scroll stops. */
  scrollHideDelay?: number
  /** Specifies which scrollbars should be shown. @default 'vertical' */
  scrollbars?: Scrollbars
  /** Determines the scrollbar behavior or style. */
  type?: ScrollType
  /** Ref object to access the internal scrollable viewport. */
  viewportRef?: Ref<HTMLDivElement>
  /** Additional props passed to the scrollable viewport div. */
  viewportProps?: ComponentProps<'div'>
}

export type ScrollFlexSizeProps = ScrollProps

import type { HTMLAttributes, ReactNode } from 'react'

export type ListSelectionMode = 'none' | 'single' | 'multiple'

export interface ListItemState {
  /** Item is selected (selectable lists only). */
  selected: boolean
  /** Item has the keyboard focus ring (selectable / sortable lists). */
  active: boolean
  /** Item is being dragged. */
  dragging: boolean
  /** 0-based position in `items`. */
  index: number
}

export interface ListVirtualOptions {
  /** Fixed row height in px — every row must render at this height. */
  itemHeight: number
  /** Viewport height (px or any CSS length). */
  height: number | string
  /** Extra rows rendered above / below the viewport. @default 4 */
  overscan?: number
}

export interface ListProps<T>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'defaultValue'> {
  /** The data to render. */
  items: T[]
  /** Stable key for each item (used for selection and reordering). */
  getKey: (item: T, index: number) => string
  /** Render one row — usually a `List.Item`. */
  renderItem: (item: T, state: ListItemState) => ReactNode
  /** Accessible name of the list. Required for selectable / sortable lists. */
  'aria-label'?: string

  /** `single` / `multiple` turn the list into a keyboard-navigable listbox. @default 'none' */
  selectionMode?: ListSelectionMode
  /** Controlled selection. */
  selectedKeys?: string[]
  /** Initial selection when uncontrolled. @default [] */
  defaultSelectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  /** Keys that cannot be selected or focused. */
  disabledKeys?: string[]

  /**
   * Drag (or Alt + ↑/↓) to reorder. The list never mutates `items`; it reports
   * the new order and you store it.
   */
  sortable?: boolean
  onReorder?: (items: T[], move: { from: number; to: number }) => void

  /** Render only the rows in view. Rows must have a fixed height. */
  virtual?: ListVirtualOptions

  /** Hairline between rows. @default true */
  divided?: boolean
  /** Draw a border + radius around the list. @default false */
  bordered?: boolean
  /** Show skeleton rows instead of items. */
  loading?: boolean
  /** Skeleton rows while loading. @default 3 */
  loadingRows?: number
  /** Shown when `items` is empty. @default 'No items' */
  emptyMessage?: ReactNode
}

export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  /** Leading visual — avatar, icon, thumbnail. */
  prefix?: ReactNode
  /** Primary line. */
  title: ReactNode
  /** Secondary line, truncated to one line. */
  description?: ReactNode
  /** Trailing text — date, count, status. */
  meta?: ReactNode
  /** Trailing controls (buttons, menu). Avoid in selectable lists. */
  actions?: ReactNode
}

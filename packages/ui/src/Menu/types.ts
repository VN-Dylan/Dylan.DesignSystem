import type { ElementType, HTMLAttributes, MouseEvent, ReactNode } from 'react'

export type MenuVariant = 'light' | 'dark' | 'themed' | 'transparent'
export type MenuItemHeight = string | number

export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Initial active menu item keys. @default [] */
  defaultActiveKeys?: string[]
  /** Initial active collapsable menu item keys. @default [] */
  defaultCollapseActiveKeys?: string[]
  /** Initial expanded collapsable menu item keys. @default [] */
  defaultExpandedKeys?: string[]
  /** Height of all menu items. @default 40 */
  menuItemHeight?: MenuItemHeight
  /** Callback when a menu item is selected. */
  onSelect?: (e: MouseEvent<HTMLElement>, eventKey: string) => void
  /** Whether to side collapse the menu. @default false */
  sideCollapsed?: boolean
  /** Visual variant. @default 'light' */
  variant?: MenuVariant
}

export interface MenuCollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /** Whether to highlight the collapsable menu item. @default true */
  active?: boolean
  /** Unique value for the collapsable menu item. */
  eventKey?: string
  /** Whether to expand the collapsable menu item. @default false */
  expanded?: boolean
  /** Whether to indent child menu items. @default true */
  indent?: boolean
  /** Label content for the collapsable menu item. */
  label?: string | ReactNode
  /** Callback when the collapsable menu item toggles. */
  onToggle?: (expanded: boolean, e: MouseEvent<HTMLElement>) => void
}

export interface MenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Menu group title. */
  label?: string | ReactNode
}

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Render element. @default 'div' */
  asElement?: ElementType
  /** Whether to disable the menu item. */
  disabled?: boolean
  /** Whether to show a dot prefix in the menu item. */
  hierarchyIndicator?: boolean
  /** Unique value for the menu item. */
  eventKey?: string
  /** Whether to mark the menu item active. */
  isActive?: boolean
  /** Height of this menu item. @default 40 */
  menuItemHeight?: MenuItemHeight
  /** Callback when this menu item is selected. */
  onSelect?: (eventKey: string, e: MouseEvent<HTMLElement>) => void
}

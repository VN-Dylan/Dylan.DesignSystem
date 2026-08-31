import type { ReactNode } from 'react'

export interface OverflowTabItem {
  label: ReactNode
  value: string
  disabled?: boolean
}

export interface OverflowTabsProps {
  /** Tabs to render, in order. */
  tabList: OverflowTabItem[]
  /** Active tab value (controlled). */
  value?: string
  /** Initial active value for uncontrolled usage. */
  defaultValue?: string
  /** Called with the newly-selected value. */
  onChange?: (value: string) => void
  /** Class for the tab strip. */
  tabListClass?: string
  /** Class for each tab button. */
  tabNavClass?: string
  /** Panel content for the active tab. */
  children?: ReactNode
}

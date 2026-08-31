import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export type TabsVariant = 'underline' | 'pill'

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Initial value for uncontrolled Tabs. */
  defaultValue?: string
  /** Callback when tab value changes. */
  onChange?: (tabValue: string) => void
  /** Controlled active tab value. */
  value?: string
  /** Tabs style. */
  variant?: TabsVariant
}

export type TabsTabListProps = HTMLAttributes<HTMLDivElement>

export interface TabsTabNavProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Whether to disable the tab. */
  disabled?: boolean
  /** Tab icon. */
  icon?: ReactNode | string
  /** Unique value matched with TabContent. */
  value: string
}

export interface TabsTabContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique value matched with TabNav. */
  value: string
}

import { createContext, useContext } from 'react'
import type { TabsVariant } from './types'

export interface TabsContextValue {
  value?: string
  variant?: TabsVariant
  baseId: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

export const TabsProvider = TabsContext.Provider

export const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs compound components must be used within Tabs')
  return context
}

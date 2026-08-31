import { createContext, useContext } from 'react'
import type { MouseEvent } from 'react'
import type { MenuVariant } from './types'

export interface MenuContextValue {
  activeKeys: Set<string>
  collapseActiveKeys: Set<string>
  expandedKeys: Set<string>
  menuItemHeight: string | number
  sideCollapsed: boolean
  variant: MenuVariant
  onSelect: (event: MouseEvent<HTMLElement>, eventKey: string) => void
  onToggle: (eventKey: string, expanded: boolean) => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

export const MenuProvider = MenuContext.Provider

export const useMenuContext = () => useContext(MenuContext)

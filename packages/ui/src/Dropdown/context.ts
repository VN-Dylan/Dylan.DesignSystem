import { createContext, useContext } from 'react'
import type { MouseEvent } from 'react'

export interface DropdownContextValue {
  activeKey?: string
  close: () => void
  onSelect?: (e: MouseEvent<HTMLElement>) => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

export const DropdownProvider = DropdownContext.Provider

export const useDropdownContext = () => useContext(DropdownContext)

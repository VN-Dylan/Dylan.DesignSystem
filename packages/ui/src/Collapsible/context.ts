import { createContext, useContext } from 'react'

export interface CollapsibleContextValue {
  isOpen: boolean
  toggle: () => void
  contentId: string
  triggerId: string
}

export const CollapsibleContext = createContext<CollapsibleContextValue | null>(null)

export function useCollapsibleContext(part: string): CollapsibleContextValue {
  const ctx = useContext(CollapsibleContext)
  if (!ctx) throw new Error(`${part} must be used inside <Collapsible>`)
  return ctx
}

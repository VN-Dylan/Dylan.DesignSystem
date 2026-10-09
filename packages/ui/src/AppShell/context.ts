import { createContext, useContext } from 'react'

export interface AppShellContextValue {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  /** True below `mobileBreakpoint`, where the sidebar becomes a drawer. */
  isMobile: boolean
  mobileNavId: string
}

export const AppShellContext = createContext<AppShellContextValue | null>(null)

/** Read AppShell state (collapse, mobile drawer) from any descendant. */
export function useAppShell(part = 'useAppShell'): AppShellContextValue {
  const ctx = useContext(AppShellContext)
  if (!ctx) throw new Error(`${part} must be used inside <AppShell>`)
  return ctx
}

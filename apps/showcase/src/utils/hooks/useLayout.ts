import { useResponsive } from '@dylan-ds/utils'
import { useThemeStore } from '@/store/themeStore'

export interface UseLayoutResult {
  /** Side nav is collapsed to the icon rail (desktop only). */
  sideNavCollapsed: boolean
  setSideNavCollapsed: (collapsed: boolean) => void
  /** Mobile navigation overlay open. */
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  /** Toggles the icon rail (desktop) or the overlay (mobile). */
  toggleNav: () => void
  /** Viewport is below the `lg` breakpoint — side nav becomes an overlay. */
  isMobile: boolean
  mode: 'light' | 'dark'
  toggleMode: () => void
}

/**
 * App-coupled layout accessor (Eyris `useLayout`). Combines the persisted
 * layout flags from `themeStore` with the current breakpoint.
 */
export function useLayout(): UseLayoutResult {
  const { larger } = useResponsive()
  const isMobile = !larger.lg
  const sideNavCollapsed = useThemeStore((s) => s.sideNavCollapsed)
  const setSideNavCollapsed = useThemeStore((s) => s.setSideNavCollapsed)
  const toggleSideNav = useThemeStore((s) => s.toggleSideNav)
  const mobileNavOpen = useThemeStore((s) => s.mobileNavOpen)
  const setMobileNavOpen = useThemeStore((s) => s.setMobileNavOpen)
  const mode = useThemeStore((s) => s.mode)
  const toggleMode = useThemeStore((s) => s.toggleMode)

  return {
    sideNavCollapsed,
    setSideNavCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
    toggleNav: () => (isMobile ? setMobileNavOpen(!mobileNavOpen) : toggleSideNav()),
    isMobile,
    mode,
    toggleMode,
  }
}

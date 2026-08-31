import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeSchemaName } from '@dylan-ds/tokens'

export type ColorMode = 'light' | 'dark'
export type Direction = 'ltr' | 'rtl'

/**
 * App-wide theme + layout preferences, mirrored to `localStorage`.
 *
 * The Eyris template keeps the same shape in a Zustand `themeStore`
 * (`mode` / `schema` / `direction` / layout flags). Applying these values to
 * the DOM is done by `useThemeBootstrap`, not here — the store is pure state.
 */
export interface ThemeState {
  mode: ColorMode
  schema: ThemeSchemaName
  direction: Direction
  /** Side navigation collapsed to icon rail (desktop). */
  sideNavCollapsed: boolean
  /** Mobile navigation overlay open (ephemeral — not persisted). */
  mobileNavOpen: boolean
  /** Theme configuration drawer open. */
  configOpen: boolean
  setMode: (mode: ColorMode) => void
  toggleMode: () => void
  setSchema: (schema: ThemeSchemaName) => void
  setDirection: (direction: Direction) => void
  toggleDirection: () => void
  setSideNavCollapsed: (collapsed: boolean) => void
  toggleSideNav: () => void
  setMobileNavOpen: (open: boolean) => void
  setConfigOpen: (open: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      schema: 'default',
      direction: 'ltr',
      sideNavCollapsed: false,
      mobileNavOpen: false,
      configOpen: false,
      setMode: (mode) => set({ mode }),
      toggleMode: () => set((s) => ({ mode: s.mode === 'light' ? 'dark' : 'light' })),
      setSchema: (schema) => set({ schema }),
      setDirection: (direction) => set({ direction }),
      toggleDirection: () => set((s) => ({ direction: s.direction === 'ltr' ? 'rtl' : 'ltr' })),
      setSideNavCollapsed: (sideNavCollapsed) => set({ sideNavCollapsed }),
      toggleSideNav: () => set((s) => ({ sideNavCollapsed: !s.sideNavCollapsed })),
      setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
      setConfigOpen: (configOpen) => set({ configOpen }),
    }),
    {
      name: 'dylan-showcase-theme',
      partialize: ({ mode, schema, direction, sideNavCollapsed }) => ({
        mode,
        schema,
        direction,
        sideNavCollapsed,
      }),
    },
  ),
)

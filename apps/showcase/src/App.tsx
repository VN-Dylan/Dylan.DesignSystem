import { useEffect, useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AccessProvider, LocaleProvider } from '@vn-dylan/ui'
import { routes } from '@/configs/routes.config'
import { useTranslation } from '@/i18n'
import { useAuth } from '@/utils/hooks/useAuth'
import { useSessionWatcher } from '@/utils/hooks/useSessionWatcher'
import { useThemeBootstrap } from '@/utils/hooks/useThemeBootstrap'

/**
 * Showcase entry. Example screens built on the Dylan Design System:
 * routing + layouts + template chrome here, area screens under
 * `src/views/*` (filled in by the P4 area batches).
 *
 * Providers: `LocaleProvider` translates built-in component strings for the
 * current language; `AccessProvider` exposes the signed-in user's permissions
 * to `<Can>` / `useAccess`.
 */
export function App() {
  useThemeBootstrap()
  useSessionWatcher()
  const { intl } = useTranslation()
  const { permissions } = useAuth()

  useEffect(() => {
    document.documentElement.lang = intl
  }, [intl])

  const router = useMemo(
    () =>
      createBrowserRouter(routes, {
        future: { v7_relativeSplatPath: true },
      }),
    [],
  )
  return (
    <LocaleProvider locale={intl}>
      <AccessProvider permissions={permissions}>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </AccessProvider>
    </LocaleProvider>
  )
}

import { useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/configs/routes.config'
import { useThemeBootstrap } from '@/utils/hooks/useThemeBootstrap'

/**
 * Showcase entry. Rebuilds the Eyris example screens on the Dylan Design
 * System: routing + layouts + template chrome here, area screens under
 * `src/views/*` (filled in by the P4 area batches).
 */
export function App() {
  useThemeBootstrap()
  const router = useMemo(
    () =>
      createBrowserRouter(routes, {
        future: { v7_relativeSplatPath: true },
      }),
    [],
  )
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />
}

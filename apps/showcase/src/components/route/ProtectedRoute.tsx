import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { AccessMode, Permission } from '@vn-dylan/ui'
import { useAuth } from '@/utils/hooks/useAuth'

export interface ProtectedRouteProps {
  /** Permission(s) required for the wrapped route. */
  permission?: Permission | Permission[]
  /** How several permissions combine. @default 'any' */
  mode?: AccessMode
  children: ReactNode
}

/**
 * Gate for authenticated areas. Unauthenticated (or expired) users are sent to
 * sign-in with a `redirect` back; authenticated users missing the permission
 * get the access-denied screen.
 */
export function ProtectedRoute({ permission, mode, children }: ProtectedRouteProps) {
  const { authenticated, can } = useAuth()
  const location = useLocation()

  if (!authenticated) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/auth/sign-in?redirect=${redirect}`} replace />
  }

  if (!can(permission, mode)) {
    return <Navigate to="/others/access-denied" replace />
  }

  return <>{children}</>
}

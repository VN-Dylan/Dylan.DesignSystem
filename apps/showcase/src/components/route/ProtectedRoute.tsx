import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/utils/hooks/useAuth'

export interface ProtectedRouteProps {
  /** Authority tags required for the wrapped route. */
  authority?: string[]
  children: ReactNode
}

/**
 * Gate for authenticated areas. Unauthenticated users are sent to sign-in
 * (with a `redirect` back); authenticated users missing the required authority
 * get the access-denied screen.
 */
export function ProtectedRoute({ authority, children }: ProtectedRouteProps) {
  const { authenticated, can } = useAuth()
  const location = useLocation()

  if (!authenticated) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/auth/sign-in?redirect=${redirect}`} replace />
  }

  if (!can(authority)) {
    return <Navigate to="/others/access-denied" replace />
  }

  return <>{children}</>
}

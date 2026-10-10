import { useMemo } from 'react'
import { hasPermission, resolvePermissions, type AccessMode, type Permission } from '@vn-dylan/ui'
import type { AuthUser, Credentials } from '@/auth'
import { rolePermissions, type Role } from '@/configs/access.config'
import { isSessionValid, useAuthStore, type AuthState } from '@/store/authStore'

export interface UseAuthResult {
  authenticated: boolean
  user: AuthUser | null
  roles: Role[]
  /** Effective permissions resolved from the user's roles. */
  permissions: Permission[]
  /** True when the user holds the required permission(s); nothing required → true. */
  can: (required?: Permission | readonly Permission[], mode?: AccessMode) => boolean
  pending: boolean
  error: AuthState['error']
  signIn: (credentials: Credentials) => Promise<boolean>
  signOut: () => Promise<void>
  clearError: () => void
}

/** App-coupled auth accessor backed by `authStore` and the configured adapter. */
export function useAuth(): UseAuthResult {
  const session = useAuthStore((s) => s.session)
  const status = useAuthStore((s) => s.status)
  const error = useAuthStore((s) => s.error)
  const signIn = useAuthStore((s) => s.signIn)
  const signOut = useAuthStore((s) => s.signOut)
  const clearError = useAuthStore((s) => s.clearError)

  return useMemo(() => {
    const valid = isSessionValid(session)
    const roles = valid ? session.user.roles : []
    const permissions = resolvePermissions(roles, rolePermissions)
    return {
      authenticated: valid,
      user: valid ? session.user : null,
      roles,
      permissions,
      can: (required, mode) => hasPermission(permissions, required, mode),
      pending: status === 'pending',
      error,
      signIn,
      signOut,
      clearError,
    }
  }, [session, status, error, signIn, signOut, clearError])
}

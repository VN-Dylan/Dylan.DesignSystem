import { cloneElement, isValidElement, useCallback, useMemo, type ReactElement } from 'react'
import { AccessContext, useAccess } from './context'
import { hasPermission } from './permissions'
import type { AccessContextValue, AccessProviderProps, CanProps } from './types'

/**
 * Supplies the current user's effective permissions to `useAccess` and `<Can>`.
 * Resolve roles to permissions in the app (see `resolvePermissions`) and pass
 * the result; without a provider nothing that requires a permission is shown.
 */
export function AccessProvider({ permissions, children }: AccessProviderProps) {
  const can = useCallback<AccessContextValue['can']>(
    (required, mode) => hasPermission(permissions, required, mode),
    [permissions],
  )
  const value = useMemo(() => ({ permissions, can }), [permissions, can])
  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>
}

type DisableableProps = { disabled?: boolean; 'aria-disabled'?: boolean; title?: string }

/**
 * Declarative permission gate. Hides (or disables) its children unless the
 * user holds the required permission(s). UI gating only — always enforce the
 * same rule on the server.
 */
export function Can({
  permission,
  mode = 'any',
  behavior = 'hide',
  fallback = null,
  reason,
  children,
}: CanProps) {
  const { can } = useAccess()
  const allowed = can(permission, mode)

  if (typeof children === 'function') return <>{children(allowed)}</>
  if (allowed) return <>{children}</>

  if (behavior === 'disable' && isValidElement<DisableableProps>(children)) {
    return cloneElement(children as ReactElement<DisableableProps>, {
      disabled: true,
      'aria-disabled': true,
      title: reason ?? children.props.title,
    })
  }
  return <>{fallback}</>
}

import type { ReactElement, ReactNode } from 'react'

/** Permission key, conventionally `resource.action` (e.g. `customers.delete`). */
export type Permission = string

/** `any`: one of the required permissions is enough. `all`: every one is needed. */
export type AccessMode = 'any' | 'all'

export interface AccessProviderProps {
  /**
   * Effective permissions of the current user. Supports wildcards: `*` grants
   * everything, `customers.*` grants every `customers.` permission.
   */
  permissions: readonly Permission[]
  children?: ReactNode
}

export interface AccessContextValue {
  permissions: readonly Permission[]
  /** True when the required permission(s) are granted. Nothing required → true. */
  can: (required?: Permission | readonly Permission[], mode?: AccessMode) => boolean
}

export interface CanProps {
  /** Permission(s) required to show the children. */
  permission: Permission | readonly Permission[]
  /** How several permissions combine. @default 'any' */
  mode?: AccessMode
  /**
   * What happens without access. `hide` renders `fallback`; `disable` renders the
   * single child element with `disabled` and `aria-disabled` set (and `title`
   * from `reason`), so the action stays visible but unusable. @default 'hide'
   */
  behavior?: 'hide' | 'disable'
  /** Rendered instead of the children when access is denied and `behavior` is `hide`. */
  fallback?: ReactNode
  /** Tooltip text on the disabled element, e.g. "Requires the Editor role". */
  reason?: string
  /** Content, or a render function receiving whether access is granted. */
  children: ReactNode | ReactElement | ((allowed: boolean) => ReactNode)
}

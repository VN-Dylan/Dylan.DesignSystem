import type { AccessMode, Permission } from './types'

const grants = (granted: Permission, required: Permission) => {
  if (granted === '*' || granted === required) return true
  return granted.endsWith('.*') && required.startsWith(granted.slice(0, -1))
}

/**
 * Pure permission check, usable outside React (route loaders, menus).
 * `granted` may contain wildcards (`*`, `customers.*`); an empty `required`
 * list is always allowed.
 */
export function hasPermission(
  granted: readonly Permission[],
  required?: Permission | readonly Permission[],
  mode: AccessMode = 'any',
): boolean {
  const list: readonly Permission[] =
    required == null ? [] : typeof required === 'string' ? [required] : required
  if (list.length === 0) return true
  const isGranted = (permission: Permission) => granted.some((g) => grants(g, permission))
  return mode === 'all' ? list.every(isGranted) : list.some(isGranted)
}

/** Expand roles into their permissions, de-duplicated. */
export function resolvePermissions(
  roles: readonly string[],
  rolePermissions: Readonly<Record<string, readonly Permission[]>>,
): Permission[] {
  return [...new Set(roles.flatMap((role) => rolePermissions[role] ?? []))]
}

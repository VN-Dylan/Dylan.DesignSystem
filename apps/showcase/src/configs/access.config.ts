import type { Permission } from '@vn-dylan/ui'

/**
 * Role → permission map. Permissions follow `resource.action`; `resource.*`
 * grants every action on a resource and `*` grants everything.
 *
 * The UI only hides or disables what a role cannot do — the API must enforce
 * the same rules.
 */
export const roles = ['admin', 'editor', 'viewer'] as const
export type Role = (typeof roles)[number]

const readAll: Permission[] = [
  'dashboard.read',
  'sales.read',
  'customers.read',
  'projects.read',
  'analytics.read',
  'crypto.read',
  'hrm.read',
  'ai.read',
  'account.read',
]

export const rolePermissions: Record<Role, Permission[]> = {
  viewer: readAll,
  editor: [...readAll, 'customers.create', 'customers.update', 'sales.*', 'projects.*', 'ai.*'],
  admin: ['*'],
}

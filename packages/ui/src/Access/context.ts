import { createContext, useContext } from 'react'
import { hasPermission } from './permissions'
import type { AccessContextValue } from './types'

export const AccessContext = createContext<AccessContextValue>({
  permissions: [],
  can: (required, mode) => hasPermission([], required, mode),
})

/** `{ permissions, can }` for imperative checks (`can('customers.delete')`). */
export const useAccess = () => useContext(AccessContext)

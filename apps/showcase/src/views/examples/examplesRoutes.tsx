import type { RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '@/components/route/ProtectedRoute'
import { CustomerWorkspaceView } from './CustomerWorkspaceView'

/** Routes for the `examples` area: end-to-end reference screens. */
export const examplesRoutes: RouteObject[] = [
  {
    path: '/examples/customer-workspace',
    element: (
      <ProtectedRoute permission="customers.read">
        <CustomerWorkspaceView />
      </ProtectedRoute>
    ),
  },
]

import type { RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '@/components/route/ProtectedRoute'
import { AccountSettingsView } from './AccountSettingsView'
import { ActivityLogView } from './ActivityLogView'
import { InvoiceView } from './InvoiceView'
import { PricingView } from './PricingView'
import { ReferralsView } from './ReferralsView'
import { TeamUsersView } from './TeamUsersView'

/** Routes for the `accounts` area. Placeholders are replaced as screens land. */
export const accountsRoutes: RouteObject[] = [
  { path: '/accounts/settings/profile', element: <AccountSettingsView /> },
  { path: '/accounts/activity', element: <ActivityLogView /> },
  { path: '/accounts/referrals', element: <ReferralsView /> },
  { path: '/accounts/pricing', element: <PricingView /> },
  { path: '/accounts/invoice', element: <InvoiceView /> },
  {
    path: '/accounts/users',
    element: (
      <ProtectedRoute authority={['admin']}>
        <TeamUsersView />
      </ProtectedRoute>
    ),
  },
]

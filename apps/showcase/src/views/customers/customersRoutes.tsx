import type { RouteObject } from 'react-router-dom'
import { CustomersDashboardView } from './CustomersDashboardView'
import { CustomerListView } from './CustomerListView'
import { CustomerOverviewView } from './CustomerOverviewView'
import { HelpdeskView } from './HelpdeskView'
import { LeadListView } from './LeadListView'
import { LeadOverviewView } from './LeadOverviewView'

/** Routes for the `customers` area. Placeholders are replaced as screens land. */
export const customersRoutes: RouteObject[] = [
  { path: '/customers/dashboard', element: <CustomersDashboardView /> },
  { path: '/customers/list', element: <CustomerListView /> },
  { path: '/customers/:id/overview', element: <CustomerOverviewView /> },
  { path: '/customers/leads', element: <LeadListView /> },
  { path: '/customers/leads/:id/overview', element: <LeadOverviewView /> },
  { path: '/customers/helpdesk', element: <HelpdeskView /> },
]

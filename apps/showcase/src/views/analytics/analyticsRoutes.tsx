import type { RouteObject } from 'react-router-dom'
import { AnalyticsDashboardView } from './AnalyticsDashboardView'
import { ForecastView } from './ForecastView'
import { ReportsView } from './ReportsView'
import { RevenueView } from './RevenueView'
import { SubscriptionsView } from './SubscriptionsView'

/** Routes for the `analytics` area. Placeholders are replaced as screens land. */
export const analyticsRoutes: RouteObject[] = [
  { path: '/analytics/dashboard', element: <AnalyticsDashboardView /> },
  { path: '/analytics/forecast', element: <ForecastView /> },
  { path: '/analytics/revenue', element: <RevenueView /> },
  { path: '/analytics/subscriptions', element: <SubscriptionsView /> },
  { path: '/analytics/reports', element: <ReportsView /> },
]

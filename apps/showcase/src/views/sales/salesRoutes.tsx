import type { RouteObject } from 'react-router-dom'
import { OrderDetailView } from './OrderDetailView'
import { OrderListView } from './OrderListView'
import { OrderNewView } from './OrderNewView'
import { ProductDetailView } from './ProductDetailView'
import { ProductListView } from './ProductListView'
import { ProductNewView } from './ProductNewView'
import { SalesDashboardView } from './SalesDashboardView'

/** Routes for the `sales` area. */
export const salesRoutes: RouteObject[] = [
  { path: '/sales/dashboard', element: <SalesDashboardView /> },
  { path: '/sales/products', element: <ProductListView /> },
  { path: '/sales/products/new', element: <ProductNewView /> },
  { path: '/sales/products/:id', element: <ProductDetailView /> },
  { path: '/sales/orders', element: <OrderListView /> },
  { path: '/sales/orders/new', element: <OrderNewView /> },
  { path: '/sales/orders/:id', element: <OrderDetailView /> },
]

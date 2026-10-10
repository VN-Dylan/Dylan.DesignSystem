import type { IconType } from '@vn-dylan/icons'
import type { Permission } from '@vn-dylan/ui'
import { TbIcons } from '@vn-dylan/icons'

export interface NavItem {
  /** Stable key — also the Menu `eventKey` and `useMenuActive` match target. */
  key: string
  title: string
  /** Route path. Groups (with `children`) usually omit it. */
  path?: string
  icon?: IconType
  /** Permission(s) needed to see the item (any of them). Groups hide when no child is visible. */
  permission?: Permission | Permission[]
  children?: NavItem[]
}

/**
 * Side-navigation tree for the showcase app, one group per demo area
 * (sales, customers, projects, analytics, ai, crypto, hrm, accounts). Detail
 * routes reached by URL param are not listed here.
 */
export const navigationConfig: NavItem[] = [
  {
    key: 'dashboards',
    permission: 'dashboard.read',
    title: 'Dashboards',
    icon: TbIcons.TbLayoutDashboard,
    children: [
      { key: 'dashboards.sales', title: 'Sales', path: '/sales/dashboard' },
      { key: 'dashboards.analytics', title: 'Analytics', path: '/analytics/dashboard' },
      { key: 'dashboards.projects', title: 'Projects', path: '/projects/dashboard' },
      { key: 'dashboards.crypto', title: 'Crypto', path: '/crypto/dashboard' },
      { key: 'dashboards.hrm', title: 'HRM', path: '/hrm/dashboard' },
      { key: 'dashboards.customers', title: 'Customers', path: '/customers/dashboard' },
    ],
  },
  {
    key: 'examples',
    permission: 'customers.read',
    title: 'Examples',
    icon: TbIcons.TbLayoutGrid,
    children: [
      {
        key: 'examples.customer-workspace',
        title: 'Customer workspace',
        path: '/examples/customer-workspace',
      },
    ],
  },
  {
    key: 'sales',
    permission: 'sales.read',
    title: 'Sales',
    icon: TbIcons.TbShoppingCart,
    children: [
      { key: 'sales.products', title: 'Products', path: '/sales/products' },
      { key: 'sales.product-new', title: 'New product', path: '/sales/products/new' },
      { key: 'sales.orders', title: 'Orders', path: '/sales/orders' },
      { key: 'sales.order-new', title: 'New order', path: '/sales/orders/new' },
    ],
  },
  {
    key: 'customers',
    permission: 'customers.read',
    title: 'Customers',
    icon: TbIcons.TbUsers,
    children: [
      { key: 'customers.list', title: 'Customer list', path: '/customers/list' },
      { key: 'customers.leads', title: 'Leads', path: '/customers/leads' },
      { key: 'customers.helpdesk', title: 'Helpdesk', path: '/customers/helpdesk' },
    ],
  },
  {
    key: 'projects',
    permission: 'projects.read',
    title: 'Projects',
    icon: TbIcons.TbFolders,
    children: [
      { key: 'projects.list', title: 'Project list', path: '/projects/list' },
      { key: 'projects.scrumboard', title: 'Scrum board', path: '/projects/scrumboard' },
      { key: 'projects.timeline', title: 'Timeline', path: '/projects/timeline' },
      { key: 'projects.tasks', title: 'Tasks', path: '/projects/tasks' },
      { key: 'projects.settings', title: 'Settings', path: '/projects/settings' },
    ],
  },
  {
    key: 'analytics',
    permission: 'analytics.read',
    title: 'Analytics',
    icon: TbIcons.TbChartHistogram,
    children: [
      { key: 'analytics.forecast', title: 'Forecast', path: '/analytics/forecast' },
      { key: 'analytics.revenue', title: 'Revenue', path: '/analytics/revenue' },
      { key: 'analytics.subscriptions', title: 'Subscriptions', path: '/analytics/subscriptions' },
      { key: 'analytics.reports', title: 'Reports', path: '/analytics/reports' },
    ],
  },
  {
    key: 'ai',
    permission: 'ai.read',
    title: 'AI',
    icon: TbIcons.TbSparkles,
    children: [
      { key: 'ai.chat', title: 'Chat', path: '/ai/chat' },
      { key: 'ai.image', title: 'Image', path: '/ai/image' },
      { key: 'ai.writer', title: 'Writer', path: '/ai/writer' },
    ],
  },
  {
    key: 'crypto',
    permission: 'crypto.read',
    title: 'Crypto',
    icon: TbIcons.TbCurrencyBitcoin,
    children: [
      { key: 'crypto.market', title: 'Market', path: '/crypto/market' },
      { key: 'crypto.spot', title: 'Spot trade', path: '/crypto/spot' },
      { key: 'crypto.assets', title: 'Assets', path: '/crypto/assets' },
      { key: 'crypto.kyc', title: 'KYC', path: '/crypto/kyc' },
    ],
  },
  {
    key: 'hrm',
    permission: 'hrm.read',
    title: 'HRM',
    icon: TbIcons.TbBriefcase,
    children: [
      { key: 'hrm.employees', title: 'Employees', path: '/hrm/employees' },
      { key: 'hrm.attendance', title: 'Attendance', path: '/hrm/attendance' },
      { key: 'hrm.payroll', title: 'Payroll', path: '/hrm/payroll' },
      { key: 'hrm.leaves', title: 'Leaves', path: '/hrm/leaves' },
      { key: 'hrm.announcements', title: 'Announcements', path: '/hrm/announcements' },
    ],
  },
  {
    key: 'accounts',
    permission: 'account.read',
    title: 'Account',
    icon: TbIcons.TbUserCog,
    children: [
      { key: 'accounts.profile', title: 'Settings', path: '/accounts/settings/profile' },
      { key: 'accounts.activity', title: 'Activity log', path: '/accounts/activity' },
      { key: 'accounts.referrals', title: 'Referrals', path: '/accounts/referrals' },
      { key: 'accounts.pricing', title: 'Pricing', path: '/accounts/pricing' },
      { key: 'accounts.invoice', title: 'Invoice', path: '/accounts/invoice' },
      {
        key: 'accounts.users',
        title: 'Users',
        path: '/accounts/users',
        permission: 'users.manage',
      },
    ],
  },
  {
    key: 'guides',
    title: 'Reference',
    icon: TbIcons.TbBook,
    children: [
      { key: 'guides.landing', title: 'Landing page', path: '/landing' },
      { key: 'guides.components', title: 'Component gallery', path: '/gallery' },
      { key: 'guides.access-denied', title: 'Access denied', path: '/others/access-denied' },
    ],
  },
]

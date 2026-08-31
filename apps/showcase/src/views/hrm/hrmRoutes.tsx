import type { RouteObject } from 'react-router-dom'
import { AnnouncementsView } from './AnnouncementsView'
import { AttendanceView } from './AttendanceView'
import { EmployeeDirectoryView } from './EmployeeDirectoryView'
import { HrmDashboardView } from './HrmDashboardView'
import { LeaveManagementView } from './LeaveManagementView'
import { PayrollView } from './PayrollView'

/** Routes for the `hrm` area. Placeholders are replaced as screens land. */
export const hrmRoutes: RouteObject[] = [
  { path: '/hrm/dashboard', element: <HrmDashboardView /> },
  { path: '/hrm/employees', element: <EmployeeDirectoryView /> },
  { path: '/hrm/attendance', element: <AttendanceView /> },
  { path: '/hrm/payroll', element: <PayrollView /> },
  { path: '/hrm/leaves', element: <LeaveManagementView /> },
  { path: '/hrm/announcements', element: <AnnouncementsView /> },
]

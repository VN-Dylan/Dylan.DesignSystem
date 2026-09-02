import { Avatar, Card } from '@vn-dylan/ui'
import { formatNumber } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { attendanceSummary, attendanceWeek, getEmployee, type AttendanceState } from '@/mock/hrm'
import { attendanceStateClass } from './hrmConstants'

const attendanceStateLabel: Record<AttendanceState, string> = {
  present: 'Present',
  remote: 'Remote',
  leave: 'On leave',
  absent: 'Absent',
}

/** Weekly attendance grid with people rows, day columns and state legend. */
export function AttendanceView() {
  const tiles = [
    ['Present', attendanceSummary.presentToday, 'border-success bg-success-subtle text-success'],
    ['Remote', attendanceSummary.remoteToday, 'border-info bg-info-subtle text-info'],
    ['On leave', attendanceSummary.onLeaveToday, 'border-warning bg-warning-subtle text-warning'],
    ['Absent', attendanceSummary.absentToday, 'border-error bg-error-subtle text-error'],
  ] as const

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="Week of Aug 25, 2026" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map(([label, value, className]) => (
          <Card key={label} bordered bodyClass={`p-4 ${className}`}>
            <p className="text-2xl font-semibold">{formatNumber(value, 0)}</p>
            <p className="text-sm font-medium">{label}</p>
          </Card>
        ))}
      </div>

      <Card bordered bodyClass="overflow-x-auto p-0">
        <div className="min-w-[46rem]">
          <div className="grid grid-cols-[16rem_repeat(5,1fr)] border-b border-border bg-surface-sunken text-xs font-medium uppercase text-content-muted">
            <div className="px-4 py-3">Employee</div>
            {attendanceWeek.days.map((day) => (
              <div key={day} className="px-3 py-3 text-center">
                {day}
              </div>
            ))}
          </div>
          {attendanceWeek.rows.map((row) => {
            const employee = getEmployee(row.employeeId)
            return (
              <div
                key={row.employeeId}
                className="grid grid-cols-[16rem_repeat(5,1fr)] items-center border-b border-border last:border-b-0"
              >
                <div className="flex items-center gap-3 px-4 py-3">
                  <Avatar
                    size={30}
                    shape="circle"
                    src={employee?.avatar}
                    alt={employee?.name ?? row.employeeId}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-content">
                      {employee?.name ?? row.employeeId}
                    </p>
                    <p className="truncate text-xs text-content-muted">{employee?.role}</p>
                  </div>
                </div>
                {row.states.map((state, index) => (
                  <div
                    key={`${row.employeeId}-${attendanceWeek.days[index]}`}
                    className="px-3 py-3"
                  >
                    <span
                      className={`block rounded-md px-2 py-1 text-center text-xs font-medium ${attendanceStateClass[state]}`}
                    >
                      {attendanceStateLabel[state]}
                    </span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </Card>

      <Card bordered bodyClass="flex flex-wrap gap-3 p-4">
        {(Object.keys(attendanceStateLabel) as AttendanceState[]).map((state) => (
          <div key={state} className="flex items-center gap-2 text-sm text-content">
            <span className={`h-3 w-3 rounded-full ${attendanceStateClass[state]}`} />
            <span>{attendanceStateLabel[state]}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}

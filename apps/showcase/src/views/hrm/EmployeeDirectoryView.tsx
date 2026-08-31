import { useMemo, useState } from 'react'
import { Avatar, Button, Card, EmptyState, Input, Segment, Select } from '@dylan-ds/ui'
import type { SelectOption } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { employees, type EmployeeStatus } from '@/mock/hrm'
import { employeeStatusLabel, employeeStatusTone } from './hrmConstants'

const allDepartmentOption = { label: 'All departments', value: 'all' }
const departmentOptions: SelectOption[] = [
  allDepartmentOption,
  ...Array.from(new Set(employees.map((employee) => employee.department))).map((department) => ({
    label: department,
    value: department,
  })),
]

/** Employee directory card grid with department, search and status filters. */
export function EmployeeDirectoryView() {
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState<SelectOption>(allDepartmentOption)
  const [status, setStatus] = useState<EmployeeStatus | 'all'>('all')

  const filteredEmployees = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    return employees.filter((employee) => {
      const matchesQuery =
        lowered.length === 0 ||
        employee.name.toLowerCase().includes(lowered) ||
        employee.role.toLowerCase().includes(lowered) ||
        employee.email.toLowerCase().includes(lowered)
      const matchesDepartment =
        department.value === 'all' || employee.department === department.value
      const matchesStatus = status === 'all' || employee.status === status
      return matchesQuery && matchesDepartment && matchesStatus
    })
  }, [department.value, query, status])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Browse people by role, department, location and employment status."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbUserPlus} size={16} />}
            onClick={() => undefined}
          >
            Add employee
          </Button>
        }
      />

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(16rem,1fr)_14rem_28rem]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            name="employee-search"
            placeholder="Search name, role or email"
            prefix={<Icon as={TbIcons.TbSearch} size={16} />}
            aria-label="Search employees"
          />
          <Select
            options={departmentOptions}
            value={department}
            onChange={(option) => setDepartment(option ?? allDepartmentOption)}
            isClearable={false}
            aria-label="Department"
          />
          <div className="overflow-x-auto">
            <Segment
              value={status}
              onChange={(value) => setStatus(String(value) as EmployeeStatus | 'all')}
              size="sm"
              aria-label="Employee status"
            >
              <Segment.Item value="all">All</Segment.Item>
              <Segment.Item value="active">Active</Segment.Item>
              <Segment.Item value="on-leave">On leave</Segment.Item>
              <Segment.Item value="probation">Probation</Segment.Item>
              <Segment.Item value="notice">Notice</Segment.Item>
            </Segment>
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <EmptyState size={220}>
            <div className="text-center">
              <p className="font-medium text-content">No employees match the current filters</p>
              <p className="text-sm text-content-muted">Try another department, role or status.</p>
            </div>
          </EmptyState>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} bordered bodyClass="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar size={42} shape="circle" src={employee.avatar} alt={employee.name} />
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-semibold text-content">
                        {employee.name}
                      </h2>
                      <p className="truncate text-sm text-content-muted">{employee.role}</p>
                    </div>
                  </div>
                  <StatusTag tone={employeeStatusTone[employee.status]}>
                    {employeeStatusLabel[employee.status]}
                  </StatusTag>
                </div>
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium uppercase text-content-muted">Department</dt>
                    <dd className="mt-1 text-content">{employee.department}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase text-content-muted">Location</dt>
                    <dd className="mt-1 text-content">{employee.location}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-medium uppercase text-content-muted">Manager</dt>
                    <dd className="mt-1 text-content">{employee.manager}</dd>
                  </div>
                </dl>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Card, Select, Timeline } from '@dylan-ds/ui'
import type { SelectOption } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatNumber, formatRelativeTime } from '@dylan-ds/utils'
import { KpiCard } from '@/components/shared/KpiCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { activity, type ActivityType } from '@/mock/account'
import { activityTypeTone } from './accountConstants'

const allTypeOption = { label: 'All activity', value: 'all' }
const typeOptions: SelectOption[] = [
  allTypeOption,
  { label: 'Auth', value: 'auth' },
  { label: 'Billing', value: 'billing' },
  { label: 'Settings', value: 'settings' },
  { label: 'Content', value: 'content' },
  { label: 'Team', value: 'team' },
]

/** Account activity log with type filtering and event metadata. */
export function ActivityLogView() {
  const [typeFilter, setTypeFilter] = useState<SelectOption>(allTypeOption)

  const filteredActivity = useMemo(
    () => activity.filter((entry) => typeFilter.value === 'all' || entry.type === typeFilter.value),
    [typeFilter.value],
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Activity log" description="Recent account, billing and team events." />

      <div className="grid gap-4 sm:grid-cols-2">
        <KpiCard
          label="Total events"
          value={formatNumber(activity.length, 0)}
          icon={<Icon as={TbIcons.TbActivity} size={18} />}
        />
        <KpiCard
          label="Last sign-in"
          value={formatRelativeTime(activity.find((entry) => entry.type === 'auth')!.at)}
          icon={<Icon as={TbIcons.TbLogin2} size={18} />}
        />
      </div>

      <Card bordered bodyClass="space-y-4 p-4">
        <div className="flex justify-end">
          <div className="w-48">
            <Select
              options={typeOptions}
              value={typeFilter}
              onChange={(option) => setTypeFilter(option ?? allTypeOption)}
              isClearable={false}
              aria-label="Activity type"
            />
          </div>
        </div>

        <Timeline>
          {filteredActivity.map((entry) => (
            <Timeline.Item
              key={entry.id}
              media={
                <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-sunken text-content-muted">
                  <Icon as={TbIcons.TbPointFilled} size={14} />
                </span>
              }
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-content">{entry.action}</p>
                <StatusTag tone={activityTypeTone[entry.type as ActivityType]}>
                  {entry.type}
                </StatusTag>
              </div>
              <p className="mt-1 text-sm text-content-muted">{entry.detail}</p>
              <p className="mt-1 text-xs text-content-faint">
                {entry.device} - {entry.ip} - {formatRelativeTime(entry.at)}
              </p>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  )
}

import type { ReactNode } from 'react'
import { Card, Chart, GrowShrinkTag } from '@vn-dylan/ui'

export interface KpiCardProps {
  label: string
  value: ReactNode
  /** Period-over-period change, as a percentage. Omit to hide the delta tag. */
  delta?: number
  /** Small trend series for the sparkline. */
  spark?: number[]
  icon?: ReactNode
}

/** Compact metric tile: label, big value, delta tag, optional sparkline. */
export function KpiCard({ label, value, delta, spark, icon }: KpiCardProps) {
  return (
    <Card bordered bodyClass="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm text-content-muted">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-content">{value}</p>
          {delta !== undefined && <GrowShrinkTag className="mt-2" value={delta} suffix="%" />}
        </div>
        {icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary-subtle text-primary">
            {icon}
          </span>
        )}
      </div>
      {spark && spark.length > 1 && (
        <div className="mt-3">
          <Chart
            type="area"
            height={48}
            series={[{ name: label, data: spark }]}
            options={{
              chart: { sparkline: { enabled: true } },
              stroke: { width: 2 },
              tooltip: { enabled: false },
            }}
          />
        </div>
      )}
    </Card>
  )
}

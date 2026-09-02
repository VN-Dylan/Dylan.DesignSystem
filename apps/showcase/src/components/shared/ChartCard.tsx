import type { ReactNode } from 'react'
import { Card, Chart } from '@vn-dylan/ui'
import type { ChartProps } from '@vn-dylan/ui'

export interface ChartCardProps extends ChartProps {
  title: string
  /** Right-aligned header content (a filter, legend, link). */
  extra?: ReactNode
}

/** Titled card wrapping a single chart. */
export function ChartCard({ title, extra, ...chart }: ChartCardProps) {
  return (
    <Card bordered header={{ content: title, extra, bordered: true }} bodyClass="p-4">
      <Chart {...chart} />
    </Card>
  )
}

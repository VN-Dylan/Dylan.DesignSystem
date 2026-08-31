import { useMemo } from 'react'
import { Chart } from '../Chart'
import type { ChartProps } from '../Chart'

export interface HistogramProps {
  /** Raw numeric values to bucket. */
  data: number[]
  /** Number of buckets. @default 10 */
  bins?: number
  /** Chart height. @default 240 */
  height?: number | string
  /** Extra ApexCharts options passed through to `Chart`. */
  options?: ChartProps['options']
  className?: string
}

/**
 * Frequency distribution of `data` as a bar chart, built on `Chart`.
 */
export function Histogram({ data, bins = 10, height = 240, options, className }: HistogramProps) {
  const { categories, counts } = useMemo(() => {
    if (data.length === 0) return { categories: [] as string[], counts: [] as number[] }
    const min = Math.min(...data)
    const max = Math.max(...data)
    const width = (max - min || 1) / bins
    const buckets = new Array<number>(bins).fill(0)
    for (const value of data) {
      const index = Math.min(bins - 1, Math.floor((value - min) / width))
      buckets[index] = (buckets[index] ?? 0) + 1
    }
    return {
      categories: buckets.map((_, i) => {
        const lo = min + i * width
        return `${lo.toFixed(0)}–${(lo + width).toFixed(0)}`
      }),
      counts: buckets,
    }
  }, [data, bins])

  return (
    <Chart
      className={className}
      type="bar"
      height={height}
      categories={categories}
      series={[{ name: 'Count', data: counts }]}
      options={{
        plotOptions: { bar: { columnWidth: '92%', borderRadius: 2 } },
        ...options,
      }}
    />
  )
}

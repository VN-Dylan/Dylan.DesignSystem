import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { classNames } from '@dylan-ds/utils'
import type { ChartProps } from './types'
import './Chart.scss'

const readVar = (name: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

const deepMerge = (base: ApexOptions, override?: ApexOptions): ApexOptions => {
  if (!override) return base
  const out: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(override)) {
    const current = (base as Record<string, unknown>)[key]
    out[key] =
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      current &&
      typeof current === 'object'
        ? deepMerge(current as ApexOptions, value as ApexOptions)
        : value
  }
  return out as ApexOptions
}

/**
 * Themed ApexCharts wrapper. Colours, grid and fonts come from the design
 * tokens; pass `options` to override anything else.
 */
export function Chart({
  type = 'line',
  series,
  categories,
  height = 320,
  width,
  options,
  className,
}: ChartProps) {
  const merged = useMemo<ApexOptions>(() => {
    const primary = readVar('--dyl-primary', '#286cf0')
    const grid = readVar('--dyl-border', '#e5e5e5')
    const text = readVar('--dyl-text-muted', '#717680')
    // Categorical palette for multi-series / donut / pie charts. Single-series
    // charts just use the first entry (primary).
    const palette = [
      primary,
      readVar('--dyl-primary-mild', '#4c86f4'),
      readVar('--dyl-info', '#3380fa'),
      readVar('--dyl-success', '#00a85b'),
      readVar('--dyl-warning', '#f59e0b'),
      readVar('--dyl-primary-deep', '#1f56c0'),
      readVar('--dyl-error', '#eb4137'),
    ]
    const base: ApexOptions = {
      chart: {
        type,
        toolbar: { show: false },
        fontFamily: 'inherit',
        foreColor: text,
        animations: { enabled: false },
      },
      colors: palette,
      stroke: { curve: 'smooth', width: type === 'line' ? 2 : 1 },
      grid: { borderColor: grid, strokeDashArray: 4 },
      dataLabels: { enabled: false },
      legend: { labels: { colors: text } },
      tooltip: { theme: 'light' },
      xaxis: categories ? { categories } : {},
    }
    return deepMerge(base, options)
  }, [type, categories, options])

  return (
    <div className={classNames('dyl-chart', className)}>
      <ReactApexChart type={type} series={series} options={merged} height={height} width={width} />
    </div>
  )
}

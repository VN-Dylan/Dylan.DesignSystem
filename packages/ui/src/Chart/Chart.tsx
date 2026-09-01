import { useEffect, useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { classNames } from '@dylan-ds/utils'
import type { ChartProps } from './types'
import './Chart.scss'

/**
 * Track the document theme so the chart re-reads its token colours when the
 * `.dark` class (or `data-theme-schema`) on `<html>` changes at runtime.
 */
const readThemeKey = () =>
  typeof document === 'undefined'
    ? 'light'
    : `${document.documentElement.classList.contains('dark') ? 'dark' : 'light'}:${
        document.documentElement.getAttribute('data-theme-schema') ?? ''
      }`

function useThemeKey() {
  const [key, setKey] = useState(readThemeKey)
  useEffect(() => {
    // Re-sync once after mount: the theme class may be applied by a parent
    // effect that runs after this component's first render.
    setKey(readThemeKey())
    const observer = new MutationObserver(() => setKey(readThemeKey()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme-schema', 'style'],
    })
    return () => observer.disconnect()
  }, [])
  return key
}

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
  const themeKey = useThemeKey()
  const merged = useMemo<ApexOptions>(() => {
    const primary = readVar('--dyl-primary', '#286cf0')
    const grid = readVar('--dyl-border', '#e5e5e5')
    const text = readVar('--dyl-text-muted', '#717680')
    const isDark = themeKey.startsWith('dark')
    const isXY = type === 'line' || type === 'area' || type === 'bar'
    // Categorical palette for multi-series / donut / pie charts. Single-series
    // charts just use the first entry (primary). Hues are interleaved so adjacent
    // series / slices stay visually distinct (not three shades of blue).
    const palette = [
      primary,
      readVar('--dyl-success', '#00a85b'),
      readVar('--dyl-warning', '#f59e0b'),
      readVar('--dyl-info', '#3380fa'),
      readVar('--dyl-primary-deep', '#1f56c0'),
      readVar('--dyl-error', '#eb4137'),
      readVar('--dyl-primary-mild', '#4c86f4'),
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
      stroke: { curve: 'smooth', width: type === 'line' || type === 'area' ? 2 : 1 },
      // Eyris-style: faint, horizontal-only gridlines; no axis borders or ticks.
      grid: {
        borderColor: grid,
        strokeDashArray: 0,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        padding: { top: 0, right: 12, bottom: 0, left: 12 },
      },
      dataLabels: { enabled: false },
      legend: { labels: { colors: text } },
      tooltip: { theme: isDark ? 'dark' : 'light' },
      ...(type === 'area' && {
        fill: {
          type: 'gradient',
          gradient: { shadeIntensity: 1, opacityFrom: 0.22, opacityTo: 0.02, stops: [0, 100] },
        },
      }),
      xaxis: {
        ...(categories ? { categories } : {}),
        ...(isXY && { axisBorder: { show: false }, axisTicks: { show: false } }),
        // Thin dense category axes (e.g. 24 hourly points) so labels don't collide.
        ...(categories && categories.length > 12 && { tickAmount: 6 }),
        labels: { hideOverlappingLabels: true },
      },
    }
    return deepMerge(base, options)
  }, [type, categories, options, themeKey])

  return (
    <div className={classNames('dyl-chart', className)}>
      <ReactApexChart type={type} series={series} options={merged} height={height} width={width} />
    </div>
  )
}

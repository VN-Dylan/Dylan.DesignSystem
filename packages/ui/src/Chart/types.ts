import type { ApexOptions } from 'apexcharts'

export type ChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'donut'
  | 'pie'
  | 'radialBar'
  | 'scatter'
  | 'heatmap'

export interface ChartProps {
  /** Chart kind. @default 'line' */
  type?: ChartType
  /** ApexCharts series. */
  series: ApexOptions['series']
  /** Category labels for the x-axis (line/area/bar). */
  categories?: (string | number)[]
  /** Chart height. @default 320 */
  height?: number | string
  /** Chart width. */
  width?: number | string
  /** Deep-merged ApexCharts options for anything not covered above. */
  options?: ApexOptions
  className?: string
}

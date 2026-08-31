import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('react-apexcharts', () => ({
  default: ({ series }: { series: unknown }) => (
    <div data-testid="apexchart" data-series={JSON.stringify(series)} />
  ),
}))

import { Histogram } from './Histogram'

describe('Histogram', () => {
  it('buckets values into the requested number of bins', () => {
    render(<Histogram data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} bins={5} />)
    const series = JSON.parse(screen.getByTestId('apexchart').getAttribute('data-series')!)
    expect(series[0].data).toHaveLength(5)
    expect(series[0].data.reduce((a: number, b: number) => a + b, 0)).toBe(10)
  })

  it('renders nothing meaningful for empty data', () => {
    render(<Histogram data={[]} />)
    const series = JSON.parse(screen.getByTestId('apexchart').getAttribute('data-series')!)
    expect(series[0].data).toEqual([])
  })
})

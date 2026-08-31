import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'

// ApexCharts needs a real SVG/layout engine — stub the renderer for unit tests.
vi.mock('react-apexcharts', () => ({
  default: ({ type, series }: { type: string; series: unknown }) => (
    <div data-testid="apexchart" data-type={type} data-series={JSON.stringify(series)} />
  ),
}))

import { Chart } from './Chart'

describe('Chart', () => {
  it('renders the chart with its type and series', () => {
    render(
      <Chart type="bar" series={[{ name: 'A', data: [1, 2, 3] }]} categories={['x', 'y', 'z']} />,
    )
    const node = screen.getByTestId('apexchart')
    expect(node).toHaveAttribute('data-type', 'bar')
    expect(node.getAttribute('data-series')).toContain('"data":[1,2,3]')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Chart type="line" series={[{ name: 'A', data: [1] }]} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

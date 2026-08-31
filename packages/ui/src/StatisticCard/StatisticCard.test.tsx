import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { StatisticCard } from './StatisticCard'

describe('StatisticCard', () => {
  it('renders statistic content with header and footer', () => {
    render(
      <StatisticCard header="Sales" footer="Updated">
        1,862
      </StatisticCard>,
    )
    expect(screen.getByText('Sales')).toBeInTheDocument()
    expect(screen.getByText('1,862')).toBeInTheDocument()
    expect(screen.getByText('Updated')).toBeInTheDocument()
  })

  it('marks inset state with a data attribute', () => {
    render(<StatisticCard inset>1,862</StatisticCard>)
    expect(screen.getByText('1,862').closest('.dyl-statistic-card')).toHaveAttribute(
      'data-inset',
      'true',
    )
  })

  it('forwards ref to the card element', () => {
    const ref = vi.fn()
    render(<StatisticCard ref={ref}>1,862</StatisticCard>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <StatisticCard header={<h2>Sales</h2>} footer="Updated today">
        <p>1,862</p>
      </StatisticCard>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

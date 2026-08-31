import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Timeline } from './Timeline'

describe('Timeline', () => {
  it('renders items in a list', () => {
    render(
      <Timeline>
        <Timeline.Item>First</Timeline.Item>
        <Timeline.Item>Second</Timeline.Item>
      </Timeline>,
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('First')).toBeInTheDocument()
  })

  it('marks the last item and hides its connector', () => {
    render(
      <Timeline>
        <Timeline.Item>A</Timeline.Item>
        <Timeline.Item>B</Timeline.Item>
      </Timeline>,
    )
    const items = screen.getAllByRole('listitem')
    expect(items[0]).not.toHaveAttribute('data-last')
    expect(items[1]).toHaveAttribute('data-last')
  })

  it('renders custom media', () => {
    render(
      <Timeline>
        <Timeline.Item media={<span data-testid="m" />}>A</Timeline.Item>
      </Timeline>,
    )
    expect(screen.getByTestId('m')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Timeline>
        <Timeline.Item>
          <p>Order placed</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>Shipped</p>
        </Timeline.Item>
      </Timeline>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

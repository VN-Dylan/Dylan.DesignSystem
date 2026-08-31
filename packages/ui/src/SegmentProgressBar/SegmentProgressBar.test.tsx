import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { SegmentProgressBar } from './SegmentProgressBar'

describe('SegmentProgressBar', () => {
  it('renders a progressbar with clamped percent', () => {
    render(<SegmentProgressBar segments={10} percent={120} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('fills segments based on percent', () => {
    const { container } = render(<SegmentProgressBar segments={10} percent={40} />)
    expect(container.querySelectorAll('[data-filled="true"]')).toHaveLength(4)
  })

  it('applies custom segment classes and dimensions', () => {
    const { container } = render(
      <SegmentProgressBar segments={2} percent={50} className="rounded-sm" gap={8} height={24} />,
    )
    expect(container.querySelector('.dyl-segment-progress-bar')?.style.gap).toContain('8')
    expect(container.querySelector('.dyl-segment-progress-bar__segment')).toHaveClass('rounded-sm')
    expect(container.querySelector('.dyl-segment-progress-bar__segment')?.style.height).toContain(
      '24',
    )
  })

  it('forwards ref to the progressbar element', () => {
    const ref = vi.fn()
    render(<SegmentProgressBar ref={ref} segments={2} percent={50} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<SegmentProgressBar segments={5} percent={60} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

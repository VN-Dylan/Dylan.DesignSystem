import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { GrowShrinkTag } from './GrowShrinkTag'

describe('GrowShrinkTag', () => {
  it('renders growth styling for positive values', () => {
    render(<GrowShrinkTag value={12.5} suffix="%" />)
    expect(screen.getByText('12.5').closest('.dyl-grow-shrink-tag')).toHaveAttribute(
      'data-trend',
      'grow',
    )
    expect(screen.getByText('%')).toBeInTheDocument()
  })

  it('renders shrink styling for negative values', () => {
    render(<GrowShrinkTag value={-8.3} suffix="%" />)
    expect(screen.getByText('-8.3').closest('.dyl-grow-shrink-tag')).toHaveAttribute(
      'data-trend',
      'shrink',
    )
  })

  it('can hide the icon and render affixes', () => {
    render(<GrowShrinkTag value={25} showIcon={false} prefix="+" suffix=" units" />)
    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(document.querySelector('.dyl-grow-shrink-tag__icon')).not.toBeInTheDocument()
  })

  it('forwards ref to the tag element', () => {
    const ref = vi.fn()
    render(<GrowShrinkTag ref={ref} value={0} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div aria-label="Trend">
        <GrowShrinkTag value={12.5} suffix="%" />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders a block skeleton by default', () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-variant', 'block')
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-animation', 'true')
  })

  it('supports circle variant and disabled animation', () => {
    render(<Skeleton variant="circle" animation={false} data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-variant', 'circle')
    expect(screen.getByTestId('skeleton')).not.toHaveAttribute('data-animation')
  })

  it('applies width and height styles', () => {
    render(<Skeleton width="60%" height={40} data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toHaveStyle({ width: '60%' })
    expect(screen.getByTestId('skeleton').style.height).toContain('40')
  })

  it('renders as a selected native element', () => {
    render(<Skeleton asElement="div" data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton').tagName).toBe('DIV')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Skeleton ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Skeleton />
        <Skeleton variant="circle" />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

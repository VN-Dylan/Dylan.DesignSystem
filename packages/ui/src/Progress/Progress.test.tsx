import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Progress } from './Progress'

describe('Progress', () => {
  it('renders line progress by default', () => {
    render(<Progress percent={30} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '30')
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-variant', 'line')
  })

  it('clamps percent to the accessible range', () => {
    render(<Progress percent={140} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('hides info when showInfo is false', () => {
    render(<Progress percent={40} showInfo={false} />)
    expect(screen.queryByText('40%')).not.toBeInTheDocument()
  })

  it('renders custom info and stroke classes', () => {
    render(<Progress percent={60} customInfo={<span>Done</span>} strokeClass="is-stroke" />)
    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(document.querySelector('.dyl-progress__line-value')).toHaveClass('is-stroke')
  })

  it('renders circular progress', () => {
    render(<Progress variant="circle" percent={50} width="8rem" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-variant', 'circle')
    expect(document.querySelector('.dyl-progress__circle')).toHaveStyle({ width: '8rem' })
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Progress ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Progress percent={30} />
        <Progress variant="circle" percent={60} />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ClockProgress } from './ClockProgress'

describe('ClockProgress', () => {
  it('renders progressbar state', () => {
    render(<ClockProgress value={25} aria-label="Upload" />)
    expect(screen.getByRole('progressbar', { name: 'Upload' })).toHaveAttribute(
      'aria-valuenow',
      '25',
    )
  })

  it('clamps progress values', () => {
    render(<ClockProgress value={150} aria-label="Upload" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('applies numeric size', () => {
    render(<ClockProgress value={50} size={56} />)
    expect(screen.getByRole('progressbar').style.width).toContain('56')
    expect(screen.getByRole('progressbar').style.height).toContain('56')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<ClockProgress ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<ClockProgress value={75} aria-label="Completion" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { InfoBar } from './InfoBar'

describe('InfoBar', () => {
  it('renders one active bar for low level', () => {
    render(<InfoBar level="low" />)
    expect(screen.getByRole('meter', { name: 'low signal' })).toHaveAttribute('aria-valuenow', '1')
    expect(document.querySelectorAll('.dyl-info-bar__bar[data-active]')).toHaveLength(1)
  })

  it('renders two active bars for medium level', () => {
    render(<InfoBar level="medium" />)
    expect(screen.getByRole('meter', { name: 'medium signal' })).toHaveAttribute(
      'aria-valuenow',
      '2',
    )
    expect(document.querySelectorAll('.dyl-info-bar__bar[data-active]')).toHaveLength(2)
  })

  it('renders three active bars and custom height for high level', () => {
    render(<InfoBar level="high" height={20} />)
    expect(screen.getByRole('meter', { name: 'high signal' })).toHaveAttribute('aria-valuenow', '3')
    expect(screen.getByRole('meter').style.height).toContain('20')
  })

  it('forwards ref to the meter element', () => {
    const ref = vi.fn()
    render(<InfoBar level="high" ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<InfoBar level="medium" aria-label="Signal strength" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

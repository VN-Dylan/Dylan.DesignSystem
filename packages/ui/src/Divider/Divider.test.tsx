import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders a horizontal separator by default', () => {
    render(<Divider aria-label="Section" />)
    expect(screen.getByRole('separator', { name: 'Section' })).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    )
  })

  it('renders a vertical separator', () => {
    render(<Divider orientation="vertical" aria-label="Columns" />)
    expect(screen.getByRole('separator', { name: 'Columns' })).toHaveAttribute(
      'data-orientation',
      'vertical',
    )
  })

  it('forwards ref to the divider element', () => {
    const ref = vi.fn()
    render(<Divider ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <p>Before</p>
        <Divider />
        <p>After</p>
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

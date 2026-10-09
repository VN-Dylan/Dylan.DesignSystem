import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders a horizontal separator with base spacing by default', () => {
    render(<Divider aria-label="Section" />)
    const divider = screen.getByRole('separator', { name: 'Section' })
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal')
    expect(divider).toHaveAttribute('data-spacing', 'base')
  })

  it('renders a vertical separator with configurable spacing', () => {
    render(<Divider orientation="vertical" spacing="none" aria-label="Columns" />)
    const divider = screen.getByRole('separator', { name: 'Columns' })
    expect(divider).toHaveAttribute('data-orientation', 'vertical')
    expect(divider).toHaveAttribute('data-spacing', 'none')
  })

  it('renders a centered label between two horizontal lines', () => {
    const { container } = render(<Divider label="Details" />)
    expect(screen.getByText('Details')).toHaveClass('dyl-divider__label')
    expect(container.querySelectorAll('.dyl-divider__line')).toHaveLength(2)
  })

  it('can be marked decorative without aria separator state', () => {
    render(<Divider role="none" data-testid="divider" />)
    expect(screen.getByTestId('divider')).toHaveAttribute('role', 'none')
    expect(screen.getByTestId('divider')).not.toHaveAttribute('aria-orientation')
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
        <Divider label="More information" />
        <p>After</p>
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IconFrame } from './IconFrame'

describe('IconFrame', () => {
  it('renders icon content in the default variant', () => {
    render(
      <IconFrame>
        <span data-testid="icon" />
      </IconFrame>,
    )
    expect(screen.getByTestId('icon').closest('.dyl-icon-frame')).toHaveAttribute(
      'data-variant',
      'default',
    )
  })

  it('supports visual variants and custom size', () => {
    render(
      <IconFrame variant="layered" size={56} data-testid="frame">
        icon
      </IconFrame>,
    )
    expect(screen.getByTestId('frame')).toHaveAttribute('data-variant', 'layered')
    expect(screen.getByTestId('frame').style.width).toContain('56')
    expect(screen.getByTestId('frame').style.height).toContain('56')
  })

  it('forwards ref to the frame element', () => {
    const ref = vi.fn()
    render(<IconFrame ref={ref}>icon</IconFrame>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <IconFrame aria-label="Currency">
        <span aria-hidden>$</span>
      </IconFrame>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

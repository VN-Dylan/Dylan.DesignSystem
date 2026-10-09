import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { AspectRatio } from './AspectRatio'

describe('AspectRatio', () => {
  it('uses a widescreen ratio by default', () => {
    render(<AspectRatio data-testid="ratio" />)
    expect(screen.getByTestId('ratio').style.getPropertyValue('--dyl-aspect-ratio')).toBe(
      String(16 / 9),
    )
  })

  it('sets a custom ratio through a CSS custom property', () => {
    render(<AspectRatio ratio={4 / 3} data-testid="ratio" />)
    expect(screen.getByTestId('ratio')).toHaveAttribute('data-ratio', String(4 / 3))
    expect(screen.getByTestId('ratio').style.getPropertyValue('--dyl-aspect-ratio')).toBe(
      String(4 / 3),
    )
  })

  it('renders a custom element and forwards its ref', () => {
    const ref = vi.fn()
    render(<AspectRatio asElement="figure" ref={ref} data-testid="ratio" />)
    expect(screen.getByTestId('ratio').tagName).toBe('FIGURE')
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <AspectRatio>
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" alt="" />
      </AspectRatio>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

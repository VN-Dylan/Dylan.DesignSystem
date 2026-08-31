import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Affix } from './Affix'

describe('Affix', () => {
  it('renders children in a sticky container', () => {
    render(<Affix data-testid="affix">Sticky</Affix>)
    expect(screen.getByTestId('affix')).toHaveClass('dyl-affix')
    expect(screen.getByText('Sticky')).toBeInTheDocument()
  })

  it('applies the offset as top style', () => {
    render(
      <Affix offset={80} data-testid="affix">
        Sticky
      </Affix>,
    )
    expect(screen.getByTestId('affix').style.top).toContain('80')
    expect(screen.getByTestId('affix')).toHaveAttribute('data-offset', 'true')
  })

  it('forwards ref to the affix element', () => {
    const ref = vi.fn()
    render(<Affix ref={ref}>Sticky</Affix>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(<Affix>Sticky</Affix>)
    expect(await axe(container)).toHaveNoViolations()
  })
})

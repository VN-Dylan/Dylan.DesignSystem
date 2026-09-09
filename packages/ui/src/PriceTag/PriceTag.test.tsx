import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { PriceTag } from './PriceTag'

describe('PriceTag', () => {
  it('formats amount for a given currency and locale', () => {
    render(<PriceTag amount={1299.5} currency="USD" locale="en-US" />)
    expect(screen.getByText('$1,299.50')).toBeInTheDocument()
  })

  it('renders struck original only when original is greater than amount', () => {
    const { rerender } = render(
      <PriceTag amount={129} original={189} currency="USD" locale="en-US" />,
    )
    expect(screen.getByText('$189.00')).toHaveAccessibleName('')
    expect(screen.getByText('was $189.00')).toBeInTheDocument()

    rerender(<PriceTag amount={129} original={99} currency="USD" locale="en-US" />)
    expect(screen.queryByText('$99.00')).not.toBeInTheDocument()
  })

  it('renders a unit suffix', () => {
    render(<PriceTag amount={129} unit="night" currency="USD" locale="en-US" />)
    expect(screen.getByText(/night/)).toHaveTextContent('/ night')
  })

  it('forwards ref to the root', () => {
    const ref = vi.fn()
    render(<PriceTag amount={129} ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <PriceTag amount={129} original={189} unit="night" currency="USD" locale="en-US" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

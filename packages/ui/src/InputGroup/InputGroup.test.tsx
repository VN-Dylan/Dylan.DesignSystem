import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Button } from '../Button'
import { Input } from '../Input'
import { InputGroup } from './InputGroup'

describe('InputGroup', () => {
  it('renders chained input controls', () => {
    render(
      <InputGroup>
        <InputGroup.Addon>@</InputGroup.Addon>
        <Input aria-label="Username" />
      </InputGroup>,
    )
    expect(screen.getByText('@')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Username' })).toBeInTheDocument()
  })

  it('reflects size on root and addon', () => {
    render(
      <InputGroup size="lg" data-testid="group">
        <InputGroup.Addon data-testid="addon">https://</InputGroup.Addon>
        <Input aria-label="URL" />
      </InputGroup>,
    )
    expect(screen.getByTestId('group')).toHaveAttribute('data-size', 'lg')
    expect(screen.getByTestId('addon')).toHaveAttribute('data-size', 'lg')
  })

  it('forwards ref to the root element', () => {
    const ref = vi.fn()
    render(<InputGroup ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <InputGroup>
        <Input aria-label="Search" />
        <Button>Search</Button>
      </InputGroup>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

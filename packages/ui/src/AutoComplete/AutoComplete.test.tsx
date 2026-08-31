import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { AutoComplete } from './AutoComplete'

const countries = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Canada', code: 'CA' },
]

describe('AutoComplete', () => {
  it('filters options from typed input', async () => {
    render(<AutoComplete data={countries} optionKey={(item) => item.name} aria-label="Country" />)
    await userEvent.type(screen.getByRole('combobox', { name: 'Country' }), 'can')
    expect(screen.getAllByRole('option')).toHaveLength(1)
    expect(screen.getByRole('option', { name: 'Canada' })).toBeInTheDocument()
  })

  it('selects an option and reports it', async () => {
    const onOptionSelected = vi.fn()
    render(
      <AutoComplete
        data={countries}
        optionKey={(item) => item.name}
        onOptionSelected={onOptionSelected}
        aria-label="Country"
      />,
    )
    await userEvent.type(screen.getByRole('combobox'), 'United')
    await userEvent.click(screen.getByRole('option', { name: 'United Kingdom' }))
    expect(onOptionSelected).toHaveBeenCalledWith(expect.objectContaining({ code: 'UK' }))
    expect(screen.getByRole('combobox')).toHaveValue('United Kingdom')
  })

  it('supports keyboard selection', async () => {
    const onOptionSelected = vi.fn()
    render(
      <AutoComplete
        data={countries}
        optionKey={(item) => item.name}
        onOptionSelected={onOptionSelected}
        aria-label="Country"
      />,
    )
    screen.getByRole('combobox').focus()
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}')
    expect(onOptionSelected).toHaveBeenCalledWith(expect.objectContaining({ code: 'UK' }))
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<AutoComplete ref={ref} data={countries} optionKey={(item) => item.name} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <AutoComplete data={countries} optionKey={(item) => item.name} aria-label="Country" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

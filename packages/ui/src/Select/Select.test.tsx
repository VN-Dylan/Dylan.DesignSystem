import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Select } from './Select'
import type { SelectOption } from './types'

const options: SelectOption[] = [
  { label: 'Watches', value: 'watches' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Gadgets', value: 'gadgets' },
]

describe('Select', () => {
  it('opens the listbox and selects an option', async () => {
    const onChange = vi.fn()
    render(<Select options={options} onChange={onChange} aria-label="Category" />)
    await userEvent.click(screen.getByRole('button', { name: 'Category' }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('option', { name: 'Clothing' }))
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: 'clothing' }))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('filters options when searchable', async () => {
    render(<Select options={options} isSearchable aria-label="Category" />)
    await userEvent.click(screen.getByRole('button', { name: 'Category' }))
    await userEvent.type(screen.getByPlaceholderText('Search…'), 'gad')
    expect(screen.getAllByRole('option')).toHaveLength(1)
    expect(screen.getByRole('option', { name: 'Gadgets' })).toBeInTheDocument()
  })

  it('supports keyboard navigation', async () => {
    const onChange = vi.fn()
    render(<Select options={options} onChange={onChange} aria-label="Category" />)
    const trigger = screen.getByRole('button', { name: 'Category' })
    trigger.focus()
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}')
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: 'clothing' }))
  })

  it('accumulates selections in multi mode', async () => {
    const onChange = vi.fn()
    render(<Select.Multi options={options} onChange={onChange} aria-label="Categories" />)
    await userEvent.click(screen.getByRole('button', { name: 'Categories' }))
    await userEvent.click(screen.getByRole('option', { name: 'Watches' }))
    await userEvent.click(screen.getByRole('option', { name: 'Gadgets' }))
    expect(onChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ value: 'watches' }),
      expect.objectContaining({ value: 'gadgets' }),
    ])
  })

  it('has no axe violations (closed and open)', async () => {
    const { container } = render(<Select options={options} aria-label="Category" isSearchable />)
    expect(await axe(container)).toHaveNoViolations()
    await userEvent.click(screen.getByRole('button', { name: 'Category' }))
    expect(await axe(container)).toHaveNoViolations()
  })
})

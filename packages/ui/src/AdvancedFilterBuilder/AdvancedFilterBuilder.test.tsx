import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { AdvancedFilterBuilder } from './AdvancedFilterBuilder'
import type { FilterQuery } from './types'

const fields = [
  { label: 'Name', value: 'name' },
  { label: 'Status', value: 'status' },
]

const withRule: FilterQuery = {
  combinator: 'and',
  rules: [{ id: 'r1', field: 'name', operator: 'contains', value: 'acme' }],
}

describe('AdvancedFilterBuilder', () => {
  it('adds a rule', async () => {
    const onChange = vi.fn()
    render(<AdvancedFilterBuilder fields={fields} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Add rule' }))
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ rules: [expect.objectContaining({ field: 'name' })] }),
    )
  })

  it('edits a rule value', async () => {
    const onChange = vi.fn()
    render(<AdvancedFilterBuilder fields={fields} value={withRule} onChange={onChange} />)
    await userEvent.type(screen.getByLabelText('Value'), 'x')
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ rules: [expect.objectContaining({ value: 'acmex' })] }),
    )
  })

  it('removes a rule', async () => {
    const onChange = vi.fn()
    render(<AdvancedFilterBuilder fields={fields} value={withRule} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Remove rule' }))
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ rules: [] }))
  })

  it('fires onApply and onReset', async () => {
    const onApply = vi.fn()
    const onReset = vi.fn()
    render(
      <AdvancedFilterBuilder
        fields={fields}
        value={withRule}
        onApply={onApply}
        onReset={onReset}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Apply' }))
    expect(onApply).toHaveBeenCalledWith(withRule)
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(onReset).toHaveBeenCalled()
  })

  it('has no axe violations', async () => {
    const { container } = render(<AdvancedFilterBuilder fields={fields} value={withRule} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

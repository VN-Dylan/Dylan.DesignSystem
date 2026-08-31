import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { PopoverFilter } from './PopoverFilter'

const options = [
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Learning', value: 'learning' },
]

describe('PopoverFilter', () => {
  it('opens and toggles an option', async () => {
    const onChange = vi.fn()
    render(<PopoverFilter data={options} onChange={onChange} title="Status" />)
    await userEvent.click(screen.getByRole('button', { name: /status/i }))
    await userEvent.click(screen.getByLabelText('Paused'))
    expect(onChange).toHaveBeenCalledWith(['paused'])
  })

  it('filters options by search', async () => {
    render(<PopoverFilter data={options} title="Status" />)
    await userEvent.click(screen.getByRole('button', { name: /status/i }))
    await userEvent.type(screen.getByPlaceholderText('Search…'), 'lear')
    expect(screen.getByLabelText('Learning')).toBeInTheDocument()
    expect(screen.queryByLabelText('Active')).not.toBeInTheDocument()
  })

  it('resets the selection', async () => {
    const onChange = vi.fn()
    render(
      <PopoverFilter
        data={options}
        defaultValue={['active', 'paused']}
        onChange={onChange}
        title="Status"
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: /status/i }))
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('has no axe violations when open', async () => {
    const { baseElement } = render(<PopoverFilter data={options} title="Status" />)
    await userEvent.click(screen.getByRole('button', { name: /status/i }))
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})

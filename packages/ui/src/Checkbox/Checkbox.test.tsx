import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders a labeled checkbox', () => {
    render(<Checkbox>Accept</Checkbox>)
    expect(screen.getByRole('checkbox', { name: 'Accept' })).toBeInTheDocument()
  })

  it('toggles uncontrolled state and calls onChange', async () => {
    const onChange = vi.fn()
    render(<Checkbox onChange={onChange}>Accept</Checkbox>)
    const input = screen.getByRole('checkbox', { name: 'Accept' })
    await userEvent.click(input)
    expect(input).toBeChecked()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Object))
  })

  it('reflects indeterminate state on the native input', () => {
    render(<Checkbox indeterminate>Some</Checkbox>)
    expect(screen.getByRole('checkbox', { name: 'Some' })).toBePartiallyChecked()
  })

  it('updates group values', async () => {
    const onChange = vi.fn()
    render(
      <Checkbox.Group value={['A']} onChange={onChange} name="choices">
        <Checkbox value="A">A</Checkbox>
        <Checkbox value="B">B</Checkbox>
      </Checkbox.Group>,
    )
    await userEvent.click(screen.getByRole('checkbox', { name: 'B' }))
    expect(onChange).toHaveBeenCalledWith(['A', 'B'], expect.any(Object))
    expect(screen.getByRole('checkbox', { name: 'A' })).toHaveAttribute('name', 'choices')
  })

  it('disables group checkboxes', () => {
    render(
      <Checkbox.Group disabled>
        <Checkbox value="A">A</Checkbox>
      </Checkbox.Group>,
    )
    expect(screen.getByRole('checkbox', { name: 'A' })).toBeDisabled()
  })

  it('accepts a className callback receiving state', () => {
    render(
      <Checkbox className={({ checked }) => (checked ? 'is-on' : 'is-off')} checked>
        Accept
      </Checkbox>,
    )
    expect(screen.getByText('Accept').closest('label')).toHaveClass('is-on')
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<Checkbox ref={ref}>Accept</Checkbox>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Checkbox.Group value={['A']} aria-label="Options">
        <Checkbox value="A">A</Checkbox>
        <Checkbox value="B" indeterminate>
          B
        </Checkbox>
      </Checkbox.Group>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

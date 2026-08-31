import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Radio } from './Radio'

describe('Radio', () => {
  it('renders a labeled radio', () => {
    render(<Radio value="A">A</Radio>)
    expect(screen.getByRole('radio', { name: 'A' })).toBeInTheDocument()
  })

  it('toggles uncontrolled state and calls onChange with value', async () => {
    const onChange = vi.fn()
    render(
      <Radio value="A" onChange={onChange}>
        A
      </Radio>,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'A' }))
    expect(screen.getByRole('radio', { name: 'A' })).toBeChecked()
    expect(onChange).toHaveBeenCalledWith('A', expect.any(Object))
  })

  it('updates group value', async () => {
    const onChange = vi.fn()
    render(
      <Radio.Group value="A" onChange={onChange} name="fruit" aria-label="Fruit">
        <Radio value="A">Apple</Radio>
        <Radio value="B">Banana</Radio>
      </Radio.Group>,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'Banana' }))
    expect(onChange).toHaveBeenCalledWith('B', expect.any(Object))
    expect(screen.getByRole('radio', { name: 'Apple' })).toHaveAttribute('name', 'fruit')
  })

  it('does not call onChange for disabled radios', async () => {
    const onChange = vi.fn()
    render(
      <Radio value="A" onChange={onChange} disabled>
        A
      </Radio>,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'A' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('accepts a className callback receiving state', () => {
    render(
      <Radio className={({ checked }) => (checked ? 'is-on' : 'is-off')} checked>
        A
      </Radio>,
    )
    expect(screen.getByText('A').closest('label')).toHaveClass('is-on')
  })

  it('forwards ref to the input element', () => {
    const ref = vi.fn()
    render(<Radio ref={ref}>A</Radio>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Radio.Group value="A" aria-label="Fruit">
        <Radio value="A">Apple</Radio>
        <Radio value="B">Banana</Radio>
      </Radio.Group>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

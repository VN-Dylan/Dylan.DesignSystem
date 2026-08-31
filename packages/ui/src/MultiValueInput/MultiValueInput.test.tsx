import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { MultiValueInput } from './MultiValueInput'

describe('MultiValueInput', () => {
  it('adds tags with Enter and calls callbacks', async () => {
    const onChange = vi.fn()
    const onTagAdd = vi.fn()
    render(<MultiValueInput placeholder="Add tag" onChange={onChange} onTagAdd={onTagAdd} />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Add tag' }), 'React{Enter}')
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledWith(['React'])
    expect(onTagAdd).toHaveBeenCalledWith('React', ['React'])
  })

  it('removes tags by button and keyboard', async () => {
    const onTagRemove = vi.fn()
    render(<MultiValueInput defaultValue={['React', 'CSS']} onTagRemove={onTagRemove} />)
    await userEvent.click(screen.getByRole('button', { name: 'Remove React' }))
    expect(screen.queryByText('React')).not.toBeInTheDocument()
    expect(onTagRemove).toHaveBeenCalledWith('React', ['CSS'])

    screen.getByText('CSS').focus()
    await userEvent.keyboard('{Delete}')
    expect(screen.queryByText('CSS')).not.toBeInTheDocument()
  })

  it('honors validation and maxTags', async () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <MultiValueInput
        placeholder="Email"
        validate={(tag) => tag.includes('@')}
        onChange={onChange}
      />,
    )
    await userEvent.type(screen.getByRole('textbox'), 'bad{Enter}')
    expect(onChange).not.toHaveBeenCalled()

    rerender(
      <MultiValueInput placeholder="Tags" defaultValue={['one']} maxTags={1} onChange={onChange} />,
    )
    await userEvent.type(screen.getByRole('textbox'), 'two{Enter}')
    expect(screen.queryByText('two')).not.toBeInTheDocument()
  })

  it('reflects invalid and disabled state', () => {
    render(<MultiValueInput placeholder="Tags" invalid disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('forwards ref to the root element', () => {
    const ref = vi.fn()
    render(<MultiValueInput ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <MultiValueInput placeholder="Skills" defaultValue={['React', 'TypeScript']} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

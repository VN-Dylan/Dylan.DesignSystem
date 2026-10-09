import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Combobox } from './Combobox'
import type { ComboboxOption } from './types'

const fruits: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', description: 'Yellow and curved' },
  { value: 'cherry', label: 'Cherry', disabled: true },
  { value: 'grape', label: 'Grape' },
]

const optionLabels = () => screen.queryAllByRole('option').map((o) => o.textContent)

describe('Combobox', () => {
  it('exposes the ARIA combobox pattern and filters static options', async () => {
    render(<Combobox aria-label="Fruit" options={fruits} />)
    const input = screen.getByRole('combobox', { name: 'Fruit' })
    expect(input).toHaveAttribute('aria-expanded', 'false')
    await userEvent.type(input, 'ap')
    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(optionLabels()).toEqual(['Apple', 'Grape'])
  })

  it('picks a single value with the keyboard and shows its label', async () => {
    const onChange = vi.fn()
    render(<Combobox aria-label="Fruit" options={fruits} onChange={onChange} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.keyboard('{ArrowDown}{ArrowDown}')
    expect(input.getAttribute('aria-activedescendant')).toBe(screen.getAllByRole('option')[1]!.id)
    await userEvent.keyboard('{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(fruits[1])
    expect(input).toHaveValue('Banana')
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('skips disabled options and closes on Escape', async () => {
    render(<Combobox aria-label="Fruit" options={fruits} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}')
    expect(screen.getByRole('option', { name: 'Grape' }).id).toBe(
      input.getAttribute('aria-activedescendant'),
    )
    await userEvent.keyboard('{Escape}')
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('clears the selection', async () => {
    const onChange = vi.fn()
    render(
      <Combobox aria-label="Fruit" options={fruits} defaultValue={fruits[0]} onChange={onChange} />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Clear selection' }))
    expect(onChange).toHaveBeenLastCalledWith(null)
  })

  describe('multiple', () => {
    it('adds tags, toggles from the list and removes with Backspace', async () => {
      const onChange = vi.fn()
      render(<Combobox aria-label="Fruits" multiple options={fruits} onChange={onChange} />)
      const input = screen.getByRole('combobox')
      await userEvent.click(input)
      expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true')

      await userEvent.click(screen.getByRole('option', { name: 'Apple' }))
      await userEvent.click(screen.getByRole('option', { name: 'Grape' }))
      expect(onChange).toHaveBeenLastCalledWith([fruits[0], fruits[3]])
      expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('button', { name: 'Remove Apple' })).toBeInTheDocument()

      await userEvent.click(screen.getByRole('option', { name: 'Apple' }))
      expect(onChange).toHaveBeenLastCalledWith([fruits[3]])

      await userEvent.keyboard('{Backspace}')
      expect(onChange).toHaveBeenLastCalledWith([])
    })

    it('removes a tag with its button and collapses extras into +N', async () => {
      const onChange = vi.fn()
      render(
        <Combobox
          aria-label="Fruits"
          multiple
          maxTags={1}
          options={fruits}
          defaultValue={[fruits[0]!, fruits[1]!, fruits[3]!]}
          onChange={onChange}
        />,
      )
      expect(screen.getByText('+2')).toBeInTheDocument()
      await userEvent.click(screen.getByRole('button', { name: 'Remove Apple' }))
      expect(onChange).toHaveBeenLastCalledWith([fruits[1], fruits[3]])
    })
  })

  describe('async', () => {
    it('loads options for the query and keeps only the latest result', async () => {
      const loadOptions = vi.fn(async (q: string) =>
        fruits.filter((f) => f.label.toLowerCase().startsWith(q.toLowerCase())),
      )
      render(
        <Combobox aria-label="Fruit" loadOptions={loadOptions} debounce={0} minQueryLength={1} />,
      )
      const input = screen.getByRole('combobox')
      await userEvent.click(input)
      expect(screen.getByText('Type at least 1 character')).toBeInTheDocument()

      await userEvent.type(input, 'g')
      expect(await screen.findByRole('option', { name: 'Grape' })).toBeInTheDocument()
      expect(loadOptions).toHaveBeenLastCalledWith(
        'g',
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      )
    })

    it('aborts superseded requests', async () => {
      const signals: AbortSignal[] = []
      const loadOptions = vi.fn(
        (_q: string, { signal }: { signal: AbortSignal }) =>
          new Promise<ComboboxOption[]>((resolve) => {
            signals.push(signal)
            setTimeout(() => resolve(fruits), 20)
          }),
      )
      render(<Combobox aria-label="Fruit" loadOptions={loadOptions} debounce={0} />)
      const input = screen.getByRole('combobox')
      await userEvent.click(input)
      await userEvent.type(input, 'ab')
      await waitFor(() => expect(signals.length).toBeGreaterThan(1))
      expect(signals.slice(0, -1).every((s) => s.aborted)).toBe(true)
    })

    it('shows the error state and retries', async () => {
      const loadOptions = vi
        .fn()
        .mockRejectedValueOnce(new Error('down'))
        .mockResolvedValue([fruits[0]])
      render(<Combobox aria-label="Fruit" loadOptions={loadOptions} debounce={0} />)
      await userEvent.click(screen.getByRole('combobox'))
      await userEvent.click(await screen.findByRole('button', { name: 'Retry' }))
      expect(await screen.findByRole('option', { name: 'Apple' })).toBeInTheDocument()
    })
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Combobox aria-label="Fruits" multiple options={fruits} defaultValue={[fruits[0]!]} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

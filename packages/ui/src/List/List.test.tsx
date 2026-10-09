import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { useState } from 'react'
import { List } from './List'
import type { ListProps } from './types'

interface Person {
  id: string
  name: string
}
const people: Person[] = [
  { id: 'a', name: 'Ada' },
  { id: 'b', name: 'Grace' },
  { id: 'c', name: 'Linus' },
]

const renderList = (props: Partial<ListProps<Person>> = {}) =>
  render(
    <List<Person>
      aria-label="People"
      items={people}
      getKey={(p) => p.id}
      renderItem={(p) => <List.Item title={p.name} description={`${p.name}@example.com`} />}
      {...props}
    />,
  )

const optionNames = () => screen.getAllByRole('option').map((o) => o.textContent?.split('@')[0])

describe('List', () => {
  it('renders a plain list with rich items', () => {
    renderList()
    expect(screen.getByRole('list', { name: 'People' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByText('grace@example.com'.replace('grace', 'Grace'))).toBeInTheDocument()
  })

  it('shows the empty message and loading skeleton', () => {
    const { rerender } = renderList({ items: [], emptyMessage: 'Nobody here' })
    expect(screen.getByText('Nobody here')).toBeInTheDocument()
    rerender(
      <List<Person>
        aria-label="People"
        items={[]}
        getKey={(p) => p.id}
        renderItem={(p) => p.name}
        loading
      />,
    )
    expect(screen.getByRole('list')).toHaveAttribute('aria-busy', 'true')
  })

  it('selects a single item by click and keyboard', async () => {
    const onSelectionChange = vi.fn()
    renderList({ selectionMode: 'single', onSelectionChange })
    const listbox = screen.getByRole('listbox', { name: 'People' })
    expect(listbox).not.toHaveAttribute('aria-multiselectable')

    await userEvent.click(screen.getByRole('option', { name: /grace/i }))
    expect(onSelectionChange).toHaveBeenLastCalledWith(['b'])

    await userEvent.keyboard('{ArrowDown}{Enter}')
    expect(onSelectionChange).toHaveBeenLastCalledWith(['c'])
    expect(listbox).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: /linus/i }).id,
    )
  })

  it('toggles multiple items and selects all with Ctrl+A', async () => {
    const onSelectionChange = vi.fn()
    renderList({ selectionMode: 'multiple', onSelectionChange, disabledKeys: ['c'] })
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true')
    await userEvent.click(screen.getByRole('option', { name: /ada/i }))
    await userEvent.click(screen.getByRole('option', { name: /grace/i }))
    expect(onSelectionChange).toHaveBeenLastCalledWith(['a', 'b'])
    await userEvent.click(screen.getByRole('option', { name: /ada/i }))
    expect(onSelectionChange).toHaveBeenLastCalledWith(['b'])

    // disabled item is neither selectable nor part of select-all
    await userEvent.click(screen.getByRole('option', { name: /linus/i }))
    expect(onSelectionChange).toHaveBeenLastCalledWith(['b'])
    await userEvent.keyboard('{Control>}a{/Control}')
    expect(onSelectionChange).toHaveBeenLastCalledWith(['a', 'b'])
  })

  it('skips disabled items when navigating', async () => {
    renderList({ selectionMode: 'single', disabledKeys: ['b'] })
    const listbox = screen.getByRole('listbox')
    listbox.focus()
    await userEvent.keyboard('{ArrowDown}')
    expect(listbox).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: /linus/i }).id,
    )
  })

  it('reorders with Alt+Arrow and announces the move', async () => {
    const Sortable = () => {
      const [items, setItems] = useState(people)
      return (
        <List<Person>
          aria-label="People"
          items={items}
          getKey={(p) => p.id}
          renderItem={(p) => p.name}
          sortable
          onReorder={(next) => setItems(next)}
        />
      )
    }
    render(<Sortable />)
    screen.getByRole('listbox').focus()
    await userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}')
    expect(optionNames()).toEqual(['Grace', 'Ada', 'Linus'])
    expect(screen.getByText('Moved to position 2 of 3')).toBeInTheDocument()
  })

  it('reorders by drag and drop', () => {
    const onReorder = vi.fn()
    renderList({ sortable: true, onReorder })
    const [ada, , linus] = screen.getAllByRole('option')
    const dataTransfer = { setData: vi.fn(), effectAllowed: '', dropEffect: '' }
    // jsdom drag events carry no pointer position, so this drops "before" Linus.
    fireEvent.dragStart(ada!, { dataTransfer })
    fireEvent.dragOver(linus!, { dataTransfer })
    expect(linus).toHaveAttribute('data-drop', 'before')
    fireEvent.drop(linus!, { dataTransfer })
    expect(onReorder).toHaveBeenCalledWith([people[1], people[0], people[2]], { from: 0, to: 1 })
  })

  it('renders only the visible window when virtual', () => {
    const many = Array.from({ length: 1000 }, (_, i) => ({ id: String(i), name: `Row ${i}` }))
    render(
      <List<Person>
        aria-label="Rows"
        items={many}
        getKey={(p) => p.id}
        renderItem={(p) => p.name}
        selectionMode="single"
        virtual={{ itemHeight: 40, height: 400, overscan: 2 }}
      />,
    )
    const options = screen.getAllByRole('option')
    expect(options.length).toBeLessThan(30)
    expect(options[0]).toHaveAttribute('aria-setsize', '1000')
    expect(options[0]).toHaveAttribute('aria-posinset', '1')
  })

  it('has no axe violations', async () => {
    const { container } = renderList({ selectionMode: 'multiple' })
    expect(await axe(container)).toHaveNoViolations()
  })
})

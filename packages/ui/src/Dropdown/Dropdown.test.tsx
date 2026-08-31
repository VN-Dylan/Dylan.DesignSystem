import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Dropdown } from './Dropdown'

describe('Dropdown', () => {
  it('opens on click and selects an item', async () => {
    const onSelect = vi.fn()
    const onItemSelect = vi.fn()
    render(
      <Dropdown title="Actions" onSelect={onSelect}>
        <Dropdown.Item eventKey="edit" onSelect={onItemSelect}>
          Edit
        </Dropdown.Item>
      </Dropdown>,
    )
    fireEvent.click(screen.getByRole('button', { name: /actions/i }))
    expect(await screen.findByText('Edit')).toBeInTheDocument()
    expect(document.querySelector('[role="menu"]')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Edit'))
    expect(onItemSelect).toHaveBeenCalledTimes(1)
    expect(onItemSelect).toHaveBeenCalledWith('edit', expect.any(Object))
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Edit')).not.toBeInTheDocument()
  })

  it('marks active and disabled items', async () => {
    const onSelect = vi.fn()
    render(
      <Dropdown title="Actions" activeKey="edit">
        <Dropdown.Item eventKey="edit">Edit</Dropdown.Item>
        <Dropdown.Item eventKey="delete" disabled onSelect={onSelect}>
          Delete
        </Dropdown.Item>
      </Dropdown>,
    )
    fireEvent.click(screen.getByRole('button', { name: /actions/i }))
    expect(await screen.findByText('Edit')).toHaveAttribute('data-active')
    fireEvent.click(screen.getByText('Delete'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('supports hover trigger callbacks', async () => {
    const onOpen = vi.fn()
    const onToggle = vi.fn()
    render(
      <Dropdown title="Hover" trigger="hover" onOpen={onOpen} onToggle={onToggle}>
        <Dropdown.Item>Item</Dropdown.Item>
      </Dropdown>,
    )
    fireEvent.mouseEnter(screen.getByText('Hover').closest('button')!)
    expect(await screen.findByText('Item')).toBeInTheDocument()
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenCalledWith(true)
  })

  it('supports submenus', async () => {
    render(
      <Dropdown title="Actions">
        <Dropdown.Menu title="More">
          <Dropdown.Item>Archive</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    )
    fireEvent.click(screen.getByRole('button', { name: /actions/i }))
    fireEvent.mouseEnter((await screen.findByText('More')).closest('[role="menuitem"]')!)
    expect(await screen.findByText('Archive')).toBeInTheDocument()
  })

  it('supports context menu area and areaRef', async () => {
    const areaRef = vi.fn()
    render(
      <Dropdown.ContextMenu areaContent="Right click here" areaRef={areaRef}>
        <Dropdown.Item>Inspect</Dropdown.Item>
      </Dropdown.ContextMenu>,
    )
    expect(areaRef).toHaveBeenCalledWith(expect.any(HTMLDivElement))
    fireEvent.contextMenu(screen.getByText('Right click here'), { clientX: 12, clientY: 24 })
    expect(await screen.findByText('Inspect')).toBeInTheDocument()
  })

  it('does not open when disabled', async () => {
    render(
      <Dropdown title="Disabled" disabled>
        <Dropdown.Item>Item</Dropdown.Item>
      </Dropdown>,
    )
    fireEvent.click(screen.getByRole('button', { name: /disabled/i }))
    expect(screen.queryByText('Item')).not.toBeInTheDocument()
  })

  it('forwards ref to the dropdown root', () => {
    const ref = vi.fn()
    render(
      <Dropdown ref={ref} title="Actions">
        <Dropdown.Item>Item</Dropdown.Item>
      </Dropdown>,
    )
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { baseElement } = render(
      <Dropdown title="Actions">
        <Dropdown.Item>Item</Dropdown.Item>
      </Dropdown>,
    )
    fireEvent.click(screen.getByRole('button', { name: /actions/i }))
    await screen.findByText('Item')
    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations()
  })
})

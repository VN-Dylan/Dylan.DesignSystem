import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Menu } from './Menu'

describe('Menu', () => {
  it('selects a menu item and reports the event key', async () => {
    const onSelect = vi.fn()
    render(
      <Menu onSelect={onSelect}>
        <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
      </Menu>,
    )

    await userEvent.click(screen.getByRole('menuitem', { name: 'Settings' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(expect.any(Object), 'settings')
  })

  it('does not select disabled items', async () => {
    const onSelect = vi.fn()
    render(
      <Menu>
        <Menu.MenuItem eventKey="message" disabled onSelect={onSelect}>
          Message
        </Menu.MenuItem>
      </Menu>,
    )

    await userEvent.click(screen.getByRole('menuitem', { name: 'Message' }))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('marks default active and expanded items', () => {
    render(
      <Menu defaultActiveKeys={['child']} defaultExpandedKeys={['parent']}>
        <Menu.MenuCollapse eventKey="parent" label="Parent">
          <Menu.MenuItem eventKey="child">Child</Menu.MenuItem>
        </Menu.MenuCollapse>
      </Menu>,
    )

    expect(screen.getByRole('menuitem', { name: 'Parent' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByRole('menuitem', { name: 'Child' })).toHaveAttribute('data-active')
  })

  it('toggles collapsable menu items', async () => {
    const onToggle = vi.fn()
    render(
      <Menu>
        <Menu.MenuCollapse eventKey="parent" label="Parent" onToggle={onToggle}>
          <Menu.MenuItem eventKey="child">Child</Menu.MenuItem>
        </Menu.MenuCollapse>
      </Menu>,
    )

    await userEvent.click(screen.getByRole('menuitem', { name: 'Parent' }))
    expect(onToggle).toHaveBeenCalledWith(true, expect.any(Object))
    expect(screen.getByRole('menuitem', { name: 'Child' })).toBeVisible()
  })

  it('forwards ref to the menu root', () => {
    const ref = vi.fn()
    render(<Menu ref={ref} />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Menu aria-label="Settings menu">
        <Menu.MenuGroup label="General">
          <Menu.MenuItem eventKey="profile">Profile</Menu.MenuItem>
          <Menu.MenuItem eventKey="billing" disabled>
            Billing
          </Menu.MenuItem>
        </Menu.MenuGroup>
      </Menu>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

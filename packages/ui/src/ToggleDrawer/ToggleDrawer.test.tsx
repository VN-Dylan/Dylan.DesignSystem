import { createRef } from 'react'
import { describe, expect, it } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ToggleDrawer } from './ToggleDrawer'
import type { ToggleDrawerRef } from './types'

describe('ToggleDrawer', () => {
  it('opens and closes from the toggle button', async () => {
    render(<ToggleDrawer title="Menu">Links</ToggleDrawer>)
    await userEvent.click(screen.getByRole('button', { name: 'Toggle drawer' }))
    expect(screen.getByRole('dialog', { name: 'Menu' })).toHaveAttribute('data-placement', 'left')
    await userEvent.click(screen.getByRole('button', { name: 'Close drawer' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('supports alternate placement', async () => {
    render(
      <ToggleDrawer placement="right" title="Right menu">
        Links
      </ToggleDrawer>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Toggle drawer' }))
    expect(screen.getByRole('dialog', { name: 'Right menu' })).toHaveAttribute(
      'data-placement',
      'right',
    )
  })

  it('exposes imperative open and close methods', () => {
    const ref = createRef<ToggleDrawerRef>()
    render(<ToggleDrawer ref={ref}>Links</ToggleDrawer>)

    act(() => ref.current?.handleOpenDrawer())
    expect(screen.getByRole('dialog', { name: 'Navigation drawer' })).toBeInTheDocument()

    act(() => ref.current?.handleCloseDrawer())
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { baseElement } = render(<ToggleDrawer title="Menu">Links</ToggleDrawer>)
    await userEvent.click(screen.getByRole('button', { name: 'Toggle drawer' }))
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'
import { AccessProvider, Can } from './Access'
import { useAccess } from './context'
import { hasPermission, resolvePermissions } from './permissions'

describe('hasPermission', () => {
  it('matches exact keys and wildcards', () => {
    expect(hasPermission(['customers.read'], 'customers.read')).toBe(true)
    expect(hasPermission(['customers.read'], 'customers.delete')).toBe(false)
    expect(hasPermission(['customers.*'], 'customers.delete')).toBe(true)
    expect(hasPermission(['customers.*'], 'orders.read')).toBe(false)
    expect(hasPermission(['*'], 'anything.at.all')).toBe(true)
  })

  it('combines several permissions with any / all', () => {
    const granted = ['a.read', 'b.read']
    expect(hasPermission(granted, ['a.read', 'c.read'])).toBe(true)
    expect(hasPermission(granted, ['a.read', 'c.read'], 'all')).toBe(false)
    expect(hasPermission(granted, ['a.read', 'b.read'], 'all')).toBe(true)
  })

  it('allows when nothing is required', () => {
    expect(hasPermission([], undefined)).toBe(true)
    expect(hasPermission([], [])).toBe(true)
  })

  it('resolves roles into de-duplicated permissions', () => {
    const map = { viewer: ['x.read'], editor: ['x.read', 'x.update'] }
    expect(resolvePermissions(['viewer', 'editor', 'ghost'], map)).toEqual(['x.read', 'x.update'])
  })
})

describe('Can / useAccess', () => {
  const tree = (permissions: string[]) => (
    <AccessProvider permissions={permissions}>
      <Can permission="customers.create">
        <Button>Create</Button>
      </Can>
      <Can permission="customers.delete" fallback={<span>No delete</span>}>
        <Button>Delete</Button>
      </Can>
      <Can permission="customers.update" behavior="disable" reason="Editors only">
        <Button>Edit</Button>
      </Can>
    </AccessProvider>
  )

  it('shows actions the user is granted', () => {
    render(tree(['customers.*']))
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeEnabled()
  })

  it('hides, falls back or disables without permission', () => {
    render(tree(['customers.read']))
    expect(screen.queryByRole('button', { name: 'Create' })).not.toBeInTheDocument()
    expect(screen.getByText('No delete')).toBeInTheDocument()
    const edit = screen.getByRole('button', { name: 'Edit' })
    expect(edit).toBeDisabled()
    expect(edit).toHaveAttribute('title', 'Editors only')
  })

  it('supports a render function and the hook', () => {
    function Probe() {
      const { can } = useAccess()
      return <p>{can(['a', 'b'], 'all') ? 'all' : 'partial'}</p>
    }
    render(
      <AccessProvider permissions={['a']}>
        <Can permission="a">{(allowed) => <span>{allowed ? 'yes' : 'no'}</span>}</Can>
        <Probe />
      </AccessProvider>,
    )
    expect(screen.getByText('yes')).toBeInTheDocument()
    expect(screen.getByText('partial')).toBeInTheDocument()
  })

  it('denies everything without a provider', () => {
    render(
      <Can permission="x" fallback="denied">
        <Button>X</Button>
      </Can>,
    )
    expect(screen.getByText('denied')).toBeInTheDocument()
  })
})

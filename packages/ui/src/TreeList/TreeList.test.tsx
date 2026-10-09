import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { TreeList } from './TreeList'
import type { TreeListProps, TreeNode } from './types'

const nodes: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'button', label: 'Button.tsx' },
      { id: 'lib', label: 'lib', children: [{ id: 'util', label: 'util.ts' }] },
    ],
  },
  { id: 'readme', label: 'README.md' },
]

const renderTree = (props: Partial<TreeListProps> = {}) =>
  render(<TreeList aria-label="Files" nodes={nodes} {...props} />)

const visible = () => screen.getAllByRole('treeitem').map((n) => n.textContent)
const item = (name: string) => screen.getByRole('treeitem', { name: new RegExp(`^${name}`) })

describe('TreeList', () => {
  it('renders an ARIA tree with levels and collapsed branches', () => {
    renderTree()
    expect(screen.getByRole('tree', { name: 'Files' })).toBeInTheDocument()
    expect(visible()).toEqual(['src', 'README.md'])
    expect(item('src')).toHaveAttribute('aria-expanded', 'false')
    expect(item('src')).toHaveAttribute('aria-level', '1')
    expect(item('README.md')).not.toHaveAttribute('aria-expanded')
  })

  it('expands with the keyboard and moves between rows', async () => {
    const onExpandedChange = vi.fn()
    renderTree({ onExpandedChange })
    const tree = screen.getByRole('tree')
    tree.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(onExpandedChange).toHaveBeenLastCalledWith(['src'])
    expect(visible()).toEqual(['src', 'Button.tsx', 'lib', 'README.md'])

    await userEvent.keyboard('{ArrowRight}')
    expect(tree).toHaveAttribute('aria-activedescendant', item('Button.tsx').id)
    await userEvent.keyboard('{ArrowLeft}')
    expect(tree).toHaveAttribute('aria-activedescendant', item('src').id)
    await userEvent.keyboard('{ArrowLeft}')
    expect(visible()).toEqual(['src', 'README.md'])
  })

  it('selects a node on click when selectable', async () => {
    const onSelect = vi.fn()
    renderTree({ selectable: true, onSelect })
    await userEvent.click(item('README.md'))
    expect(onSelect).toHaveBeenCalledWith('readme', nodes[1])
    expect(item('README.md')).toHaveAttribute('aria-selected', 'true')
  })

  describe('checkable', () => {
    it('cascades to descendants and derives a mixed parent', async () => {
      const onCheckedChange = vi.fn()
      renderTree({ checkable: true, defaultExpandedKeys: ['src', 'lib'], onCheckedChange })
      await userEvent.click(item('util.ts'))
      expect(onCheckedChange).toHaveBeenLastCalledWith(['util', 'lib'])
      expect(item('lib')).toHaveAttribute('aria-checked', 'true')
      expect(item('src')).toHaveAttribute('aria-checked', 'mixed')

      await userEvent.click(item('src'))
      expect(new Set(onCheckedChange.mock.lastCall?.[0])).toEqual(
        new Set(['src', 'button', 'lib', 'util']),
      )
      expect(item('src')).toHaveAttribute('aria-checked', 'true')

      await userEvent.click(item('src'))
      expect(onCheckedChange).toHaveBeenLastCalledWith([])
    })

    it('toggles with Space', async () => {
      renderTree({ checkable: true })
      screen.getByRole('tree').focus()
      await userEvent.keyboard('{End} ')
      expect(item('README.md')).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('loads children lazily on first expand', async () => {
    const loadChildren = vi.fn(async () => [{ id: 'remote-1', label: 'remote.ts' }])
    render(
      <TreeList
        aria-label="Remote"
        nodes={[{ id: 'remote', label: 'remote', hasChildren: true }]}
        loadChildren={loadChildren}
      />,
    )
    await userEvent.click(screen.getByRole('treeitem').querySelector('.dyl-tree-list__toggle')!)
    expect(loadChildren).toHaveBeenCalledOnce()
    expect(await screen.findByRole('treeitem', { name: 'remote.ts' })).toBeInTheDocument()
  })

  it('offers retry when lazy loading fails', async () => {
    const loadChildren = vi
      .fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce([{ id: 'x', label: 'x.ts' }])
    render(
      <TreeList
        aria-label="Remote"
        nodes={[{ id: 'remote', label: 'remote', hasChildren: true }]}
        loadChildren={loadChildren}
      />,
    )
    await userEvent.click(screen.getByRole('treeitem').querySelector('.dyl-tree-list__toggle')!)
    await userEvent.click(await screen.findByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(screen.getByRole('treeitem', { name: 'x.ts' })).toBeInTheDocument())
  })

  it('filters by search, keeps ancestors and highlights the match', async () => {
    renderTree({ searchable: true })
    await userEvent.type(screen.getByRole('searchbox'), 'util')
    expect(visible()).toEqual(['src', 'lib', 'util.ts'])
    expect(screen.getByText('util', { selector: 'mark' })).toBeInTheDocument()

    await userEvent.clear(screen.getByRole('searchbox'))
    await userEvent.type(screen.getByRole('searchbox'), 'zzz')
    expect(screen.getByText('No matches')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = renderTree({ checkable: true, defaultExpandedKeys: ['src'] })
    expect(await axe(container)).toHaveNoViolations()
  })
})

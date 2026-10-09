import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { TreeList } from './TreeList'
import type { TreeNode } from './types'

const meta = {
  title: 'Data Display/TreeList',
  component: TreeList,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-sm rounded-lg border border-border bg-surface p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TreeList>

export default meta
type Story = StoryObj<typeof meta>

const folder = <Icon as={TbIcons.TbFolder} size={16} />
const file = <Icon as={TbIcons.TbFileText} size={16} />

const FILES: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: folder,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: folder,
        children: [
          { id: 'button', label: 'Button.tsx', icon: file },
          { id: 'dialog', label: 'Dialog.tsx', icon: file },
          { id: 'table', label: 'Table.tsx', icon: file },
        ],
      },
      {
        id: 'hooks',
        label: 'hooks',
        icon: folder,
        children: [
          { id: 'use-media', label: 'useMediaQuery.ts', icon: file },
          { id: 'use-bp', label: 'useBreakpoint.ts', icon: file },
        ],
      },
      { id: 'index', label: 'index.ts', icon: file },
    ],
  },
  {
    id: 'docs',
    label: 'docs',
    icon: folder,
    children: [{ id: 'layout', label: 'Layout.mdx', icon: file }],
  },
  { id: 'readme', label: 'README.md', icon: file },
  { id: 'license', label: 'LICENSE', icon: file, disabled: true },
]

/** Navigation tree: click or Enter selects, ←/→ collapse/expand, ↑/↓ move. */
export const Basic: Story = {
  args: {
    nodes: FILES,
    'aria-label': 'Project files',
    selectable: true,
    defaultExpandedKeys: ['src', 'components'],
    defaultSelectedKey: 'button',
  },
}

/** Tri-state checkboxes: a parent is checked, unchecked or mixed from its children. */
export const Checkable: Story = {
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState<string[]>(['button', 'dialog'])
      return (
        <div className="space-y-3">
          <TreeList
            aria-label="Files to publish"
            nodes={FILES}
            checkable
            checkedKeys={checked}
            onCheckedChange={setChecked}
            defaultExpandedKeys={['src', 'components']}
          />
          <p className="text-xs text-content-muted">{checked.length} checked</p>
        </div>
      )
    }
    return <Demo />
  },
}

/** Type to filter: matches keep their ancestors, branches open and the match is highlighted. */
export const Searchable: Story = {
  args: {
    nodes: FILES,
    'aria-label': 'Project files',
    searchable: true,
    searchPlaceholder: 'Filter files',
    selectable: true,
  },
}

const ORG: TreeNode[] = [
  { id: 'eng', label: 'Engineering', hasChildren: true },
  { id: 'design', label: 'Design', hasChildren: true },
  { id: 'ops', label: 'Operations' },
]

const fakeApi = (node: TreeNode) =>
  new Promise<TreeNode[]>((resolve) =>
    setTimeout(
      () =>
        resolve(
          ['Platform', 'Product', 'Data'].map((team, i) => ({
            id: `${node.id}-${i}`,
            label: `${node.label as string} · ${team}`,
            hasChildren: i === 0,
          })),
        ),
      600,
    ),
  )

/** Children are fetched on first expand (`hasChildren` + `loadChildren`), with a spinner and retry. */
export const LazyLoading: Story = {
  args: {
    nodes: ORG,
    'aria-label': 'Organisation',
    checkable: true,
    loadChildren: fakeApi,
  },
}

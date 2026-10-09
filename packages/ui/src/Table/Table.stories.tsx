import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useState } from 'react'
import { Table } from './Table'

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '`Table` is the styled, static table markup. For a data grid with **search, filters, sorting, column pinning / reordering / hiding and pagination** use [`DataTable`](?path=/docs/data-display-datatable--docs) — see the [Ticket queue](?path=/story/data-display-datatable--ticket-queue) example.',
      },
    },
  },
  tags: ['autodocs'],
  // Tables sit on a card surface in real screens — mirror the showcase.
  decorators: [
    (Story) => (
      <div className="rounded-lg border border-border bg-surface p-card">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const rows = [
  { company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany' },
  { company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico' },
  { company: 'Ernst Handel', contact: 'Roland Mendel', country: 'Austria' },
]

export const Simple: Story = {
  render: () => (
    <Table>
      <Table.THead>
        <Table.Tr>
          <Table.Th>Company</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>Country</Table.Th>
        </Table.Tr>
      </Table.THead>
      <Table.TBody>
        {rows.map((r) => (
          <Table.Tr key={r.company}>
            <Table.Td>{r.company}</Table.Td>
            <Table.Td>{r.contact}</Table.Td>
            <Table.Td>{r.country}</Table.Td>
          </Table.Tr>
        ))}
      </Table.TBody>
    </Table>
  ),
}

export const CompactHoverable: Story = {
  render: () => (
    <Table compact hoverable>
      <Table.THead>
        <Table.Tr>
          <Table.Th>Company</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>Country</Table.Th>
        </Table.Tr>
      </Table.THead>
      <Table.TBody>
        {rows.map((r) => (
          <Table.Tr key={r.company}>
            <Table.Td>{r.company}</Table.Td>
            <Table.Td>{r.contact}</Table.Td>
            <Table.Td>{r.country}</Table.Td>
          </Table.Tr>
        ))}
      </Table.TBody>
    </Table>
  ),
}

export const Sortable: Story = {
  render: () => {
    const Demo = () => {
      const [dir, setDir] = useState<'asc' | 'desc'>('asc')
      const sorted = useMemo(
        () =>
          [...rows].sort((a, b) =>
            dir === 'asc' ? a.company.localeCompare(b.company) : b.company.localeCompare(a.company),
          ),
        [dir],
      )
      return (
        <Table>
          <Table.THead>
            <Table.Tr>
              <Table.Th
                sortable
                sortDirection={dir}
                onSort={() => setDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              >
                Company
              </Table.Th>
              <Table.Th>Contact</Table.Th>
              <Table.Th>Country</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>
            {sorted.map((r) => (
              <Table.Tr key={r.company}>
                <Table.Td>{r.company}</Table.Td>
                <Table.Td>{r.contact}</Table.Td>
                <Table.Td>{r.country}</Table.Td>
              </Table.Tr>
            ))}
          </Table.TBody>
        </Table>
      )
    }
    return <Demo />
  },
}

interface Folder {
  id: string
  name: string
  size: string
  children?: Folder[]
}

const FOLDERS: Folder[] = [
  {
    id: 'src',
    name: 'src',
    size: '1.2 MB',
    children: [
      {
        id: 'components',
        name: 'components',
        size: '840 KB',
        children: [{ id: 'button', name: 'Button.tsx', size: '6 KB' }],
      },
      { id: 'index', name: 'index.ts', size: '2 KB' },
    ],
  },
  { id: 'readme', name: 'README.md', size: '4 KB' },
]

/** Static tree rows with `Table.TreeCell` — the consumer owns which rows are open. */
export const Tree: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState<Record<string, boolean>>({ src: true })
      const rowsFor = (items: Folder[], level: number): JSX.Element[] =>
        items.flatMap((item) => [
          <Table.Tr key={item.id}>
            <Table.TreeCell
              level={level}
              expandable={Boolean(item.children?.length)}
              expanded={Boolean(open[item.id])}
              onToggle={() => setOpen((o) => ({ ...o, [item.id]: !o[item.id] }))}
              toggleLabel={item.name}
            >
              {item.name}
            </Table.TreeCell>
            <Table.Td>{item.size}</Table.Td>
          </Table.Tr>,
          ...(item.children && open[item.id] ? rowsFor(item.children, level + 1) : []),
        ])
      return (
        <Table hoverable>
          <Table.THead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Size</Table.Th>
            </Table.Tr>
          </Table.THead>
          <Table.TBody>{rowsFor(FOLDERS, 0)}</Table.TBody>
        </Table>
      )
    }
    return <Demo />
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useState } from 'react'
import { Table } from './Table'

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
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

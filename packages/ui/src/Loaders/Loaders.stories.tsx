import type { Meta, StoryObj } from '@storybook/react'
import { Table } from '../Table'
import { Loaders, MediaSkeleton, TableRowSkeleton, TextBlockSkeleton } from './Loaders'

const meta = {
  title: 'Feedback/Loaders',
  component: Loaders.MediaSkeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof MediaSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const MediaSkeletonStory: Story = {
  name: 'MediaSkeleton',
  render: () => (
    <div className="w-96 space-y-4">
      <MediaSkeleton />
      <MediaSkeleton showAvatar={false} />
    </div>
  ),
}

export const TableRowSkeletonStory: Story = {
  name: 'TableRowSkeleton',
  render: () => (
    <Table>
      <Table.THead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.THead>
      <TableRowSkeleton columns={3} rows={3} avatarInColumns={[0]} />
    </Table>
  ),
}

export const TextBlockSkeletonStory: Story = {
  name: 'TextBlockSkeleton',
  render: () => (
    <div className="w-96 space-y-8">
      <TextBlockSkeleton rowCount={3} />
      <TextBlockSkeleton title={false} rowCount={4} />
    </div>
  ),
}

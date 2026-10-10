import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ActionGroup } from '../ActionGroup'
import { Button } from '../Button'
import { Segment } from '../Segment'
import { AccessProvider, Can } from './Access'
import { resolvePermissions } from './permissions'

const meta = {
  title: 'Primitives/Access',
  component: AccessProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof AccessProvider>

export default meta
type Story = StoryObj<typeof meta>

const rolePermissions = {
  viewer: ['customers.read'],
  editor: ['customers.read', 'customers.create', 'customers.update'],
  admin: ['*'],
}

/** Pick a role: actions hide, disable or appear according to its permissions. */
export const Roles: Story = {
  args: { permissions: [] },
  render: () => {
    const Demo = () => {
      const [role, setRole] = useState<keyof typeof rolePermissions>('viewer')
      return (
        <div className="space-y-4">
          <Segment
            value={role}
            onChange={(v) => setRole(v as keyof typeof rolePermissions)}
            size="sm"
          >
            <Segment.Item value="viewer">Viewer</Segment.Item>
            <Segment.Item value="editor">Editor</Segment.Item>
            <Segment.Item value="admin">Admin</Segment.Item>
          </Segment>
          <AccessProvider permissions={resolvePermissions([role], rolePermissions)}>
            <ActionGroup align="start" stackOnMobile={false}>
              <Can permission="customers.create">
                <Button variant="solid">Create</Button>
              </Can>
              <Can permission="customers.update" behavior="disable" reason="Requires Editor">
                <Button>Edit</Button>
              </Can>
              <Can
                permission="customers.delete"
                fallback={<span className="text-sm text-content-muted">No delete access</span>}
              >
                <Button tone="danger">Delete</Button>
              </Can>
            </ActionGroup>
          </AccessProvider>
        </div>
      )
    }
    return <Demo />
  },
}

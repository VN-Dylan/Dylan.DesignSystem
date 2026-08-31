import type { Meta, StoryObj } from '@storybook/react'
import { AuthorityCheck } from './AuthorityCheck'

const meta = {
  title: 'Common/AuthorityCheck',
  component: AuthorityCheck,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthorityCheck>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => (
    <AuthorityCheck authority={['admin']} userAuthority={['admin']}>
      <span className="rounded-md bg-success-subtle px-3 py-2 text-sm text-content">
        Admin action visible
      </span>
    </AuthorityCheck>
  ),
}

export const UsersWithDifferentRole: Story = {
  render: () => (
    <div className="space-y-2 text-sm">
      <AuthorityCheck authority={['admin']} userAuthority={['admin']}>
        <div className="rounded-md border border-border p-3">Admin can view this panel</div>
      </AuthorityCheck>
      <AuthorityCheck authority={['admin']} userAuthority={['member']}>
        <div className="rounded-md border border-border p-3">Member cannot view this panel</div>
      </AuthorityCheck>
    </div>
  ),
}

export const AuthorityCheckStory: Story = {
  name: 'AuthorityCheck',
  args: {
    authority: ['manager'],
    userAuthority: ['manager'],
    children: 'Manager content',
  },
}

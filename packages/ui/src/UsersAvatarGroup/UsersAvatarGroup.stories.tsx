import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { UsersAvatarGroup } from './UsersAvatarGroup'
import type { UserDataObject } from './types'

const users: UserDataObject[] = [
  { userName: 'Ron Vargas', avatarImg: '' },
  { userName: 'Carolyn Hanson', avatarImg: '' },
  { userName: 'Samantha Phillips', avatarImg: '' },
  { userName: 'Ella Robinson', avatarImg: '' },
]

const meta = {
  title: 'Common/UsersAvatarGroup',
  component: UsersAvatarGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    nameKey: 'userName',
    imgKey: 'avatarImg',
    avatarProps: { size: 25 },
    users,
  },
} satisfies Meta<typeof UsersAvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {}

export const UsersAvatarGroupStory: Story = {
  name: 'UsersAvatarGroup',
  render: () => {
    const Demo = () => {
      const [selected, setSelected] = useState('')
      return (
        <div className="space-y-3">
          <UsersAvatarGroup
            nameKey="userName"
            imgKey="avatarImg"
            users={users}
            avatarProps={{ size: 'sm', shape: 'circle' }}
            onAvatarClick={(user) => setSelected(String(user.userName))}
          />
          <p className="text-sm text-content-muted">{selected || 'No user selected'}</p>
        </div>
      )
    }
    return <Demo />
  },
}

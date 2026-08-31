import type { Meta, StoryObj } from '@storybook/react'
import { Icon, HiIcons } from '@dylan-ds/icons'
import { Menu } from './Menu'

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-64 rounded-md border border-border p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

const MenuContent = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="flex items-center gap-2">
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </span>
)

export const Simple: Story = {
  render: () => (
    <Menu>
      <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
      <Menu.MenuItem eventKey="message">Message</Menu.MenuItem>
      <Menu.MenuItem eventKey="gallery">Gallery</Menu.MenuItem>
    </Menu>
  ),
}

export const CollapsableMenuItem: Story = {
  render: () => (
    <Menu>
      <Menu.MenuItem eventKey="item-1">Item 1</Menu.MenuItem>
      <Menu.MenuItem eventKey="item-2">Item 2</Menu.MenuItem>
      <Menu.MenuCollapse eventKey="item-3" label="Item 3">
        <Menu.MenuItem eventKey="item-3-1">Item 3.1</Menu.MenuItem>
        <Menu.MenuItem eventKey="item-3-2">Item 3.2</Menu.MenuItem>
      </Menu.MenuCollapse>
      <Menu.MenuCollapse eventKey="item-4" label="Item 4">
        <Menu.MenuItem eventKey="item-4-1">Item 4.1</Menu.MenuItem>
        <Menu.MenuItem eventKey="item-4-2">Item 4.2</Menu.MenuItem>
      </Menu.MenuCollapse>
    </Menu>
  ),
}

export const MenuGroup: Story = {
  render: () => (
    <Menu>
      <Menu.MenuGroup label="General">
        <Menu.MenuItem eventKey="profile">Profile</Menu.MenuItem>
        <Menu.MenuItem eventKey="billing">Billing</Menu.MenuItem>
      </Menu.MenuGroup>
      <Menu.MenuGroup label="Workspace">
        <Menu.MenuItem eventKey="members">Members</Menu.MenuItem>
        <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
      </Menu.MenuGroup>
    </Menu>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Menu>
      <Menu.MenuItem eventKey="settings">
        <MenuContent icon={<Icon as={HiIcons.HiOutlineCog6Tooth} />} label="Settings" />
      </Menu.MenuItem>
      <Menu.MenuItem eventKey="messages">
        <MenuContent icon={<Icon as={HiIcons.HiOutlineChatBubbleLeftRight} />} label="Messages" />
      </Menu.MenuItem>
      <Menu.MenuCollapse
        eventKey="network"
        label={<MenuContent icon={<Icon as={HiIcons.HiOutlineGlobeAlt} />} label="Network" />}
      >
        <Menu.MenuItem eventKey="wifi">
          <MenuContent icon={<Icon as={HiIcons.HiWifi} />} label="Wifi" />
        </Menu.MenuItem>
        <Menu.MenuItem eventKey="support">
          <MenuContent icon={<Icon as={HiIcons.HiOutlineLifebuoy} />} label="Support" />
        </Menu.MenuItem>
      </Menu.MenuCollapse>
    </Menu>
  ),
}

export const DisabledMenuItem: Story = {
  render: () => (
    <Menu>
      <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
      <Menu.MenuItem eventKey="message" disabled>
        Message
      </Menu.MenuItem>
      <Menu.MenuItem eventKey="gallery">Gallery</Menu.MenuItem>
    </Menu>
  ),
}

export const DefaultActive: Story = {
  render: () => (
    <Menu defaultActiveKeys={['message']}>
      <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
      <Menu.MenuItem eventKey="message">Message</Menu.MenuItem>
      <Menu.MenuItem eventKey="gallery">Gallery</Menu.MenuItem>
    </Menu>
  ),
}

export const DefaultExpand: Story = {
  render: () => (
    <Menu defaultExpandedKeys={['item-3']}>
      <Menu.MenuItem eventKey="item-1">Item 1</Menu.MenuItem>
      <Menu.MenuItem eventKey="item-2">Item 2</Menu.MenuItem>
      <Menu.MenuCollapse eventKey="item-3" label="Item 3">
        <Menu.MenuItem eventKey="item-3-1">Item 3.1</Menu.MenuItem>
        <Menu.MenuItem eventKey="item-3-2">Item 3.2</Menu.MenuItem>
      </Menu.MenuCollapse>
    </Menu>
  ),
}

export const MenuStory: Story = {
  name: 'Menu',
  args: { variant: 'light' },
  render: (args) => (
    <Menu {...args}>
      <Menu.MenuItem eventKey="settings">Settings</Menu.MenuItem>
      <Menu.MenuItem eventKey="message">Message</Menu.MenuItem>
      <Menu.MenuItem eventKey="gallery">Gallery</Menu.MenuItem>
    </Menu>
  ),
}

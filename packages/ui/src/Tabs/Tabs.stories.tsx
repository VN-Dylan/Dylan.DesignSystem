import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Icon, HiIcons } from '@dylan-ds/icons'
import { Tabs } from './Tabs'

const { TabNav, TabList, TabContent } = Tabs

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[36rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const Content = ({ label }: { label: string }) => (
  <p className="text-content-muted">{label} content keeps related information in one view.</p>
)

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabList>
        <TabNav value="home">Home</TabNav>
        <TabNav value="profile">Profile</TabNav>
        <TabNav value="contact">Contact</TabNav>
      </TabList>
      <TabContent value="home">
        <Content label="Home" />
      </TabContent>
      <TabContent value="profile">
        <Content label="Profile" />
      </TabContent>
      <TabContent value="contact">
        <Content label="Contact" />
      </TabContent>
    </Tabs>
  ),
}

export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="home" variant="pill">
      <TabList>
        <TabNav value="home">Home</TabNav>
        <TabNav value="profile">Profile</TabNav>
        <TabNav value="contact">Contact</TabNav>
      </TabList>
      <TabContent value="home">
        <Content label="Home" />
      </TabContent>
      <TabContent value="profile">
        <Content label="Profile" />
      </TabContent>
      <TabContent value="contact">
        <Content label="Contact" />
      </TabContent>
    </Tabs>
  ),
}

export const Icons: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabList>
        <TabNav value="home" icon={<Icon as={HiIcons.HiOutlineHome} />}>
          Home
        </TabNav>
        <TabNav value="profile" icon={<Icon as={HiIcons.HiOutlineUser} />}>
          Profile
        </TabNav>
        <TabNav value="contact" icon={<Icon as={HiIcons.HiOutlinePhone} />}>
          Contact
        </TabNav>
      </TabList>
      <TabContent value="home">
        <Content label="Home" />
      </TabContent>
      <TabContent value="profile">
        <Content label="Profile" />
      </TabContent>
      <TabContent value="contact">
        <Content label="Contact" />
      </TabContent>
    </Tabs>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Tabs defaultValue="home">
        <TabList>
          <TabNav value="home">Home</TabNav>
          <TabNav value="profile" disabled>
            Profile
          </TabNav>
          <TabNav value="contact">Contact</TabNav>
        </TabList>
      </Tabs>
      <Tabs defaultValue="home" variant="pill">
        <TabList>
          <TabNav value="home">Home</TabNav>
          <TabNav value="profile" disabled>
            Profile
          </TabNav>
          <TabNav value="contact">Contact</TabNav>
        </TabList>
      </Tabs>
    </div>
  ),
}

export const ControlledTabs: Story = {
  render: () => {
    const Demo = () => {
      const [currentTab, setCurrentTab] = useState('home')
      return (
        <Tabs value={currentTab} onChange={setCurrentTab}>
          <TabList>
            <TabNav value="home">Home</TabNav>
            <TabNav value="profile">Profile</TabNav>
            <TabNav value="contact">Contact</TabNav>
          </TabList>
          <TabContent value="home">
            <Content label="Home" />
          </TabContent>
          <TabContent value="profile">
            <Content label="Profile" />
          </TabContent>
          <TabContent value="contact">
            <Content label="Contact" />
          </TabContent>
        </Tabs>
      )
    }
    return <Demo />
  },
}

export const TabsStory: Story = {
  name: 'Tabs',
  args: { variant: 'underline', defaultValue: 'home' },
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <TabNav value="home">Home</TabNav>
        <TabNav value="profile">Profile</TabNav>
        <TabNav value="contact">Contact</TabNav>
      </TabList>
      <TabContent value="home">
        <Content label="Home" />
      </TabContent>
      <TabContent value="profile">
        <Content label="Profile" />
      </TabContent>
      <TabContent value="contact">
        <Content label="Contact" />
      </TabContent>
    </Tabs>
  ),
}

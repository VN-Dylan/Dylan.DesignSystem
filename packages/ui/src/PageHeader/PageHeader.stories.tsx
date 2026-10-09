import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { PageHeader } from './PageHeader'

const meta = {
  title: 'Navigation/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: { as: { control: 'inline-radio', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] } },
  args: {
    title: 'Team settings',
    description: 'Manage members, permissions, and workspace preferences.',
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button>Cancel</Button>
        <Button variant="solid">Save changes</Button>
      </>
    ),
  },
}

export const AllSlots: Story = {
  args: {
    breadcrumb: <nav aria-label="Breadcrumb">Home / Teams / Settings</nav>,
    back: <Button aria-label="Back to teams">Back</Button>,
    actions: <Button variant="solid">Invite member</Button>,
  },
}

export const HeadingLevels: Story = {
  args: { as: 'h2', title: 'Section-level page header' },
}

export const RightToLeft: Story = {
  args: {
    dir: 'rtl',
    title: 'إعدادات الفريق',
    description: 'إدارة الأعضاء والأذونات وتفضيلات مساحة العمل.',
    back: <Button aria-label="العودة">رجوع</Button>,
    actions: <Button variant="solid">حفظ</Button>,
  },
}

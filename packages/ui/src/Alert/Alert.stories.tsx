import type { Meta, StoryObj } from '@storybook/react'
import { HiFire } from 'react-icons/hi2'
import { Alert } from './Alert'

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'inline-radio', options: ['info', 'warning', 'success', 'danger'] },
    showIcon: { control: 'boolean' },
    closable: { control: 'boolean' },
  },
  args: {
    children: 'Additional description and information about copywriting.',
    type: 'warning',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Icon: Story = {
  args: { showIcon: true },
}

export const CustomIcon: Story = {
  args: { showIcon: true, type: 'success', customIcon: <HiFire /> },
}

export const Type: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert showIcon type="info">
        Additional description and information about copywriting.
      </Alert>
      <Alert showIcon type="warning">
        Additional description and information about copywriting.
      </Alert>
      <Alert showIcon type="success">
        Additional description and information about copywriting.
      </Alert>
      <Alert showIcon type="danger">
        Additional description and information about copywriting.
      </Alert>
    </div>
  ),
}

export const Title: Story = {
  args: { showIcon: true, type: 'danger', title: 'Error!' },
}

export const Closable: Story = {
  args: {
    closable: true,
    type: 'success',
    children: 'Thanks for submitting your application. Our team will get back to you soon.',
  },
}

export const AlertStory: Story = {}

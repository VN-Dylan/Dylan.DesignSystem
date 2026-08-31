import type { Meta, StoryObj } from '@storybook/react'
import { Wizard } from './Wizard'

const meta = {
  title: 'Navigation/Wizard',
  component: Wizard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Wizard>

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  { title: 'Account', content: <p>Create your account credentials.</p> },
  { title: 'Profile', content: <p>Tell us about yourself.</p> },
  { title: 'Review', content: <p>Confirm and finish.</p> },
]

export const Basic: Story = {
  args: { steps, onFinish: () => alert('Done!') },
}

export const Vertical: Story = {
  args: { steps, vertical: true },
}

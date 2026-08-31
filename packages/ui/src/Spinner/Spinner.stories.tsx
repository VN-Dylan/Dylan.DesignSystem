import type { Meta, StoryObj } from '@storybook/react'
import { ImSpinner9 } from 'react-icons/im'
import { Spinner as SpinnerComponent } from './Spinner'

const meta = {
  title: 'Feedback/Spinner',
  component: SpinnerComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    isSpining: { control: 'boolean' },
    size: { control: 'text' },
  },
  args: { size: 20, isSpining: true },
} satisfies Meta<typeof SpinnerComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SpinnerComponent size={30} />
      <SpinnerComponent size="2.5rem" />
      <SpinnerComponent size="3.25rem" />
    </div>
  ),
}

export const Color: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SpinnerComponent className="text-warning" size="2.5rem" />
      <SpinnerComponent className="text-success" size="2.5rem" />
    </div>
  ),
}

export const CustomIndicator: Story = {
  render: () => <SpinnerComponent size={40} indicator={ImSpinner9} />,
}

export const Static: Story = {
  render: () => <SpinnerComponent isSpining={false} size="2.5rem" />,
}

export const Spinner: Story = {
  args: { 'aria-label': 'Loading content' },
}

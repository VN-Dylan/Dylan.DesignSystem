import type { Meta, StoryObj } from '@storybook/react'
import { VisuallyHidden } from './VisuallyHidden'

const meta = {
  title: 'Primitives/VisuallyHidden',
  component: VisuallyHidden,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof VisuallyHidden>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <p>
      Price: $58.00
      <VisuallyHidden> — down 12.3 percent versus the previous period</VisuallyHidden>
    </p>
  ),
}

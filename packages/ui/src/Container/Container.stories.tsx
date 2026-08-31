import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta = {
  title: 'Common/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: { asElement: 'div' },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => (
    <Container>
      <div className="border border-border bg-surface-sunken p-4 text-sm text-content">Content</div>
    </Container>
  ),
}

export const ContainerStory: Story = {
  name: 'Container',
  render: () => (
    <Container asElement="section" aria-label="Container section">
      <div className="border border-border bg-surface-sunken p-4 text-sm text-content">Content</div>
    </Container>
  ),
}

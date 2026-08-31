import type { Meta, StoryObj } from '@storybook/react'
import { Loading } from './Loading'

const meta = {
  title: 'Feedback/Loading',
  component: Loading,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { loading: true },
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Loading loading>
      <div className="w-72 rounded-md border border-border bg-surface p-6 text-sm text-content">
        Loading content
      </div>
    </Loading>
  ),
}

export const Cover: Story = {
  render: () => (
    <Loading loading className="w-72 rounded-md border border-border bg-surface p-6">
      <p className="text-sm text-content-muted">Covered panel content</p>
    </Loading>
  ),
}

export const Custom: Story = {
  render: () => (
    <Loading loading customLoader={<span className="text-sm font-medium">Please wait</span>}>
      <div className="w-72 rounded-md border border-border bg-surface p-6" />
    </Loading>
  ),
}

export const LoadingStory: Story = {
  name: 'Loading',
  args: {
    children: <div className="w-56 rounded-md border border-border bg-surface p-6">Content</div>,
  },
}

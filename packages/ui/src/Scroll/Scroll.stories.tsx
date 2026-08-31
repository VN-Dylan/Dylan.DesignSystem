import type { Meta, StoryObj } from '@storybook/react'
import { useRef, useState } from 'react'
import { Button } from '../Button'
import { Scroll } from './Scroll'

const meta = {
  title: 'Common/Scroll',
  component: Scroll,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { scrollbars: 'vertical' },
  argTypes: {
    edgeShadow: { control: 'boolean' },
    scrollbars: { control: 'inline-radio', options: ['horizontal', 'vertical', 'both'] },
    type: { control: 'inline-radio', options: ['auto', 'always', 'scroll', 'hover', 'never'] },
  },
  decorators: [
    (Story) => (
      <div className="w-96 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Scroll>

export default meta
type Story = StoryObj<typeof meta>

const WorkspaceContent = ({ nowrap = false }: { nowrap?: boolean }) => (
  <div className={nowrap ? 'flex flex-col gap-4 text-nowrap' : 'flex flex-col gap-4'}>
    <h5 className="text-lg font-semibold">Getting Started with Your Workspace</h5>
    <p>
      Welcome to your new digital workspace, a place where organization meets efficiency. This
      environment is designed to streamline your daily tasks and improve collaboration.
    </p>
    <p>
      Start by exploring the main dashboard, where you will find recent activity, upcoming
      deadlines, and quick access to important tools.
    </p>
    <p>
      Create new tasks with just a few clicks. Add descriptions, due dates, and assign them to your
      team members.
    </p>
    <p>Notifications keep you updated on project changes, mentions, and upcoming deadlines.</p>
    <p>Need help? The support panel offers tips, guides, and answers to frequent questions.</p>
  </div>
)

export const Basic: Story = {
  render: () => (
    <Scroll
      className="h-72"
      viewportProps={{ 'aria-label': 'Workspace introduction', tabIndex: 0 }}
    >
      <WorkspaceContent />
    </Scroll>
  ),
}

export const GettingStartedWithYourWorkspace: Story = {
  render: () => (
    <Scroll className="h-72" viewportProps={{ 'aria-label': 'Workspace guide', tabIndex: 0 }}>
      <WorkspaceContent />
    </Scroll>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Scroll
      className="h-72"
      scrollbars="horizontal"
      viewportProps={{ 'aria-label': 'Horizontal workspace guide', tabIndex: 0 }}
    >
      <WorkspaceContent nowrap />
    </Scroll>
  ),
}

export const ScrollToCertainPosition: Story = {
  render: () => {
    const Demo = () => {
      const viewportRef = useRef<HTMLDivElement>(null)
      return (
        <div className="space-y-3">
          <Button size="sm" onClick={() => viewportRef.current?.scrollTo({ top: 160 })}>
            Scroll down
          </Button>
          <Scroll
            className="h-72"
            viewportRef={viewportRef}
            viewportProps={{ 'aria-label': 'Scrollable workspace guide', tabIndex: 0 }}
          >
            <WorkspaceContent />
          </Scroll>
        </div>
      )
    }
    return <Demo />
  },
}

export const FlexSize: Story = {
  render: () => (
    <div className="flex h-72 flex-col">
      <Scroll.FlexSize viewportProps={{ 'aria-label': 'Flexible workspace guide', tabIndex: 0 }}>
        <WorkspaceContent />
      </Scroll.FlexSize>
    </div>
  ),
}

export const EdgeShadow: Story = {
  render: () => (
    <Scroll
      className="h-72"
      edgeShadow
      viewportProps={{ 'aria-label': 'Workspace guide with edge shadow', tabIndex: 0 }}
    >
      <WorkspaceContent />
    </Scroll>
  ),
}

export const ButtonStory: Story = {
  name: 'Button',
  render: () => {
    const Demo = () => {
      const [position, setPosition] = useState({ x: 0, y: 0 })
      return (
        <div className="space-y-3">
          <p className="text-sm text-content-muted">Y: {position.y}</p>
          <Scroll
            className="h-72"
            onScrollPositionChange={setPosition}
            viewportProps={{ 'aria-label': 'Workspace guide with position', tabIndex: 0 }}
          >
            <WorkspaceContent />
          </Scroll>
        </div>
      )
    }
    return <Demo />
  },
}

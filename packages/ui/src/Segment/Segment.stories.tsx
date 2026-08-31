import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Segment } from './Segment'
import type { SegmentValue } from './types'

const meta = {
  title: 'Common/Segment',
  component: Segment,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Segment>

export default meta
type Story = StoryObj<typeof meta>

const basicItems = ['left', 'center', 'right']

export const Basic: Story = {
  render: () => (
    <Segment defaultValue="center" aria-label="Alignment">
      <Segment.Item value="left">Left</Segment.Item>
      <Segment.Item value="center">Center</Segment.Item>
      <Segment.Item value="right">Right</Segment.Item>
    </Segment>
  ),
}

export const Size: Story = {
  render: () => (
    <div className="space-y-3">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Segment key={size} size={size} defaultValue="center" aria-label={`${size} alignment`}>
          <Segment.Item value="left">Left</Segment.Item>
          <Segment.Item value="center">Center</Segment.Item>
          <Segment.Item value="right">Right</Segment.Item>
        </Segment>
      ))}
    </div>
  ),
}

export const MultipleSelection: Story = {
  render: () => (
    <Segment selectionType="multiple" defaultValue={['left', 'right']} aria-label="Alignment">
      <Segment.Item value="left">Left</Segment.Item>
      <Segment.Item value="center">Center</Segment.Item>
      <Segment.Item value="right">Right</Segment.Item>
    </Segment>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Segment defaultValue="left" aria-label="Alignment">
      <Segment.Item value="left">Left</Segment.Item>
      <Segment.Item disabled value="center">
        Center
      </Segment.Item>
      <Segment.Item value="right">Right</Segment.Item>
    </Segment>
  ),
}

export const CustomSegment: Story = {
  render: () => {
    const selections = [
      { value: 'Personal', desc: 'The plan for personal.', disabled: false },
      { value: 'Team', desc: 'The plan for team.', disabled: false },
      { value: 'Business', desc: 'Talk to us for business plan.', disabled: true },
    ]
    return (
      <Segment defaultValue="Team" className="gap-4 bg-transparent" aria-label="Plan">
        {selections.map((item) => (
          <Segment.Item key={item.value} value={item.value} disabled={item.disabled}>
            {({ active, disabled, value, onSegmentItemClick }) => (
              <button
                type="button"
                disabled={disabled}
                data-active={active || undefined}
                className="flex w-64 select-none justify-between rounded-lg border border-border bg-surface p-4 text-left hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={onSegmentItemClick}
              >
                <span>
                  <span className="block font-semibold">{value}</span>
                  <span className="block text-sm text-content-muted">{item.desc}</span>
                </span>
                {active && <span className="text-primary">Selected</span>}
              </button>
            )}
          </Segment.Item>
        ))}
      </Segment>
    )
  },
}

export const Personal: Story = {
  render: () => <Segment.Item value="Personal">Personal</Segment.Item>,
  decorators: [
    (Story) => (
      <Segment defaultValue="Personal" aria-label="Plan">
        <Story />
      </Segment>
    ),
  ],
}

export const Team: Story = {
  render: () => <Segment.Item value="Team">Team</Segment.Item>,
  decorators: [
    (Story) => (
      <Segment defaultValue="Team" aria-label="Plan">
        <Story />
      </Segment>
    ),
  ],
}

export const Business: Story = {
  render: () => <Segment.Item value="Business">Business</Segment.Item>,
  decorators: [
    (Story) => (
      <Segment defaultValue="Business" aria-label="Plan">
        <Story />
      </Segment>
    ),
  ],
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [singleValue, setSingleValue] = useState<SegmentValue>('left')
      const [multipleValue, setMultipleValue] = useState<SegmentValue>(['center'])
      return (
        <div className="space-y-6">
          <Segment value={singleValue} onChange={setSingleValue} aria-label="Single alignment">
            {basicItems.map((item) => (
              <Segment.Item key={item} value={item}>
                {item}
              </Segment.Item>
            ))}
          </Segment>
          <Segment
            selectionType="multiple"
            value={multipleValue}
            onChange={setMultipleValue}
            aria-label="Multiple alignment"
          >
            {basicItems.map((item) => (
              <Segment.Item key={item} value={item}>
                {item}
              </Segment.Item>
            ))}
          </Segment>
        </div>
      )
    }
    return <Demo />
  },
}

export const SingleSelection: Story = {
  render: () => (
    <Segment defaultValue="left" aria-label="Single alignment">
      <Segment.Item value="left">Left</Segment.Item>
      <Segment.Item value="center">Center</Segment.Item>
      <Segment.Item value="right">Right</Segment.Item>
    </Segment>
  ),
}

export const MultipleSelectionDemo: Story = {
  name: 'Multiple Selection',
  render: () => (
    <Segment selectionType="multiple" defaultValue={['center']} aria-label="Multiple alignment">
      <Segment.Item value="left">Left</Segment.Item>
      <Segment.Item value="center">Center</Segment.Item>
      <Segment.Item value="right">Right</Segment.Item>
    </Segment>
  ),
}

export const SegmentStory: Story = {
  name: 'Segment',
  args: { defaultValue: 'center', 'aria-label': 'Alignment' },
  render: (args) => (
    <Segment {...args}>
      <Segment.Item value="left">Left</Segment.Item>
      <Segment.Item value="center">Center</Segment.Item>
      <Segment.Item value="right">Right</Segment.Item>
    </Segment>
  ),
}

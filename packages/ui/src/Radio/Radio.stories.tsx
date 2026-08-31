import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Radio } from './Radio'
import type { RadioValue } from './types'

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: () => <Radio value="Radio">Radio</Radio>,
}

export const Group: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<RadioValue>('Banana')
      return (
        <Radio.Group value={value} onChange={setValue} aria-label="Fruit">
          <Radio value="Apple">Apple</Radio>
          <Radio value="Banana">Banana</Radio>
          <Radio value="Cherry">Cherry</Radio>
        </Radio.Group>
      )
    }
    return <Demo />
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Radio disabled>Disabled</Radio>
        <Radio defaultChecked disabled>
          Checked disabled
        </Radio>
      </div>
      <Radio.Group value="Apple" disabled aria-label="Disabled fruit">
        <Radio value="Apple">Apple</Radio>
        <Radio value="Banana">Banana</Radio>
        <Radio value="Cherry">Cherry</Radio>
      </Radio.Group>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Radio.Group vertical value="Apple" aria-label="Fruit">
      <Radio value="Apple">Apple</Radio>
      <Radio value="Banana">Banana</Radio>
      <Radio value="Cherry">Cherry</Radio>
    </Radio.Group>
  ),
}

export const Color: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio defaultChecked radioClass="text-success">
        Radio
      </Radio>
      <Radio.Group color="warning" value="Apple" name="radioColorGroup" aria-label="Fruit">
        <Radio radioClass="text-primary" value="Apple">
          Apple
        </Radio>
        <Radio value="Banana">Banana</Radio>
        <Radio value="Cherry">Cherry</Radio>
      </Radio.Group>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<RadioValue>('Apple')
      return (
        <Radio.Group value={value} onChange={setValue} aria-label="Fruit">
          <Radio value="Apple">Apple</Radio>
          <Radio value="Banana">Banana</Radio>
          <Radio value="Cherry">Cherry</Radio>
        </Radio.Group>
      )
    }
    return <Demo />
  },
}

export const RadioStory: Story = {
  name: 'Radio',
  args: { children: 'Radio', value: 'Radio' },
}

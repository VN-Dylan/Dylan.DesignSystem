import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'
import type { CheckboxValue } from './types'

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Checkbox>Checkbox</Checkbox>,
}

export const Group: Story = {
  render: () => (
    <Checkbox.Group value={['A']}>
      <Checkbox value="A">Selection A</Checkbox>
      <Checkbox value="B">Selection B</Checkbox>
      <Checkbox value="C">Selection C</Checkbox>
    </Checkbox.Group>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox defaultChecked disabled>
          Checked disabled
        </Checkbox>
      </div>
      <Checkbox.Group value={['A']}>
        <Checkbox value="A" disabled>
          Selection A
        </Checkbox>
        <Checkbox value="B" disabled>
          Selection B
        </Checkbox>
        <Checkbox value="C">Selection C</Checkbox>
      </Checkbox.Group>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="space-y-5">
      <div className="flex flex-col gap-2">
        <Checkbox>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
      </div>
      <Checkbox.Group vertical value={['Selection A']}>
        <Checkbox value="Selection A">Selection A</Checkbox>
        <Checkbox value="Selection B">Selection B</Checkbox>
        <Checkbox value="Selection C">Selection C</Checkbox>
      </Checkbox.Group>
    </div>
  ),
}

export const Color: Story = {
  render: () => (
    <div className="space-y-5">
      <Checkbox defaultChecked data-color="success">
        Checkbox 1
      </Checkbox>
      <Checkbox.Group color="warning" value={['A', 'B', 'C']}>
        <Checkbox checkboxClass="text-primary" value="A">
          Selection A
        </Checkbox>
        <Checkbox value="B">Selection B</Checkbox>
        <Checkbox value="C">Selection C</Checkbox>
      </Checkbox.Group>
    </div>
  ),
}

export const Indeterminate: Story = {
  render: () => <Checkbox indeterminate>Partially selected</Checkbox>,
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(false)
      const [checkboxList, setCheckboxList] = useState<CheckboxValue[]>(['Selection A'])
      return (
        <div className="flex flex-col gap-4">
          <Checkbox checked={checked} onChange={setChecked}>
            Checkbox
          </Checkbox>
          <Checkbox.Group value={checkboxList} onChange={setCheckboxList}>
            <Checkbox value="Selection A">Selection A</Checkbox>
            <Checkbox value="Selection B">Selection B</Checkbox>
            <Checkbox value="Selection C">Selection C</Checkbox>
          </Checkbox.Group>
        </div>
      )
    }
    return <Demo />
  },
}

export const CheckboxStory: Story = {
  name: 'Checkbox',
  args: { children: 'Checkbox', name: 'checkbox-story' },
}

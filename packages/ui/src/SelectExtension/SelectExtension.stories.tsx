import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TbIcons } from '@vn-dylan/icons'
import { Select } from '../Select'
import { SelectInputWithPrefix, SelectOptionWithPrefix } from './SelectExtension'

type Option = {
  value: string
  label: string
  icon: React.ReactNode
}

const options: Option[] = [
  { value: 'profile', label: 'Profile', icon: <TbIcons.TbUser className="text-lg" /> },
  { value: 'settings', label: 'Settings', icon: <TbIcons.TbSettings2 className="text-lg" /> },
  { value: 'notifications', label: 'Notifications', icon: <TbIcons.TbBell className="text-lg" /> },
]

const selectOptions = options.map(({ value, label }) => ({ value, label }))

const meta = {
  title: 'Forms/SelectExtension',
  component: SelectInputWithPrefix,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectInputWithPrefix>

export default meta
type Story = StoryObj<typeof meta>

export const CustomInputDisplay: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState(selectOptions[0])
      const selected = options.find((option) => option.value === value?.value)

      return (
        <div className="space-y-3">
          <Select
            value={value}
            options={selectOptions}
            onChange={setValue}
            aria-label="Contact method"
          />
          <SelectInputWithPrefix prefix={selected?.icon} label={selected?.label} />
        </div>
      )
    }
    return <Demo />
  },
}

export const CustomOption: Story = {
  render: () => (
    <div className="space-y-2 rounded-md border border-border bg-surface-raised p-2">
      {options.map((option, index) => (
        <SelectOptionWithPrefix
          key={option.value}
          prefix={option.icon}
          label={option.label}
          selected={index === 1}
        />
      ))}
    </div>
  ),
}

export const CombinedUsage: Story = {
  render: () => (
    <div className="space-y-3">
      <SelectInputWithPrefix prefix={<TbIcons.TbShield />} label="Security" />
      <SelectOptionWithPrefix
        prefix={<TbIcons.TbShield />}
        label="Security"
        selected
        checkIcon={<TbIcons.TbCircleCheck />}
      />
    </div>
  ),
}

export const SelectInputWithPrefixStory: Story = {
  name: 'SelectInputWithPrefix',
  args: { prefix: <TbIcons.TbUser />, label: 'John Doe' },
}

export const SelectOptionWithPrefixStory: Story = {
  name: 'SelectOptionWithPrefix',
  render: () => <SelectOptionWithPrefix prefix={<TbIcons.TbUser />} label="John Doe" selected />,
}

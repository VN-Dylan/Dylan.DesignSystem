import type { Meta, StoryObj } from '@storybook/react'
import { TbIcons } from '@dylan-ds/icons'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select, type SelectOption } from '../Select'
import { InputGroup } from './InputGroup'

const domainOptions: SelectOption[] = [
  { label: '.com', value: '.com' },
  { label: '.net', value: '.net' },
  { label: '.io', value: '.io' },
]

const meta = {
  title: 'Forms/InputGroup',
  component: InputGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Addons: Story = {
  render: () => (
    <div className="space-y-4">
      <InputGroup>
        <InputGroup.Addon>@</InputGroup.Addon>
        <Input aria-label="Username" />
      </InputGroup>
      <InputGroup>
        <Input aria-label="Subdomain" />
        <InputGroup.Addon>.example.com</InputGroup.Addon>
      </InputGroup>
      <InputGroup>
        <InputGroup.Addon>http://</InputGroup.Addon>
        <Input aria-label="Domain" />
        <InputGroup.Addon>.com</InputGroup.Addon>
      </InputGroup>
      <InputGroup>
        <Input aria-label="From" />
        <InputGroup.Addon>to</InputGroup.Addon>
        <Input aria-label="To" />
      </InputGroup>
    </div>
  ),
}

export const WithButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <InputGroup>
        <Input placeholder="Input text to search" aria-label="Search query" />
        <Button>Search</Button>
      </InputGroup>
      <InputGroup>
        <Input placeholder="Input text to search" aria-label="Search query with icon" />
        <Button icon={<TbIcons.TbSearch />} aria-label="Search" />
      </InputGroup>
      <InputGroup>
        <Button variant="solid" icon={<TbIcons.TbMicrophone />} aria-label="Record" />
        <Input placeholder="Input text to search" aria-label="Voice search" />
      </InputGroup>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <InputGroup size="sm">
        <InputGroup.Addon>@</InputGroup.Addon>
        <Input placeholder="Small input" aria-label="Small input" />
        <Button variant="solid">Submit</Button>
      </InputGroup>
      <InputGroup size="md">
        <InputGroup.Addon>@</InputGroup.Addon>
        <Input placeholder="Medium input" aria-label="Medium input" />
        <Button variant="solid">Submit</Button>
      </InputGroup>
      <InputGroup size="lg">
        <InputGroup.Addon>@</InputGroup.Addon>
        <Input placeholder="Large input" aria-label="Large input" />
        <Button variant="solid">Submit</Button>
      </InputGroup>
    </div>
  ),
}

export const OtherCombination: Story = {
  render: () => (
    <div className="space-y-4">
      <InputGroup>
        <Input prefix={<TbIcons.TbMicrophone />} aria-label="Message" />
        <Button>Send</Button>
      </InputGroup>
      <InputGroup>
        <Input placeholder="Start date" aria-label="Start date" />
        <InputGroup.Addon>To</InputGroup.Addon>
        <Input placeholder="End date" aria-label="End date" />
      </InputGroup>
      <InputGroup>
        <Input aria-label="Site name" />
        <Select options={domainOptions} defaultValue={domainOptions[0]} aria-label="Domain" />
      </InputGroup>
    </div>
  ),
}

export const InputGroupDemo: Story = {
  name: 'InputGroup',
  args: { size: 'md' },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Addon>https://</InputGroup.Addon>
      <Input aria-label="Project URL" placeholder="project" />
      <Button variant="solid">Create</Button>
    </InputGroup>
  ),
}

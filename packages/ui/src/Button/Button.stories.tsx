import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TbSettings, TbPencil, TbArrowRight, TbPhone } from 'react-icons/tb'
import { Button } from './Button'

const meta = {
  title: 'Common/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'solid', 'subtle', 'plain', 'link'] },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['round', 'circle', 'none'] },
  },
  args: { children: 'Button', variant: 'default', size: 'md' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="plain">Plain</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button icon={<TbPencil />}>Edit</Button>
      <Button icon={<TbSettings />} variant="solid">
        Settings
      </Button>
      <Button icon={<TbArrowRight />} iconAlignment="end">
        Next
      </Button>
      <Button icon={<TbPhone />} shape="circle" aria-label="Call" />
    </div>
  ),
}

export const Loading: Story = {
  render: () => {
    const Demo = () => {
      const [loading, setLoading] = useState(false)
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Button loading>Saving</Button>
          <Button
            variant="solid"
            loading={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 2000)
            }}
          >
            Click me
          </Button>
        </div>
      )
    }
    return <Demo />
  },
}

export const Block: Story = {
  render: () => (
    <div className="w-72 space-y-3">
      <Button block>Block</Button>
      <Button block variant="solid">
        Block solid
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button disabled>Default</Button>
      <Button disabled variant="solid">
        Solid
      </Button>
      <Button disabled variant="plain">
        Plain
      </Button>
    </div>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { HiIcons, Icon } from '@vn-dylan/icons'
import { IconFrame } from './IconFrame'

const meta = {
  title: 'Common/IconFrame',
  component: IconFrame,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'thick', 'layered'] },
    size: { control: 'number' },
  },
  args: {
    variant: 'default',
    size: 40,
    children: <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-xl" />,
  },
} satisfies Meta<typeof IconFrame>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconFrame>
        <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-xl" />
      </IconFrame>
      <IconFrame>
        <Icon as={HiIcons.HiOutlineUser} className="text-xl" />
      </IconFrame>
      <IconFrame>
        <Icon as={HiIcons.HiOutlineCog6Tooth} className="text-xl" />
      </IconFrame>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <IconFrame>
        <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-xl" />
      </IconFrame>
      <IconFrame variant="thick">
        <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-xl" />
      </IconFrame>
      <IconFrame variant="layered">
        <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-xl" />
      </IconFrame>
    </div>
  ),
}

export const CustomSize: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <IconFrame size={32}>
        <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-base" />
      </IconFrame>
      <IconFrame size={40}>
        <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-xl" />
      </IconFrame>
      <IconFrame size={56}>
        <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-2xl" />
      </IconFrame>
      <IconFrame size={72}>
        <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-3xl" />
      </IconFrame>
    </div>
  ),
}

export const IconFrameStory: Story = {
  name: 'IconFrame',
}

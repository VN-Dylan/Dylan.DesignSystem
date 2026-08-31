import type { Meta, StoryObj } from '@storybook/react'
import { HiIcons, TbIcons } from '@dylan-ds/icons'
import { Tag } from './Tag'

const meta = {
  title: 'Data Display/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <Tag>Basic Tag</Tag>,
}

export const Affix: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag prefix>Tag 1</Tag>
      <Tag prefix prefixClass="bg-success">
        Tag 2
      </Tag>
      <Tag prefix={<HiIcons.HiPlusCircle className="text-base text-info" />}>Tag 3</Tag>
      <Tag suffix suffixClass="bg-error">
        Tag 4
      </Tag>
      <Tag suffix={<HiIcons.HiXMark className="text-base" />}>Tag 5</Tag>
    </div>
  ),
}

export const Custom: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag className="rounded-full border-0 bg-error-subtle text-error">Tag 1</Tag>
      <Tag className="rounded-sm border-0 bg-success text-primary-fg">Tag 2</Tag>
      <Tag className="p-1" aria-label="Command">
        <TbIcons.TbCommand className="text-base" />
      </Tag>
      <Tag className="p-1 font-mono">Ctrl</Tag>
    </div>
  ),
}

export const TagStory: Story = {
  name: 'Tag',
  args: { children: 'Tag' },
}

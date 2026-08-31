import type { Meta, StoryObj } from '@storybook/react'
import { HiCheckCircle } from 'react-icons/hi2'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { Card } from './Card'

const meta = {
  title: 'Data Display/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const paragraph =
  'Some quick example text to build on the card title and make up the bulk of the card content.'

const footerActions = (
  <div className="flex justify-end gap-2">
    <Button size="sm">Save</Button>
    <Button size="sm" variant="solid">
      New Post
    </Button>
  </div>
)

export const Basic: Story = {
  render: () => (
    <Card>
      <h5 className="mb-2 font-semibold">Card title</h5>
      <p className="text-content-muted">{paragraph}</p>
    </Card>
  ),
}

export const CardTitle: Story = {
  args: {
    header: { content: 'Card title' },
    children: <p className="text-content-muted">{paragraph}</p>,
  },
}

export const HeaderFooter: Story = {
  args: {
    header: {
      content: 'Card Header',
      extra: (
        <span className="flex items-center gap-1 text-success">
          <span className="font-semibold text-content">Status:</span>
          <HiCheckCircle />
        </span>
      ),
    },
    footer: { content: footerActions },
    children: <p className="text-content-muted">{paragraph}</p>,
  },
}

export const CardHeader: Story = {
  args: {
    header: { content: 'Card Header', extra: 'Draft' },
    children: <p className="text-content-muted">{paragraph}</p>,
  },
}

export const HeaderFooterBorder: Story = {
  args: {
    header: { content: 'Card Header', bordered: false },
    footer: { content: footerActions, bordered: false },
    children: <p className="text-content-muted">{paragraph}</p>,
  },
}

export const Borderless: Story = {
  args: {
    bordered: false,
    children: (
      <>
        <h5 className="mb-2 font-semibold">Card title</h5>
        <p className="text-content-muted">{paragraph}</p>
      </>
    ),
  },
}

export const ExtraClass: Story = {
  args: {
    header: { content: <span>Card Header</span>, className: 'text-primary' },
    footer: { content: footerActions, className: 'flex justify-end' },
    bodyClass: 'text-center',
    children: <p className="text-content-muted">{paragraph}</p>,
  },
}

export const Clickable: Story = {
  args: {
    clickable: true,
    onClick: () => undefined,
    children: (
      <>
        <h5 className="mb-2 font-semibold">Card title</h5>
        <p className="text-content-muted">{paragraph}</p>
      </>
    ),
  },
}

export const Media: Story = {
  args: {
    clickable: true,
    className: 'hover:shadow-lg',
    header: {
      content: (
        <img
          className="aspect-video w-full object-cover"
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="Automation dashboard"
        />
      ),
      bordered: false,
      className: 'p-0',
    },
    footer: {
      bordered: false,
      content: (
        <div className="flex items-center gap-2">
          <Avatar size={32} shape="circle" src="https://i.pravatar.cc/64?img=12" alt="" />
          <span>
            <h6 className="text-sm font-semibold text-content">Kristen Fisher</h6>
            <span className="text-xs text-content-muted">Sep 23, 2021</span>
          </span>
        </div>
      ),
    },
    children: (
      <>
        <h4 className="mb-3 font-bold">AI Powered Automation</h4>
        <p className="text-content-muted">{paragraph}</p>
      </>
    ),
  },
}

export const AIPoweredAutomation: Story = {
  args: {
    header: { content: 'AI Powered Automation' },
    children: <p className="text-content-muted">{paragraph}</p>,
  },
}

export const KristenFisher: Story = {
  args: {
    header: {
      content: (
        <div className="flex items-center gap-2">
          <Avatar size={32} shape="circle" src="https://i.pravatar.cc/64?img=12" alt="" />
          <span>Kristen Fisher</span>
        </div>
      ),
    },
    children: <p className="text-content-muted">{paragraph}</p>,
  },
}

export const CardStory: Story = {}

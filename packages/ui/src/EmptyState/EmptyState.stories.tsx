import type { Meta, StoryObj } from '@storybook/react'
import { HiIcons, Icon } from '@vn-dylan/icons'
import { EmptyState } from './EmptyState'
import { IconFrame } from '../IconFrame'

const meta = {
  title: 'Common/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['wave', 'grid', 'dots'] },
    size: { control: 'number' },
    offset: { control: 'number' },
  },
  args: { variant: 'wave', size: 300, offset: 0 },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <EmptyState
      size={200}
      illustration={
        <IconFrame>
          <Icon as={HiIcons.HiOutlineFolderOpen} className="text-xl" />
        </IconFrame>
      }
    >
      <div className="text-center">
        <h5 className="font-semibold text-content">No data available</h5>
      </div>
    </EmptyState>
  ),
}

export const NoDataAvailable: Story = {
  render: () => (
    <EmptyState
      size={220}
      illustration={
        <IconFrame variant="layered">
          <Icon as={HiIcons.HiOutlineFolderOpen} className="text-xl" />
        </IconFrame>
      }
    >
      <p>No data available</p>
    </EmptyState>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-2">
      <EmptyState
        variant="wave"
        size={240}
        illustration={
          <IconFrame>
            <Icon as={HiIcons.HiOutlineFolderOpen} className="text-xl" />
          </IconFrame>
        }
      >
        <p>Wave</p>
      </EmptyState>
      <EmptyState
        variant="grid"
        size={240}
        illustration={
          <IconFrame>
            <Icon as={HiIcons.HiOutlineDocumentText} className="text-xl" />
          </IconFrame>
        }
      >
        <p>Grid</p>
      </EmptyState>
      <EmptyState
        variant="dots"
        size={240}
        illustration={
          <IconFrame>
            <Icon as={HiIcons.HiOutlineMagnifyingGlass} className="text-xl" />
          </IconFrame>
        }
      >
        <p>Dots</p>
      </EmptyState>
    </div>
  ),
}

export const WithOffset: Story = {
  render: () => (
    <EmptyState
      variant="dots"
      size={200}
      offset={-10}
      illustration={
        <IconFrame>
          <Icon as={HiIcons.HiOutlineArrowDownTray} className="text-xl" />
        </IconFrame>
      }
    >
      <div className="text-center">
        <h5 className="font-semibold text-content">No documents uploaded</h5>
      </div>
    </EmptyState>
  ),
}

export const NoDocumentsUploaded: Story = {
  render: () => (
    <EmptyState
      variant="grid"
      illustration={
        <IconFrame variant="thick">
          <Icon as={HiIcons.HiOutlineDocumentText} className="text-xl" />
        </IconFrame>
      }
    >
      <p>No documents uploaded</p>
    </EmptyState>
  ),
}

export const EmptyStateStory: Story = {
  name: 'EmptyState',
  args: {
    illustration: (
      <IconFrame>
        <Icon as={HiIcons.HiOutlineFolderOpen} className="text-xl" />
      </IconFrame>
    ),
    children: <p>Nothing to show</p>,
  },
}

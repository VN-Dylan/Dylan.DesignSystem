import type { Meta, StoryObj } from '@storybook/react'
import { TbDotsVertical, TbEye, TbCopy, TbCurrencyDollar } from 'react-icons/tb'
import { Button } from '../Button'
import { Dropdown } from '../Dropdown'
import { StatisticCard } from './StatisticCard'

const meta = {
  title: 'Data Display/StatisticCard',
  component: StatisticCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatisticCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <StatisticCard>
      <div>
        <h4 className="text-2xl font-semibold">1,862</h4>
        <span className="text-sm text-content-muted">Total orders</span>
      </div>
    </StatisticCard>
  ),
}

export const Inset: Story = {
  render: () => (
    <StatisticCard inset>
      <div>
        <h4 className="text-2xl font-semibold">1,862</h4>
        <span className="text-sm text-content-muted">Total orders</span>
      </div>
    </StatisticCard>
  ),
}

export const WithHeaderFooter: Story = {
  render: () => (
    <StatisticCard
      header={
        <div className="flex items-center justify-between">
          <span className="font-medium text-content">Sales</span>
          <Dropdown
            placement="bottom-end"
            renderTitle={<Button icon={<TbDotsVertical />} size="sm" aria-label="Sales actions" />}
          >
            <Dropdown.Item eventKey="view">
              <TbEye />
              <span>View More</span>
            </Dropdown.Item>
            <Dropdown.Item eventKey="copy">
              <TbCopy />
              <span>Copy</span>
            </Dropdown.Item>
          </Dropdown>
        </div>
      }
      footer={
        <div className="flex justify-end">
          <Button size="sm">View Report</Button>
        </div>
      }
    >
      <div>
        <h4 className="text-2xl font-semibold">$1,862</h4>
        <div className="flex items-center gap-1 text-sm text-content-muted">
          <span>vs yesterday</span>
          <span className="font-medium text-success">+12.5%</span>
        </div>
      </div>
    </StatisticCard>
  ),
}

export const WithInsetFooter: Story = {
  render: () => (
    <StatisticCard
      inset
      footer={
        <div className="flex items-center justify-between px-2">
          <span className="font-medium text-success">+12.5%</span>
          <span>vs last period</span>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-xl">
          <TbCurrencyDollar />
        </div>
        <div>
          <h4 className="text-2xl font-semibold">$1,862</h4>
          <span className="text-sm text-content-muted">Total Revenue</span>
        </div>
      </div>
    </StatisticCard>
  ),
}

export const WithInsetHeader: Story = {
  render: () => (
    <StatisticCard inset header={<span className="font-medium text-content">Revenue</span>}>
      <div>
        <h4 className="text-2xl font-semibold">$1,862</h4>
        <span className="text-sm text-content-muted">This month</span>
      </div>
    </StatisticCard>
  ),
}

export const StatisticCardStory: Story = {
  name: 'StatisticCard',
  args: {
    header: 'Sales',
    footer: 'Updated today',
    children: <h4 className="text-2xl font-semibold">1,862</h4>,
  },
}

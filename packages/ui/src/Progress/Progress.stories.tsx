import type { Meta, StoryObj } from '@storybook/react'
import { useCallback, useState } from 'react'
import { HiIcons } from '@dylan-ds/icons'
import { Button } from '../Button'
import { Progress } from './Progress'

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    percent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    variant: { control: 'inline-radio', options: ['line', 'circle'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    showInfo: { control: 'boolean' },
  },
  args: { percent: 30, variant: 'line', size: 'md', showInfo: true },
  decorators: [
    (Story) => (
      <div className="w-96 max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const ProgressBar: Story = {
  render: () => <Progress percent={30} />,
}

export const Circle: Story = {
  render: () => (
    <div className="flex justify-center">
      <Progress variant="circle" percent={70} />
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress strokeClass="bg-error" percent={20} />
      <Progress strokeClass="bg-success" percent={30} />
    </div>
  ),
}

export const Size: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress size="sm" percent={45} />
      <Progress size="md" percent={65} />
    </div>
  ),
}

export const CustomInfo: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress
        strokeClass="bg-error"
        percent={60}
        customInfo={<HiIcons.HiXCircle className="text-xl text-error" />}
      />
      <Progress
        strokeClass="bg-success"
        percent={100}
        customInfo={<HiIcons.HiCheckCircle className="text-xl text-success" />}
      />
      <div className="flex justify-center">
        <Progress
          variant="circle"
          percent={40}
          width="10rem"
          customInfo={
            <span className="text-center">
              <strong className="block text-lg">40%</strong>
              <span className="text-xs text-content-muted">completion</span>
            </span>
          }
        />
      </div>
    </div>
  ),
}

export const Dynamic: Story = {
  render: () => {
    const Demo = () => {
      const [percentage, setPercentage] = useState(20)
      const onIncrease = useCallback(() => {
        setPercentage((value) => Math.min(100, value + 10))
      }, [])
      const onDecrease = useCallback(() => {
        setPercentage((value) => Math.max(0, value - 10))
      }, [])

      return (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              aria-label="Decrease progress"
              size="sm"
              icon={<HiIcons.HiMinus />}
              onClick={onDecrease}
            />
            <Button
              aria-label="Increase progress"
              size="sm"
              icon={<HiIcons.HiPlus />}
              onClick={onIncrease}
            />
          </div>
          <Progress percent={percentage} />
          <div className="flex justify-center">
            <Progress variant="circle" percent={percentage} />
          </div>
        </div>
      )
    }
    return <Demo />
  },
}

export const ProgressStory: Story = {
  name: 'Progress',
  args: { percent: 30 },
}

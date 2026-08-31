import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from './Slider'
import type { SliderMark, SliderRangeValue } from './types'

const marks: SliderMark[] = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
]

const unevenMarks: SliderMark[] = [
  { value: 0, label: 'Low' },
  { value: 26, label: 'Ok' },
  { value: 37, label: 'Warm' },
  { value: 100, label: 'Max' },
]

const meta = {
  title: 'Forms/Slider',
  component: Slider,
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
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = { args: { defaultValue: 60, thumbAriaLabel: 'Volume' } }

export const Range: Story = {
  render: () => <Slider.Range defaultValue={[20, 50]} />,
}

export const Disabled: Story = { args: { defaultValue: 60, disabled: true } }

export const Tooltips: Story = {
  render: () => (
    <div className="space-y-6">
      <Slider showTooltipOnHover defaultValue={60} tooltip={(value) => `${value}%`} />
      <Slider alwaysShowTooltip defaultValue={60} />
      <Slider showTooltipOnHover defaultValue={60} tooltip={(value) => `Score ${value}`} />
    </div>
  ),
}

export const Marks: Story = { args: { defaultValue: 50, marks } }

export const Step: Story = {
  render: () => (
    <div className="space-y-10">
      <Slider defaultValue={25} step={25} marks={marks} tooltip={(value) => `${value}`} />
      <Slider stepOnMarks defaultValue={26} marks={unevenMarks} />
    </div>
  ),
}

export const MinAndMax: Story = { args: { min: 10, max: 40, defaultValue: 20 } }

export const CustomColor: Story = {
  render: () => (
    <Slider
      defaultValue={70}
      classNames={{ bar: 'bg-success', thumb: 'border-success text-success' }}
    />
  ),
}

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [sliderValue, setSliderValue] = useState(50)
      const [rangeValue, setRangeValue] = useState<SliderRangeValue>([20, 50])
      return (
        <div className="space-y-6">
          <div>
            <Slider value={sliderValue} onChange={setSliderValue} />
            <p className="mt-2 text-sm text-content-muted">Slider value: {sliderValue}</p>
          </div>
          <div>
            <Slider.Range value={rangeValue} onChange={setRangeValue} />
            <p className="mt-2 text-sm text-content-muted">
              Range slider value: {JSON.stringify(rangeValue)}
            </p>
          </div>
        </div>
      )
    }
    return <Demo />
  },
}

export const SliderDemo: Story = {
  name: 'Slider',
  args: { defaultValue: 40, marks, thumbAriaLabel: 'Progress' },
}

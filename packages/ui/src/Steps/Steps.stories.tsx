import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Icon, HiIcons } from '@vn-dylan/icons'
import { Button } from '../Button'
import { Spinner } from '../Spinner'
import { Steps } from './Steps'

const meta = {
  title: 'Navigation/Steps',
  component: Steps,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Steps>

export default meta
type Story = StoryObj<typeof meta>

const items = () => [
  <Steps.Item key="login" title="Login" />,
  <Steps.Item key="order" title="Order Placed" />,
  <Steps.Item key="review" title="In Review" />,
  <Steps.Item key="approved" title="Approved" />,
]

export const Basic: Story = {
  render: () => (
    <Steps current={1}>
      <Steps.Item />
      <Steps.Item />
      <Steps.Item />
    </Steps>
  ),
}

export const Title: Story = {
  render: () => <Steps current={1}>{items()}</Steps>,
}

export const Vertical: Story = {
  render: () => (
    <Steps vertical current={1}>
      {items()}
    </Steps>
  ),
}

export const Description: Story = {
  render: () => (
    <Steps vertical current={2}>
      <Steps.Item title="Login" description="Login to your account" />
      <Steps.Item title="Place Order" description="Start placing an order" />
      <Steps.Item title="In Review" description="We will review the order" />
      <Steps.Item title="Approved" description="Order approved" />
    </Steps>
  ),
}

export const CustomIcon: Story = {
  render: () => (
    <Steps current={1}>
      <Steps.Item title="Login" customIcon={<Icon as={HiIcons.HiOutlineArrowLeftOnRectangle} />} />
      <Steps.Item title="Order Placed" customIcon={<Spinner size="1em" />} />
      <Steps.Item
        title="In Review"
        customIcon={<Icon as={HiIcons.HiOutlineDocumentMagnifyingGlass} />}
      />
      <Steps.Item
        title="Approved"
        customIcon={<Icon as={HiIcons.HiOutlineClipboardDocumentCheck} />}
      />
    </Steps>
  ),
}

export const Error: Story = {
  render: () => (
    <Steps current={1} status="error">
      {items()}
    </Steps>
  ),
}

export const ControlledSteps: Story = {
  render: () => {
    const Demo = () => {
      const [step, setStep] = useState(0)
      const maxStep = 3
      return (
        <div>
          <Steps current={step}>{items()}</Steps>
          <div className="mt-6 flex h-40 items-center justify-center rounded-md bg-surface-sunken">
            <h3 className="text-base font-semibold">Step {step + 1} content</h3>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              disabled={step === 0}
              onClick={() => setStep((value) => Math.max(0, value - 1))}
            >
              Previous
            </Button>
            <Button
              disabled={step === maxStep}
              variant="solid"
              onClick={() => setStep((value) => Math.min(maxStep, value + 1))}
            >
              {step === maxStep ? 'Completed' : 'Next'}
            </Button>
          </div>
        </div>
      )
    }
    return <Demo />
  },
}

export const Step1Content: Story = {
  render: () => (
    <div>
      <Steps current={0}>{items()}</Steps>
      <div className="mt-6 flex h-40 items-center justify-center rounded-md bg-surface-sunken">
        <h3 className="text-base font-semibold">Step 1 content</h3>
      </div>
    </div>
  ),
}

export const Clickable: Story = {
  render: () => {
    const Demo = () => {
      const [step, setStep] = useState(1)
      return (
        <Steps current={step} onChange={setStep}>
          {items()}
        </Steps>
      )
    }
    return <Demo />
  },
}

export const StepsStory: Story = {
  name: 'Steps',
  args: { current: 1 },
  render: (args) => <Steps {...args}>{items()}</Steps>,
}

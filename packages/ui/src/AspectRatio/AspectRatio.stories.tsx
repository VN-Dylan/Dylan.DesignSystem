import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../Grid'
import { AspectRatio } from './AspectRatio'

const meta = {
  title: 'Primitives/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  args: { ratio: 16 / 9 },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

const contentClass = 'grid place-items-center bg-surface-sunken text-content'

export const Playground: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <div className={contentClass}>Responsive media</div>
    </AspectRatio>
  ),
}

export const Ratios: Story = {
  render: () => (
    <Grid columns={{ base: 1, md: 3 }}>
      {[1, 4 / 3, 16 / 9].map((ratio) => (
        <AspectRatio key={ratio} ratio={ratio}>
          <div className={contentClass}>{ratio.toFixed(2)}</div>
        </AspectRatio>
      ))}
    </Grid>
  ),
}

export const RightToLeft: Story = {
  render: () => (
    <AspectRatio dir="rtl" ratio={4 / 3}>
      <div className={contentClass}>وسائط متجاوبة</div>
    </AspectRatio>
  ),
}

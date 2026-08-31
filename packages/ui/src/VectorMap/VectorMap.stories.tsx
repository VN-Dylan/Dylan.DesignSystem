import type { Meta, StoryObj } from '@storybook/react'
import { VectorMap } from './VectorMap'

const meta = {
  title: 'Data Display/VectorMap',
  component: VectorMap,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof VectorMap>

export default meta
type Story = StoryObj<typeof meta>

export const Choropleth: Story = {
  args: {
    data: { US: 4200, GB: 3100, DE: 2600, FR: 1900, JP: 2400, BR: 900, IN: 1500, AU: 700 },
    height: 380,
  },
}

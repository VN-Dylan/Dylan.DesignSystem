import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { Grid } from './Grid'
import './Grid.stories.scss'

const meta = {
  title: 'Common/Grid',
  component: Grid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['tight', 'base', 'loose', 'group', 0, 1, 2, 3, 4, 6, 8, 12, 16, 24],
    },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const DemoBox = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={className ? `dyl-grid-demo__item ${className}` : 'dyl-grid-demo__item'}>
    {children}
  </div>
)

const boxes = Array.from({ length: 9 }, (_, index) => String(index + 1).padStart(2, '0'))

export const GridTemplateColumns: Story = {
  render: () => (
    <Grid className="grid-cols-4">
      {boxes.map((box) => (
        <DemoBox key={box}>{box}</DemoBox>
      ))}
    </Grid>
  ),
}

export const GridColumnStartEnd: Story = {
  render: () => (
    <Grid className="grid-cols-3">
      <DemoBox className="dyl-grid-demo__item--muted">01</DemoBox>
      <DemoBox className="dyl-grid-demo__item--muted">02</DemoBox>
      <DemoBox className="dyl-grid-demo__item--muted">03</DemoBox>
      <DemoBox className="col-span-2">04</DemoBox>
      <DemoBox className="dyl-grid-demo__item--muted">05</DemoBox>
      <DemoBox className="dyl-grid-demo__item--muted">06</DemoBox>
      <DemoBox className="col-span-2">07</DemoBox>
    </Grid>
  ),
}

export const GridColumnStartEndLine: Story = {
  render: () => (
    <Grid className="grid-cols-6">
      <DemoBox className="col-start-2 col-span-4">01</DemoBox>
      <DemoBox className="col-start-1 col-end-3">02</DemoBox>
      <DemoBox className="col-end-7 col-span-2">03</DemoBox>
      <DemoBox className="col-start-1 col-end-7">04</DemoBox>
    </Grid>
  ),
}

export const GridTemplateRows: Story = {
  render: () => (
    <Grid className="grid-flow-col grid-rows-4">
      {boxes.map((box) => (
        <DemoBox key={box} className="dyl-grid-demo__item--success">
          {box}
        </DemoBox>
      ))}
    </Grid>
  ),
}

export const GridRowStartEndLine: Story = {
  render: () => (
    <Grid className="grid-flow-col grid-rows-3">
      <DemoBox className="row-start-2 row-span-2 dyl-grid-demo__item--info">01</DemoBox>
      <DemoBox className="row-end-3 row-span-2 dyl-grid-demo__item--info">02</DemoBox>
      <DemoBox className="row-start-1 row-end-4 dyl-grid-demo__item--info">03</DemoBox>
    </Grid>
  ),
}

export const GridRowStartEnd: Story = {
  render: () => (
    <Grid className="grid-flow-col grid-rows-3">
      <DemoBox className="row-span-3">01</DemoBox>
      <DemoBox className="col-span-2 dyl-grid-demo__item--muted">02</DemoBox>
      <DemoBox className="row-span-2 col-span-2">03</DemoBox>
    </Grid>
  ),
}

export const GridAutoFlow: Story = {
  render: () => (
    <Grid className="grid-flow-row-dense grid-cols-3 grid-rows-3">
      <DemoBox className="col-span-2 dyl-grid-demo__item--muted">01</DemoBox>
      <DemoBox className="col-span-2 dyl-grid-demo__item--muted">02</DemoBox>
      <DemoBox>03</DemoBox>
      <DemoBox className="dyl-grid-demo__item--muted">04</DemoBox>
      <DemoBox className="dyl-grid-demo__item--muted">05</DemoBox>
    </Grid>
  ),
}

export const GridAutoColumns: Story = {
  render: () => (
    <Grid className="grid-flow-col auto-cols-max">
      <DemoBox>01</DemoBox>
      <DemoBox>02</DemoBox>
      <DemoBox>03</DemoBox>
    </Grid>
  ),
}

export const GridAutoRows: Story = {
  render: () => (
    <Grid className="grid-flow-row auto-rows-max grid-cols-3">
      <DemoBox>01</DemoBox>
      <DemoBox className="py-8">02</DemoBox>
      <DemoBox>03</DemoBox>
    </Grid>
  ),
}

export const HoverFocusAndOtherStates: Story = {
  render: () => (
    <Grid className="grid-cols-6 hover:grid-cols-1">
      <DemoBox>01</DemoBox>
      <DemoBox>02</DemoBox>
      <DemoBox>03</DemoBox>
    </Grid>
  ),
}

export const BreakpointsAndMediaQueries: Story = {
  render: () => (
    <Grid className="grid-cols-1 md:grid-cols-6">
      {boxes.map((box) => (
        <DemoBox key={box} className="dyl-grid-demo__item--info">
          {box}
        </DemoBox>
      ))}
    </Grid>
  ),
}

export const ResponsiveColumnsAndSpans: Story = {
  render: () => (
    <Grid columns={{ base: 1, sm: 2, lg: 4 }} gap="loose">
      <Grid.Item span={{ base: 1, sm: 2 }} className="dyl-grid-demo__item">
        Responsive span
      </Grid.Item>
      <Grid.Item className="dyl-grid-demo__item dyl-grid-demo__item--muted">02</Grid.Item>
      <Grid.Item className="dyl-grid-demo__item dyl-grid-demo__item--info">03</Grid.Item>
    </Grid>
  ),
}

export const AutoFit: Story = {
  render: () => (
    <Grid minChildWidth="12rem" gap="tight">
      {boxes.slice(0, 5).map((box) => (
        <DemoBox key={box}>{box}</DemoBox>
      ))}
    </Grid>
  ),
}

export const RightToLeft: Story = {
  render: () => (
    <Grid dir="rtl" columns={{ base: 1, md: 3 }}>
      {boxes.slice(0, 3).map((box) => (
        <DemoBox key={box}>العنصر {box}</DemoBox>
      ))}
    </Grid>
  ),
}

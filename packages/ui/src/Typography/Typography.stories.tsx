import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'

const meta = {
  title: 'Common/Typography',
  component: Typography,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

const sample = 'The quick brown fox jumps over the lazy dog.'

export const Heading: Story = {
  render: () => (
    <Typography className="flex flex-col gap-4">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </Typography>
  ),
}

export const Heading4: Story = {
  render: () => (
    <Typography>
      <h4>Heading 4</h4>
    </Typography>
  ),
}

export const Heading5: Story = {
  render: () => (
    <Typography>
      <h5>Heading 5</h5>
    </Typography>
  ),
}

export const Heading6: Story = {
  render: () => (
    <Typography>
      <h6>Heading 6</h6>
    </Typography>
  ),
}

export const Text: Story = {
  render: () => (
    <Typography className="flex flex-col gap-6">
      <p>{sample}</p>
      <p className="italic">{sample}</p>
      <p className="underline">{sample}</p>
      <p className="overline">{sample}</p>
      <p className="line-through">{sample}</p>
    </Typography>
  ),
}

export const FontWeight: Story = {
  render: () => (
    <Typography className="flex flex-col gap-6">
      <p className="font-light">{sample}</p>
      <p className="font-normal">{sample}</p>
      <p className="font-medium">{sample}</p>
      <p className="font-semibold">{sample}</p>
      <p className="font-bold">{sample}</p>
    </Typography>
  ),
}

export const List: Story = {
  render: () => (
    <Typography className="space-y-6">
      <ul>
        <li>Now this is a story all about how my life got flipped</li>
        <li>And I like to take a minute and sit right here</li>
        <li>I will tell you how the workflow became organized</li>
      </ul>
      <ol>
        <li>Open the dashboard</li>
        <li>Review active tasks</li>
        <li>Close the loop</li>
      </ol>
      <ul className="list-none">
        <li>Plain list item</li>
        <li>Another plain list item</li>
      </ul>
    </Typography>
  ),
}

export const TextOverflow: Story = {
  render: () => (
    <Typography className="max-w-sm space-y-6 rounded-md border border-border p-6">
      <p className="truncate">
        The longest word in this sentence is pneumonoultramicroscopicsilicovolcanoconiosis.
      </p>
      <p className="overflow-hidden text-ellipsis">
        The longest word in this sentence is pneumonoultramicroscopicsilicovolcanoconiosis.
      </p>
      <p className="overflow-hidden text-clip">
        The longest word in this sentence is pneumonoultramicroscopicsilicovolcanoconiosis.
      </p>
    </Typography>
  ),
}

export const Prose: Story = {
  render: () => (
    <Typography asElement="article" prose>
      <h1>Garlic bread with cheese: What the science tells us</h1>
      <p>
        For years parents have talked about the comfort of warm garlic bread with cheese, and the
        appetizer has earned a familiar place on family tables.
      </p>
      <p>
        New research keeps reminding teams that favorite traditions still deserve careful
        observation, measurement, and review.
      </p>
    </Typography>
  ),
}

export const WeHaventUsedAnH4Yet: Story = {
  render: () => (
    <Typography>
      <h4>We have not used an h4 yet</h4>
    </Typography>
  ),
}

export const LetsMakeSureWeDontScrewThatUpWithH4ElementsEither: Story = {
  render: () => (
    <Typography>
      <section aria-labelledby="typography-h4-check">
        <h4 id="typography-h4-check">Let us make sure h4 elements work here, either.</h4>
      </section>
    </Typography>
  ),
}

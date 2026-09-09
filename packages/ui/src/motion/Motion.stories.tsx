import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '../Card'
import { Button } from '../Button'
import { Parallax } from './Parallax'
import { PageTransition } from './PageTransition'
import { Reveal } from './Reveal'
import { Stagger } from './Stagger'

const meta = {
  title: 'Primitives/Motion',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj

export const Overview: Story = {
  render: () => (
    <div className="space-y-8">
      <Reveal>
        <Card header={{ content: 'Reveal' }}>
          <p className="text-sm text-content-muted">
            Content fades and lifts once it enters the viewport.
          </p>
        </Card>
      </Reveal>

      <Stagger className="grid gap-4 sm:grid-cols-3">
        {['Plan', 'Compare', 'Book'].map((item) => (
          <Stagger.Item key={item}>
            <Card bordered>
              <div className="font-semibold text-content">{item}</div>
            </Card>
          </Stagger.Item>
        ))}
      </Stagger>

      <Parallax>
        <Card bordered className="bg-surface-raised">
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium text-content">Parallax surface</span>
            <Button size="sm" variant="solid">
              Action
            </Button>
          </div>
        </Card>
      </Parallax>

      <PageTransition transitionKey="storybook">
        <Card bordered>
          <span className="text-sm text-content-muted">Page transition wrapper</span>
        </Card>
      </PageTransition>
    </div>
  ),
}

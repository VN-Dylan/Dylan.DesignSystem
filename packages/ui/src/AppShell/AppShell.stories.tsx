import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '../Card'
import { Grid } from '../Grid'
import { PageHeader } from '../PageHeader'
import { Section } from '../Section'
import { Stack } from '../Stack'
import { AppShell } from './AppShell'
import { useAppShell } from './context'

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

const links = ['Dashboard', 'Projects', 'Reports', 'Settings']

const Nav = () => {
  const { collapsed } = useAppShell()
  return (
    <Stack gap="tight" className="p-4">
      {links.map((link) => (
        <a key={link} href="#nav" className="rounded-md px-3 py-2 text-sm text-content">
          {collapsed ? link.slice(0, 1) : link}
        </a>
      ))}
    </Stack>
  )
}

const CollapseButton = () => {
  const { collapsed, toggleCollapsed, isMobile } = useAppShell()
  if (isMobile) return null
  return (
    <button type="button" className="text-sm text-content-muted" onClick={toggleCollapsed}>
      {collapsed ? 'Expand' : 'Collapse'}
    </button>
  )
}

const Page = ({ collapsed }: { collapsed?: boolean }) => (
  <AppShell defaultSidebarCollapsed={collapsed}>
    <AppShell.Sidebar>
      <Nav />
    </AppShell.Sidebar>
    <AppShell.Content>
      <AppShell.Header>
        <AppShell.MobileNavTrigger />
        <CollapseButton />
      </AppShell.Header>
      <AppShell.Main containerSize="default">
        <Stack gap="group">
          <PageHeader title="Overview" description="Everything at a glance." />
          <Section spacing="none" contained={false}>
            <Grid columns={{ base: 1, md: 3 }} gap="loose">
              {['One', 'Two', 'Three'].map((title) => (
                <Card key={title} bordered>
                  {title}
                </Card>
              ))}
            </Grid>
          </Section>
        </Stack>
      </AppShell.Main>
      <AppShell.Footer>© Dylan</AppShell.Footer>
    </AppShell.Content>
  </AppShell>
)

export const Desktop: Story = { render: () => <Page /> }

export const Collapsed: Story = { render: () => <Page collapsed /> }

export const Mobile: Story = {
  render: () => <Page />,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
}

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Page />
    </div>
  ),
}

export const AppShellStory: Story = {
  name: 'AppShell',
  render: () => <Page />,
}

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ActionGroup } from '../ActionGroup'
import { Button } from '../Button'
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
      <AppShell.Main>
        <Stack gap="group">
          <PageHeader
            title="Overview"
            description="Everything at a glance."
            actions={
              <ActionGroup stackOnMobile={false} aria-label="Page actions">
                <Button>Export</Button>
                <Button variant="solid">New project</Button>
              </ActionGroup>
            }
          />
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

/** `transitionKey` (e.g. the route pathname) replays the page entrance on every change. */
export const PageTransition: Story = {
  parameters: { snapshot: { skip: true } },
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(links[0]!)
      return (
        <AppShell>
          <AppShell.Sidebar>
            <Stack gap="tight" className="p-4">
              {links.map((link) => (
                <button
                  key={link}
                  type="button"
                  aria-current={link === page ? 'page' : undefined}
                  className="rounded-md px-3 py-2 text-start text-sm text-content aria-[current=page]:bg-primary-subtle aria-[current=page]:text-primary"
                  onClick={() => setPage(link)}
                >
                  {link}
                </button>
              ))}
            </Stack>
          </AppShell.Sidebar>
          <AppShell.Content>
            <AppShell.Header>
              <AppShell.MobileNavTrigger />
            </AppShell.Header>
            <AppShell.Main transitionKey={page}>
              <Stack gap="group">
                <PageHeader title={page} description="Pick another page in the sidebar." />
                <Grid columns={{ base: 1, md: 3 }} gap="loose">
                  {['One', 'Two', 'Three'].map((title) => (
                    <Card key={title} bordered>
                      {page} · {title}
                    </Card>
                  ))}
                </Grid>
              </Stack>
            </AppShell.Main>
          </AppShell.Content>
        </AppShell>
      )
    }
    return <Demo />
  },
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

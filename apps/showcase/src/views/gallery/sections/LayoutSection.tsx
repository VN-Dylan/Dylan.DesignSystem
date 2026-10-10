import type { ReactNode } from 'react'
import {
  ActionGroup,
  AppShell,
  AspectRatio,
  Button,
  Center,
  Inline,
  PageHeader,
  Section,
  Spacer,
  Stack,
  useAppShell,
} from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { Demo } from '@/views/gallery/components/Demo'
import { SectionShell } from '@/views/gallery/sections/SectionShell'

const Box = ({ children }: { children: ReactNode }) => (
  <div className="rounded-md border border-border bg-surface px-4 py-3 text-sm text-content">
    {children}
  </div>
)

const navItems = ['Overview', 'Projects', 'Reports', 'Settings']

function MiniNav() {
  const { collapsed } = useAppShell()
  return (
    <Stack gap="tight" className="p-4">
      {navItems.map((item) => (
        <span key={item} className="rounded-md px-3 py-2 text-sm text-content">
          {collapsed ? item.slice(0, 1) : item}
        </span>
      ))}
    </Stack>
  )
}

function CollapseToggle() {
  const { collapsed, toggleCollapsed, isMobile } = useAppShell()
  if (isMobile) return null
  return (
    <Button size="sm" variant="plain" onClick={toggleCollapsed}>
      {collapsed ? 'Expand' : 'Collapse'}
    </Button>
  )
}

/** Layout primitives: rhythm (Stack / Inline), page structure and the app frame. */
export function LayoutSection() {
  return (
    <SectionShell slug="layout">
      <Demo
        title="Stack & Inline"
        description="The parent owns the gap: tight 8 · base 16 · loose 24 · group 32."
        code={`<Stack gap="base">…</Stack>
<Inline gap="tight" wrap>…</Inline>`}
      >
        <Demo.Grid>
          <Stack gap="base">
            <Box>Stack · base</Box>
            <Box>16px between components</Box>
            <Box>No margins on children</Box>
          </Stack>
          <Stack gap="loose">
            <Inline gap="tight" wrap>
              <Box>Inline</Box>
              <Box>tight</Box>
              <Box>wraps</Box>
            </Inline>
            <Inline gap="base" justify="between">
              <Box>Start</Box>
              <Spacer />
              <Box>End (Spacer)</Box>
            </Inline>
          </Stack>
        </Demo.Grid>
      </Demo>

      <Demo
        title="PageHeader + ActionGroup"
        description="Title, description, breadcrumb and actions — primary last, at the end."
        code={`<PageHeader
  title="Projects"
  description="All active delivery work."
  actions={
    <ActionGroup stackOnMobile={false}>
      <Button>Export</Button>
      <Button variant="solid">New project</Button>
    </ActionGroup>
  }
/>`}
      >
        <div className="w-full">
          <PageHeader
            title="Projects"
            description="All active delivery work."
            breadcrumb={<span className="text-xs text-content-muted">Workspace / Projects</span>}
            actions={
              <ActionGroup stackOnMobile={false} aria-label="Page actions">
                <Button icon={<Icon as={TbIcons.TbDownload} size={16} />}>Export</Button>
                <Button variant="solid" icon={<Icon as={TbIcons.TbPlus} size={16} />}>
                  New project
                </Button>
              </ActionGroup>
            }
          />
        </div>
      </Demo>

      <Demo
        title="ActionGroup + Button tone"
        description="Delete isolated at the start; Cancel then Save at the end. Colour means intent: primary, danger, success."
        code={`<ActionGroup divided>
  <ActionGroup.Start>
    <Button tone="danger" variant="plain">Delete</Button>
  </ActionGroup.Start>
  <Button>Cancel</Button>
  <Button variant="solid">Save changes</Button>
</ActionGroup>`}
      >
        <Stack gap="loose" className="w-full">
          <div className="rounded-lg border border-border bg-surface p-card">
            <ActionGroup divided aria-label="Form actions">
              <ActionGroup.Start>
                <Button tone="danger" variant="plain">
                  Delete project
                </Button>
              </ActionGroup.Start>
              <Button>Cancel</Button>
              <Button variant="solid">Save changes</Button>
            </ActionGroup>
          </div>
          <Inline gap="tight" wrap>
            <Button variant="solid">Save</Button>
            <Button variant="solid" tone="danger">
              Delete
            </Button>
            <Button variant="solid" tone="success">
              Approve
            </Button>
            <Button tone="danger">Remove</Button>
            <Button tone="success" variant="subtle">
              Publish
            </Button>
          </Inline>
        </Stack>
      </Demo>

      <Demo
        title="Section"
        description="Page bands own vertical rhythm (48 → 96px); alternate tones instead of dividers."
        code={`<Section tone="subtle" containerSize="narrow">…</Section>`}
      >
        <div className="w-full overflow-hidden rounded-lg border border-border bg-surface">
          <Section spacing="base" containerSize="narrow">
            <p className="text-center text-sm text-content-muted">Section · default tone</p>
          </Section>
          <Section spacing="base" tone="subtle" containerSize="narrow">
            <p className="text-center text-sm text-content-muted">Section · subtle tone</p>
          </Section>
        </div>
      </Demo>

      <Demo
        title="Center & AspectRatio"
        code={`<AspectRatio ratio={16 / 9}>
  <Center>…</Center>
</AspectRatio>`}
      >
        <Inline gap="base" align="start" wrap>
          <AspectRatio ratio={16 / 9} className="w-64 rounded-lg border border-border bg-surface">
            <Center className="h-full text-sm text-content-muted">16 : 9</Center>
          </AspectRatio>
          <AspectRatio ratio={1} className="w-36 rounded-lg border border-border bg-surface">
            <Center className="h-full text-sm text-content-muted">1 : 1</Center>
          </AspectRatio>
        </Inline>
      </Demo>

      <Demo
        title="AppShell"
        description="Sidebar (drawer below lg), sticky header, fluid main, footer. The whole showcase runs on it."
        code={`<AppShell>
  <AppShell.Sidebar><Nav /></AppShell.Sidebar>
  <AppShell.Content>
    <AppShell.Header><AppShell.MobileNavTrigger /></AppShell.Header>
    <AppShell.Main>…</AppShell.Main>
    <AppShell.Footer>…</AppShell.Footer>
  </AppShell.Content>
</AppShell>`}
      >
        <div className="h-96 w-full overflow-auto rounded-lg border border-border [&_.dyl-app-shell]:min-h-full [&_.dyl-app-shell__sidebar]:h-auto">
          <AppShell>
            <AppShell.Sidebar aria-label="Demo navigation">
              <MiniNav />
            </AppShell.Sidebar>
            <AppShell.Content>
              <AppShell.Header>
                <AppShell.MobileNavTrigger />
                <CollapseToggle />
              </AppShell.Header>
              <AppShell.Main>
                <PageHeader
                  as="h3"
                  title="Overview"
                  description="Fluid main with a uniform gutter."
                />
              </AppShell.Main>
              <AppShell.Footer>© Dylan</AppShell.Footer>
            </AppShell.Content>
          </AppShell>
        </div>
      </Demo>
    </SectionShell>
  )
}

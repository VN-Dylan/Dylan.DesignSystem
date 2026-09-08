import {
  ActionLink,
  AuthorityCheck,
  Avatar,
  Button,
  Container,
  Divider,
  EmptyState,
  Grid,
  IconFrame,
  InfoBar,
  Scroll,
  Segment,
  Typography,
  UsersAvatarGroup,
} from '@vn-dylan/ui'
import { HiIcons, Icon, TbIcons } from '@vn-dylan/icons'
import { SectionShell } from '@/views/gallery/sections/SectionShell'
import { Demo } from '@/views/gallery/components/Demo'
import { galleryUsers } from '@/mock/gallery'

/**
 * Common category — actions, layout scaffolding and display primitives. This
 * file is the reference every other gallery section mirrors: one `<Demo>` per
 * component (a few for the richer ones), adapted from the component's own
 * Storybook stories, with a hand-written `code` snippet.
 */
export function CommonSection() {
  return (
    <SectionShell slug="common">
      <Demo
        title="Button — variants"
        description="Five visual weights, from ghost to solid."
        code={`<Button>Default</Button>
<Button variant="solid">Solid</Button>
<Button variant="subtle">Subtle</Button>
<Button variant="plain">Plain</Button>
<Button variant="link">Link</Button>`}
      >
        <Demo.Row>
          <Button>Default</Button>
          <Button variant="solid">Solid</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="plain">Plain</Button>
          <Button variant="link">Link</Button>
        </Demo.Row>
      </Demo>

      <Demo
        title="Button — sizes, icons & state"
        code={`<Button size="xs">xs</Button>
<Button icon={<Icon as={TbIcons.TbPencil} />}>Edit</Button>
<Button icon={<Icon as={TbIcons.TbArrowRight} />} iconAlignment="end">Next</Button>
<Button loading>Saving</Button>
<Button disabled>Disabled</Button>`}
      >
        <Demo.Row>
          {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </Demo.Row>
        <Demo.Row>
          <Button icon={<Icon as={TbIcons.TbPencil} size={16} />}>Edit</Button>
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbArrowRight} size={16} />}
            iconAlignment="end"
          >
            Next
          </Button>
          <Button icon={<Icon as={TbIcons.TbPhone} size={16} />} shape="circle" aria-label="Call" />
          <Button loading>Saving</Button>
          <Button disabled>Disabled</Button>
        </Demo.Row>
      </Demo>

      <Demo
        title="Segment"
        description="Single or multiple selection, four sizes."
        code={`<Segment defaultValue="center" aria-label="Alignment">
  <Segment.Item value="left">Left</Segment.Item>
  <Segment.Item value="center">Center</Segment.Item>
  <Segment.Item value="right">Right</Segment.Item>
</Segment>`}
      >
        <div className="space-y-3">
          <Segment defaultValue="center" aria-label="Alignment">
            <Segment.Item value="left">Left</Segment.Item>
            <Segment.Item value="center">Center</Segment.Item>
            <Segment.Item value="right">Right</Segment.Item>
          </Segment>
          <Segment
            size="sm"
            selectionType="multiple"
            defaultValue={['bold']}
            aria-label="Text style"
          >
            <Segment.Item value="bold">Bold</Segment.Item>
            <Segment.Item value="italic">Italic</Segment.Item>
            <Segment.Item value="underline">Underline</Segment.Item>
          </Segment>
        </div>
      </Demo>

      <Demo
        title="Typography"
        description="Prose scope — headings and body text pick up the token scale."
        code={`<Typography>
  <h3>Heading 3</h3>
  <p>Body copy with a <a href="#">link</a> and <strong>emphasis</strong>.</p>
</Typography>`}
      >
        <Typography className="space-y-2">
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <p>
            Body copy with a <a href="#link">link</a> and <strong>emphasis</strong>. The quick brown
            fox jumps over the lazy dog.
          </p>
        </Typography>
      </Demo>

      <Demo
        title="Divider"
        code={`<Divider />
<Divider orientation="vertical" />`}
      >
        <Demo.Stack>
          <p className="text-sm text-content-muted">Above</p>
          <Divider />
          <p className="text-sm text-content-muted">Below</p>
        </Demo.Stack>
        <div className="flex h-8 items-center">
          <span className="text-sm text-content-muted">Left</span>
          <Divider orientation="vertical" />
          <span className="text-sm text-content-muted">Right</span>
        </div>
      </Demo>

      <Demo
        title="Grid"
        description="Thin wrapper over CSS grid — column classes are Tailwind."
        code={`<Grid className="grid-cols-4 gap-3">
  {items.map((n) => <div key={n}>{n}</div>)}
</Grid>`}
      >
        <Grid className="w-full grid-cols-2 gap-3 sm:grid-cols-4">
          {['01', '02', '03', '04', '05', '06', '07', '08'].map((n) => (
            <div
              key={n}
              className="rounded-md border border-border bg-surface px-3 py-4 text-center text-sm text-content-muted"
            >
              {n}
            </div>
          ))}
        </Grid>
      </Demo>

      <Demo
        title="Container"
        description="Centres and width-caps page content."
        code={`<Container asElement="section">…</Container>`}
      >
        <Container asElement="div" className="w-full">
          <div className="rounded-md border border-border bg-surface p-4 text-sm text-content-muted">
            Width-capped, horizontally centred content.
          </div>
        </Container>
      </Demo>

      <Demo
        title="Scroll"
        description="Styled scroll container with optional edge shadows."
        code={`<Scroll className="h-40" edgeShadow>…</Scroll>`}
      >
        <Demo.Stack>
          <Scroll
            className="h-40 rounded-md border border-border"
            edgeShadow
            viewportProps={{ 'aria-label': 'Release notes', tabIndex: 0 }}
          >
            <div className="space-y-3 p-4 text-sm text-content-muted">
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i}>
                  Line {i + 1} — the quick brown fox jumps over the lazy dog and keeps on going.
                </p>
              ))}
            </div>
          </Scroll>
        </Demo.Stack>
      </Demo>

      <Demo
        title="Affix"
        description="Sticks its child to the top of the viewport once scrolled past."
        code={`<Affix offset={80}>
  <Button variant="solid">Sticks to the top</Button>
</Affix>`}
      >
        <p className="text-sm text-content-muted">
          Best seen in a scrolling page — see the <code>Affix</code> Storybook page for the live
          behaviour.
        </p>
      </Demo>

      <Demo
        title="ActionLink"
        description="Router-aware link that can also render a plain hyperlink."
        code={`<ActionLink to="/gallery/forms">Go to Forms</ActionLink>
<ActionLink to="https://github.com" target="_blank">External</ActionLink>`}
      >
        <Demo.Row>
          <ActionLink to="/gallery/forms">Go to Forms</ActionLink>
          <ActionLink to="/gallery/data-viz" themeColor={false}>
            Neutral colour
          </ActionLink>
        </Demo.Row>
      </Demo>

      <Demo
        title="IconFrame"
        description="Three depths — default, thick, layered."
        code={`<IconFrame variant="layered">
  <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-xl" />
</IconFrame>`}
      >
        <Demo.Row>
          {(['default', 'thick', 'layered'] as const).map((variant) => (
            <IconFrame key={variant} variant={variant}>
              <Icon as={HiIcons.HiOutlineCurrencyDollar} className="text-xl" />
            </IconFrame>
          ))}
        </Demo.Row>
      </Demo>

      <Demo
        title="InfoBar"
        description="Compact three-step level indicator."
        code={`<InfoBar level="low" />
<InfoBar level="medium" />
<InfoBar level="high" />`}
      >
        <Demo.Row>
          <span className="flex items-center gap-2 text-sm text-content-muted">
            Low <InfoBar level="low" />
          </span>
          <span className="flex items-center gap-2 text-sm text-content-muted">
            Medium <InfoBar level="medium" />
          </span>
          <span className="flex items-center gap-2 text-sm text-content-muted">
            High <InfoBar level="high" />
          </span>
        </Demo.Row>
      </Demo>

      <Demo
        title="EmptyState"
        description="Illustration slot plus a message, three background patterns."
        code={`<EmptyState
  size={200}
  illustration={<IconFrame><Icon as={HiIcons.HiOutlineFolderOpen} className="text-xl" /></IconFrame>}
>
  <p>No data available</p>
</EmptyState>`}
      >
        <EmptyState
          size={200}
          illustration={
            <IconFrame variant="layered">
              <Icon as={HiIcons.HiOutlineFolderOpen} className="text-xl" />
            </IconFrame>
          }
        >
          <div className="text-center">
            <h5 className="font-semibold text-content">No data available</h5>
            <p className="text-sm text-content-muted">Import a file to get started.</p>
          </div>
        </EmptyState>
      </Demo>

      <Demo
        title="Avatar"
        description="Initials, icon or image; three shapes and sizes."
        code={`<Avatar>DF</Avatar>
<Avatar icon={<Icon as={TbIcons.TbUser} />} />
<Avatar shape="circle" size="lg">JS</Avatar>`}
      >
        <Demo.Row>
          <Avatar>DF</Avatar>
          <Avatar icon={<Icon as={TbIcons.TbUser} />} />
          <Avatar shape="square" icon={<Icon as={TbIcons.TbUser} />} />
          <Avatar shape="circle" size="lg">
            JS
          </Avatar>
        </Demo.Row>
      </Demo>

      <Demo
        title="UsersAvatarGroup"
        description="Overlapping avatars with an overflow tooltip."
        code={`<UsersAvatarGroup
  nameKey="name"
  imgKey="avatar"
  users={users}
  avatarProps={{ size: 'sm', shape: 'circle' }}
/>`}
      >
        <UsersAvatarGroup
          nameKey="name"
          imgKey="avatar"
          users={galleryUsers}
          avatarProps={{ size: 'sm', shape: 'circle' }}
        />
      </Demo>

      <Demo
        title="AuthorityCheck"
        description="Renders children only when the user holds a required role."
        code={`<AuthorityCheck authority={['admin']} userAuthority={currentRoles}>
  <DangerButton />
</AuthorityCheck>`}
      >
        <div className="space-y-2 text-sm">
          <AuthorityCheck authority={['admin']} userAuthority={['admin']}>
            <div className="rounded-md bg-success-subtle px-3 py-2 text-content">
              Admin — panel visible
            </div>
          </AuthorityCheck>
          <AuthorityCheck authority={['admin']} userAuthority={['member']}>
            <div className="rounded-md border border-border px-3 py-2">Hidden for members</div>
          </AuthorityCheck>
          <p className="text-content-faint">(the second block renders nothing)</p>
        </div>
      </Demo>
    </SectionShell>
  )
}

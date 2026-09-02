import { useState, type ReactNode } from 'react'
import { Avatar, Button, Card, Input, Segment, Switcher } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import { notificationPrefs, profile } from '@/mock/account'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-content">{label}</span>
      {children}
    </label>
  )
}

/**
 * Account settings — the reference screen for the accounts area: profile form,
 * notification preferences and a security section, all controlled + mock.
 */
export function AccountSettingsView() {
  const [name, setName] = useState(profile.name)
  const [title, setTitle] = useState(profile.title)
  const [email, setEmail] = useState(profile.email)
  const [bio, setBio] = useState(profile.bio)
  const [visibility, setVisibility] = useState('team')
  const [prefs, setPrefs] = useState(notificationPrefs)

  const togglePref = (id: string, channel: 'email' | 'push') =>
    setPrefs((rows) => rows.map((r) => (r.id === id ? { ...r, [channel]: !r[channel] } : r)))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Account settings"
        description="Manage your profile, notifications and security."
        actions={
          <Button variant="solid" icon={<Icon as={TbIcons.TbDeviceFloppy} size={16} />}>
            Save changes
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          <Card bordered header={{ content: 'Profile', bordered: true }}>
            <div className="mb-4 flex items-center gap-4">
              <Avatar size="lg" shape="circle" src={profile.avatar} alt={profile.name} />
              <div>
                <Button size="sm">Change photo</Button>
                <p className="mt-1 text-xs text-content-faint">PNG or JPG, up to 2&nbsp;MB.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field label="Job title">
                <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Field>
              <Field label="Email">
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field label="Location">
                <Input name="location" defaultValue={profile.location} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Bio">
                  <Input
                    name="bio"
                    textArea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Field>
              </div>
            </div>
          </Card>

          <Card bordered header={{ content: 'Notifications', bordered: true }} bodyClass="p-0">
            <div className="divide-y divide-border">
              {prefs.map((p) => (
                <div key={p.id} className="flex items-start justify-between gap-4 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-content">{p.label}</p>
                    <p className="text-xs text-content-muted">{p.description}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 text-xs text-content-muted">
                    <label className="flex items-center gap-1.5">
                      <Switcher checked={p.email} onChange={() => togglePref(p.id, 'email')} />
                      Email
                    </label>
                    <label className="flex items-center gap-1.5">
                      <Switcher checked={p.push} onChange={() => togglePref(p.id, 'push')} />
                      Push
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card
            bordered
            header={{ content: 'Visibility', bordered: true }}
            bodyClass="space-y-3 p-4"
          >
            <Segment
              value={visibility}
              onChange={(v) => setVisibility(String(v))}
              className="w-full"
            >
              <Segment.Item value="private">Private</Segment.Item>
              <Segment.Item value="team">Team</Segment.Item>
              <Segment.Item value="public">Public</Segment.Item>
            </Segment>
            <p className="text-sm text-content-muted">
              Controls who can see your profile in the workspace directory.
            </p>
          </Card>

          <Card bordered header={{ content: 'Security', bordered: true }} bodyClass="space-y-3 p-4">
            <Button block>Change password</Button>
            <Button block>Manage two-factor auth</Button>
            <Button block variant="plain">
              View active sessions
            </Button>
          </Card>

          <Card
            bordered
            header={{ content: 'Danger zone', bordered: true }}
            bodyClass="space-y-2 p-4"
            className="border-error/40"
          >
            <p className="text-sm text-content-muted">
              Deleting your account is permanent and cannot be undone.
            </p>
            <Button block className="bg-error text-primary-fg">
              Delete account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

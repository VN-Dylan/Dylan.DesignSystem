import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, ConfirmDialog, Input, Segment, Switcher } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import { projects } from '@/mock/projects'

type Visibility = 'private' | 'team' | 'public'
type ConfirmAction = 'archive' | 'delete' | null

interface SettingsForm {
  name: string
  client: string
  description: string
  visibility: Visibility
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-content">{label}</span>
      {children}
    </label>
  )
}

/** Controlled project settings mock form with notification toggles. */
export function ProjectSettingsView() {
  const navigate = useNavigate()
  const defaultProject = projects[0]
  const [form, setForm] = useState<SettingsForm>({
    name: defaultProject?.name ?? '',
    client: defaultProject?.client ?? '',
    description: defaultProject?.description ?? '',
    visibility: 'team',
  })
  const [notifications, setNotifications] = useState({
    taskAssigned: true,
    statusChanged: true,
    weeklyDigest: false,
  })
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null)

  const update = (patch: Partial<SettingsForm>) => setForm((current) => ({ ...current, ...patch }))

  const updateNotification = (key: keyof typeof notifications, checked: boolean) =>
    setNotifications((current) => ({ ...current, [key]: checked }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project settings"
        description="Manage defaults for the active project workspace."
      />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card bordered header={{ content: 'General', bordered: true }}>
            <div className="space-y-4">
              <Field label="Project name">
                <Input
                  value={form.name}
                  onChange={(event) => update({ name: event.target.value })}
                />
              </Field>
              <Field label="Client">
                <Input
                  value={form.client}
                  onChange={(event) => update({ client: event.target.value })}
                />
              </Field>
              <Field label="Description">
                <Input
                  textArea
                  rows={5}
                  value={form.description}
                  onChange={(event) => update({ description: event.target.value })}
                />
              </Field>
              <div className="space-y-1.5">
                <span className="text-sm font-medium text-content">Visibility</span>
                <Segment
                  value={form.visibility}
                  onChange={(value) => update({ visibility: String(value) as Visibility })}
                  aria-label="Project visibility"
                >
                  <Segment.Item value="private">Private</Segment.Item>
                  <Segment.Item value="team">Team</Segment.Item>
                  <Segment.Item value="public">Public</Segment.Item>
                </Segment>
              </div>
            </div>
          </Card>

          <Card bordered header={{ content: 'Notifications', bordered: true }}>
            <div className="divide-y divide-border">
              <div className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium text-content">Task assigned</p>
                  <p className="text-sm text-content-muted">Notify owners when work is assigned.</p>
                </div>
                <Switcher
                  checked={notifications.taskAssigned}
                  onChange={(checked) => updateNotification('taskAssigned', checked)}
                  aria-label="Task assigned notifications"
                />
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium text-content">Status changed</p>
                  <p className="text-sm text-content-muted">
                    Send updates when project health moves.
                  </p>
                </div>
                <Switcher
                  checked={notifications.statusChanged}
                  onChange={(checked) => updateNotification('statusChanged', checked)}
                  aria-label="Status changed notifications"
                />
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-medium text-content">Weekly digest</p>
                  <p className="text-sm text-content-muted">
                    Bundle milestone, task and budget changes.
                  </p>
                </div>
                <Switcher
                  checked={notifications.weeklyDigest}
                  onChange={(checked) => updateNotification('weeklyDigest', checked)}
                  aria-label="Weekly digest notifications"
                />
              </div>
            </div>
          </Card>
        </div>

        <Card
          bordered
          className="border-error"
          header={{ content: 'Danger zone', bordered: true }}
          bodyClass="space-y-4 p-4"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-content">Archive project</p>
              <p className="text-sm text-content-muted">
                Hide the project from active views while keeping history available.
              </p>
            </div>
            <Button
              variant="default"
              icon={<Icon as={TbIcons.TbArchive} size={16} />}
              onClick={() => setConfirmAction('archive')}
            >
              Archive project
            </Button>
          </div>
          <div className="flex flex-col gap-3 border-t border-border pt-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-content">Delete project</p>
              <p className="text-sm text-content-muted">
                Remove the project and all mock delivery records from this workspace.
              </p>
            </div>
            <Button
              variant="solid"
              className="!border-error !bg-error text-primary-fg hover:!brightness-95"
              icon={<Icon as={TbIcons.TbTrash} size={16} />}
              onClick={() => setConfirmAction('delete')}
            >
              Delete project
            </Button>
          </div>
        </Card>

        <div className="flex justify-end gap-2">
          <Button onClick={() => navigate('/projects/list')}>Cancel</Button>
          <Button type="submit" variant="solid" icon={<Icon as={TbIcons.TbDeviceFloppy} />}>
            Save changes
          </Button>
        </div>
      </form>

      <ConfirmDialog
        isOpen={confirmAction != null}
        type={confirmAction === 'delete' ? 'danger' : 'warning'}
        title={confirmAction === 'delete' ? 'Delete project' : 'Archive project'}
        confirmText={confirmAction === 'delete' ? 'Delete' : 'Archive'}
        onCancel={() => setConfirmAction(null)}
        onConfirm={() => setConfirmAction(null)}
        onClose={() => setConfirmAction(null)}
      >
        {confirmAction === 'delete'
          ? 'This mock action does not delete data, but mirrors a destructive confirmation flow.'
          : 'This mock action does not archive data, but mirrors a project lifecycle confirmation.'}
      </ConfirmDialog>
    </div>
  )
}

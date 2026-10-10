import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ActionGroup,
  Avatar,
  Button,
  Card,
  Combobox,
  ConfirmDialog,
  Input,
  List,
  Segment,
  Switcher,
  TreeList,
} from '@vn-dylan/ui'
import type { ComboboxOption, TreeNode } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import { getMember, projects, team } from '@/mock/projects'

type Visibility = 'private' | 'team' | 'public'
type NotificationKey = 'taskAssigned' | 'statusChanged' | 'weeklyDigest'

const notificationRows: { key: NotificationKey; title: string; description: string }[] = [
  {
    key: 'taskAssigned',
    title: 'Task assigned',
    description: 'Notify owners when work is assigned.',
  },
  {
    key: 'statusChanged',
    title: 'Status changed',
    description: 'Send updates when project health moves.',
  },
  {
    key: 'weeklyDigest',
    title: 'Weekly digest',
    description: 'Bundle milestone, task and budget changes.',
  },
]

const memberOptions: ComboboxOption[] = team.map((m) => ({
  value: m.id,
  label: m.name,
  description: m.role,
}))

/** Permission tree granted to project members: area, then actions. */
const permissionTree: TreeNode[] = [
  {
    id: 'tasks',
    label: 'Tasks',
    children: [
      { id: 'tasks.view', label: 'View tasks' },
      { id: 'tasks.create', label: 'Create and edit tasks' },
      { id: 'tasks.assign', label: 'Assign tasks' },
      { id: 'tasks.delete', label: 'Delete tasks' },
    ],
  },
  {
    id: 'milestones',
    label: 'Milestones',
    children: [
      { id: 'milestones.view', label: 'View milestones' },
      { id: 'milestones.edit', label: 'Edit milestones' },
    ],
  },
  {
    id: 'budget',
    label: 'Budget',
    children: [
      { id: 'budget.view', label: 'View budget' },
      { id: 'budget.approve', label: 'Approve spend' },
    ],
  },
  {
    id: 'files',
    label: 'Files',
    children: [
      { id: 'files.view', label: 'View files' },
      { id: 'files.upload', label: 'Upload files' },
    ],
  },
]
type ConfirmAction = 'archive' | 'delete' | null

interface SettingsForm {
  name: string
  client: string
  description: string
  visibility: Visibility
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
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
  const [members, setMembers] = useState<ComboboxOption[]>(() =>
    (defaultProject?.team ?? [])
      .map((id) => memberOptions.find((o) => o.value === id))
      .filter((o): o is ComboboxOption => Boolean(o)),
  )
  const [permissions, setPermissions] = useState<string[]>([
    'tasks.view',
    'tasks.create',
    'tasks.assign',
    'milestones',
    'milestones.view',
    'milestones.edit',
    'files.view',
  ])

  const update = (patch: Partial<SettingsForm>) => setForm((current) => ({ ...current, ...patch }))

  const updateNotification = (key: NotificationKey, checked: boolean) =>
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
              <div className="space-y-2">
                <span className="block text-sm font-medium text-content">Visibility</span>
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
            <List
              aria-label="Notification settings"
              items={notificationRows}
              getKey={(row) => row.key}
              renderItem={(row) => (
                <List.Item
                  title={row.title}
                  description={row.description}
                  actions={
                    <Switcher
                      checked={notifications[row.key]}
                      onChange={(checked) => updateNotification(row.key, checked)}
                      aria-label={`${row.title} notifications`}
                    />
                  }
                />
              )}
            />
          </Card>
        </div>

        <Card bordered header={{ content: 'Members & access', bordered: true }}>
          <div className="grid gap-loose lg:grid-cols-2">
            <div className="space-y-3">
              <Field label="Project members">
                <Combobox
                  multiple
                  aria-label="Project members"
                  placeholder="Add people"
                  options={memberOptions}
                  value={members}
                  onChange={setMembers}
                />
              </Field>
              <List
                aria-label="Selected members"
                items={members}
                getKey={(m) => m.value}
                emptyMessage="No members yet."
                renderItem={(m) => (
                  <List.Item
                    prefix={
                      <Avatar size={28} shape="circle" src={getMember(m.value)?.avatar} alt="" />
                    }
                    title={m.label}
                    description={m.description}
                  />
                )}
              />
            </div>
            <div className="space-y-3">
              <span className="block text-sm font-medium text-content">Member permissions</span>
              <TreeList
                aria-label="Member permissions"
                nodes={permissionTree}
                checkable
                checkedKeys={permissions}
                onCheckedChange={setPermissions}
                defaultExpandedKeys={['tasks', 'milestones']}
              />
            </div>
          </div>
        </Card>

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
              tone="danger"
              icon={<Icon as={TbIcons.TbTrash} size={16} />}
              onClick={() => setConfirmAction('delete')}
            >
              Delete project
            </Button>
          </div>
        </Card>

        <ActionGroup sticky aria-label="Settings actions">
          <Button onClick={() => navigate('/projects/list')}>Cancel</Button>
          <Button type="submit" variant="solid" icon={<Icon as={TbIcons.TbDeviceFloppy} />}>
            Save changes
          </Button>
        </ActionGroup>
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

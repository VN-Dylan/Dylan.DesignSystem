import { useCallback, useState } from 'react'
import {
  ActionBar,
  Alert,
  Button,
  ClockProgress,
  ConfirmDialog,
  Dialog,
  Drawer,
  Loaders,
  Loading,
  Notification,
  Popover,
  Progress,
  Radio,
  ReactionEmojiPicker,
  Skeleton,
  Spinner,
  Table,
  Toaster,
  Tooltip,
  toast,
  type ConfirmDialogType,
  type DrawerPlacement,
  type NotificationType,
  type RadioValue,
  type ToastPlacement,
} from '@vn-dylan/ui'
import { HiIcons, Icon } from '@vn-dylan/icons'
import { Demo } from '@/views/gallery/components/Demo'
import { SectionShell } from '@/views/gallery/sections/SectionShell'

type DialogTypeKey = 'Info' | 'Success' | 'Warning' | 'Danger'

const confirmDialogTypes: Record<
  DialogTypeKey,
  {
    type: ConfirmDialogType
    title: string
    body: string
    confirmText: string
  }
> = {
  Info: {
    type: 'info',
    title: 'Note',
    body: 'Review the details before continuing.',
    confirmText: 'Okay',
  },
  Success: {
    type: 'success',
    title: 'Complete',
    body: 'The requested operation completed successfully.',
    confirmText: 'All good',
  },
  Warning: {
    type: 'warning',
    title: 'Warning',
    body: 'This action affects the selected workspace.',
    confirmText: 'Understand',
  },
  Danger: {
    type: 'danger',
    title: 'Delete',
    body: 'This permanently deletes the selected record.',
    confirmText: 'Delete',
  },
}

const popoverContent = (
  <div className="space-y-2">
    <h6 className="font-semibold text-content">Cumulative growth analysis</h6>
    <p className="text-sm text-content-muted">
      This report tracks the overall, long-term expansion of community engagement.
    </p>
  </div>
)

const toastPlacements: ToastPlacement[] = [
  'top-start',
  'top-center',
  'top-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
]

/** Feedback category page with overlay, loading, toast and progress demos. */
export function FeedbackSection() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [lockedDialogOpen, setLockedDialogOpen] = useState(false)
  const [confirmType, setConfirmType] = useState<RadioValue>('Info')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerPlacement, setDrawerPlacement] = useState<DrawerPlacement | null>(null)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [actionCount, setActionCount] = useState(0)
  const [progress, setProgress] = useState(30)
  const [pickedReactions, setPickedReactions] = useState<string[]>([])

  const selectedConfirm = confirmDialogTypes[(confirmType as DialogTypeKey) || 'Info']
  const increaseProgress = useCallback(() => setProgress((value) => Math.min(100, value + 10)), [])
  const decreaseProgress = useCallback(() => setProgress((value) => Math.max(0, value - 10)), [])

  return (
    <SectionShell slug="feedback">
      <Toaster />

      <Demo
        title="Dialog - basic"
        description="A controlled modal with labelled content and action footer."
        code={`<Dialog isOpen={open} onClose={() => setOpen(false)} aria-labelledby="dialog-title">
  <h2 id="dialog-title">Delete project</h2>
  ...
</Dialog>`}
      >
        <Demo.Row>
          <Button variant="solid" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Dialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            aria-labelledby="gallery-dialog-title"
          >
            <h2 id="gallery-dialog-title" className="text-lg font-semibold text-content">
              Delete project
            </h2>
            <p className="mt-2 text-content-muted">
              This permanently removes the project and its history.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button
                variant="solid"
                className="!border-error !bg-error hover:!brightness-95"
                onClick={() => setDialogOpen(false)}
              >
                Delete
              </Button>
            </div>
          </Dialog>
        </Demo.Row>
      </Demo>

      <Demo
        title="Dialog - non dismissable"
        code={`<Dialog
  isOpen={open}
  closable={false}
  shouldCloseOnEsc={false}
  shouldCloseOnOverlayClick={false}
/>`}
      >
        <Demo.Row>
          <Button onClick={() => setLockedDialogOpen(true)}>Open locked dialog</Button>
          <Dialog
            isOpen={lockedDialogOpen}
            onClose={() => setLockedDialogOpen(false)}
            closable={false}
            shouldCloseOnEsc={false}
            shouldCloseOnOverlayClick={false}
            aria-label="Confirm"
          >
            <p className="text-content">Choose an option to continue.</p>
            <div className="mt-4 flex justify-end">
              <Button variant="solid" onClick={() => setLockedDialogOpen(false)}>
                Got it
              </Button>
            </div>
          </Dialog>
        </Demo.Row>
      </Demo>

      <Demo
        title="ConfirmDialog"
        description="Semantic confirmation types driven by a controlled trigger."
        code={`<ConfirmDialog
  isOpen={open}
  type="danger"
  title="Delete"
  confirmText="Delete"
  onConfirm={() => setOpen(false)}
/>`}
      >
        <Demo.Stack>
          <Radio.Group value={confirmType} onChange={setConfirmType} aria-label="Dialog type">
            {Object.keys(confirmDialogTypes).map((value) => (
              <Radio key={value} value={value}>
                {value}
              </Radio>
            ))}
          </Radio.Group>
          <Button onClick={() => setConfirmOpen(true)}>Trigger</Button>
          <ConfirmDialog
            isOpen={confirmOpen}
            type={selectedConfirm.type}
            title={selectedConfirm.title}
            confirmText={selectedConfirm.confirmText}
            onClose={() => setConfirmOpen(false)}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => setConfirmOpen(false)}
          >
            <p>{selectedConfirm.body}</p>
          </ConfirmDialog>
        </Demo.Stack>
      </Demo>

      <Demo
        title="Drawer - basic"
        code={`<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Filters"
  footer={<Button>Apply</Button>}
/>`}
      >
        <Demo.Row>
          <Button variant="solid" onClick={() => setDrawerOpen(true)}>
            Open drawer
          </Button>
          <Drawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Filters"
            footer={
              <div className="flex justify-end gap-2">
                <Button onClick={() => setDrawerOpen(false)}>Reset</Button>
                <Button variant="solid" onClick={() => setDrawerOpen(false)}>
                  Apply
                </Button>
              </div>
            }
          >
            <p className="text-content-muted">Drawer body content goes here.</p>
          </Drawer>
        </Demo.Row>
      </Demo>

      <Demo
        title="Drawer - placement"
        code={`<Drawer
  placement="left"
  isOpen={open}
  onClose={() => setOpen(false)}
/>`}
      >
        <Demo.Row>
          {(['top', 'right', 'bottom', 'left'] as DrawerPlacement[]).map((placement) => (
            <Button key={placement} onClick={() => setDrawerPlacement(placement)}>
              {placement}
            </Button>
          ))}
          <Drawer
            isOpen={drawerPlacement !== null}
            placement={drawerPlacement ?? 'right'}
            onClose={() => setDrawerPlacement(null)}
            title={`Placement: ${drawerPlacement ?? 'right'}`}
          >
            <p className="text-content-muted">Slides from the {drawerPlacement ?? 'right'} edge.</p>
          </Drawer>
        </Demo.Row>
      </Demo>

      <Demo
        title="Popover"
        code={`<Popover title="Open details" placement="bottom-start">
  <p>Popover content</p>
</Popover>`}
      >
        <Demo.Row>
          <Popover title="Click me" placement="bottom-start">
            {popoverContent}
          </Popover>
          <Popover renderTrigger={<Button>Custom trigger</Button>} placement="bottom-start">
            {popoverContent}
          </Popover>
          <Popover
            title={popoverOpen ? 'Close details' : 'Open details'}
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
            placement="bottom-start"
          >
            {popoverContent}
          </Popover>
        </Demo.Row>
      </Demo>

      <Demo
        title="Tooltip"
        code={`<Tooltip title="Tooltip message">
  <Button>Hover me</Button>
</Tooltip>`}
      >
        <Demo.Row>
          <Tooltip title="Tooltip message">
            <Button>Hover me</Button>
          </Tooltip>
          <Tooltip
            title={
              <span>
                <strong className="font-semibold">Status:</strong> ready for review
              </span>
            }
            placement="bottom"
          >
            <Button variant="subtle">Custom content</Button>
          </Tooltip>
        </Demo.Row>
      </Demo>

      <Demo
        title="Toast"
        description="Notification toasts are pushed through the package store."
        code={`<Toaster />
<Button onClick={() => toast.push(<Notification title="Saved" type="success" />)}>
  Show toast
</Button>`}
      >
        <Demo.Row>
          {(['info', 'success', 'warning', 'danger'] as NotificationType[]).map((type) => (
            <Button
              key={type}
              onClick={() =>
                toast.push(
                  <Notification title={type} type={type}>
                    A {type} notification.
                  </Notification>,
                )
              }
            >
              {type}
            </Button>
          ))}
        </Demo.Row>
      </Demo>

      <Demo
        title="Toast - placement"
        code={`toast.push(<Notification title="bottom-start" />, {
  placement: 'bottom-start',
})`}
      >
        <Demo.Row>
          {toastPlacements.map((placement) => (
            <Button
              key={placement}
              size="sm"
              onClick={() =>
                toast.push(<Notification title={placement}>Placed at {placement}.</Notification>, {
                  placement,
                })
              }
            >
              {placement}
            </Button>
          ))}
        </Demo.Row>
      </Demo>

      <Demo
        title="Alert"
        code={`<Alert showIcon type="warning" title="Warning">
  Additional description and information.
</Alert>`}
      >
        <Demo.Grid>
          <Alert showIcon type="info">
            Additional description and information about copywriting.
          </Alert>
          <Alert showIcon type="warning">
            Additional description and information about copywriting.
          </Alert>
          <Alert showIcon type="success">
            Additional description and information about copywriting.
          </Alert>
          <Alert showIcon type="danger" title="Error">
            Additional description and information about copywriting.
          </Alert>
        </Demo.Grid>
      </Demo>

      <Demo
        title="ActionBar"
        code={`<ActionBar open={selectedCount > 0} onOpenChange={() => clear()}>
  <span>{selectedCount} selected</span>
  <Button size="sm">Cancel</Button>
</ActionBar>`}
      >
        <Demo.Row>
          <Button onClick={() => setActionCount((count) => count + 1)}>
            Select item ({actionCount})
          </Button>
          <Button onClick={() => setActionCount(0)}>Clear</Button>
          <ActionBar open={actionCount > 0} onOpenChange={() => setActionCount(0)}>
            <span className="font-medium">{actionCount} selected</span>
            <span className="flex-1" />
            <Button size="sm" variant="plain" onClick={() => setActionCount(0)}>
              Cancel
            </Button>
            <Button size="sm" variant="solid">
              Delete
            </Button>
          </ActionBar>
        </Demo.Row>
      </Demo>

      <Demo
        title="Spinner"
        code={`<Spinner size={30} />
<Spinner className="text-success" size="2.5rem" />
<Spinner isSpining={false} />`}
      >
        <Demo.Row>
          <Spinner size={30} aria-label="Loading" />
          <Spinner className="text-warning" size="2.5rem" aria-label="Loading warning" />
          <Spinner className="text-success" size="2.5rem" aria-label="Loading success" />
          <Spinner isSpining={false} size="2.5rem" aria-label="Static spinner" />
        </Demo.Row>
      </Demo>

      <Demo
        title="Loading"
        code={`<Loading loading>
  <div>Loading content</div>
</Loading>`}
      >
        <Demo.Grid>
          <Loading loading>
            <div className="w-72 rounded-md border border-border bg-surface p-6 text-sm text-content">
              Loading content
            </div>
          </Loading>
          <Loading loading customLoader={<span className="text-sm font-medium">Please wait</span>}>
            <div className="w-72 rounded-md border border-border bg-surface p-6 text-sm text-content-muted">
              Covered panel content
            </div>
          </Loading>
        </Demo.Grid>
      </Demo>

      <Demo
        title="Loaders"
        description="Composed skeleton patterns for media, tables and text blocks."
        code={`<Loaders.MediaSkeleton />
<Loaders.TableRowSkeleton columns={3} rows={3} />
<Loaders.TextBlockSkeleton rowCount={3} />`}
      >
        <Demo.Grid>
          <div className="w-full space-y-4">
            <Loaders.MediaSkeleton />
            <Loaders.MediaSkeleton showAvatar={false} />
            <Loaders.TextBlockSkeleton rowCount={3} />
          </div>
          <Table>
            <Table.THead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Loaders.TableRowSkeleton columns={3} rows={3} avatarInColumns={[0]} />
          </Table>
        </Demo.Grid>
      </Demo>

      <Demo
        title="Skeleton"
        code={`<Skeleton variant="circle" />
<Skeleton className="h-36" />
<Skeleton animation={false} />`}
      >
        <Demo.Stack>
          <div className="flex items-center gap-4">
            <Skeleton variant="circle" />
            <Skeleton className="w-56" />
          </div>
          <Skeleton className="h-36" />
          <Skeleton animation={false} className="w-56" />
        </Demo.Stack>
      </Demo>

      <Demo
        title="Progress"
        code={`<Progress percent={30} />
<Progress variant="circle" percent={70} />
<Progress strokeClass="bg-success" percent={100} />`}
      >
        <Demo.Stack>
          <div className="flex gap-2">
            <Button
              aria-label="Decrease progress"
              size="sm"
              icon={<Icon as={HiIcons.HiMinus} size={16} />}
              onClick={decreaseProgress}
            />
            <Button
              aria-label="Increase progress"
              size="sm"
              icon={<Icon as={HiIcons.HiPlus} size={16} />}
              onClick={increaseProgress}
            />
          </div>
          <Progress percent={progress} />
          <div className="flex justify-center">
            <Progress variant="circle" percent={progress} />
          </div>
          <Progress
            strokeClass="bg-success"
            percent={100}
            customInfo={<Icon as={HiIcons.HiCheckCircle} className="text-xl text-success" />}
          />
        </Demo.Stack>
      </Demo>

      <Demo title="ClockProgress" code={`<ClockProgress value={75} aria-label="75% complete" />`}>
        <Demo.Row>
          {[0, 25, 50, 75, 100].map((value) => (
            <ClockProgress key={value} value={value} aria-label={`${value}% complete`} />
          ))}
          <ClockProgress value={60} size={56} aria-label="Large progress" />
        </Demo.Row>
      </Demo>

      <Demo
        title="ReactionEmojiPicker"
        code={`<ReactionEmojiPicker onSelect={(emoji) => setPicked([...picked, emoji])} />`}
      >
        <div className="flex items-center gap-2">
          {pickedReactions.map((emoji, index) => (
            <span key={`${emoji}-${index}`} className="text-lg">
              {emoji}
            </span>
          ))}
          <ReactionEmojiPicker
            onSelect={(emoji) => setPickedReactions((value) => [...value, emoji])}
          />
          <Button variant="plain" onClick={() => setPickedReactions([])}>
            Clear
          </Button>
        </div>
      </Demo>
    </SectionShell>
  )
}

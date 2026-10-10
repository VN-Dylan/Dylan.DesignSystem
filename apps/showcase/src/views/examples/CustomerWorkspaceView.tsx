import { useMemo, useState, type FormEvent } from 'react'
import {
  ActionGroup,
  Avatar,
  Button,
  Can,
  Card,
  ConfirmDialog,
  DataTable,
  Dialog,
  Drawer,
  Form,
  Input,
  Notification,
  Select,
  Toaster,
  toast,
  useAccess,
} from '@vn-dylan/ui'
import type { ColumnDef, FormGroupColumns, SelectOption } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { useTranslation, type MessageKey } from '@/i18n'
import { customers as seedCustomers, type Customer, type CustomerStatus } from '@/mock/customers'
import { customerStatusTone } from '@/views/customers/customersConstants'

/* ------------------------------------------------------------------ data */

const statuses: CustomerStatus[] = ['active', 'inactive', 'churned']

const locationOptions: SelectOption[] = [...new Set(seedCustomers.map((c) => c.location))]
  .sort()
  .map((location) => ({ label: location, value: location }))

interface CustomerDraft {
  name: string
  company: string
  email: string
  phone: string
  location: string
  status: CustomerStatus
  ltv: string
  notes: string
}

/** Errors hold message keys, so they re-translate when the language changes. */
type DraftErrors = Partial<Record<keyof CustomerDraft, MessageKey>>

const emptyDraft: CustomerDraft = {
  name: '',
  company: '',
  email: '',
  phone: '',
  location: '',
  status: 'active',
  ltv: '',
  notes: '',
}

const toDraft = (customer: Customer): CustomerDraft => ({
  name: customer.name,
  company: customer.company,
  email: customer.email,
  phone: customer.phone,
  location: customer.location,
  status: customer.status,
  ltv: String(customer.ltv),
  notes: '',
})

const validate = (draft: CustomerDraft): DraftErrors => {
  const errors: DraftErrors = {}
  if (!draft.name.trim()) errors.name = 'customers.errors.name'
  if (!/^\S+@\S+\.\S+$/.test(draft.email.trim())) errors.email = 'customers.errors.email'
  if (!draft.location) errors.location = 'customers.errors.location'
  if (draft.ltv && Number.isNaN(Number(draft.ltv))) errors.ltv = 'customers.errors.number'
  return errors
}

const notify = (title: string, type: 'success' | 'danger' = 'success') =>
  toast.push(<Notification title={title} type={type} />, { placement: 'top-end' })

interface Filters {
  status: CustomerStatus | null
  location: string | null
  minLtv: string
}

const emptyFilters: Filters = { status: null, location: null, minLtv: '' }

/* ------------------------------------------------------------- form body */

interface CustomerFormProps {
  id: string
  draft: CustomerDraft
  errors: DraftErrors
  /** 2 in the wide modal, 1 in the narrow drawer. */
  columns: FormGroupColumns
  /** View-only: every field is disabled through the fieldsets. */
  readOnly?: boolean
  onChange: (patch: Partial<CustomerDraft>) => void
  onSubmit: () => void
}

/**
 * One form body shared by the create modal and the edit drawer. The submit
 * button lives in the container's pinned footer, linked with `form={id}`.
 */
function CustomerForm({
  id,
  draft,
  errors,
  columns,
  readOnly = false,
  onChange,
  onSubmit,
}: CustomerFormProps) {
  const { t } = useTranslation()
  const statusOptions = statuses.map((s) => ({ label: t(`customers.status.${s}`), value: s }))
  const error = (field: keyof CustomerDraft) => (errors[field] ? t(errors[field]) : undefined)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!readOnly) onSubmit()
  }

  return (
    <Form id={id} onSubmit={handleSubmit} noValidate>
      <Form.Group
        title={t('customers.form.contact')}
        description={t('customers.form.contactHint')}
        columns={columns}
        disabled={readOnly}
      >
        <Form.Item label={t('customers.form.name')} asterisk errorMessage={error('name')}>
          <Input
            value={draft.name}
            invalid={Boolean(errors.name)}
            onChange={(event) => onChange({ name: event.target.value })}
            placeholder="Mara Whitfield"
            autoComplete="name"
          />
        </Form.Item>
        <Form.Item label={t('customers.form.company')}>
          <Input
            value={draft.company}
            onChange={(event) => onChange({ company: event.target.value })}
            placeholder="Northwind Retail"
            autoComplete="organization"
          />
        </Form.Item>
        <Form.Item label={t('customers.form.email')} asterisk errorMessage={error('email')}>
          <Input
            type="email"
            value={draft.email}
            invalid={Boolean(errors.email)}
            onChange={(event) => onChange({ email: event.target.value })}
            placeholder="name@company.com"
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item label={t('customers.form.phone')} hint={t('customers.form.phoneHint')}>
          <Input
            type="tel"
            value={draft.phone}
            onChange={(event) => onChange({ phone: event.target.value })}
            placeholder="+1 202 555 0142"
            autoComplete="tel"
          />
        </Form.Item>
      </Form.Group>

      <Form.Group title={t('customers.form.account')} columns={columns} divided disabled={readOnly}>
        <Form.Item label={t('customers.form.location')} asterisk errorMessage={error('location')}>
          <Select
            options={locationOptions}
            value={locationOptions.find((o) => o.value === draft.location) ?? null}
            onChange={(option) => onChange({ location: String(option?.value ?? '') })}
            invalid={Boolean(errors.location)}
            disabled={readOnly}
            placeholder={t('customers.form.locationPlaceholder')}
          />
        </Form.Item>
        <Form.Item label={t('customers.form.status')}>
          <Select
            options={statusOptions}
            value={statusOptions.find((o) => o.value === draft.status) ?? null}
            onChange={(option) =>
              onChange({ status: (option?.value as CustomerStatus | undefined) ?? 'active' })
            }
            disabled={readOnly}
            isClearable={false}
          />
        </Form.Item>
        <Form.Item
          label={t('customers.form.ltv')}
          hint={t('customers.form.ltvHint')}
          errorMessage={error('ltv')}
        >
          <Input
            inputMode="decimal"
            value={draft.ltv}
            invalid={Boolean(errors.ltv)}
            onChange={(event) => onChange({ ltv: event.target.value })}
            prefix="$"
            placeholder="0"
          />
        </Form.Item>
        <Form.Item label={t('customers.form.notes')} span="full" extra={t('common.optional')}>
          <Input
            textArea
            rows={4}
            value={draft.notes}
            onChange={(event) => onChange({ notes: event.target.value })}
            placeholder={t('customers.form.notesPlaceholder')}
          />
        </Form.Item>
      </Form.Group>
    </Form>
  )
}

/* ------------------------------------------------------------------ view */

/**
 * Reference CRUD screen: AppShell (from the route layout) + PageHeader +
 * DataTable, a create modal, an edit drawer, a filter drawer and a delete
 * confirmation — translated, and gated by permission:
 *
 * - `customers.read`   → list + view drawer (read-only fields)
 * - `customers.create` → "Add customer"
 * - `customers.update` → edit + save
 * - `customers.delete` → delete (row action and drawer footer)
 *
 * Every action footer is pinned, so Save / Cancel never need a scroll.
 */
export function CustomerWorkspaceView() {
  const { t, formatCurrency } = useTranslation()
  const { can } = useAccess()
  const canUpdate = can('customers.update')

  const [rows, setRows] = useState<Customer[]>(seedCustomers)

  // Filters: edited in the drawer, applied on "Apply".
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [filterDraft, setFilterDraft] = useState<Filters>(emptyFilters)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Create (modal) / edit or view (drawer) share one draft.
  const [mode, setMode] = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing] = useState<Customer | null>(null)
  const [draft, setDraft] = useState<CustomerDraft>(emptyDraft)
  const [errors, setErrors] = useState<DraftErrors>({})

  const [deleting, setDeleting] = useState<Customer | null>(null)

  const statusOptions = statuses.map((s) => ({ label: t(`customers.status.${s}`), value: s }))
  const activeFilterCount = [filters.status, filters.location, filters.minLtv].filter(
    Boolean,
  ).length

  const visibleRows = useMemo(
    () =>
      rows.filter(
        (c) =>
          (!filters.status || c.status === filters.status) &&
          (!filters.location || c.location === filters.location) &&
          (!filters.minLtv || c.ltv >= Number(filters.minLtv)),
      ),
    [rows, filters],
  )

  const openCreate = () => {
    setDraft(emptyDraft)
    setErrors({})
    setEditing(null)
    setMode('create')
  }

  const openEdit = (customer: Customer) => {
    setDraft(toDraft(customer))
    setErrors({})
    setEditing(customer)
    setMode('edit')
  }

  const closeForm = () => setMode(null)

  const updateDraft = (patch: Partial<CustomerDraft>) => {
    setDraft((current) => ({ ...current, ...patch }))
    // Clear an error as soon as its field is edited.
    setErrors((current) => {
      const next = { ...current }
      for (const key of Object.keys(patch) as (keyof CustomerDraft)[]) delete next[key]
      return next
    })
  }

  const save = () => {
    const nextErrors = validate(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const fields = {
      name: draft.name.trim(),
      company: draft.company.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      location: draft.location,
      status: draft.status,
      ltv: Number(draft.ltv || 0),
    }

    if (mode === 'edit' && editing) {
      setRows((current) => current.map((c) => (c.id === editing.id ? { ...c, ...fields } : c)))
      notify(t('customers.toast.updated', { name: fields.name }))
    } else {
      const today = new Date().toISOString().slice(0, 10)
      setRows((current) => [
        {
          ...fields,
          id: `c-${Date.now()}`,
          avatar: '',
          orders: 0,
          since: today,
          lastSeen: today,
        },
        ...current,
      ])
      notify(t('customers.toast.added', { name: fields.name }))
    }
    closeForm()
  }

  const confirmDelete = () => {
    if (!deleting) return
    setRows((current) => current.filter((c) => c.id !== deleting.id))
    notify(t('customers.toast.deleted', { name: deleting.name }), 'danger')
    setDeleting(null)
    closeForm()
  }

  const columns = useMemo<ColumnDef<Customer, unknown>[]>(
    () => [
      {
        id: 'customer',
        header: t('customers.columns.customer'),
        accessorFn: (row) => `${row.name} ${row.company}`,
        cell: ({ row }) => (
          <button
            type="button"
            className="flex min-w-56 items-center gap-3 text-start"
            onClick={() => openEdit(row.original)}
          >
            <Avatar size={32} shape="circle" src={row.original.avatar || undefined}>
              {row.original.name.charAt(0)}
            </Avatar>
            <span className="min-w-0">
              <span className="block truncate font-medium text-content hover:text-primary">
                {row.original.name}
              </span>
              <span className="block truncate text-xs text-content-muted">
                {row.original.company || '—'}
              </span>
            </span>
          </button>
        ),
      },
      { id: 'email', accessorKey: 'email', header: t('customers.columns.email') },
      { id: 'location', accessorKey: 'location', header: t('customers.columns.location') },
      {
        id: 'ltv',
        accessorKey: 'ltv',
        header: t('customers.columns.ltv'),
        cell: ({ row }) => formatCurrency(row.original.ltv),
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: t('customers.columns.status'),
        cell: ({ row }) => (
          <StatusTag tone={customerStatusTone[row.original.status]}>
            {t(`customers.status.${row.original.status}`)}
          </StatusTag>
        ),
      },
      {
        id: 'actions',
        header: () => <span className="sr-only">{t('common.actions')}</span>,
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            <Can
              permission="customers.update"
              behavior="disable"
              reason={t('customers.needsEditor')}
            >
              <Button
                size="sm"
                shape="circle"
                variant="plain"
                aria-label={t('customers.editAria', { name: row.original.name })}
                icon={<Icon as={TbIcons.TbEdit} size={16} />}
                onClick={() => openEdit(row.original)}
              />
            </Can>
            <Can permission="customers.delete">
              <Button
                size="sm"
                shape="circle"
                variant="plain"
                tone="danger"
                aria-label={t('customers.deleteAria', { name: row.original.name })}
                icon={<Icon as={TbIcons.TbTrash} size={16} />}
                onClick={() => setDeleting(row.original)}
              />
            </Can>
          </div>
        ),
      },
    ],
    [t, formatCurrency],
  )

  const readOnly = mode === 'edit' && !canUpdate

  const formFooter = readOnly ? (
    <ActionGroup aria-label={t('common.actions')} align="between">
      <span className="text-sm text-content-muted">{t('customers.readOnly')}</span>
      <Button onClick={closeForm}>{t('common.cancel')}</Button>
    </ActionGroup>
  ) : (
    <ActionGroup aria-label={t('common.actions')}>
      {mode === 'edit' && editing && (
        <Can permission="customers.delete">
          <ActionGroup.Start>
            <Button
              variant="plain"
              tone="danger"
              icon={<Icon as={TbIcons.TbTrash} size={16} />}
              onClick={() => setDeleting(editing)}
            >
              {t('common.delete')}
            </Button>
          </ActionGroup.Start>
        </Can>
      )}
      <Button onClick={closeForm}>{t('common.cancel')}</Button>
      <Button
        type="submit"
        form="customer-form"
        variant="solid"
        icon={<Icon as={TbIcons.TbDeviceFloppy} size={16} />}
      >
        {mode === 'edit' ? t('common.saveChanges') : t('customers.create')}
      </Button>
    </ActionGroup>
  )

  const customerForm = (columnCount: FormGroupColumns) => (
    <CustomerForm
      id="customer-form"
      draft={draft}
      errors={errors}
      columns={columnCount}
      readOnly={readOnly}
      onChange={updateDraft}
      onSubmit={save}
    />
  )

  return (
    <div className="space-y-6">
      <Toaster />

      {/* 1. Page actions: top-right of the PageHeader. */}
      <PageHeader
        title={t('customers.title')}
        description={t('customers.description')}
        actions={
          <>
            <Button
              icon={<Icon as={TbIcons.TbFilter} size={16} />}
              onClick={() => {
                setFilterDraft(filters)
                setFiltersOpen(true)
              }}
            >
              {activeFilterCount > 0
                ? t('customers.filtersCount', { count: activeFilterCount })
                : t('customers.filters')}
            </Button>
            <Can
              permission="customers.create"
              behavior="disable"
              reason={t('customers.needsEditor')}
            >
              <Button
                variant="solid"
                icon={<Icon as={TbIcons.TbPlus} size={16} />}
                onClick={openCreate}
              >
                {t('customers.add')}
              </Button>
            </Can>
          </>
        }
      />

      {/* 2. Data: DataTable with built-in search, sorting and paging. */}
      <Card bordered bodyClass="p-4">
        <DataTable<Customer>
          columns={columns}
          data={visibleRows}
          getRowId={(row) => row.id}
          searchable
          searchPlaceholder={t('customers.search')}
          pagination
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pageSize: 5, columnPinning: { right: ['actions'] } }}
          toolbarEnd={
            activeFilterCount > 0 ? (
              <Button size="sm" variant="plain" onClick={() => setFilters(emptyFilters)}>
                {t('customers.clearFilters')}
              </Button>
            ) : undefined
          }
          emptyMessage={t('customers.empty')}
        />
      </Card>

      {/* 3. Create: modal. Title + footer pinned; body scrolls; never taller than the device. */}
      <Dialog
        isOpen={mode === 'create'}
        onClose={closeForm}
        width={720}
        title={t('customers.add')}
        footer={formFooter}
      >
        {customerForm(2)}
      </Dialog>

      {/* 4. Edit / view: drawer. Same form body, one column; footer pinned. */}
      <Drawer
        isOpen={mode === 'edit'}
        onClose={closeForm}
        width={480}
        title={
          editing
            ? readOnly
              ? editing.name
              : t('customers.editTitle', { name: editing.name })
            : ''
        }
        footer={formFooter}
      >
        {customerForm(1)}
      </Drawer>

      {/* 5. Filters: drawer with a compact form; Reset / Apply in the pinned footer. */}
      <Drawer
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        width={360}
        title={t('customers.filters')}
        footer={
          <ActionGroup aria-label={t('common.actions')}>
            <Button onClick={() => setFilterDraft(emptyFilters)}>{t('common.reset')}</Button>
            <Button
              type="submit"
              form="filter-form"
              variant="solid"
              icon={<Icon as={TbIcons.TbCheck} size={16} />}
            >
              {t('common.apply')}
            </Button>
          </ActionGroup>
        }
      >
        <Form
          id="filter-form"
          onSubmit={(event) => {
            event.preventDefault()
            setFilters(filterDraft)
            setFiltersOpen(false)
          }}
        >
          <Form.Item label={t('customers.form.status')}>
            <Select
              options={statusOptions}
              value={statusOptions.find((o) => o.value === filterDraft.status) ?? null}
              onChange={(option) =>
                setFilterDraft((f) => ({
                  ...f,
                  status: (option?.value as CustomerStatus | undefined) ?? null,
                }))
              }
              placeholder={t('customers.filter.anyStatus')}
            />
          </Form.Item>
          <Form.Item label={t('customers.form.location')}>
            <Select
              options={locationOptions}
              value={locationOptions.find((o) => o.value === filterDraft.location) ?? null}
              onChange={(option) =>
                setFilterDraft((f) => ({ ...f, location: option ? String(option.value) : null }))
              }
              placeholder={t('customers.filter.anyLocation')}
            />
          </Form.Item>
          <Form.Item label={t('customers.filter.minLtv')} hint={t('customers.filter.minLtvHint')}>
            <Input
              inputMode="decimal"
              prefix="$"
              value={filterDraft.minLtv}
              onChange={(event) => setFilterDraft((f) => ({ ...f, minLtv: event.target.value }))}
              placeholder="0"
            />
          </Form.Item>
        </Form>
      </Drawer>

      {/* 6. Delete: always confirmed. */}
      <ConfirmDialog
        isOpen={deleting != null}
        type="danger"
        title={t('customers.confirm.title', { name: deleting?.name ?? '' })}
        confirmText={t('common.delete')}
        onCancel={() => setDeleting(null)}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
      >
        {t('customers.confirm.body')}
      </ConfirmDialog>
    </div>
  )
}

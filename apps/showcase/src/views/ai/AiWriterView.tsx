import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Input, Select } from '@vn-dylan/ui'
import type { SelectOption } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { drafts, writerTones } from '@/mock/ai'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

const toneOptions: SelectOption[] = writerTones.map((tone) => ({ label: tone, value: tone }))

/** AI writer workspace with draft navigation, tone selection and mock editing. */
export function AiWriterView() {
  const [activeId, setActiveId] = useState(drafts[0]!.id)
  const [tone, setTone] = useState<SelectOption>(toneOptions[0]!)
  const activeDraft = drafts.find((draft) => draft.id === activeId) ?? drafts[0]!
  const [title, setTitle] = useState(activeDraft.title)
  const [text, setText] = useState('')

  useEffect(() => {
    setTitle(activeDraft.title)
    setText(activeDraft.body)
  }, [activeDraft])

  const wordCount = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text])

  return (
    <div className="space-y-6">
      <PageHeader title="AI writer" description="Draft, revise and reshape long-form content." />

      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <Card bordered bodyClass="p-2">
          <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-content-muted">
            Drafts
          </p>
          <ul className="space-y-1">
            {drafts.map((draft) => (
              <li key={draft.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(draft.id)}
                  aria-current={draft.id === activeId}
                  className={`w-full rounded-md px-3 py-2 text-start transition ${
                    draft.id === activeId
                      ? 'bg-primary-subtle text-primary'
                      : 'text-content-muted hover:bg-surface-sunken'
                  }`}
                >
                  <span className="block truncate text-sm font-medium">{draft.title}</span>
                  <span className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <StatusTag tone="neutral">{draft.kind}</StatusTag>
                    <span>{draft.words} words</span>
                  </span>
                  <span className="mt-1 block text-xs text-content-faint">
                    {fmtDate(draft.updated)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card bordered header={{ content: 'Editor', bordered: true }} bodyClass="space-y-4 p-4">
          <Input
            name="draft-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="lg:w-48">
              <Select
                options={toneOptions}
                value={tone}
                onChange={(option) => setTone(option ?? toneOptions[0]!)}
                isClearable={false}
                aria-label="Writing tone"
              />
            </div>
            <div className="flex flex-wrap gap-2 lg:ml-auto">
              <Button size="sm" icon={<Icon as={TbIcons.TbWand} size={16} />}>
                Improve
              </Button>
              <Button size="sm" icon={<Icon as={TbIcons.TbTextDecrease} size={16} />}>
                Shorten
              </Button>
              <Button size="sm" icon={<Icon as={TbIcons.TbArrowRight} size={16} />}>
                Continue
              </Button>
            </div>
          </div>
          <Input
            name="draft-body"
            textArea
            rows={16}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-content-muted">
            <span>
              {wordCount} words · {tone.value} tone
            </span>
            <Button variant="solid" icon={<Icon as={TbIcons.TbDeviceFloppy} size={16} />}>
              Save draft
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

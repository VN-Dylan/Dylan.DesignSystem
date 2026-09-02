import { useMemo, useState } from 'react'
import { Button, Card, Input, Segment, Select } from '@vn-dylan/ui'
import type { SelectOption } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'
import { formatNumber } from '@vn-dylan/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { aiUsage, imageHistory, imageStyles, type GeneratedImage } from '@/mock/ai'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })

const styleOptions: SelectOption[] = imageStyles.map((style) => ({
  label: style,
  value: style,
}))

/** AI image generator with prompt controls and local placeholder results. */
export function AiImageView() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState<SelectOption>(styleOptions[0]!)
  const [ratio, setRatio] = useState<GeneratedImage['ratio']>('1:1')
  const [results, setResults] = useState<GeneratedImage[]>(imageHistory)

  const usageNote = useMemo(
    () =>
      `${formatNumber(aiUsage.requestsThisMonth, 0)} of ${formatNumber(
        aiUsage.requestsLimit,
        0,
      )} requests used this month.`,
    [],
  )

  const generate = () => {
    const trimmed = prompt.trim()
    if (!trimmed) return
    const now = Date.now()
    setResults((items) => [
      {
        id: `local-${now}`,
        prompt: `${trimmed} (${style.value})`,
        ratio,
        seed: now % 100000,
        createdBy: 'You',
        createdAt: new Date(now).toISOString(),
      },
      ...items,
    ])
    setPrompt('')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="AI image" description={usageNote} />

      <Card
        bordered
        header={{ content: 'Generate image', bordered: true }}
        bodyClass="space-y-4 p-4"
      >
        <Input
          name="image-prompt"
          textArea
          rows={4}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Describe the image you want to generate"
        />
        <div className="grid gap-3 md:grid-cols-[minmax(14rem,1fr)_16rem_auto] md:items-end">
          <div>
            <p className="mb-1.5 text-sm font-medium text-content">Style</p>
            <Select
              options={styleOptions}
              value={style}
              onChange={(option) => setStyle(option ?? styleOptions[0]!)}
              isClearable={false}
              aria-label="Image style"
            />
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium text-content">Aspect ratio</p>
            <Segment
              value={ratio}
              onChange={(value) => setRatio(String(value) as GeneratedImage['ratio'])}
              size="sm"
              aria-label="Aspect ratio"
            >
              <Segment.Item value="1:1">1:1</Segment.Item>
              <Segment.Item value="3:2">3:2</Segment.Item>
              <Segment.Item value="2:3">2:3</Segment.Item>
            </Segment>
          </div>
          <Button
            variant="solid"
            onClick={generate}
            disabled={!prompt.trim()}
            icon={<Icon as={TbIcons.TbSparkles} size={16} />}
          >
            Generate
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((image) => (
          <Card key={image.id} bordered bodyClass="p-0">
            <div className="aspect-[4/3] bg-surface-sunken bg-gradient-to-br from-surface-sunken via-primary-subtle to-surface">
              <div className="grid h-full place-items-center text-primary">
                <Icon as={TbIcons.TbPhoto} size={42} />
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="line-clamp-2 text-sm font-medium text-content">{image.prompt}</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-content-muted">
                <span>Ratio {image.ratio}</span>
                <span>Seed {image.seed}</span>
                <span className="col-span-2">
                  {image.createdBy} · {fmtDate(image.createdAt)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Button, Card, Segment } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatRelativeTime } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusTag } from '@/components/shared/StatusTag'
import { announcements, type Announcement } from '@/mock/hrm'

type AnnouncementTag = Announcement['tag']

/** Announcement feed with pinned notices and tag filtering. */
export function AnnouncementsView() {
  const [tag, setTag] = useState<AnnouncementTag | 'all'>('all')

  const filteredAnnouncements = useMemo(() => {
    const matchesTag = announcements.filter(
      (announcement) => tag === 'all' || announcement.tag === tag,
    )
    return [...matchesTag].sort((a, b) => Number(b.pinned) - Number(a.pinned))
  }, [tag])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        description="Company updates, policies, events and people news."
        actions={
          <Button
            variant="solid"
            icon={<Icon as={TbIcons.TbPlus} size={16} />}
            onClick={() => undefined}
          >
            New announcement
          </Button>
        }
      />

      <Card bordered bodyClass="p-0">
        <div className="overflow-x-auto border-b border-border p-4">
          <Segment
            value={tag}
            onChange={(value) => setTag(String(value) as AnnouncementTag | 'all')}
            size="sm"
            aria-label="Announcement tag"
          >
            <Segment.Item value="all">All</Segment.Item>
            <Segment.Item value="Company">Company</Segment.Item>
            <Segment.Item value="Policy">Policy</Segment.Item>
            <Segment.Item value="Event">Event</Segment.Item>
            <Segment.Item value="Recognition">Recognition</Segment.Item>
          </Segment>
        </div>

        <div className="divide-y divide-border">
          {filteredAnnouncements.map((announcement) => (
            <article key={announcement.id} className="space-y-3 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusTag tone="neutral">{announcement.tag}</StatusTag>
                {announcement.pinned && (
                  <span className="rounded-md bg-primary-subtle px-2 py-1 text-xs font-medium text-primary">
                    Pinned
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-base font-semibold text-content">{announcement.title}</h2>
                <p className="mt-1 text-sm leading-6 text-content-muted">{announcement.body}</p>
              </div>
              <p className="text-xs text-content-faint">
                {announcement.author} · {formatRelativeTime(announcement.date)}
              </p>
            </article>
          ))}
        </div>
      </Card>
    </div>
  )
}

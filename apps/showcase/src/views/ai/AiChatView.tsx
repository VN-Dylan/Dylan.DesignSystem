import { useMemo, useState, type FormEvent } from 'react'
import { Avatar, Button, Card, Input } from '@dylan-ds/ui'
import { Icon, TbIcons } from '@dylan-ds/icons'
import { formatRelativeTime } from '@dylan-ds/utils'
import { PageHeader } from '@/components/shared/PageHeader'
import { conversations, suggestedPrompts, type ChatMessage } from '@/mock/ai'
import { useAuth } from '@/utils/hooks/useAuth'

const CANNED_REPLY =
  'This is a mock assistant — no model is called. In the real app your prompt would stream back here. Try one of the suggested prompts to see a longer example.'

/** Render the light markdown used in canned replies: `**bold**` and `- ` bullets. */
function ChatText({ text }: { text: string }) {
  const renderInline = (line: string) =>
    line.split(/(\*\*[^*]+\*\*)/g).map((segment, index) =>
      segment.startsWith('**') && segment.endsWith('**') ? (
        <strong key={index} className="font-semibold">
          {segment.slice(2, -2)}
        </strong>
      ) : (
        <span key={index}>{segment}</span>
      ),
    )

  return (
    <div className="space-y-1.5">
      {text.split('\n').map((line, index) => {
        if (line.trim() === '') return <div key={index} className="h-1" aria-hidden />
        if (line.startsWith('- ')) {
          return (
            <p key={index} className="flex gap-2">
              <span aria-hidden>•</span>
              <span>{renderInline(line.slice(2))}</span>
            </p>
          )
        }
        return <p key={index}>{renderInline(line)}</p>
      })}
    </div>
  )
}

/**
 * AI chat workspace — the reference screen for the ai area: a conversation
 * list, a message thread and a composer. Replies are canned.
 */
export function AiChatView() {
  const { user } = useAuth()
  const [activeId, setActiveId] = useState(conversations[0]!.id)
  const [drafts, setDrafts] = useState<Record<string, ChatMessage[]>>({})
  const [input, setInput] = useState('')

  const active = conversations.find((c) => c.id === activeId)!
  const thread = useMemo(
    () => [...active.messages, ...(drafts[activeId] ?? [])],
    [active.messages, drafts, activeId],
  )

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const now = new Date().toISOString()
    const additions: ChatMessage[] = [
      { id: `u-${Date.now()}`, role: 'user', content: trimmed, time: now },
      { id: `a-${Date.now() + 1}`, role: 'assistant', content: CANNED_REPLY, time: now },
    ]
    setDrafts((d) => ({ ...d, [activeId]: [...(d[activeId] ?? []), ...additions] }))
    setInput('')
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI chat"
        description="A mock assistant workspace built on the design system."
      />

      <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
        <Card bordered bodyClass="p-2" className="hidden lg:block">
          <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-content-muted">
            Conversations
          </p>
          <ul className="space-y-1">
            {conversations.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  aria-current={c.id === activeId}
                  className={`w-full rounded-md px-3 py-2 text-start text-sm transition ${
                    c.id === activeId
                      ? 'bg-primary-subtle text-primary'
                      : 'text-content-muted hover:bg-surface-sunken'
                  }`}
                >
                  <span className="block truncate font-medium">{c.title}</span>
                  <span className="block text-xs text-content-faint">
                    {formatRelativeTime(c.updated)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card bordered bodyClass="flex h-[32rem] flex-col p-0">
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {thread.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {m.role === 'assistant' ? (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-fg">
                    <Icon as={TbIcons.TbSparkles} size={16} />
                  </span>
                ) : (
                  <Avatar size="sm" shape="circle" src={user?.avatar} alt={user?.name} />
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-fg'
                      : 'bg-surface-sunken text-content'
                  }`}
                >
                  <ChatText text={m.content} />
                </div>
              </div>
            ))}
          </div>

          {thread.length <= 2 && (
            <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => send(p)}
                  className="rounded-full border border-border px-3 py-1 text-xs text-content-muted hover:border-border-strong"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <Input
              name="ai-prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message the assistant…"
              aria-label="Message"
            />
            <Button
              type="submit"
              variant="solid"
              disabled={!input.trim()}
              icon={<Icon as={TbIcons.TbSend} size={16} />}
            >
              Send
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

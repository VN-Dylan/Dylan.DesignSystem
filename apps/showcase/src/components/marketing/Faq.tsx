import { useState, type ReactNode } from 'react'
import { Collapsible, Reveal, Stagger } from '@vn-dylan/ui'
import { Icon, TbIcons } from '@vn-dylan/icons'

export interface FaqItem {
  question: ReactNode
  answer: ReactNode
}

export interface FaqProps {
  items: FaqItem[]
  single?: boolean
}

/**
 * Accessible FAQ accordion for marketing pages, backed by the design-system
 * Collapsible primitive.
 */
export function Faq({ items, single = false }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(single ? 0 : null)

  return (
    <Reveal>
      <Stagger className="divide-y divide-border rounded-lg border border-border bg-surface">
        {items.map((item, index) => {
          const controlled = single
            ? {
                open: openIndex === index,
                onOpenChange: (open: boolean) => setOpenIndex(open ? index : null),
              }
            : {}

          return (
            <Stagger.Item key={index}>
              <Collapsible {...controlled} className="px-5">
                <Collapsible.Trigger className="text-content">
                  {({ isOpen }) => (
                    <>
                      <span>{item.question}</span>
                      <Icon
                        as={TbIcons.TbChevronDown}
                        className={`shrink-0 transition-transform duration-fast ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </>
                  )}
                </Collapsible.Trigger>
                <Collapsible.Content>{item.answer}</Collapsible.Content>
              </Collapsible>
            </Stagger.Item>
          )
        })}
      </Stagger>
    </Reveal>
  )
}

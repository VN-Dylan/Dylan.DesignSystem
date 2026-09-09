import type { ReactNode } from 'react'
import { Avatar, Card, Rating, Reveal } from '@vn-dylan/ui'

export interface TestimonialCardProps {
  quote: ReactNode
  author: string
  role?: string
  avatarSrc?: string
  rating?: number
}

/**
 * Customer quote card for marketing surfaces, optionally showing a read-only
 * star rating and avatar.
 */
export function TestimonialCard({ quote, author, role, avatarSrc, rating }: TestimonialCardProps) {
  const initials = author
    .split(' ')
    .map((part) => part.at(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Reveal>
      <Card bordered className="h-full" bodyClass="space-y-5 p-5">
        {rating != null && (
          <Rating readOnly allowHalf value={rating} aria-label={`${rating} out of 5`} />
        )}
        <blockquote className="text-base leading-7 text-content">{quote}</blockquote>
        <div className="flex items-center gap-3">
          <Avatar shape="circle" src={avatarSrc} alt={author}>
            {initials}
          </Avatar>
          <div>
            <div className="font-semibold text-content">{author}</div>
            {role && <div className="text-sm text-content-muted">{role}</div>}
          </div>
        </div>
      </Card>
    </Reveal>
  )
}

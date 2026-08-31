import { useState } from 'react'
import { Popover } from '../Popover'
import { Button } from '../Button'
import type { ReactionEmojiPickerProps } from './types'
import './ReactionEmojiPicker.scss'

const DEFAULT_EMOJIS = ['👍', '❤️', '😂', '🎉', '😮', '😢', '🙏', '👀', '🔥', '✅', '🚀', '💯']

/**
 * A popover grid of emoji for adding a reaction.
 */
export function ReactionEmojiPicker({
  emojis = DEFAULT_EMOJIS,
  onSelect,
  trigger,
  placement = 'top',
  width = 240,
}: ReactionEmojiPickerProps) {
  const [open, setOpen] = useState(false)

  const triggerNode = trigger ?? (
    <Button size="sm" shape="circle" variant="plain" aria-label="Add reaction">
      ＋
    </Button>
  )

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      placement={placement}
      width={width}
      renderTrigger={triggerNode}
      aria-label="Reactions"
    >
      <div className="dyl-reaction-picker" role="menu" aria-label="Reactions">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            type="button"
            role="menuitem"
            className="dyl-reaction-picker__emoji"
            aria-label={emoji}
            onClick={() => {
              onSelect?.(emoji)
              setOpen(false)
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </Popover>
  )
}

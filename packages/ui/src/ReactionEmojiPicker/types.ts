import type { ReactNode } from 'react'
import type { PopoverPlacement } from '../Popover'

export interface ReactionEmojiPickerProps {
  /** Emoji characters to offer. Defaults to a common reaction set. */
  emojis?: string[]
  /** Called with the chosen emoji. */
  onSelect?: (emoji: string) => void
  /** Trigger element. Defaults to a "＋" button. */
  trigger?: ReactNode
  /** @default 'top' */
  placement?: PopoverPlacement
  /** Popover width. @default 240 */
  width?: number
}

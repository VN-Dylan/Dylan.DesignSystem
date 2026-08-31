import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ReactionEmojiPicker } from './ReactionEmojiPicker'

describe('ReactionEmojiPicker', () => {
  it('opens and selects an emoji', async () => {
    const onSelect = vi.fn()
    render(<ReactionEmojiPicker emojis={['👍', '🎉']} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: 'Add reaction' }))
    await userEvent.click(screen.getByRole('menuitem', { name: '🎉' }))
    expect(onSelect).toHaveBeenCalledWith('🎉')
  })

  it('closes after a selection', async () => {
    render(<ReactionEmojiPicker emojis={['👍']} />)
    await userEvent.click(screen.getByRole('button', { name: 'Add reaction' }))
    await userEvent.click(screen.getByRole('menuitem', { name: '👍' }))
    expect(screen.queryByRole('menu', { name: 'Reactions' })).not.toBeInTheDocument()
  })

  it('accepts a custom trigger', async () => {
    render(<ReactionEmojiPicker trigger={<button>React</button>} emojis={['👍']} />)
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument()
  })

  it('has no axe violations when open', async () => {
    const { baseElement } = render(<ReactionEmojiPicker emojis={['👍', '🎉']} />)
    await userEvent.click(screen.getByRole('button', { name: 'Add reaction' }))
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})

import { forwardRef, type KeyboardEvent } from 'react'
import { acronym } from '@vn-dylan/utils'
import { Avatar } from '../Avatar'
import type { UserDataObject, UsersAvatarGroupProps } from './types'
import './UsersAvatarGroup.scss'

const readString = (data: UserDataObject, key: string) => {
  const value = data[key]
  return typeof value === 'string' ? value : value == null ? '' : String(value)
}

/**
 * UsersAvatarGroup chains multiple user avatars into a stack.
 */
export const UsersAvatarGroup = forwardRef<HTMLDivElement, UsersAvatarGroupProps>(
  function UsersAvatarGroup(
    {
      avatarGroupProps = {},
      avatarProps = {},
      imgKey = 'img',
      nameKey = 'name',
      onAvatarClick,
      users = [],
    },
    ref,
  ) {
    const clickable = onAvatarClick != null

    const handleKeyDown = (user: UserDataObject) => (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onAvatarClick?.(user)
      }
    }

    return (
      <Avatar.Group ref={ref} chained {...avatarGroupProps}>
        {users.map((user, index) => {
          const name = readString(user, nameKey)
          const src = readString(user, imgKey)
          const avatar = (
            <Avatar {...avatarProps} src={src || avatarProps.src} alt={avatarProps.alt ?? name}>
              {avatarProps.children ?? acronym(name)}
            </Avatar>
          )

          if (!clickable) return <span key={index}>{avatar}</span>

          return (
            <button
              key={index}
              type="button"
              className="dyl-users-avatar-group__button"
              aria-label={name ? `Select ${name}` : 'Select user'}
              onClick={() => onAvatarClick?.(user)}
              onKeyDown={handleKeyDown(user)}
            >
              {avatar}
            </button>
          )
        })}
      </Avatar.Group>
    )
  },
)

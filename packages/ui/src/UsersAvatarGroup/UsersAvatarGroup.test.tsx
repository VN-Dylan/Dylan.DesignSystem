import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { UsersAvatarGroup } from './UsersAvatarGroup'

const users = [
  { userName: 'Ron Vargas', avatarImg: '' },
  { userName: 'Carolyn Hanson', avatarImg: '' },
]

describe('UsersAvatarGroup', () => {
  it('renders user initials from custom keys', () => {
    render(<UsersAvatarGroup users={users} nameKey="userName" imgKey="avatarImg" />)
    expect(screen.getByText('RV')).toBeInTheDocument()
    expect(screen.getByText('CH')).toBeInTheDocument()
  })

  it('fires onAvatarClick with the user data', async () => {
    const onAvatarClick = vi.fn()
    render(
      <UsersAvatarGroup
        users={users}
        nameKey="userName"
        imgKey="avatarImg"
        onAvatarClick={onAvatarClick}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Select Ron Vargas' }))
    expect(onAvatarClick).toHaveBeenCalledTimes(1)
    expect(onAvatarClick).toHaveBeenCalledWith(users[0])
  })

  it('forwards ref to the avatar group element', () => {
    const ref = vi.fn()
    render(<UsersAvatarGroup ref={ref} users={users} nameKey="userName" />)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <UsersAvatarGroup
        users={users}
        nameKey="userName"
        imgKey="avatarImg"
        onAvatarClick={() => {}}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { AuthorityCheck } from './AuthorityCheck'

describe('AuthorityCheck', () => {
  it('renders children when user has authority', () => {
    render(
      <AuthorityCheck authority={['admin']} userAuthority={['admin']}>
        Secret
      </AuthorityCheck>,
    )
    expect(screen.getByText('Secret')).toBeInTheDocument()
  })

  it('hides children when user lacks authority', () => {
    render(
      <AuthorityCheck authority={['admin']} userAuthority={['member']}>
        Secret
      </AuthorityCheck>,
    )
    expect(screen.queryByText('Secret')).not.toBeInTheDocument()
  })

  it('allows access when no authority is required', () => {
    render(<AuthorityCheck userAuthority={[]}>Public</AuthorityCheck>)
    expect(screen.getByText('Public')).toBeInTheDocument()
  })

  it('forwards ref when authorized', () => {
    const ref = vi.fn()
    render(
      <AuthorityCheck ref={ref} authority={['admin']} userAuthority={['admin']}>
        Secret
      </AuthorityCheck>,
    )
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <AuthorityCheck authority={['admin']} userAuthority={['admin']}>
        <button type="button">Allowed action</button>
      </AuthorityCheck>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

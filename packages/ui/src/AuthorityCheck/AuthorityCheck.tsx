import { forwardRef } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { AuthorityCheckProps } from './types'
import './AuthorityCheck.scss'

const hasAccess = (
  authority: AuthorityCheckProps['authority'],
  userAuthority: AuthorityCheckProps['userAuthority'],
) => {
  if (!authority || authority.length === 0) return true
  if (!userAuthority || userAuthority.length === 0) return false
  return authority.some((role) => userAuthority.includes(role))
}

/**
 * AuthorityCheck renders children only when the user has one of the required
 * roles.
 */
export const AuthorityCheck = forwardRef<HTMLSpanElement, AuthorityCheckProps>(
  function AuthorityCheck(
    { authority = [], userAuthority = [], className, children, ...rest },
    ref,
  ) {
    if (!hasAccess(authority, userAuthority)) return null

    return (
      <span
        ref={ref}
        data-authorized
        className={classNames('dyl-authority-check', className)}
        {...rest}
      >
        {children}
      </span>
    )
  },
)

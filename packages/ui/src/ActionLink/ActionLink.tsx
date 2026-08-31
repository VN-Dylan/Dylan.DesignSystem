import { forwardRef } from 'react'
import { classNames } from '@dylan-ds/utils'
import type { ActionLinkProps, ActionLinkTo } from './types'
import './ActionLink.scss'

const getHref = (to: ActionLinkTo) =>
  typeof to === 'string' ? to : `${to.pathName}${to.search ?? ''}${to.hash ?? ''}`

const shouldReplace = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  target: string | undefined,
) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    target === '_blank' ||
    typeof window === 'undefined'
  ) {
    return false
  }

  return new URL(href, window.location.href).origin === window.location.origin
}

/**
 * ActionLink lets the user navigate by clicking or tapping a text link.
 */
export const ActionLink = forwardRef<HTMLAnchorElement, ActionLinkProps>(function ActionLink(
  {
    replace = false,
    state,
    themeColor = true,
    to,
    reloadDocument = false,
    className,
    onClick,
    target,
    rel,
    ...rest
  },
  ref,
) {
  const href = getHref(to)
  const safeRel = target === '_blank' && rel == null ? 'noreferrer' : rel

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={safeRel}
      data-theme-color={themeColor || undefined}
      className={classNames('dyl-action-link', className)}
      onClick={(event) => {
        onClick?.(event)
        if (replace && !reloadDocument && shouldReplace(event, href, target)) {
          event.preventDefault()
          window.history.replaceState(state ?? null, '', href)
        }
      }}
      {...rest}
    />
  )
})

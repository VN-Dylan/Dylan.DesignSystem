import type { ReactNode } from 'react'
import { classNames } from '@vn-dylan/utils'
import type { AvatarOmittedAvatarTooltipProps } from './types'

interface OmittedAvatarTooltipProps {
  enabled: boolean
  label: ReactNode
  tooltipProps?: AvatarOmittedAvatarTooltipProps
  children: ReactNode
}

// TODO: Replace this native-title fallback with the public Tooltip once it lands in packages/ui.
export function OmittedAvatarTooltip({
  enabled,
  label,
  tooltipProps,
  children,
}: OmittedAvatarTooltipProps) {
  if (!enabled) return <>{children}</>

  const title =
    tooltipProps?.title ??
    (typeof tooltipProps?.content === 'string'
      ? tooltipProps.content
      : typeof label === 'string'
        ? label
        : undefined)

  return (
    <span
      className={classNames('dyl-avatar-group__tooltip', tooltipProps?.className)}
      title={title}
    >
      {children}
    </span>
  )
}

import type { HTMLAttributes, ReactNode } from 'react'

export type AvatarShape = 'rounded-sm' | 'square' | 'circle'
export type AvatarSize = 'lg' | 'md' | 'sm' | number

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Shape of Avatar. @default 'rounded-sm' */
  shape?: AvatarShape
  /** Size of Avatar. @default 'md' */
  size?: AvatarSize
  /** Avatar Icon. */
  icon?: ReactNode
  /** Image url of Avatar image. */
  src?: string
  /** srcset attribute for Avatar image. */
  srcSet?: string
  /** alt attribute for Avatar image. */
  alt?: string
}

export interface AvatarOmittedAvatarTooltipProps {
  /** Tooltip text when native fallback tooltip is enabled. */
  title?: string
  /** Tooltip content reserved for the future public Tooltip component. */
  content?: ReactNode
  className?: string
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether to stack avatars within group. @default false */
  chained?: boolean
  /** Limited avatars to display & append an ommited avatar. @default 4 */
  maxCount?: number
  /** Custom omitted avatar content. @default '' */
  omittedAvatarContent?: string | ReactNode
  /** Omitted avatar props. */
  omittedAvatarProps?: Partial<AvatarProps>
  /** Whether to enable tooltip for omitted avatar. @default false */
  omittedAvatarTooltip?: boolean
  /** Callback when omitted avatar clicked. */
  onOmittedAvatarClick?: () => void
  /** Props for omitted avatar tooltip, refer to tooltip props for details. */
  omittedAvatarTooltipProps?: AvatarOmittedAvatarTooltipProps
}

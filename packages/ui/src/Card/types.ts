import type { HTMLAttributes, MouseEvent, ReactNode } from 'react'

export interface CardHeaderConfig {
  content?: string | ReactNode
  className?: string
  bordered?: boolean
  extra?: string | ReactNode
}

export interface CardFooterConfig {
  content?: string | ReactNode
  className?: string
  bordered?: boolean
}

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Card header config. */
  header?: CardHeaderConfig
  /** Card footer config. */
  footer?: CardFooterConfig
  /** Display Card with border (without shadow-sm). @default false */
  bordered?: boolean
  /** Make cursor become pointer upon hover. @default false */
  clickable?: boolean
  /** Apply class to card body. */
  bodyClass?: string
  /** Callback when Card is clicked. */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

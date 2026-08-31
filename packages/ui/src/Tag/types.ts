import type { HTMLAttributes, ReactNode } from 'react'

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'prefix'> {
  /** Tag prefix. @default false */
  prefix?: boolean | ReactNode
  /** Css class for Tag prefix, only available when prefix type is boolean. */
  prefixClass?: string
  /** Tag suffix. @default false */
  suffix?: boolean | ReactNode
  /** Css class for Tag suffix, only available when suffix type is boolean. */
  suffixClass?: string
}

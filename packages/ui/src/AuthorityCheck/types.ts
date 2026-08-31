import type { HTMLAttributes, ReactNode } from 'react'

export type AuthorityRole = string | number

export interface AuthorityCheckProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** List of roles that have rights to access the wrapped elements. @default [] */
  authority?: AuthorityRole[]
  /** List of the user roles. @default [] */
  userAuthority?: AuthorityRole[]
  children?: ReactNode
}

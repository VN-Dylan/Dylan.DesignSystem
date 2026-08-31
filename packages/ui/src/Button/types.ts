import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'default' | 'solid' | 'subtle' | 'plain' | 'link'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonShape = 'round' | 'circle' | 'none'

/** State passed to a `className` callback. */
export interface ButtonClassNameState {
  active: boolean
  unclickable: boolean
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'prefix'> {
  /** Visual style. @default 'default' */
  variant?: ButtonVariant
  /** @default 'md' */
  size?: ButtonSize
  /** Border radius treatment. @default 'round' */
  shape?: ButtonShape
  /** Render the button at full container width. */
  block?: boolean
  /** Force the active (pressed) appearance. */
  active?: boolean
  /** Show a spinner and disable interaction. */
  loading?: boolean
  /** Icon node rendered alongside (or instead of) the label. */
  icon?: ReactNode
  /** Which side the icon sits on. @default 'start' */
  iconAlignment?: 'start' | 'end'
  /** Brief scale-down animation on press. @default true */
  clickFeedback?: boolean
  /** String, or a callback receiving interaction state. */
  className?: string | ((state: ButtonClassNameState) => string)
}

import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type MotionElement = ElementType

export interface RevealProps extends HTMLAttributes<HTMLElement> {
  /** Element or component to render. @default 'div' */
  as?: MotionElement
  /** Entrance delay in seconds. @default 0 */
  delay?: number
  /** Vertical offset before reveal, in pixels. @default 16 */
  y?: number
  /** Animation duration in seconds. @default 0.5 */
  duration?: number
  className?: string
  children?: ReactNode
}

export interface StaggerProps extends HTMLAttributes<HTMLElement> {
  /** Element or component to render. @default 'div' */
  as?: MotionElement
  /** Child stagger interval in seconds. @default 0.08 */
  gap?: number
  /** Delay before child animations begin, in seconds. @default 0 */
  delayChildren?: number
  className?: string
  children?: ReactNode
}

export interface StaggerItemProps extends HTMLAttributes<HTMLElement> {
  /** Element or component to render. @default 'div' */
  as?: MotionElement
  /** Vertical offset before reveal, in pixels. @default 16 */
  y?: number
  className?: string
  children?: ReactNode
}

export interface ParallaxProps extends HTMLAttributes<HTMLDivElement> {
  /** Scroll translation strength from -1 to 1. @default 0.2 */
  speed?: number
  className?: string
  children?: ReactNode
}

export interface PageTransitionProps extends HTMLAttributes<HTMLDivElement> {
  /** Stable route key. Changing it lets AnimatePresence run exit/enter transitions. */
  transitionKey: string
  className?: string
  children?: ReactNode
}

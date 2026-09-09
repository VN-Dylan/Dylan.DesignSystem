import { useMemo, type ElementType } from 'react'
import { motion, type ForwardRefComponent, type MotionProps } from 'framer-motion'

type AnyMotionComponent = ForwardRefComponent<unknown, MotionProps & Record<string, unknown>>

export const useMotionComponent = (as: ElementType) =>
  useMemo(() => motion.create(as) as AnyMotionComponent, [as])

import { useCallback } from 'react'

export interface RandomColorClasses {
  background: string
  text: string
}

// Tailwind class pairs — deterministic per input string.
const palette: RandomColorClasses[] = [
  { background: 'bg-red-100 dark:bg-red-500/20', text: 'text-red-600 dark:text-red-100' },
  {
    background: 'bg-orange-100 dark:bg-orange-500/20',
    text: 'text-orange-600 dark:text-orange-100',
  },
  { background: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-600 dark:text-amber-100' },
  { background: 'bg-lime-100 dark:bg-lime-500/20', text: 'text-lime-600 dark:text-lime-100' },
  {
    background: 'bg-emerald-100 dark:bg-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-100',
  },
  { background: 'bg-cyan-100 dark:bg-cyan-500/20', text: 'text-cyan-600 dark:text-cyan-100' },
  { background: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-100' },
  {
    background: 'bg-indigo-100 dark:bg-indigo-500/20',
    text: 'text-indigo-600 dark:text-indigo-100',
  },
  {
    background: 'bg-violet-100 dark:bg-violet-500/20',
    text: 'text-violet-600 dark:text-violet-100',
  },
  { background: 'bg-pink-100 dark:bg-pink-500/20', text: 'text-pink-600 dark:text-pink-100' },
]

const hash = (str: string): number => {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h << 5) - h + str.charCodeAt(i)
  return Math.abs(h)
}

/**
 * Returns a generator that maps a string to a stable Tailwind colour-class pair.
 *
 * @example const gen = useRandomColor(); const { background, text } = gen(user.name)
 */
export function useRandomColor(): (name: string) => RandomColorClasses {
  return useCallback((name: string) => palette[hash(name) % palette.length]!, [])
}

export default useRandomColor

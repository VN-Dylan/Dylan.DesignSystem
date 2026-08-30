export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>

/**
 * Conditionally join class names. Accepts strings, arrays, and
 * `{ 'class': condition }` objects. Mirrors the `classNames` helper used
 * across the Eyris template.
 */
export function classNames(...args: ClassValue[]): string {
  const out: string[] = []

  for (const arg of args) {
    if (!arg) continue

    if (typeof arg === 'string' || typeof arg === 'number') {
      out.push(String(arg))
      continue
    }

    if (Array.isArray(arg)) {
      const inner = classNames(...arg)
      if (inner) out.push(inner)
      continue
    }

    if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) out.push(key)
      }
    }
  }

  return out.join(' ')
}

export default classNames

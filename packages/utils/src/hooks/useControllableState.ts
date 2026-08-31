import { useCallback, useRef, useState } from 'react'

export interface UseControllableStateOptions<T> {
  /** Controlled value. When `undefined`, the hook manages state internally. */
  value?: T
  /** Initial value for the uncontrolled case. */
  defaultValue: T | (() => T)
  /** Called whenever the value changes, in both modes. */
  onChange?: (value: T) => void
}

/**
 * Bridge controlled and uncontrolled component state — the pattern every form
 * component in the system uses. Returns the current value and a setter that
 * updates internal state (uncontrolled) and always fires `onChange`.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, (next: T | ((prev: T) => T)) => void] {
  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue)

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const current = isControlled ? (value as T) : uncontrolled

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved = typeof next === 'function' ? (next as (prev: T) => T)(current) : next
      if (!isControlled) setUncontrolled(resolved)
      onChangeRef.current?.(resolved)
    },
    [current, isControlled],
  )

  return [current, setValue]
}

export default useControllableState

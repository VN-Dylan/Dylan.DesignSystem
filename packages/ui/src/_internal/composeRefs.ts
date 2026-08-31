import type { MutableRefObject, Ref, RefCallback } from 'react'

const setRef = <T>(ref: Ref<T> | undefined, value: T | null) => {
  if (!ref) return
  if (typeof ref === 'function') {
    ref(value)
    return
  }
  ;(ref as MutableRefObject<T | null>).current = value
}

export const composeRefs =
  <T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> =>
  (value) => {
    refs.forEach((ref) => setRef(ref, value))
  }

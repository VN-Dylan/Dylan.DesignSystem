import { useEffect, useRef } from 'react'

/**
 * Run `callback` every `delay` ms. Pass `delay = null` to pause. The interval id
 * is returned via a ref for manual control.
 *
 * @example useInterval(() => tick(), 1000)
 */
export function useInterval(
  callback: () => void,
  delay: number | null,
): React.MutableRefObject<ReturnType<typeof setInterval> | undefined> {
  const savedCallback = useRef(callback)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    intervalRef.current = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(intervalRef.current)
  }, [delay])

  return intervalRef
}

export default useInterval

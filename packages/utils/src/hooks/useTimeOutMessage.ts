import { useEffect, useState } from 'react'

/**
 * A string message that clears itself after `interval` ms.
 *
 * @example const [error, setError] = useTimeOutMessage()
 */
export function useTimeOutMessage(interval = 3000): [string, (msg: string) => void] {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(''), interval)
    return () => clearTimeout(timer)
  }, [message, interval])

  return [message, setMessage]
}

export default useTimeOutMessage

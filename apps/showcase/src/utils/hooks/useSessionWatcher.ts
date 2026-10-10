import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

/** setTimeout's ceiling (~24.8 days); longer sessions are re-checked on wake. */
const MAX_TIMEOUT = 2 ** 31 - 1

/**
 * Ends the session the moment it expires — on a timer, and again when the tab
 * regains focus (timers are throttled in background tabs). Route guards then
 * redirect to sign-in, which shows the "session expired" notice.
 */
export function useSessionWatcher() {
  const expiresAt = useAuthStore((s) => s.session?.expiresAt)
  const expire = useAuthStore((s) => s.expire)

  useEffect(() => {
    if (expiresAt == null) return
    const check = () => {
      if (Date.now() >= expiresAt) expire()
    }
    check()
    const timer = window.setTimeout(check, Math.min(expiresAt - Date.now(), MAX_TIMEOUT))
    const onVisible = () => {
      if (document.visibilityState === 'visible') check()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [expiresAt, expire])
}

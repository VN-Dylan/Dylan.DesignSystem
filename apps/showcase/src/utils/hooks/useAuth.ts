import { useAuthStore, type AuthUser } from '@/store/authStore'

export interface UseAuthResult {
  authenticated: boolean
  user: AuthUser | null
  /** True when `user.authority` intersects the required tags (or none required). */
  can: (required?: string[]) => boolean
  signIn: () => void
  signOut: () => void
}

/**
 * App-coupled auth accessor (Eyris `useAuth`). Backed by the mock `authStore` —
 * there is no real backend in the showcase.
 */
export function useAuth(): UseAuthResult {
  const signedIn = useAuthStore((s) => s.signedIn)
  const user = useAuthStore((s) => s.user)
  const signIn = useAuthStore((s) => s.signIn)
  const signOut = useAuthStore((s) => s.signOut)

  const can = (required?: string[]) => {
    if (!required || required.length === 0) return true
    const held = new Set(user?.authority ?? [])
    return required.some((tag) => held.has(tag))
  }

  return { authenticated: signedIn, user, can, signIn, signOut }
}

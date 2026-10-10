import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthError, authAdapter, type AuthErrorCode, type Credentials, type Session } from '@/auth'

export type { AuthUser } from '@/auth'

export interface AuthState {
  session: Session | null
  /** `pending` while a sign-in request is in flight. */
  status: 'idle' | 'pending'
  error: AuthErrorCode | null
  /** Sign in through the configured adapter. Resolves to `true` on success. */
  signIn: (credentials: Credentials) => Promise<boolean>
  signOut: () => Promise<void>
  /** Drop an expired session locally and record why. */
  expire: () => void
  clearError: () => void
}

export const isSessionValid = (session: Session | null, now = Date.now()): session is Session =>
  session != null && session.expiresAt > now

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      status: 'idle',
      error: null,

      signIn: async (credentials) => {
        set({ status: 'pending', error: null })
        try {
          const session = await authAdapter.signIn(credentials)
          set({ session, status: 'idle' })
          return true
        } catch (error) {
          set({
            status: 'idle',
            error: error instanceof AuthError ? error.code : 'network',
          })
          return false
        }
      },

      signOut: async () => {
        const { session } = get()
        set({ session: null, error: null })
        if (session) await authAdapter.signOut(session).catch(() => undefined)
      },

      expire: () => set({ session: null, error: 'expired' }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'dylan-showcase-auth',
      version: 2,
      // Only the session survives a reload; v1 stored a different shape.
      partialize: (state) => ({ session: state.session }),
      migrate: () => ({ session: null }),
    },
  ),
)

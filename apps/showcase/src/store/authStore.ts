import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string
  /** Authority tags consumed by `<AuthorityCheck>` and route guards. */
  authority: string[]
}

const DEMO_USER: AuthUser = {
  id: 'u-001',
  name: 'Dylan Carter',
  email: 'dylan@vn-dylan.dev',
  avatar: 'https://i.pravatar.cc/128?img=12',
  authority: ['admin', 'user'],
}

export interface AuthState {
  signedIn: boolean
  user: AuthUser | null
  /** Sign in with the bundled demo account (no real backend). */
  signIn: () => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      signedIn: true,
      user: DEMO_USER,
      signIn: () => set({ signedIn: true, user: DEMO_USER }),
      signOut: () => set({ signedIn: false, user: null }),
    }),
    { name: 'dylan-showcase-auth' },
  ),
)

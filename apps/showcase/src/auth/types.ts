import type { Role } from '@/configs/access.config'

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string
  roles: Role[]
}

export interface Credentials {
  email: string
  password: string
  /** Keep the session for `rememberDays` instead of `sessionHours`. */
  remember?: boolean
}

export interface Session {
  user: AuthUser
  /** Bearer token for API calls. */
  token: string
  /** Epoch ms after which the session is no longer valid. */
  expiresAt: number
}

export type AuthErrorCode = 'invalid_credentials' | 'network' | 'expired'

export class AuthError extends Error {
  constructor(public code: AuthErrorCode) {
    super(code)
    this.name = 'AuthError'
  }
}

/**
 * The seam between the app and an identity backend. Implement it for a real
 * API (REST, OAuth/OIDC, Firebase…) and register it in `auth/index.ts`; the
 * store, guards and screens stay unchanged.
 */
export interface AuthAdapter {
  /** Exchange credentials for a session. Reject with `AuthError` on failure. */
  signIn(credentials: Credentials): Promise<Session>
  /** Revoke the session server-side. Must not throw if it is already gone. */
  signOut(session: Session): Promise<void>
  /** Optional: extend a session that is about to expire. */
  refresh?(session: Session): Promise<Session>
}

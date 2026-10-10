import { mockAuthAdapter } from './mockAdapter'
import type { AuthAdapter } from './types'

/**
 * The adapter the app signs in with. Swap `mockAuthAdapter` for an
 * implementation backed by your API — nothing else needs to change.
 */
export const authAdapter: AuthAdapter = mockAuthAdapter

export { AuthError } from './types'
export type { AuthAdapter, AuthErrorCode, AuthUser, Credentials, Session } from './types'
export { DEMO_PASSWORD, demoUsers } from './mockAdapter'

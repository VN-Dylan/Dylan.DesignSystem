import { AuthError, type AuthAdapter, type AuthUser, type Session } from './types'

/** Password shared by every demo account. */
export const DEMO_PASSWORD = 'demo1234'

/** Demo accounts, one per role, so permission differences can be tried out. */
export const demoUsers: AuthUser[] = [
  {
    id: 'u-001',
    name: 'Dylan Carter',
    email: 'admin@vn-dylan.dev',
    avatar: 'https://i.pravatar.cc/128?img=12',
    roles: ['admin'],
  },
  {
    id: 'u-002',
    name: 'Linh Tran',
    email: 'editor@vn-dylan.dev',
    avatar: 'https://i.pravatar.cc/128?img=45',
    roles: ['editor'],
  },
  {
    id: 'u-003',
    name: 'Sam Okafor',
    email: 'viewer@vn-dylan.dev',
    avatar: 'https://i.pravatar.cc/128?img=33',
    roles: ['viewer'],
  },
]

const HOUR = 60 * 60 * 1000
const sessionHours = 8
const rememberDays = 30

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const randomToken = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(24)), (b) =>
    b.toString(16).padStart(2, '0'),
  ).join('')

/** In-memory adapter: no network, fixed demo accounts, simulated latency. */
export const mockAuthAdapter: AuthAdapter = {
  async signIn({ email, password, remember }) {
    await delay(400)
    const user = demoUsers.find((u) => u.email === email.trim().toLowerCase())
    if (!user || password !== DEMO_PASSWORD) throw new AuthError('invalid_credentials')
    const ttl = remember ? rememberDays * 24 * HOUR : sessionHours * HOUR
    return { user, token: randomToken(), expiresAt: Date.now() + ttl }
  },

  async signOut() {
    await delay(100)
  },

  async refresh(session: Session) {
    await delay(200)
    return { ...session, token: randomToken(), expiresAt: Date.now() + sessionHours * HOUR }
  },
}

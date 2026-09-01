/**
 * Canonical internal-staff roster — the single source of truth for the people
 * who appear across the `accounts` (team members), `hrm` (employees) and
 * `projects` (assignees) areas. Each area mock layers its own role / status /
 * schedule fields on top of `personFields(key)`.
 *
 * Static and deterministic: avatars are stable pravatar ids, distinct from the
 * client-contact avatars used in `customers.ts`.
 */

const avatar = (id: number) => `https://i.pravatar.cc/96?img=${id}`

export interface Person {
  /** Stable slug key used to cross-reference this person from area mocks. */
  key: string
  name: string
  email: string
  avatar: string
  /** Default job title — HR uses it verbatim; other areas pass their own label. */
  title: string
}

export const team = [
  {
    key: 'dylan-carter',
    name: 'Dylan Carter',
    email: 'dylan@dylan-ds.dev',
    avatar: avatar(12),
    title: 'Engineering Lead',
  },
  {
    key: 'emma-novak',
    name: 'Emma Novak',
    email: 'emma@dylan-ds.dev',
    avatar: avatar(24),
    title: 'Head of Product',
  },
  {
    key: 'aisha-rahman',
    name: 'Aisha Rahman',
    email: 'aisha@dylan-ds.dev',
    avatar: avatar(45),
    title: 'Senior Product Designer',
  },
  {
    key: 'ben-ortiz',
    name: 'Ben Ortiz',
    email: 'ben@dylan-ds.dev',
    avatar: avatar(15),
    title: 'Frontend Engineer',
  },
  {
    key: 'chloe-kim',
    name: 'Chloe Kim',
    email: 'chloe@dylan-ds.dev',
    avatar: avatar(32),
    title: 'Backend Engineer',
  },
  {
    key: 'diego-santos',
    name: 'Diego Santos',
    email: 'diego@dylan-ds.dev',
    avatar: avatar(68),
    title: 'QA Engineer',
  },
  {
    key: 'farid-haddad',
    name: 'Farid Haddad',
    email: 'farid@dylan-ds.dev',
    avatar: avatar(59),
    title: 'Account Executive',
  },
  {
    key: 'grace-mensah',
    name: 'Grace Mensah',
    email: 'grace@dylan-ds.dev',
    avatar: avatar(20),
    title: 'Support Specialist',
  },
  {
    key: 'henrik-alvan',
    name: 'Henrik Alván',
    email: 'henrik@dylan-ds.dev',
    avatar: avatar(52),
    title: 'People Operations',
  },
  {
    key: 'ivy-chen',
    name: 'Ivy Chen',
    email: 'ivy@dylan-ds.dev',
    avatar: avatar(41),
    title: 'Product Designer',
  },
] satisfies Person[]

export type PersonKey = (typeof team)[number]['key']

const byKey = new Map(team.map((person) => [person.key, person]))

/** Full canonical record for a staff key. Throws on an unknown key (mock-time bug). */
export const person = (key: PersonKey): Person => {
  const found = byKey.get(key)
  if (!found) throw new Error(`Unknown team member: ${key}`)
  return found
}

/** Just the shared identity fields, for spreading into an area-specific record. */
export const personFields = (key: PersonKey): Pick<Person, 'name' | 'email' | 'avatar'> => {
  const { name, email, avatar: personAvatar } = person(key)
  return { name, email, avatar: personAvatar }
}

/** Resolve a display name from a key (falls back to the key for unknown values). */
export const personName = (key: PersonKey): string => byKey.get(key)?.name ?? key

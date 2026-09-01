/**
 * Mock data for the `ai` showcase area. Static and deterministic — canned
 * assistant output, no real model calls.
 */

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  time: string
}

export interface Conversation {
  id: string
  title: string
  updated: string
  messages: ChatMessage[]
}

export const conversations: Conversation[] = [
  {
    id: 'conv-01',
    title: 'Release notes draft',
    updated: '2026-08-31T09:10:00Z',
    messages: [
      {
        id: 'm-1',
        role: 'user',
        content: 'Summarise this week’s merged PRs into release notes.',
        time: '2026-08-31T09:02:00Z',
      },
      {
        id: 'm-2',
        role: 'assistant',
        content:
          'Here’s a draft:\n\n**Added**\n- DataTable server-side paging API\n- Token-derived chart palette\n\n**Fixed**\n- Progress circle rotation\n- VectorMap choropleth colours\n\nWant it grouped by package instead?',
        time: '2026-08-31T09:03:00Z',
      },
      {
        id: 'm-3',
        role: 'user',
        content: 'Group by package, keep it terse.',
        time: '2026-08-31T09:09:00Z',
      },
      {
        id: 'm-4',
        role: 'assistant',
        content:
          '**@dylan-ds/ui** — DataTable paging API; Progress + VectorMap fixes.\n**@dylan-ds/tokens** — no changes.\n**showcase** — analytics + crypto areas.',
        time: '2026-08-31T09:10:00Z',
      },
    ],
  },
  {
    id: 'conv-02',
    title: 'Naming a new hook',
    updated: '2026-08-29T14:40:00Z',
    messages: [
      {
        id: 'm-5',
        role: 'user',
        content: 'A hook that debounces a value AND tracks whether it’s settling — name ideas?',
        time: '2026-08-29T14:38:00Z',
      },
      {
        id: 'm-6',
        role: 'assistant',
        content:
          '`useSettledValue`, `useDebouncedState`, `useLaggedValue`, `usePendingValue`. I’d pick `useSettledValue` — it names the useful output (has it settled) rather than the mechanism.',
        time: '2026-08-29T14:40:00Z',
      },
    ],
  },
  {
    id: 'conv-03',
    title: 'Accessibility review checklist',
    updated: '2026-08-25T11:15:00Z',
    messages: [
      {
        id: 'm-7',
        role: 'user',
        content: 'Give me a short a11y checklist for a new form component.',
        time: '2026-08-25T11:14:00Z',
      },
      {
        id: 'm-8',
        role: 'assistant',
        content:
          '1. Every control has a programmatic label.\n2. Focus is visible and order is logical.\n3. Errors are announced (aria-live) and linked (aria-describedby).\n4. Hit targets ≥ 24px.\n5. Works at 200% zoom and in forced-colors.',
        time: '2026-08-25T11:15:00Z',
      },
    ],
  },
]

export const suggestedPrompts = [
  'Draft a changelog entry from a diff',
  'Explain this TypeScript error',
  'Write unit tests for a React hook',
  'Turn these notes into a spec',
]

export interface GeneratedImage {
  id: string
  prompt: string
  ratio: '1:1' | '3:2' | '2:3'
  seed: number
  createdBy: string
  createdAt: string
}

export const imageHistory: GeneratedImage[] = [
  {
    id: 'img-01',
    prompt: 'Isometric illustration of a design-system component library, soft blue palette',
    ratio: '1:1',
    seed: 48213,
    createdBy: 'Aisha Rahman',
    createdAt: '2026-08-30',
  },
  {
    id: 'img-02',
    prompt: 'Minimal hero background, abstract gradient mesh, brand blue',
    ratio: '3:2',
    seed: 90144,
    createdBy: 'Ben Ortiz',
    createdAt: '2026-08-29',
  },
  {
    id: 'img-03',
    prompt: 'Friendly robot mascot reading documentation, flat style',
    ratio: '2:3',
    seed: 11987,
    createdBy: 'Dylan Carter',
    createdAt: '2026-08-27',
  },
  {
    id: 'img-04',
    prompt: 'Dashboard screenshot mockup on a floating device, dramatic lighting',
    ratio: '3:2',
    seed: 55620,
    createdBy: 'Aisha Rahman',
    createdAt: '2026-08-24',
  },
]

export const imageStyles = ['Auto', 'Illustration', 'Photographic', '3D render', 'Line art']

export interface Draft {
  id: string
  title: string
  kind: 'Blog post' | 'Email' | 'Doc' | 'Social'
  words: number
  updated: string
  excerpt: string
  /** Full draft body, paragraphs separated by blank lines. */
  body: string
}

export const drafts: Draft[] = [
  {
    id: 'd-01',
    title: 'Announcing the Dylan Design System',
    kind: 'Blog post',
    words: 640,
    updated: '2026-08-31',
    excerpt:
      'After six phases of work, the Dylan Design System reaches its first internal milestone…',
    body: [
      'After six phases of work, the Dylan Design System reaches its first internal milestone: 84 components, 32 utilities and a runtime theming layer, all rebuilt from the ground up with no external UI-kit dependency.',
      'Every primitive ships with types, tests, a Storybook page and an autodoc entry. Light, dark and RTL are designed together — a change that only works in one mode is treated as unfinished.',
      'Next up is the handbook and a QA hardening pass. Feedback on the component API and the token names is welcome in #design-system before we cut the first tagged release.',
    ].join('\n\n'),
  },
  {
    id: 'd-02',
    title: 'Q3 customer newsletter',
    kind: 'Email',
    words: 320,
    updated: '2026-08-28',
    excerpt: 'This quarter we shipped runtime theming, a full component library and…',
    body: [
      'This quarter we shipped runtime theming with eight preset colour schemas, a full component library and a showcase app that rebuilds every example screen on the new system.',
      'Data tables now support server-driven paging and sorting, and charts pick their colours and grid straight from the design tokens so they stay on-brand in every theme.',
      'As always, reply to this email with anything you would like to see next — we read every response.',
    ].join('\n\n'),
  },
  {
    id: 'd-03',
    title: 'Contributing guide — first draft',
    kind: 'Doc',
    words: 910,
    updated: '2026-08-22',
    excerpt: 'Every component follows the RECIPE. Start by reading the golden five…',
    body: [
      'Every component follows the RECIPE. Start by reading the golden five — Button, Input, Card, Dialog and Table — to see the file layout, the SCSS conventions and how state flows through context.',
      'Create the component directory with the standard file set: the component, its types, tests, a story and an autodoc page. Tests end with an axe assertion; stories cover every variant and size.',
      'Open a changeset with your PR. All @dylan-ds/* packages version in lockstep, so even a docs-only change needs a patch entry.',
    ].join('\n\n'),
  },
]

export const writerTones = ['Neutral', 'Friendly', 'Formal', 'Punchy', 'Technical']

export const aiUsage = {
  requestsThisMonth: 4_820,
  requestsLimit: 10_000,
  tokensThisMonth: 2_140_000,
}

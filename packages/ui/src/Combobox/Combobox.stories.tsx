import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Combobox } from './Combobox'
import type { ComboboxOption } from './types'

const meta = {
  title: 'Forms/Combobox',
  component: Combobox,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const COUNTRIES: ComboboxOption[] = [
  'Australia',
  'Brazil',
  'Canada',
  'Denmark',
  'Egypt',
  'France',
  'Germany',
  'India',
  'Japan',
  'Kenya',
  'Mexico',
  'Norway',
  'Portugal',
  'Singapore',
  'Spain',
  'Thailand',
  'Vietnam',
].map((name) => ({ value: name.toLowerCase(), label: name }))

/** Static options filtered as you type. ↑/↓ to move, Enter to pick, Esc to close. */
export const Basic: Story = {
  args: {
    'aria-label': 'Country',
    placeholder: 'Choose a country',
    options: COUNTRIES,
  },
}

/** `multiple`: picks become removable tags; Backspace on an empty input removes the last. */
export const MultipleTags: Story = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<ComboboxOption[]>([COUNTRIES[16]!, COUNTRIES[8]!])
      return (
        <Combobox
          aria-label="Markets"
          placeholder="Add markets"
          multiple
          maxTags={4}
          options={COUNTRIES}
          value={value}
          onChange={setValue}
        />
      )
    }
    return <Demo />
  },
}

interface Customer {
  id: string
  name: string
  email: string
}

const CUSTOMERS: Customer[] = Array.from({ length: 400 }, (_, i) => {
  const first = ['Emma', 'Ben', 'Aisha', 'Dylan', 'Grace', 'Omar', 'Mia', 'Linh', 'Kenji', 'Sara'][
    i % 10
  ]!
  const last = [
    'Novak',
    'Ortiz',
    'Rahman',
    'Carter',
    'Lin',
    'Haddad',
    'Tanaka',
    'Nguyen',
    'Sato',
    'Rossi',
  ][Math.floor(i / 10) % 10]!
  return {
    id: `c${i}`,
    name: `${first} ${last}`,
    email: `${first}.${last}${i}@example.com`.toLowerCase(),
  }
})

/** Pretend API: 500 ms latency, respects the abort signal. */
const searchCustomers = (query: string, { signal }: { signal: AbortSignal }) =>
  new Promise<ComboboxOption[]>((resolve, reject) => {
    const timer = setTimeout(() => {
      const q = query.toLowerCase()
      resolve(
        CUSTOMERS.filter((c) => c.name.toLowerCase().includes(q) || c.email.includes(q))
          .slice(0, 20)
          .map((c) => ({ value: c.id, label: c.name, description: c.email })),
      )
    }, 500)
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })

/** Remote search: debounced, stale requests aborted, loading / empty / min-length states. */
export const AsyncSearch: Story = {
  args: {
    'aria-label': 'Customer',
    placeholder: 'Search 400 customers by name or email',
    loadOptions: searchCustomers,
    minQueryLength: 2,
  },
}

/** Remote search + multiple tags, e.g. adding recipients. */
export const AsyncMultiple: Story = {
  render: () => (
    <Combobox
      aria-label="Recipients"
      placeholder="Add recipients"
      multiple
      loadOptions={searchCustomers}
      minQueryLength={1}
    />
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-base">
      <Combobox aria-label="Invalid" invalid options={COUNTRIES} placeholder="Invalid" />
      <Combobox aria-label="Disabled" disabled options={COUNTRIES} defaultValue={COUNTRIES[0]} />
      <Combobox
        aria-label="Failing"
        placeholder="Open me — the request fails"
        loadOptions={() => Promise.reject(new Error('Network down'))}
        debounce={0}
      />
    </div>
  ),
}

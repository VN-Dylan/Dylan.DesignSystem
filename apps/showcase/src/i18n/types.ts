import type { en } from './messages/en'

type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> }

/** Shape every locale must match: same keys as English, any string values. */
export type Messages = Widen<Omit<typeof en, 'nav'>> & { nav: Record<string, string> }

type Paths<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${Paths<T[K]>}`
}[keyof T & string]

/** Every translatable key, e.g. `customers.form.name`. Navigation uses `navTitle`. */
export type MessageKey = Paths<Omit<typeof en, 'nav'>>

export type MessageValues = Record<string, string | number>

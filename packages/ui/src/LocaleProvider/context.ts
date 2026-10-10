import { createContext, useContext } from 'react'
import { en } from './en'
import type { LocaleContextValue, UiMessages } from './types'

export const LocaleContext = createContext<LocaleContextValue>({ locale: 'en', messages: en })

/** Current locale tag and component messages. Works without a provider (English). */
export const useLocale = () => useContext(LocaleContext)

/** One message group, e.g. `useUiMessages('dataTable')`. */
export const useUiMessages = <K extends keyof UiMessages>(group: K): UiMessages[K] =>
  useContext(LocaleContext).messages[group]

import { en } from './en'
import { vi } from './vi'
import type { UiMessages } from './types'

const bundled: Record<string, UiMessages> = { en, vi }

/** Bundled messages for a tag: exact match, then its language, then English. */
export const getUiMessages = (locale: string): UiMessages =>
  bundled[locale] ?? bundled[locale.split('-')[0]!.toLowerCase()] ?? en

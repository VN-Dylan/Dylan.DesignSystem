import { createContext, useContext } from 'react'
import type { DatePickerContextValue } from './types'

export const DatePickerContext = createContext<DatePickerContextValue | null>(null)

export const useDatePickerContext = () => useContext(DatePickerContext)

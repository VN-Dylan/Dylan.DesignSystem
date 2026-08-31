import type { NumberFormatValue } from './types'

// TODO: Replace this shim with react-number-format when that dependency is allowed.
export const toRawString = (value: string | number | undefined): string =>
  value == null ? '' : String(value)

export const numericCharacters = (value: string): string => value.replace(/\D/g, '')

export const toFloatValue = (value: string): number | undefined => {
  if (value === '' || value === '-' || value === '.' || value === '-.') return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export const createValueChange = (value: string, formattedValue: string): NumberFormatValue => {
  const floatValue = toFloatValue(value)
  return floatValue === undefined
    ? { value, formattedValue }
    : { value, formattedValue, floatValue }
}

export const getMaskCharacter = (
  mask: string | string[] | undefined,
  index: number,
): string | undefined => {
  if (Array.isArray(mask)) return mask[index]
  return mask
}

export const applyPatternFormat = ({
  value,
  format,
  allowEmptyFormatting,
  mask,
  patternChar = '#',
}: {
  value: string
  format?: string
  allowEmptyFormatting?: boolean
  mask?: string | string[]
  patternChar?: string
}) => {
  if (!format) return value
  if (!value && !allowEmptyFormatting) return ''

  let valueIndex = 0
  let patternIndex = 0
  let output = ''

  for (const character of format) {
    if (character !== patternChar) {
      if (allowEmptyFormatting || valueIndex > 0 || valueIndex < value.length) output += character
      continue
    }

    const next = value[valueIndex]
    if (next != null) {
      output += next
      valueIndex += 1
    } else {
      const maskCharacter = getMaskCharacter(mask, patternIndex)
      if (allowEmptyFormatting && maskCharacter) output += maskCharacter
    }
    patternIndex += 1
  }

  return output
}

export const getGroupSize = (style: 'thousand' | 'lakh' | 'wan' | 'none' | undefined) => {
  if (style === 'lakh') return 2
  if (style === 'wan') return 4
  if (style === 'none') return 0
  return 3
}

export const applyNumericFormat = ({
  value,
  thousandSeparator,
  decimalSeparator = '.',
  thousandsGroupStyle,
  decimalScale,
  fixedDecimalScale,
  prefix = '',
  suffix = '',
}: {
  value: string
  thousandSeparator?: boolean | string
  decimalSeparator?: string
  thousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none'
  decimalScale?: number
  fixedDecimalScale?: boolean
  prefix?: string
  suffix?: string
}) => {
  if (!value || value === '-') return value

  const sign = value.startsWith('-') ? '-' : ''
  const unsigned = sign ? value.slice(1) : value
  const [integerPart = '', decimalPart = ''] = unsigned.split('.')
  const separator =
    thousandSeparator === true
      ? ','
      : typeof thousandSeparator === 'string'
        ? thousandSeparator
        : ''
  const groupSize = separator ? getGroupSize(thousandsGroupStyle) : 0

  let grouped = integerPart
  if (groupSize > 0 && integerPart.length > groupSize) {
    const groups: string[] = []
    let cursor = integerPart.length
    while (cursor > 0) {
      const nextCursor = Math.max(cursor - groupSize, 0)
      groups.unshift(integerPart.slice(nextCursor, cursor))
      cursor = nextCursor
    }
    grouped = groups.join(separator)
  }

  let decimals = decimalPart
  if (decimalScale != null) decimals = decimals.slice(0, decimalScale)
  if (fixedDecimalScale && decimalScale != null) decimals = decimals.padEnd(decimalScale, '0')

  // Keep a lone trailing separator visible so it survives mid-typing (e.g. "12.").
  const hasTrailingSeparator = unsigned.endsWith('.') && decimals === ''

  const withDecimal =
    decimals || fixedDecimalScale || hasTrailingSeparator
      ? `${grouped}${decimalSeparator}${decimals}`
      : grouped
  return `${prefix}${sign}${withDecimal}${suffix}`
}

export const normalizeNumericInput = ({
  value,
  decimalSeparator = '.',
  allowedDecimalSeparators,
  decimalScale,
  allowNegative = true,
  allowLeadingZeros,
}: {
  value: string
  decimalSeparator?: string
  allowedDecimalSeparators?: string[]
  decimalScale?: number
  allowNegative?: boolean
  allowLeadingZeros?: boolean
}) => {
  const decimalCharacters = new Set([decimalSeparator, '.', ...(allowedDecimalSeparators ?? [])])
  let normalized = ''
  let hasDecimal = false

  for (const character of value) {
    if (/\d/.test(character)) {
      normalized += character
      continue
    }
    if (decimalCharacters.has(character) && !hasDecimal) {
      normalized += '.'
      hasDecimal = true
      continue
    }
    if (character === '-' && allowNegative && normalized === '') normalized = '-'
  }

  if (decimalScale != null && normalized.includes('.')) {
    const [integerPart = '', decimalPart = ''] = normalized.split('.')
    normalized = `${integerPart}.${decimalPart.slice(0, decimalScale)}`
  }

  if (!allowLeadingZeros) {
    const sign = normalized.startsWith('-') ? '-' : ''
    const unsigned = sign ? normalized.slice(1) : normalized
    const [integerPart = '', decimalPart] = unsigned.split('.')
    const compactInteger = integerPart.replace(/^0+(?=\d)/, '')
    normalized = `${sign}${compactInteger}${decimalPart == null ? '' : `.${decimalPart}`}`
  }

  return normalized
}

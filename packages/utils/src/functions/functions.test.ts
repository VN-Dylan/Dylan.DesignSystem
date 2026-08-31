import { describe, expect, it } from 'vitest'
import { acronym } from './acronym'
import { isLastChild } from './isLastChild'
import { paginate } from './paginate'
import { sortBy } from './sortBy'
import { wildCardSearch } from './wildCardSearch'
import { fileSizeUnit } from './fileSizeUnit'
import { getContrast } from './getContrast'
import { formatCurrency } from './formatCurrency'
import { formatNumber } from './formatNumber'
import { formatCurrencyCompact } from './formatCurrencyCompact'
import { formatRelativeTime } from './formatRelativeTime'

describe('acronym', () => {
  it('takes first + last initials', () => {
    expect(acronym('Vickie Kim')).toBe('VK')
  })
  it('handles a single word', () => {
    expect(acronym('Madonna')).toBe('MA')
  })
  it('returns empty for empty input', () => {
    expect(acronym('')).toBe('')
  })
})

describe('isLastChild', () => {
  it('detects the last index', () => {
    expect(isLastChild([1, 2, 3, 4, 5], 4)).toBe(true)
    expect(isLastChild([1, 2, 3, 4, 5], 3)).toBe(false)
  })
})

describe('paginate', () => {
  it('returns the requested page (1-based)', () => {
    expect(paginate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 2)).toEqual([4, 5, 6])
  })
})

describe('sortBy', () => {
  it('sorts objects by key ascending', () => {
    const arr = [{ n: 'Ron' }, { n: 'Ann' }, { n: 'Mia' }]
    expect(arr.sort(sortBy('n')).map((x) => x.n)).toEqual(['Ann', 'Mia', 'Ron'])
  })
  it('reverses when asked', () => {
    const arr = [{ n: 'a' }, { n: 'c' }, { n: 'b' }]
    expect(arr.sort(sortBy('n', true)).map((x) => x.n)).toEqual(['c', 'b', 'a'])
  })
})

describe('wildCardSearch', () => {
  const people = [
    { name: 'Terrance Moreno', email: 't@x.io' },
    { name: 'Ron Vargas', email: 'r@x.io' },
  ]
  it('finds case-insensitive substring matches', () => {
    expect(wildCardSearch(people, 'terran')).toHaveLength(1)
  })
  it('returns all for empty input', () => {
    expect(wildCardSearch(people, '')).toHaveLength(2)
  })
})

describe('fileSizeUnit', () => {
  it('formats SI units', () => {
    expect(fileSizeUnit(1500)).toBe('1.5 kB')
  })
  it('formats bytes below threshold', () => {
    expect(fileSizeUnit(512)).toBe('512 B')
  })
})

describe('getContrast', () => {
  it('classifies light and dark', () => {
    expect(getContrast('#ffffff')).toBe('light')
    expect(getContrast('#000')).toBe('dark')
    expect(getContrast('rgb(0, 0, 0)')).toBe('dark')
  })
})

describe('formatCurrency / formatNumber', () => {
  it('formats currency with no decimals by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,235')
  })
  it('abbreviates large numbers', () => {
    expect(formatNumber(1_500_000)).toBe('1.50M')
    expect(formatNumber(999)).toBe('999')
  })
  it('compacts currency above 1000', () => {
    expect(formatCurrencyCompact(500)).toBe('$500')
    expect(formatCurrencyCompact(2_500_000)).toBe('2.50M')
  })
})

describe('formatRelativeTime', () => {
  it('reports just now for recent times', () => {
    expect(formatRelativeTime(new Date())).toBe('just now')
  })
  it('reports minutes ago', () => {
    expect(formatRelativeTime(Date.now() - 5 * 60 * 1000)).toMatch(/5 minutes ago/)
  })
})

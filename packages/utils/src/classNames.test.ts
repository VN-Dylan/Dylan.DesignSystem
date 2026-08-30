import { describe, expect, it } from 'vitest'
import { classNames } from './classNames'

describe('classNames', () => {
  it('joins truthy strings', () => {
    expect(classNames('a', 'b')).toBe('a b')
  })

  it('drops falsy values', () => {
    expect(classNames('a', false, null, undefined, '', 'b')).toBe('a b')
  })

  it('handles object syntax', () => {
    expect(classNames('base', { active: true, disabled: false })).toBe('base active')
  })

  it('flattens nested arrays', () => {
    expect(classNames(['a', ['b', { c: true }]], 'd')).toBe('a b c d')
  })
})

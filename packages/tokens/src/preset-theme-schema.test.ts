import { describe, expect, it } from 'vitest'
import { presetThemeSchema, themeSchemaToCssVars } from './preset-theme-schema'

describe('themeSchemaToCssVars', () => {
  it('derives the R G B channel triplet from each hex value', () => {
    const vars = themeSchemaToCssVars(presetThemeSchema.default.light)
    expect(vars['--dyl-primary']).toBe('#286cf0')
    expect(vars['--dyl-primary-channel']).toBe('40 108 240')
    expect(vars['--dyl-primary-deep-channel']).toBe('31 86 192')
    expect(vars['--dyl-primary-mild-channel']).toBe('76 134 244')
  })

  it('keeps the channel triplet in sync across every preset schema', () => {
    for (const schema of Object.values(presetThemeSchema)) {
      const vars = themeSchemaToCssVars(schema.light)
      const hex = vars['--dyl-primary']!.replace('#', '')
      const expected = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ')
      expect(vars['--dyl-primary-channel']).toBe(expected)
    }
  })
})

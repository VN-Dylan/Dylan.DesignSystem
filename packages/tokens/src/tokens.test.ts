import { resolve } from 'node:path'
import { compile } from 'sass'
import { describe, expect, it } from 'vitest'
import { breakpoints, dylanPreset } from './index'

describe('layout tokens', () => {
  it('emits the spacing and layout variables in generated CSS', () => {
    const source = resolve('packages/tokens/src/styles/tokens.scss')
    const css = compile(source).css

    const expected = {
      '--dyl-gap-tight': '0.5rem',
      '--dyl-gap-base': '1rem',
      '--dyl-gap-loose': '1.5rem',
      '--dyl-gap-group': '2rem',
      '--dyl-space-section': 'clamp(3rem, 2rem + 4vw, 6rem)',
      '--dyl-inset-card': '1.5rem',
      '--dyl-gutter': 'clamp(1rem, 0.5rem + 2vw, 2rem)',
      '--dyl-content-prose': '65ch',
      '--dyl-content-narrow': '40rem',
      '--dyl-content-default': '75rem',
      '--dyl-content-wide': '90rem',
      '--dyl-sidenav-width': '16rem',
      '--dyl-sidenav-collapsed': '4.5rem',
      '--dyl-header-height': '4rem',
    }

    for (const [property, value] of Object.entries(expected)) {
      expect(css).toContain(`${property}: ${value}`)
    }

    for (const key of ['0', '1', '2', '3', '4', '6', '8', '12', '16', '24']) {
      expect(css).toContain(`--dyl-space-${key}:`)
    }
  })

  it('exposes semantic spacing, content widths, and numeric breakpoints', () => {
    expect(dylanPreset.theme.extend.spacing).toEqual({
      tight: 'var(--dyl-gap-tight)',
      base: 'var(--dyl-gap-base)',
      loose: 'var(--dyl-gap-loose)',
      group: 'var(--dyl-gap-group)',
      section: 'var(--dyl-space-section)',
      card: 'var(--dyl-inset-card)',
      gutter: 'var(--dyl-gutter)',
    })
    expect(dylanPreset.theme.extend.maxWidth).toEqual({
      prose: 'var(--dyl-content-prose)',
      narrow: 'var(--dyl-content-narrow)',
      content: 'var(--dyl-content-default)',
      wide: 'var(--dyl-content-wide)',
    })
    expect(breakpoints).toEqual({ sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 })
    expect(dylanPreset.theme.extend).not.toHaveProperty('screens')
  })
})

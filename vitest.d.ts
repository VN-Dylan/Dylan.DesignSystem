/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'vitest'
import type { AxeMatchers } from 'jest-axe'

declare module 'vitest' {
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

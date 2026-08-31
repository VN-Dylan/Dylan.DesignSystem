import '@testing-library/jest-dom/vitest'
import { expect } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

expect.extend(toHaveNoViolations)

afterEach(() => {
  cleanup()
})

// jsdom lacks matchMedia — provide a minimal stub for responsive hooks.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

// jsdom lacks ResizeObserver — used by overlay/measurement components.
if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

// jsdom lacks elementFromPoint — ProseMirror (RichTextEditor) calls it on pointer events.
if (!document.elementFromPoint) {
  document.elementFromPoint = () => null
}

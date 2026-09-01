import type { TestRunnerConfig } from '@storybook/test-runner'
import { getStoryContext } from '@storybook/test-runner'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

/**
 * Storybook test-runner config.
 *
 * `pnpm test:storybook`
 *   Renders every story in a real Chromium and smoke-checks it — the runner
 *   fails on a render error or a browser console error on its own. Deterministic
 *   across OSes, so this is the variant wired into CI.
 *
 * `pnpm test:storybook:visual` (adds `SB_VISUAL=1`)
 *   Also screenshot-compares `#storybook-root` against a committed baseline in
 *   three modes: light, dark (`.dark` on <html>), and RTL (`dir="rtl"`).
 *   Baselines live in `.storybook/__snapshots__/` and are rendered by the host
 *   OS's font stack, so they are NOT portable — this variant stays local-only.
 *   Regenerate after a deliberate visual change with `pnpm test:storybook:visual:update`.
 *
 * Opt a story out of the screenshot pass with `parameters.snapshot: { skip: true }`.
 */

const VISUAL = process.env.SB_VISUAL === '1'

// Freeze the wall clock so date/time-driven stories (Calendar, DatePicker,
// FullCalendar, TimeInput, …) render identically on every run. Mid-month,
// mid-year, a Monday — away from month-boundary and DST edges.
const FROZEN_NOW = new Date('2026-06-15T12:00:00.000Z')

const MODES = [
  { id: 'light', dark: false, rtl: false },
  { id: 'dark', dark: true, rtl: false },
  { id: 'rtl', dark: false, rtl: true },
] as const

// Kill animation / caret non-determinism before every screenshot.
const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
  }
`

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot })
  },

  async preVisit(page) {
    if (!VISUAL) return
    // setFixedTime (not install): Date.now()/new Date() are pinned, but timers
    // keep running so stories that need a tick to finish mounting still settle.
    await page.clock.setFixedTime(FROZEN_NOW)
    await page.addStyleTag({ content: FREEZE_CSS })
  },

  async postVisit(page, context) {
    if (!VISUAL) return

    const storyContext = await getStoryContext(page, context)
    if (storyContext.parameters?.snapshot?.skip) return

    const root = page.locator('#storybook-root')

    // Wait for every <img> in the story to finish decoding — otherwise a
    // late-loading avatar / media image races the screenshot and the baseline
    // captures a half-loaded state.
    const awaitImages = () =>
      page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('#storybook-root img'))
        await Promise.all(
          imgs.map((img) => {
            const el = img as HTMLImageElement
            if (el.complete && el.naturalWidth > 0) return el.decode().catch(() => {})
            return new Promise<void>((resolve) => {
              el.addEventListener('load', () => resolve(), { once: true })
              el.addEventListener('error', () => resolve(), { once: true })
            })
          }),
        )
        if ('fonts' in document) await (document as Document).fonts.ready
      })

    for (const mode of MODES) {
      await page.evaluate(
        ({ dark, rtl }) => {
          document.documentElement.classList.toggle('dark', dark)
          document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr')
        },
        { dark: mode.dark, rtl: mode.rtl },
      )
      await page.addStyleTag({ content: FREEZE_CSS })
      // let the layout settle after the class/dir flip
      await page.waitForTimeout(120)
      await awaitImages()

      const image = await root.screenshot({ animations: 'disabled' })
      expect(image).toMatchImageSnapshot({
        customSnapshotsDir: '.storybook/__snapshots__',
        customSnapshotIdentifier: `${context.id}--${mode.id}`,
        failureThreshold: 0.02,
        failureThresholdType: 'percent',
      })
    }

    // leave the DOM the way we found it
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('dir', 'ltr')
    })
  },
}

export default config

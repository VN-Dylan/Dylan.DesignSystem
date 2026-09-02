# Using Dylan Design System in another project

The four `@vn-dylan/*` packages are published to **GitHub Packages** (private, org
`VN-Dylan`). This guide is for an app that wants to consume them.

## 1. Authenticate to GitHub Packages

GitHub Packages requires auth even for read. In the **consuming project**, create a
`.npmrc` at its root:

```
@vn-dylan:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Set `GITHUB_TOKEN` to a **classic Personal Access Token** with the `read:packages`
scope (github.com → Settings → Developer settings → Personal access tokens → Tokens
(classic)). Export it in your shell (`export GITHUB_TOKEN=ghp_…`) and add it as an
environment variable in CI / Vercel / Netlify. Do **not** commit the token.

> Prefer not to rely on an env var? Put the token literally in a machine-local
> `~/.npmrc` instead and keep the project `.npmrc` to just the `@vn-dylan:registry`
> line.

## 2. Install

```bash
pnpm add @vn-dylan/ui
```

That is enough to render components — `@vn-dylan/ui` depends on `@vn-dylan/tokens`,
`@vn-dylan/utils` and `@vn-dylan/icons` (regular dependencies, not peers), so the
package manager pulls them in automatically.

Add the others **explicitly** for anything you `import` from directly (pnpm blocks
"phantom" dependencies):

```bash
pnpm add @vn-dylan/tokens   # if you extend your tailwind.config with the preset
pnpm add @vn-dylan/utils    # if you use the hooks (useDarkMode, useThemeSchema, …)
pnpm add @vn-dylan/icons    # if you render icons directly
```

### Peer dependencies

`react` and `react-dom` **v18** must already be in your project.

Heavier libraries used by a few `@vn-dylan/ui` components (`apexcharts`,
`react-apexcharts`, `@tiptap/*`, `@tanstack/react-table`, `jsvectormap`,
`react-syntax-highlighter`, `@floating-ui/react`) are declared as normal
dependencies of `@vn-dylan/ui`, so they install automatically. Tree-shaking keeps
them out of your bundle unless you import the component that needs them.

## 3. Load the stylesheet — once

In your app entry (e.g. `src/main.tsx`):

```ts
import '@vn-dylan/ui/styles.css'
```

This single file contains the token custom properties (`:root` / `.dark` / schema
overrides), Tailwind's `base` / `components` / `utilities`, and every component's
semantic CSS. Nothing else is required to style the components.

## 4. Tailwind (optional)

Only if **your** app also uses Tailwind and you want the token-aware utilities
(`bg-primary`, `text-content-subtle`, spacing scale, …):

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { dylanPreset } from '@vn-dylan/tokens/tailwind-preset'

export default {
  presets: [dylanPreset],
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
} satisfies Config
```

If you don't use Tailwind at all, skip this — `styles.css` already ships the
compiled utilities the components rely on.

## 5. Components

```tsx
import { useState } from 'react'
import { Button, Input, Dialog } from '@vn-dylan/ui'

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="solid" onClick={() => setOpen(true)}>
        Open
      </Button>
      <Dialog isOpen={open} onClose={() => setOpen(false)} aria-label="Example">
        <Input placeholder="Your name" />
      </Dialog>
    </>
  )
}
```

Button `variant`: `default` · `solid` · `subtle` · `plain` · `link`.

Full component reference, props and examples: the Storybook handbook (run
`pnpm storybook` in this repo, or the deployed build).

## 6. Theming — light / dark / RTL / brand schemas

`@vn-dylan/utils` ships headless hooks; wire them to your own UI. Call them once,
high in the tree.

```tsx
import { useDarkMode, useThemeSchema, useDirection } from '@vn-dylan/utils'

function ThemeBootstrap() {
  const [isDark, setMode] = useDarkMode()          // toggles `.dark` on <html>, persists
  useThemeSchema('green', isDark ? 'dark' : 'light') // applies a brand schema's vars
  useDirection()                                     // reflects a persisted `dir`
  // render your own toggles that call setMode('dark' | 'light') etc.
  return null
}
```

Available schema names come from `themeSchemaNames` in `@vn-dylan/tokens`
(`default`, `dark`, `green`, `purple`, `orange`, `cyan`, `gold`, `pink`).

Make sure your Tailwind config (if any) has `darkMode: 'class'` so the `.dark`
class toggled by `useDarkMode` takes effect.

## 7. Upgrading

```bash
pnpm up '@vn-dylan/*' --latest
```

All four packages version in lockstep, so their versions always match. Release
notes: the repo's `CHANGELOG.md` files and GitHub Releases.

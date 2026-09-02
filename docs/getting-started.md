# Getting started

## Prerequisites

- Node ≥ 20
- pnpm 9 (`corepack enable pnpm`)

## Install

```bash
pnpm install
```

## Run

```bash
pnpm storybook   # handbook + playground, http://localhost:6006
pnpm dev         # showcase app,         http://localhost:5173
```

## Use a component (once published / linked)

```tsx
import '@vn-dylan/ui/styles.css'
import { Button } from '@vn-dylan/ui'

export function Example() {
  return <Button variant="solid">Save</Button>
}
```

Apply the Tailwind preset in the consuming app so utility classes resolve:

```ts
// tailwind.config.ts
import { dylanPreset } from '@vn-dylan/tokens/tailwind-preset'

export default {
  presets: [dylanPreset],
  content: ['./src/**/*.{ts,tsx}'],
}
```

## Dark mode & theme schema

```ts
document.documentElement.classList.toggle('dark', isDark)

import { presetThemeSchema, themeSchemaToCssVars } from '@vn-dylan/tokens'
const vars = themeSchemaToCssVars(presetThemeSchema.green.light)
Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v))
```

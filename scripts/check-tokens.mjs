#!/usr/bin/env node
// check-tokens — guard the "token-first" principle (DESIGN.md §2.1).
//
// Fails if a component or showcase source file contains a literal colour
// (hex, rgb()/rgba(), hsl()/hsla(), or a bare CSS colour keyword) instead of
// resolving through a `var(--dyl-*)` token.
//
//   node scripts/check-tokens.mjs
//
// Escape hatches:
//   - a line that calls `readVar(` may carry a hex fallback for getComputedStyle
//   - append `// ds-allow-literal` (or `/* ds-allow-literal */`) to a line to
//     whitelist a deliberate exception; the reason should be obvious in context

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative, extname } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..')

const ROOTS = ['packages/ui/src', 'apps/showcase/src']
const EXTS = new Set(['.scss', '.css', '.ts', '.tsx'])
const SKIP = /\.(test|spec)\.[tj]sx?$/

const HEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/
const FN = /\b(?:rgba?|hsla?)\s*\(/
const KEYWORD =
  /(?:^|[:\s(,])(?:white|black|silver|gray|grey|red|green|blue|gold|orange|purple|cyan|pink|magenta|yellow|navy|teal|lime|maroon)(?:$|[;\s,)}!])/i
const ALLOW = /ds-allow-literal/
const READVAR = /readVar\s*\(/

function walk(dir, out) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, out)
    else if (EXTS.has(extname(entry)) && !SKIP.test(entry)) out.push(full)
  }
}

const files = []
for (const root of ROOTS) {
  try {
    walk(join(repoRoot, root), files)
  } catch {
    /* root may not exist yet */
  }
}

const violations = []
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  lines.forEach((raw, i) => {
    const line = raw.replace(/\/\/.*$|\/\*.*?\*\//g, (m) =>
      ALLOW.test(m) ? m : ' '.repeat(m.length),
    )
    if (ALLOW.test(raw) || READVAR.test(raw)) return
    const isStyleCtx = extname(file) === '.scss' || extname(file) === '.css'
    if (HEX.test(line) || FN.test(line) || (isStyleCtx && KEYWORD.test(line))) {
      violations.push(`${relative(repoRoot, file)}:${i + 1}  ${raw.trim()}`)
    }
  })
}

if (violations.length) {
  console.error(`✗ ${violations.length} literal colour(s) found — use a var(--dyl-*) token:\n`)
  for (const v of violations) console.error('  ' + v)
  console.error(
    '\n(getComputedStyle fallbacks: use readVar(); deliberate exceptions: // ds-allow-literal)',
  )
  process.exit(1)
}

console.log(`✓ no literal colours in ${files.length} files across ${ROOTS.join(', ')}`)

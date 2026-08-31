#!/usr/bin/env node
// ds-spec — turn an Eyris component doc crawl into a lean implementation spec.
//
//   node scripts/ds-spec.mjs button          # lean (default)
//   node scripts/ds-spec.mjs button --full    # include demo source
//
// Lean mode: intro + demo section list + API tables + a pointer to the raw
// crawl (codex can open it for the demo source). Keeps codex prompts small.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const full = args.includes('--full')
const name = args.find((a) => !a.startsWith('--'))

if (!name) {
  console.error('usage: node scripts/ds-spec.mjs <name> [--full]')
  process.exit(1)
}

const repoRoot = join(here, '..')
const file = join(repoRoot, 'docs', 'reference', 'eyris-crawl', `${name}.json`)
let data
try {
  data = JSON.parse(readFileSync(file, 'utf8'))
} catch {
  console.error(`no crawl at ${file}`)
  process.exit(1)
}

const pascal = data.title || name.split('/').pop()
const out = []

out.push(`# SPEC — ${pascal}`)
out.push('')
out.push(`Purpose: ${data.intro || '(none captured)'}`)
out.push(`Crawl (open for demo source): docs/reference/eyris-crawl/${name}.json`)
out.push('')

const demoSections = (data.sections || []).filter(
  (s) => !/^(API|Dependencies|TABLE OF CONTENT)$/i.test(s) && !/^[A-Z]\w+\.\w/.test(s),
)
out.push(`Stories to cover (from Eyris demos): ${demoSections.join(' · ')}`)
out.push('')

const compoundParts = (data.sections || []).filter((s) => /^[A-Z]\w+\.\w/.test(s))
if (compoundParts.length) {
  out.push(`Compound parts: ${compoundParts.join(' · ')}`)
  out.push('')
}

const apiTables = (data.tables || []).filter(
  (t) => Array.isArray(t[0]) && /prop/i.test(t[0][0] || ''),
)
if (apiTables.length) {
  out.push('API — every prop MUST exist with the documented type + default:')
  out.push('')
  apiTables.forEach((rows, ti) => {
    if (apiTables.length > 1) out.push(`(table ${ti + 1})`)
    out.push('| ' + rows[0].join(' | ') + ' |')
    out.push('| ' + rows[0].map(() => '---').join(' | ') + ' |')
    rows.slice(1).forEach((r) => out.push('| ' + r.join(' | ') + ' |'))
    out.push('')
  })
} else {
  out.push('API: no table captured — infer a minimal native-prop-forwarding API.')
  out.push('')
}

if (full && Array.isArray(data.code)) {
  out.push('## Reference demo source')
  data.code.forEach((c, i) => {
    out.push(`### Demo ${i + 1}`)
    out.push('```tsx')
    out.push(c.trim())
    out.push('```')
  })
}

void relative
console.log(out.join('\n'))

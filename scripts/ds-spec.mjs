#!/usr/bin/env node
// ds-spec — turn an Eyris component doc crawl into an implementation spec.
//
//   node scripts/ds-spec.mjs button
//   node scripts/ds-spec.mjs shared/data-table
//
// Emits Markdown on stdout: intro, demo list (with source), and every API table.
// This is the SPEC block handed to codex alongside RECIPE.md.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const name = process.argv[2]
if (!name) {
  console.error('usage: node scripts/ds-spec.mjs <name>  (e.g. badge, shared/wizard)')
  process.exit(1)
}

const file = join(here, '..', 'docs', 'reference', 'eyris-crawl', `${name}.json`)
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
out.push(`Source: ${data.url}`)
out.push('')
out.push(`## Purpose`)
out.push(data.intro || '(no description captured)')
out.push('')

const demoSections = (data.sections || []).filter(
  (s) => !/^API$|^Dependencies$|^TABLE OF CONTENT$/i.test(s) && !/^[A-Z][a-z]+\./.test(s),
)
out.push(`## Demos to cover as stories (${demoSections.length})`)
for (const s of demoSections) out.push(`- ${s}`)
out.push('')

if (Array.isArray(data.code) && data.code.length) {
  out.push(`## Reference demo source (${data.code.length})`)
  out.push('These are the Eyris implementations — match the behaviour, not the styling.')
  out.push('')
  data.code.forEach((c, i) => {
    out.push(`### Demo ${i + 1}`)
    out.push('```tsx')
    out.push(c.trim())
    out.push('```')
    out.push('')
  })
}

const apiTables = (data.tables || []).filter(
  (t) => Array.isArray(t[0]) && /prop/i.test(t[0][0] || ''),
)
if (apiTables.length) {
  out.push(`## API (${apiTables.length} table${apiTables.length > 1 ? 's' : ''})`)
  out.push('Every prop below MUST exist with the documented type + default.')
  out.push('')
  apiTables.forEach((rows, ti) => {
    if (apiTables.length > 1) out.push(`### Table ${ti + 1}`)
    out.push('| ' + rows[0].join(' | ') + ' |')
    out.push('| ' + rows[0].map(() => '---').join(' | ') + ' |')
    rows.slice(1).forEach((r) => out.push('| ' + r.join(' | ') + ' |'))
    out.push('')
  })
} else {
  out.push('## API')
  out.push('_No API table in the crawl — infer a minimal, native-prop-forwarding API._')
  out.push('')
}

console.log(out.join('\n'))

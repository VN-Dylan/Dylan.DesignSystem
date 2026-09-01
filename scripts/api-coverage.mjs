#!/usr/bin/env node
// api-coverage — reconcile each component's props against the Eyris doc crawl.
//
//   node scripts/api-coverage.mjs            # summary + any gaps
//   node scripts/api-coverage.mjs --json     # machine-readable
//
// For every crawl file with a PROP/DESCRIPTION/TYPE/DEFAULT table, checks that
// each documented prop name appears as an identifier somewhere in the matching
// packages/ui/src/<Pascal> source (types + implementation). A miss is either a
// real gap or a deliberate deviation — see docs/handbook/EyrisMapping.mdx.

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..')
const crawlDir = join(repoRoot, 'docs/reference/eyris-crawl')
const uiSrc = join(repoRoot, 'packages/ui/src')
const json = process.argv.includes('--json')

// crawl slug -> component folder, where kebab->Pascal isn't the whole story
const RENAME = { cards: 'Card' }
const SKIP = new Set(['changelog', 'icons', 'timeline'])

// Verified deviations — the prop is intentionally absent (or renamed). Keeping
// them here makes this script a drift gate: a NEW unmatched prop fails CI.
// Rationale for each set is in docs/handbook/EyrisMapping.mdx.
const ALLOW = {
  Button: ['clickFeedback'],
  // Input/textarea forward every native event via {...rest}.
  Input: ['onChange', 'onFocus', 'onBlur'],
  // Lean custom Select — not the react-select surface Eyris wraps.
  Select: [
    'creatable',
    'isCreatable',
    'customInputDisplay',
    'customOption',
    'customLabel',
    'formatGroupLabel',
    'isDisabled',
    'onMenuOpen',
    'onInputChange',
    'searchInputProps',
    'showClearAllButton',
  ],
  // `borderless` (inverted) replaces `bordered`; layout/overflow is the caller's job.
  Table: ['asElement', 'bordered', 'overflow', 'overflowClass', 'verticalDivider'],
  // Single `placement` prop instead of separate axis offsets + transition knob.
  Toast: ['block', 'offsetX', 'offsetY', 'transitionType'],
  // Style hooks not surfaced; use the className on the composed element.
  Upload: ['fileListClass', 'fileItemClass'],
}

const pascal = (slug) =>
  RENAME[slug] ?? slug.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())

const propTables = (data) =>
  (data.tables ?? []).filter((t) => Array.isArray(t?.[0]) && /^prop$/i.test(t[0][0] ?? ''))

const sourceText = (dir) => {
  let text = ''
  for (const entry of readdirSync(dir)) {
    if (!/\.(ts|tsx)$/.test(entry) || /\.(test|stories)\./.test(entry)) continue
    text += '\n' + readFileSync(join(dir, entry), 'utf8')
  }
  return text
}

const results = []
for (const file of readdirSync(crawlDir)) {
  if (!file.endsWith('.json')) continue
  const slug = file.replace(/\.json$/, '')
  if (SKIP.has(slug)) continue

  const data = JSON.parse(readFileSync(join(crawlDir, file), 'utf8'))
  const tables = propTables(data)
  if (tables.length === 0) continue

  const name = pascal(slug)
  const dir = join(uiSrc, name)
  if (!existsSync(dir)) {
    results.push({ name, slug, status: 'no-folder', missing: [], total: 0 })
    continue
  }

  const src = sourceText(dir)
  const props = [
    ...new Set(
      tables.flatMap((t) =>
        // strip crawl footnote markers: "value(*)" / "value *" -> "value"
        t.slice(1).map((r) => (r[0] ?? '').trim().replace(/\s*\(?\*+\)?$/, '')),
      ),
    ),
  ].filter(Boolean)
  const allow = new Set(ALLOW[name] ?? [])
  const seen = (p) => {
    const esc = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // identifier props get word boundaries; hyphenated/quoted props match literally
    const re = /^[A-Za-z_$][\w$]*$/.test(p) ? new RegExp(`\\b${esc}\\b`) : new RegExp(esc)
    return re.test(src)
  }
  const missing = props.filter((p) => !allow.has(p) && !seen(p))
  results.push({ name, slug, status: missing.length ? 'gap' : 'ok', missing, total: props.length })
}

results.sort((a, b) => a.name.localeCompare(b.name))

if (json) {
  console.log(JSON.stringify(results, null, 2))
} else {
  const ok = results.filter((r) => r.status === 'ok')
  const gaps = results.filter((r) => r.status === 'gap')
  const noFolder = results.filter((r) => r.status === 'no-folder')
  const propCount = results.reduce((n, r) => n + r.total, 0)

  console.log(`API coverage vs Eyris crawl — ${results.length} components, ${propCount} props\n`)
  console.log(`  ${ok.length} fully covered`)
  if (noFolder.length)
    console.log(
      `  ${noFolder.length} no component folder: ${noFolder.map((r) => r.name).join(', ')}`,
    )
  if (gaps.length) {
    console.log(`  ${gaps.length} with unmatched prop names:\n`)
    for (const g of gaps) console.log(`    ${g.name}: ${g.missing.join(', ')}`)
    console.log(
      '\n  (each is a real gap or a documented deviation — verify against EyrisMapping.mdx)',
    )
  } else {
    console.log('\n  no unmatched props.')
  }
  process.exitCode = gaps.length ? 1 : 0
}

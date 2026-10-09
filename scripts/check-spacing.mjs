#!/usr/bin/env node
// check-spacing — report layout utilities that fall outside the Dylan spacing contract.
//
// Report mode is the default while the existing UI and showcase are migrated:
//
//   node scripts/check-spacing.mjs [--report]
//   node scripts/check-spacing.mjs --strict
//
// Append `ds-allow-spacing` to a line to permit a reviewed exception.

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..')

const ROOTS = [
  { path: 'packages/ui/src', extensions: new Set(['.scss', '.tsx']), skipTests: true },
  {
    path: 'apps/showcase/src',
    extensions: new Set(['.scss', '.ts', '.tsx']),
    skipTests: false,
  },
]
const TEST_FILE = /\.(?:test|spec)\.tsx?$/
const ALLOW = /ds-allow-spacing/
const ALLOWED_SPACING = new Set(['0', '0.5', '1', '2', '3', '4', '6', '8', '12', '16', '24'])
const ALLOWED_MAX_WIDTH = new Set(['none', 'full', 'prose', 'narrow', 'content', 'wide'])

const VARIANT = String.raw`(?:(?:[\w-]+|\[[^\]\s]+\]):)*`
const START = String.raw`(?:^|[\s"'\x60(])`
const END = String.raw`(?=$|[\s"'\x60),;!}])`
const SPACING = new RegExp(
  `${START}(${VARIANT})(-?)(p[trblxyse]?|m[trblxyse]?|gap(?:-[xy])?|space-[xy])-(\\d+(?:\\.\\d+)?)${END}`,
  'g',
)
const MAX_WIDTH = new RegExp(
  `${START}(${VARIANT})max-w-(\\[[^\\]\\r\\n]+\\]|[^\\s"'\\x60),;!}]+)${END}`,
  'g',
)
const Z_INDEX = new RegExp(`${START}(${VARIANT})-?z-(\\d+)${END}`, 'g')

function walk(root, config, out) {
  for (const entry of readdirSync(root)) {
    const full = join(root, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      walk(full, config, out)
    } else if (
      config.extensions.has(extname(entry)) &&
      !(config.skipTests && TEST_FILE.test(entry))
    ) {
      out.push(full)
    }
  }
}

// Component-internal width caps (tooltips, popovers, dialogs, story frames) are
// legitimate. Free `max-w-*` is only a page-layout smell in the showcase app,
// where `Container` (size=...) owns the content width.
function isPageWidthScope(file) {
  const normalized = relative(repoRoot, file).split(sep).join('/')
  return normalized.startsWith('apps/showcase/src/')
}

function collectMatches(regex, line, visit) {
  regex.lastIndex = 0
  for (let match = regex.exec(line); match; match = regex.exec(line)) visit(match)
}

function isIdentifierValue(line, match) {
  const throughMatch = line.slice(0, match.index + match[0].length)
  return /\b(?:id|\w+Id)\s*:\s*['"][^'"]*$/i.test(throughMatch)
}

const args = new Set(process.argv.slice(2))
const unknownArgs = [...args].filter((arg) => arg !== '--report' && arg !== '--strict')
if (unknownArgs.length) {
  console.error(`Unknown option(s): ${unknownArgs.join(', ')}`)
  process.exit(2)
}
const strict = args.has('--strict')

const files = []
for (const config of ROOTS) {
  try {
    walk(join(repoRoot, config.path), config, files)
  } catch {
    // A root may not exist in a partial checkout.
  }
}

const violations = []
function addViolation(category, file, lineNumber, utility) {
  violations.push({
    category,
    file: relative(repoRoot, file).split(sep).join('/'),
    lineNumber,
    utility,
  })
}

for (const file of files.sort()) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  lines.forEach((line, index) => {
    if (ALLOW.test(line)) return

    collectMatches(SPACING, line, (match) => {
      const [, variants, negative, property, key] = match
      if (negative || ALLOWED_SPACING.has(key) || isIdentifierValue(line, match)) return
      addViolation('spacing', file, index + 1, `${variants}${property}-${key}`)
    })

    if (isPageWidthScope(file)) {
      collectMatches(MAX_WIDTH, line, (match) => {
        const [, variants, key] = match
        if (ALLOWED_MAX_WIDTH.has(key)) return
        addViolation('max-width', file, index + 1, `${variants}max-w-${key}`)
      })
    }

    collectMatches(Z_INDEX, line, (match) => {
      const [, variants, key] = match
      addViolation('z-index', file, index + 1, `${variants}z-${key}`)
    })
  })
}

const perFile = new Map()
for (const violation of violations) {
  const counts = perFile.get(violation.file) ?? {
    spacing: 0,
    'max-width': 0,
    'z-index': 0,
    total: 0,
  }
  counts[violation.category] += 1
  counts.total += 1
  perFile.set(violation.file, counts)
}

console.log(`Spacing audit (${strict ? 'strict' : 'report'})`)
console.log(`Scanned ${files.length} files across ${ROOTS.map(({ path }) => path).join(', ')}`)
if (perFile.size) {
  console.log('\nPer-file counts:')
  for (const [file, counts] of [...perFile].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(
      `  ${file}  spacing=${counts.spacing} max-width=${counts['max-width']} z-index=${counts['z-index']} total=${counts.total}`,
    )
  }
}

const totals = violations.reduce(
  (counts, violation) => {
    counts[violation.category] += 1
    counts.total += 1
    return counts
  },
  { spacing: 0, 'max-width': 0, 'z-index': 0, total: 0 },
)
console.log(
  `\nTotals: spacing=${totals.spacing} max-width=${totals['max-width']} z-index=${totals['z-index']} total=${totals.total}`,
)

if (strict && violations.length) {
  console.error('\nViolations:')
  for (const violation of violations) {
    console.error(
      `  ${violation.file}:${violation.lineNumber}  [${violation.category}] ${violation.utility}`,
    )
  }
  process.exit(1)
}

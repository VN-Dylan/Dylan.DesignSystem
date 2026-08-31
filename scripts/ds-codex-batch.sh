#!/usr/bin/env bash
# ds-codex-batch — build several components in one codex run.
#   scripts/ds-codex-batch.sh Typography:typography Grid:grid Tag:tag
# Each arg is Name:crawl-slug  (slug defaults to lowercased Name).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

NAMES=""
SPECS=""
for arg in "$@"; do
  NAME="${arg%%:*}"
  SLUG="${arg##*:}"
  [ "$SLUG" = "$NAME" ] && SLUG="$(echo "$NAME" | tr '[:upper:]' '[:lower:]')"
  NAMES="$NAMES $NAME"
  SPECS="$SPECS
$(node "$ROOT/scripts/ds-spec.mjs" "$SLUG")
------------------------------------------------------------"
done

{
  cat "$ROOT/RECIPE.md"
  cat <<EOF

============================================================
BUILD EACH OF THESE COMPONENTS:$NAMES
============================================================
$SPECS

RULES
- One dir per component: packages/ui/src/<Name>/ with <Name>.tsx, <Name>.scss,
  types.ts, index.ts, <Name>.stories.tsx, <Name>.test.tsx (+ context.ts if compound).
- Read these reference components IN FULL first and mirror them:
  packages/ui/src/Button/ Input/ Select/ Dialog/ Table/ Spinner/
- Open each component's crawl JSON (path in its spec) for the demo source.
- Intra-batch dependency: build the dependency first, import relatively.
- Dependency NOT in packages/ui/src yet: inline a minimal local helper in this
  component's folder with a TODO — do not scope-creep another public component.
- Add every export to packages/ui/src/index.ts (component + \`export type\`),
  preserving its ordering/formatting.
- ONLY existing npm deps. Extra react-icons submodules may be re-exported from
  packages/icons/src/index.ts.
- NO literal colours / px / durations in .tsx or .scss — tokens only.
- @apply must NOT be inside @layer (Tailwind v3 here).

VERIFY — all must pass before finishing:
  pnpm --filter @dylan-ds/ui exec tsc -b
  pnpm exec eslint packages/ui/src
  pnpm exec prettier --check 'packages/ui/src/**/*.{ts,tsx,scss}'
  pnpm exec vitest run packages/ui/src
  pnpm --filter @dylan-ds/ui exec vite build
Fix until green. Do NOT git commit. Summarise what you built + judgement calls.
EOF
} | codex exec --skip-git-repo-check --dangerously-bypass-approvals-and-sandbox -C "$ROOT" -

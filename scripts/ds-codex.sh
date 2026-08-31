#!/usr/bin/env bash
# ds-codex — build one component with codex, following RECIPE.md + its spec.
#   scripts/ds-codex.sh <Name> <crawl-slug>
#   scripts/ds-codex.sh Spinner spinner
set -euo pipefail

NAME="$1"
SLUG="${2:-$(echo "$NAME" | tr '[:upper:]' '[:lower:]')}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

SPEC="$(node "$ROOT/scripts/ds-spec.mjs" "$SLUG")"
RECIPE="$(cat "$ROOT/RECIPE.md")"

PROMPT="You are adding one component to the Dylan Design System monorepo.

Follow this contract EXACTLY:

$RECIPE

============================================================
$SPEC
============================================================

TASK
- Create packages/ui/src/$NAME/ with: $NAME.tsx, $NAME.scss, types.ts,
  index.ts, $NAME.stories.tsx, $NAME.test.tsx (+ context.ts only if compound).
- Read these reference components IN FULL and mirror their structure, prop
  style, SCSS conventions and test/story shape:
    packages/ui/src/Button/  packages/ui/src/Input/
    packages/ui/src/Select/  packages/ui/src/Table/
- Add the export (component + \`export type\`) to packages/ui/src/index.ts,
  keeping that file's existing ordering/formatting.
- Use ONLY existing dependencies. Do NOT add packages. Icons come from
  react-icons via the \`Icon\` component in @dylan-ds/icons or direct imports
  in stories only.
- NO literal colours / px / durations in .tsx or .scss — tokens only.

VERIFY before finishing (all must pass):
  pnpm --filter @dylan-ds/ui exec tsc -b
  pnpm exec eslint packages/ui/src/$NAME
  pnpm exec prettier --check packages/ui/src/$NAME
  pnpm exec vitest run packages/ui/src/$NAME
  pnpm --filter @dylan-ds/ui exec vite build
Fix everything until green. Do not commit. Report what you built."

exec codex exec --skip-git-repo-check --dangerously-bypass-approvals-and-sandbox \
  -C "$ROOT" "$PROMPT"

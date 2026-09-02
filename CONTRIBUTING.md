# Contributing

## Setup

```bash
corepack enable pnpm
pnpm install
```

## Workflow

| Task | Command |
| --- | --- |
| Component playground / handbook | `pnpm storybook` |
| Showcase app | `pnpm dev` |
| Unit + a11y tests | `pnpm test` (watch: `pnpm test:watch`) |
| Typecheck | `pnpm typecheck` |
| Lint | `pnpm lint` |
| Format | `pnpm format` |
| Build all packages | `pnpm build` |

## Adding a component

Follow [`RECIPE.md`](./RECIPE.md) exactly. In short:

1. Read the reference: `docs/reference/eyris-crawl/<name>.json`.
2. Create `packages/ui/src/<Name>/` with the standard file set.
3. One story per documented demo; tests cover each variant + `axe`.
4. Export from `packages/ui/src/index.ts`.
5. Update the row in [`PROGRESS.md`](./PROGRESS.md).
6. `pnpm changeset` describing the addition.

## Releasing

Publishing is automated with Changesets + GitHub Actions — you never run
`npm publish`.

1. In the PR that makes a user-facing change, run `pnpm changeset`, pick the
   affected package(s) and the bump (`patch` / `minor` / `major`), write a
   one-line summary. Commit the generated `.changeset/*.md`.
2. Merge the PR to `main`. The **Release** workflow opens a
   `chore(release): version packages` PR that bumps versions and updates the
   `CHANGELOG.md` files.
3. Merge that PR. The workflow runs `pnpm release` (`pnpm build && changeset
   publish`) and publishes every `@dylan-ds/*` package to GitHub Packages.

All four packages version in lockstep (`fixed` in `.changeset/config.json`);
`@dylan-ds/showcase` is never published.

## Rules that block review

- Any literal colour / radius / shadow / duration in `src/**/*.{tsx,scss}`.
- Missing `ref` forwarding or native prop spread on a primitive.
- A story or test absent.
- `axe` violations.
- Type errors or lint errors.

## Commits

Conventional-ish: `feat(ui): add Button`, `fix(tokens): …`, `docs: …`,
`chore: …`. One component (or one coherent group) per commit.

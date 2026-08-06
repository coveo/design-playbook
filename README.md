# Coveo Design Playbook

Interactive playbook of design plays — workshops, methods, and studies — for how we design at Coveo. Content lives as MDX files in `plays/`; the site deploys to GitHub Pages on merge to `main`.

## Run locally

```sh
pnpm install
pnpm dev        # http://127.0.0.1:5173
```

## Add a play

Create `plays/<slug>.mdx` with frontmatter (see [AGENTS.md](./AGENTS.md) for the contract), or ask Claude Code to run the `add-play` skill. Plays are auto-discovered — no registry to edit.

## Deploy

Merging to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`. The Vite base path is driven by the `BASE_PATH` env var so the build can later target a CloudFront prefix for per-PR preview links (see `coveo-incubator/admin-ui-prototypes` for the pattern).

# Agent Instructions

This repository is the Coveo Design Playbook — an interactive site of design plays (workshops, methods, studies) for how the design team works. It deploys to GitHub Pages on merge to `main`.

## Repository Intent

- Internal audience: Coveo designers, PMs, and engineers.
- Content-first: the plays are the product; the site is a thin, fast shell around them.
- Source of truth for play content is this repo. The Figma file "Design Playbook" (WmXa6mH4tPZQ5hppqqJCgi) is the original source being migrated here.

## Structure

- `plays/*.mdx` — one file per play. YAML frontmatter + MDX body. This is where almost all contributions happen.
- `src/plays.ts` — auto-discovers every `plays/**/*.mdx` via `import.meta.glob`. No registry to edit; adding a file is enough.
- `src/pages/` — Home (card grid grouped by category) and PlayPage (frontmatter hero + MDX prose).
- `src/styles/theme.css` — Coveo theme tokens (from the research-narrative skill's `theme-coveo.md`). Do not invent new colors; use the tokens.

## Play frontmatter contract

```yaml
title: POINT Analysis          # display name
slug: point-analysis           # URL segment, kebab-case, unique
category: Framing the problem  # groups cards on the home page
summary: One sentence shown on the card and play hero.
duration: 60–90 min            # optional
participants: 3–8              # optional
format: Workshop               # optional: Workshop | Study | Method | Async
miroTemplate: https://miro...  # optional
skills:                        # optional links to agent skills (coveo/ai-tools)
  - name: Research synthesis
    url: https://github.com/coveo/ai-tools/tree/main/skills
order: 1                       # optional sort within the page
```

## Adding a play

Use the `add-play` skill in `.claude/skills/add-play/` — it scaffolds the MDX file and walks through the frontmatter. Manual steps if not using the skill:

1. Create `plays/<slug>.mdx` with the frontmatter contract above.
2. Reuse an existing play's section structure: When to use it / How to run it / Outputs.
3. `pnpm dev` and check the card and the play page render.
4. `pnpm type-check` and `pnpm build` must pass.

## Conventions

- pnpm only. Node 22.
- Dev server binds `127.0.0.1` (never `localhost`).
- Hash routing (`createHashRouter`) — required for GitHub Pages deep links. Do not switch to browser routing without adding a 404 shim.
- `BASE_PATH` env var controls the Vite base. GitHub Pages uses `/design-playbook/`; a future CloudFront/PR-preview setup will pass its own prefix. Keep builds base-path-agnostic (no absolute `/...` asset URLs in code).
- Theme rules (from theme-coveo.md): dark violet `#2a005c` statement surfaces with flat `#00adff` emphasis (never gradient text); white working surfaces with exactly one `#1371ec` anchor phrase per header; cards with 16px radius, no shadows, blue gradient header band.

## PR flow

- Branch from `main`, open a PR, squash-merge. Content-only PRs (plays/*.mdx) need a rendering check, not a code review.
- Merging to `main` deploys automatically.

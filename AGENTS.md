# Agent Instructions

This repository is the Coveo Design Playbook — an interactive site of design plays (workshops, methods, studies) for how the design team works. It deploys to GitHub Pages on merge to `main`.

## Repository Intent

- Internal audience: Coveo designers, PMs, and engineers.
- Content-first: the plays are the product; the site is a thin, fast shell around them.
- Source of truth for play content is this repo. The Figma file "Design Playbook" (key `WmXa6mH4tPZQ5hppqqJCgi`) is the original source being migrated here; a full text scan of all 81 slides lives in `docs/figma-content-scan.md`.

## Stack

- Vite + React + TypeScript + MDX, pnpm, Node 22.
- **Plasma design system**: `@coveord/plasma-mantine` (Mantine 9 under the hood). The app is wrapped in `Plasmantine` with `createTheme({primaryColor: 'violet'})` — violet resolves to Plasma's grape. Use Plasma/Mantine components for structure (AppShell, NavLink, Breadcrumbs, Group…) before writing custom UI. The `plasma` and `mantine` MCP servers in `.mcp.json` serve component docs.
- Hash routing (`createHashRouter`) — required for GitHub Pages deep links. Do not switch to browser routing without adding a 404 shim.
- `BASE_PATH` env var controls the Vite base (GitHub Pages uses `/design-playbook/`). Keep builds base-path-agnostic: resolve public/ assets via the `asset()` helper in `src/plays.ts` in components, and use *relative* paths (`covers/x.png`, no leading slash) for images inside MDX.

## Visual language (sampled from the Figma playbook — do not invent new colors)

- Font: `Gibson` (installed on Coveo laptops) falling back to bundled `Inter Variable`.
- White background; **gradient display headings** (`.gradient-heading`): coral `#f4574d` → pink `#d24c86` → magenta `#ac40b4` → deep purple `#6910cb`, uppercase, applied via background-clip.
- Accent purple `#7b30ee`; cover right-panels use gray `#efefef`.
- **Confidence meter**: 5 vertical bars, filled `#732dfb`, empty `#d8d8d8` (`ConfidenceMeter` component). Every play declares the confidence level it works best at; all-empty means "anytime". This is a core playbook concept — keep it visible on cards, nav, and play heroes.
- Tokens live in `src/styles/theme.css`; layout styles in `src/styles/app.css`.

## Structure

- `plays/*.mdx` — one file per play. YAML frontmatter + MDX body. This is where almost all contributions happen. Auto-discovered via `import.meta.glob` in `src/plays.ts`; no registry to edit.
- `src/plays.ts` — frontmatter contract, section list, and lookups.
- `src/App.tsx` — Plasma AppShell with collapsible sidebar (sections → plays, with mini confidence meters).
- `src/pages/Home.tsx` — gradient section headings + play-card grid, mirroring the Figma Home slide.
- `src/pages/PlayPage.tsx` — split hero (text left, cover image on gray right panel) + MDX prose.
- `public/covers/` — play cover images cropped from the Figma slides.

## Play frontmatter contract

```yaml
title: Design Smash            # display name
slug: design-smash             # URL segment, kebab-case, unique
section: understanding         # understanding | designing | beyond
summary: One sentence shown on the card and play hero.
confidence: 2                  # 1–5 bars on the meter; OMIT for "anytime" plays
comingSoon: true               # optional: renders a faded, non-clickable card
duration: 1–2 hours            # optional
participants: 3–8              # optional
format: Workshop               # optional: Workshop | Study | Framework | Async
cover: /covers/design-smash.png# optional, under public/
miroTemplate: https://miro...  # optional
skills:                        # optional links to agent skills (coveo/ai-tools)
  - name: Research synthesis
    url: https://github.com/coveo/ai-tools/tree/main/skills
order: 2                       # sort within section/nav
```

MDX body grammar (mirrors the Figma slides — keep this order, skip sections that don't apply):

```
## When?
## Why?
## What do you need?
## Step by step
## Common mistakes
## What next?
```

Cross-link plays with hash URLs: `[Design Smash](/#/plays/design-smash)`.

## Adding a play

Use the `add-play` skill in `.claude/skills/add-play/`. Manual steps: create `plays/<slug>.mdx` per the contract above, check the card + nav + play page render (`pnpm dev`, binds 127.0.0.1), and run `pnpm type-check` + `pnpm build`.

## PR flow

- Branch from `main`, open a PR, squash-merge. Content-only PRs (plays/*.mdx) need a rendering check, not a code review.
- Merging to `main` deploys automatically via `.github/workflows/deploy.yml`.

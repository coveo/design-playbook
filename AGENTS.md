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

## Visual language (do not invent new colors)

- Font: `Gibson` (installed on Coveo laptops) falling back to bundled `Inter Variable`.
- White background; **gradient display headings** (`.gradient-heading`) use the Coveo brand blue-green gradient from the research-narrative theme: `#1371ec` → `#00adff` → `#1cebcf`, uppercase, background-clip. Reserved for section/display headings only — everything else stays quiet.
- Prose kickers (`## When?` etc.) and links: solid brand blue `#1371ec`. Cover right-panels: gray `#efefef`.
- **Confidence meter** (the site's signature element): 5 vertical bars, filled `#732dfb`, empty `#d8d8d8` (`ConfidenceMeter`; `ConfidenceLevel` adds the label + info tooltip). Every play declares the confidence level it works best at; all-empty means "anytime". Keep it visible on cards, nav, and play heroes. `/how-to-use` explains it.
- Border radii come from Mantine tokens only (`--radius-card` = radius-md, `--radius-panel` = radius-lg) — no hardcoded radii.
- Icons: Tabler via `@coveord/plasma-react-icons` (it re-exports `@tabler/icons-react`). Never install other icon sets.
- Play cross-links in MDX render as hovercard previews (image + summary) via `PlayAnchor`.
- **Never hardcode another play's name or coming-soon status in MDX.** Reference plays with `<PlayRef slug="design-smash" />` — it renders the live title (with "(coming soon)" derived from frontmatter) and the hovercard. When a play goes live, every reference updates automatically.
- MDX blockquotes (`> **Before you start** — ...`) render as Mantine Alert callouts.
- Coming-soon plays render a placeholder page with contribution guidance; they are navigable everywhere (nav, cards, refs).
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

Cross-link plays with `<PlayRef slug="design-smash" />` (preferred — inherits live title/status) or hash URLs `[custom label](/#/plays/design-smash)` when you need custom link text.

## Running plays with agents

The playbook is agent-operable, not just readable:

- **Machine-readable playbook**: `pnpm build` emits `public/plays.json` (all frontmatter + MDX bodies). Agents pointed at the deployed site can fetch `<site>/plays.json`; agents in this repo read `plays/*.mdx` directly. This file is also the data source for a future playbook MCP server.
- **Per-play agent recipes**: a play's frontmatter may carry an `agent` block — `mcp` (servers needed, e.g. Miro), `recipe` (how to point an agent at the play), and `skill` (a skill in `.claude/skills/` that runs it). The play page renders this as "Run it with an agent". Keep recipes in frontmatter so they inherit like everything else.
- **Workshop skills**: `.claude/skills/run-<slug>/` skills interview the user (what's known, participants, format) and scaffold the session — e.g. `run-design-smash` builds the Miro board from the play's steps via the Miro MCP. Skills must treat the play MDX as the source of truth: if the play changes, the skill's output changes.
- When adding a new "workshopy" play, consider adding a matching `run-<slug>` skill and an `agent` block.

## Adding a play

Use the `add-play` skill in `.claude/skills/add-play/`. Manual steps: create `plays/<slug>.mdx` per the contract above, check the card + nav + play page render (`pnpm dev`, binds 127.0.0.1), and run `pnpm type-check` + `pnpm build`.

## PR flow

- Branch from `main`, open a PR, squash-merge. Content-only PRs (plays/*.mdx) need a rendering check, not a code review.
- Merging to `main` deploys automatically via `.github/workflows/deploy.yml`.

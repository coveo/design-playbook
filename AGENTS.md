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
- `BASE_PATH` env var controls the Vite base (GitHub Pages uses `/design-playbook/`). Keep builds base-path-agnostic: resolve public/ assets via the `asset()` helper in `src/plays.ts` in components, and use *relative* paths (`covers/ujm-example.png`, no leading slash) for images inside MDX.

## Visual language (do not invent new colors)

- **Case convention**: Title Case for play titles, section labels, and navigation ("Presenting Your Findings", "Research Craft", "How to Use"); sentence case for body copy, chips, and inline labels.
- Font: `Gibson` via the admin-ui Typekit kit (`canada-type-gibson`), falling back to bundled `Inter Variable`.
- **Never bold. Never a weight Plasma doesn't have.** Plasma's maximum is `--coveo-fw-bold` = 500; 600/700 are banned everywhere (they render as heavy or synthesized Gibson). `theme.css` clamps `--mantine-font-weight-bold` to 500 and covers `b/strong/th` — do not undo this, and never write a literal `font-weight` above 500.
- White background; **gradient display headings** (`.gradient-heading`) use the Coveo brand blue-green gradient from the research-narrative theme: `#1371ec` → `#00adff` → `#1cebcf`, uppercase, background-clip. Reserved for section/display headings only — everything else stays quiet.
- Prose kickers (`## When?` etc.) and links: solid brand blue `#1371ec`. Cover right-panels: gray `#efefef`.
- **Confidence meter** (the site's signature element): 5 vertical bars, filled `#732dfb`, empty `#d8d8d8` (`ConfidenceMeter`; `ConfidenceLevel` adds the label + info tooltip). Every play declares the confidence level it works best at; all-empty means "anytime". Keep it visible on cards, nav, and play heroes. `/how-to-use` explains it.
- Border radii come from Mantine tokens only (`--radius-card` = radius-md, `--radius-panel` = radius-lg) — no hardcoded radii.
- Icons: Tabler via `@coveord/plasma-react-icons` (it re-exports `@tabler/icons-react`). Never install other icon sets.
- Play cross-links in MDX render as hovercard previews (image + summary) via `PlayAnchor`.
- External links render as `ResourceChip` pills. **Icon = destination**, derived from the URL: `atlassian.net/wiki` → Confluence, `github.com` → invertocat, `miro.com` → Miro, `figma.com` → Figma, else external-link. Brand SVGs live in `src/assets/`. Confluence wins over product brands (a page about Miro hosted on Confluence gets the Confluence icon).
- Hero meta chips (Time, People, Agent skill, "MCP support:" with brand SVG icons) are frontmatter-driven — never hardcode them.
- Every play ends with the `PlayToolbox` component (frontmatter-driven, rendered automatically): agent recipe with copyable docs-CLI commands, MCP setup chips (Confluence pages, registry in `PlayToolbox.tsx` `MCP_DOCS`), and templates & skills chips. Keep agent copy agent-agnostic — "your agent", never a specific product.
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
- `public/illustrations/` — hero illustrations, one SVG per play, in the playbook's illustration language: **retro groovy stripe ribbons** — warm paper `#f1ece1`, bands in navy `#29456e` / blue `#4e86c6` / aqua `#74bfae` / marigold `#e9b345` / coral `#e0684b`, every stripe separated by a paper gap (lines never touch or cross), macro-zoomed compositions bleeding off the canvas, ring "suns" as the recurring motif. Alternative style experiments and the generator live in the gitignored `style-lab/` directory.
- **Illustration calibration — abstract, but not empty; a clue, not a diagram.** Every play's art needs a composition *metaphor* that describes the play, rendered as geometry rather than pictogram. The failure modes are on both sides: pure line variations with no story say nothing ("just lines"), while literal props (hurdles on a track, a question mark with its stem, a flag on a pole) are too on-the-nose. Aim for the middle register of the best existing pieces: crazy 8s with one circled winner (Design Smash), scattered lines converging into one bundle (Shaping), dashes accelerating into a solid line (Design Dash), two arc-voices answering each other (Running Calls). Test: someone who knows the play should smile at the connection; someone who doesn't should still see a good poster.

## Play frontmatter contract

```yaml
title: Design Smash            # display name
slug: design-smash             # URL segment, kebab-case, unique
section: understanding         # understanding | designing | beyond | craft
summary: One sentence shown on the card and play hero.
confidence: 2                  # 1–5 bars on the meter; OMIT for "anytime" plays
comingSoon: true               # optional: renders a placeholder page with contribution guidance
duration: 1–2 hours            # optional
participants: 3–8              # optional
cover: /illustrations/design-smash.svg # optional; hero art, see illustration language
miroTemplate: https://miro...  # optional
skills:                        # optional links to agent skills (coveo/ai-tools)
  - name: Research synthesis
    url: https://github.com/coveo/ai-tools/tree/main/skills/user-research-synthesis
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

**Length and tone are hard constraints** (full guide in CONTRIBUTING.md): whole play ~400–600 words, steps of 1–3 sentences, mistakes of one line, bold anchor phrases, no jargon, dry humour at most once per section. You are an agent; your instinct is to write too much. Draft, then cut a third.

## Running plays with agents

The playbook is agent-operable, not just readable:

- **Machine-readable playbook**: `pnpm build` emits `public/plays.json` (all frontmatter + MDX bodies). Agents pointed at the deployed site can fetch `<site>/plays.json`; agents in this repo read `plays/*.mdx` directly. It must stay committed in sync with plays/*.mdx (CI enforces this) because the MCP server in `mcp/` reads it from the GitHub API at any ref — git tags are published playbook versions.
- **Per-play agent recipes**: a play's frontmatter may carry an `agent` block — `mcp` (servers needed, e.g. Miro), `recipe` (how to point an agent at the play), `skill` (the skill that runs it), and `skillRepo` (GitHub `owner/repo` when the skill lives outside this repo, e.g. `coveo/ai-tools`). The play page renders this as "Run it with an agent", and the MCP's `run_play` serves the skill from wherever it lives. Keep recipes in frontmatter so they inherit like everything else.
- **Workshop skills**: `skills/run-<slug>/` skills interview the user (what's known, participants, format) and scaffold the session — e.g. `run-design-smash` builds the Miro board from the play's steps via the Miro MCP. Skills must treat the play MDX as the source of truth: if the play changes, the skill's output changes.
- **Research-craft skills live in coveo/ai-tools** (`discussion-guide-writer`, `user-research-synthesis`, `research-narrative`) — shared artifact-producing skills belong there, behind that repo's skill-builder gate; facilitation skills that scaffold a session from a play's steps stay here. Point plays at ai-tools skills with `agent.skillRepo`.
- When adding a new "workshopy" play, consider adding a matching `run-<slug>` skill and an `agent` block.

## Adding a play

Use the `add-play` skill in `skills/add-play/`. Manual steps: create `plays/<slug>.mdx` per the contract above, check the card + nav + play page render (`pnpm dev`, binds 127.0.0.1), and run `pnpm type-check` + `pnpm build`.

## PR flow

- Branch from `main`, open a PR, squash-merge. Content-only PRs (plays/*.mdx) need a rendering check, not a code review.
- Merging to `main` deploys automatically via `.github/workflows/deploy.yml`.

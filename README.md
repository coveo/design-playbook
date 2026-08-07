# Coveo Design Playbook

The interactive playbook for how we design at Coveo — plays (workshops, sessions, frameworks) for understanding problems, designing solutions, and testing them with users. Migrated from the original [Figma playbook](https://www.figma.com/design/WmXa6mH4tPZQ5hppqqJCgi/Design-Playbook) into a site that agents can read, run, and extend.

## What's inside

- **Plays as content** — every play is one MDX file in `plays/` with a frontmatter contract (section, confidence level, Miro template, agent recipe…). Files are auto-discovered; there is no registry to edit.
- **The confidence meter** — the playbook's signature concept. Every play declares the confidence level it works best at (1–5 bars, empty = anytime); it shows on cards, navigation, and play pages, and `/how-to-use` explains it.
- **Plasma design system** — built with `@coveord/plasma-mantine` (Gibson typography, Tabler icons) plus the Coveo brand layer: blue-green gradient display headings and the dark-violet statement hero.
- **Live cross-references** — plays reference each other with `<PlayRef slug="…" />`, which renders the current title, coming-soon status, and a Wikipedia-style hovercard from frontmatter. Update a play once and every reference follows.
- **Coming-soon plays** are first-class: placeholder pages with contribution guidance, referenced like any other play, and they flip to live everywhere the moment `comingSoon: true` is removed.

## Agent-operable by design

- **`plays.json`** — the build emits the whole playbook as structured data (`public/plays.json`, committed in sync). Agents can fetch it from the deployed site or read it at any git ref.
- **Playbook MCP server** — `mcp/` exposes the playbook to any agent without the app or a repo clone: `list_plays`, `get_play`, `recommend_play`, `run_play` (serves the facilitation skills so an agent can set up the workshop via its Miro MCP), and `propose_play` (contribute a play — opens a PR). Reads are live and versioned (git refs), auth is your existing GitHub SSO. See [mcp/README.md](./mcp/README.md).
- **Per-play agent recipes** — plays declare an `agent` block (needed MCP servers, a recipe, an optional skill). The play page renders it as "Run it with an agent".
- **Workshop skills** — `skills/` contains skills that *run* plays, not just edit them: `run-design-smash`, `run-shaping-workshop`, `run-design-dash`, `run-journey-mapping`, and `run-storyboarding` each interview you and scaffold the session's Miro board from their play's steps via the Miro MCP; `run-discussion-guide` drafts a bias-linted guide in the house Confluence format from your research plan. `add-play` scaffolds new plays. (`.claude/skills` symlinks here so Claude Code auto-discovers them.)
- **`.mcp.json`** registers the `plasma` and `mantine` MCP servers so agents working on the site get component docs.
- **`AGENTS.md`** is the full contract: conventions, frontmatter schema, visual language, and the agent-operability rules.

## Run locally

```sh
pnpm install
pnpm dev        # http://127.0.0.1:5173
```

## Add or improve a play

Create `plays/<slug>.mdx` following the contract in [AGENTS.md](./AGENTS.md) — or open the repo in Claude Code and ask for the `add-play` skill. Play bodies follow the playbook grammar: *When? / Why? / What do you need? / Step by step / Common mistakes / What next?*

Content-only PRs need a rendering check (`pnpm dev`), `pnpm type-check`, and `pnpm build` — that's it.

## Deploy

Merging to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`), including `plays.json`. The Vite base path is driven by `BASE_PATH`, so the build can later target CloudFront per-PR preview links (see `coveo-incubator/admin-ui-prototypes` for the pattern).

## Source material

The original Figma file remains the design reference; a full text scan of all 81 slides lives in `docs/figma-content-scan.md` for anyone migrating or refining content.

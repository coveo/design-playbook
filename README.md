# Coveo Design Playbook

The interactive playbook for how we design at Coveo — plays (workshops, sessions, frameworks) for understanding problems, designing solutions, and testing them with users. Migrated from the design team's original Figma playbook into a site that agents can read, run, and extend.

## Quick start

Want to just add the `mcp` to your local harness?

### Claude

```bash
claude mcp add design-playbook -- npx -y @coveord/design-playbook-mcp
```

### All other harnesses

```json
{
  "mcpServers": {
    "design-playbook": {
      "command": "npx",
      "args": ["-y", "@coveord/design-playbook-mcp"]
    }
  }
}
```

## What's inside

### The Playbook

The Playbook is made up of all of the workshops, sessions, frameworks that we use at coveo

- **Plays are content** — every play is one MDX file in `packages/design-playbook/plays/` with a frontmatter contract (section, confidence level, Miro template, agent recipe…). Files are auto-discovered; there is no registry to edit.
- **Per-play confidence meter** — the playbook's signature concept. Every play declares the confidence level it works best at (1–5 bars, empty = anytime); it shows on cards, navigation, and play pages, and `/how-to-use` explains it.
- **Live cross-references** — plays reference each other with `<PlayRef slug="…" />`, which renders the current title, coming-soon status, and a Wikipedia-style hovercard from frontmatter. Update a play once and every reference follows.
- **Plasma design system** — built with `@coveord/plasma-mantine` (Gibson typography, Tabler icons) plus the Coveo brand layer: blue-green gradient display headings and the dark-violet statement hero.
- **Coming-soon plays** are first-class: placeholder pages with contribution guidance, referenced like any other play, and they flip to live everywhere the moment `comingSoon: true` is removed.

### Agentic Integrations
- **Playbook MCP server** — `packages/mcp/` exposes the playbook to any agent without the app or a repo clone: `list_plays`, `get_play`, `recommend_play`, `run_play` (serves the facilitation skills so an agent can set up the workshop via its Miro MCP), and `propose_play` (contribute a play — opens a PR). Reads are live and versioned (git refs), auth is your existing GitHub SSO. See [packages/mcp/README.md](./packages/mcp/README.md).
- **Per-play agent recipes** — plays declare an `agent` block (needed MCP servers, a recipe, an optional skill). The play page renders it as "Run it with an agent".
- **`plays.json`** — the build emits the whole playbook as structured data (`packages/design-playbook/public/plays.json`, committed in sync). Agents can fetch it from the deployed site or read it at any git ref.
- **Workshop skills** — `skills/` contains skills that *run* plays, not just edit them: `run-design-smash`, `run-shaping-workshop`, `run-design-dash`, `run-journey-mapping`, and `run-storyboarding` each interview you and scaffold the session's Miro board from their play's steps via the Miro MCP. `add-play` scaffolds new plays. Research-craft skills (`research-planner`, `discussion-guide-writer`, `user-research-synthesis`, `research-narrative`) live in [coveo/ai-tools](https://github.com/coveo/ai-tools/tree/main/skills); their plays point there via `agent.skillRepo`, and the MCP's `run_play` fetches them from that repo. (`.claude/skills` symlinks here so Claude Code auto-discovers them.)
- **`.mcp.json`** registers the `plasma` and `mantine` MCP servers so agents working on the site get component docs.
- **`AGENTS.md`** is the full contract: conventions, frontmatter schema, visual language, and the agent-operability rules.

## Run the playbook website locally

```sh
pnpm install
pnpm dev        # http://127.0.0.1:5173
```

## Add or improve a play

Have your agent create a new `packages/design-playbook/plays/<playbook-name-slug>.mdx` following the contract in [AGENTS.md](./AGENTS.md) — or open the repo in Claude Code and ask for the `add-play` skill. Plays are structured to follow the playbook grammar: *When? / Why? / What do you need? / Step by step / Common mistakes / What next?*

Play-only PRs need a rendering check (`pnpm dev`), `pnpm type-check`, and `pnpm build` — that's it.

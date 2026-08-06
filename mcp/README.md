# Design Playbook MCP server

Exposes the playbook to any MCP client as live, versioned tools — read, facilitate, and contribute, without ever opening the app or cloning the repo. No content ships with the server: **the repo is the database, git refs are the versions, the GitHub API is the read/write path.**

The intended experience: a PM tells their agent "I want to run a Design Smash" → the agent calls `run_play` → the playbook MCP returns the play plus its facilitation skill → the agent interviews the PM and scaffolds the Miro board using its connected Miro MCP. A designer says "I want to add a play about vibe coding" → `propose_play` opens the PR. One MCP connection, same shape as the Atlassian MCP.

## Tools

| Tool | What it does |
| --- | --- |
| `list_plays` | All plays with section, confidence, summary; filter by stage |
| `get_play` | One play in full — frontmatter + complete markdown body |
| `recommend_play` | Given a team situation, returns the playbook's selection guidance + candidates |
| `run_play` | Everything needed to *facilitate* a play: content + the facilitation guide (served from `skills/` at the requested ref). The guide directs the agent to interview the user and scaffold the session via whatever Miro/Figma MCP it has connected |
| `propose_play` | The write path: create or update a play and open a PR (keeps `plays.json` in sync in the same branch). Nothing lands without review |
| `list_versions` | Published playbook versions (git tags) |

Every read tool takes an optional `version` (tag / branch / SHA). Omitted → `main`, i.e. the freshest merged content, always. Reads are ETag-cached, so repeat calls are cheap without going stale.

## Try it locally (from a repo clone)

```sh
cd mcp && pnpm install
claude mcp add design-playbook -- node /path/to/design-playbook/mcp/server.mjs
```

In dev mode (running from a clone, no `version` pinned) it reads `../public/plays.json` directly; with a `version`, or when running outside a clone, it reads through the GitHub API.

## Auth

Uses `GITHUB_TOKEN` if set, else `gh auth token` — the same Coveo GitHub SSO that gates the repo. No separate credentials, no hosted infrastructure.

## Distribution (decision pending with engineering)

1. **`npx github:` from a dedicated repo** — zero infrastructure, auth rides git SSO. Requires extracting `mcp/` to its own repo (npx can't install a subdirectory).
2. **Coveo CodeArtifact** — the internal-registry pattern admin-ui already uses (`codeartifact:login`).
3. **Remote/hosted MCP** — only needed for claude.ai web users; requires real compute (see `bifrost-mcp-gateway` in coveo-incubator for prior art).

## Content freshness contract

`public/plays.json` is generated from `plays/*.mdx` by `pnpm build:plays` and **must be committed in sync** — the deploy workflow enforces this, because API reads at a ref only see committed files.

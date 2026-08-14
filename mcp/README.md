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

## Install

**Once published to npm** (one-liner, same model as `@coveord/plasma-mcp-server`):

```sh
claude mcp add design-playbook -- npx -y @coveord/design-playbook-mcp
```

Or in any project's `.mcp.json`:

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

**From a repo clone** (works today, and for development):

```sh
git clone git@github.com:coveo/design-playbook.git
cd design-playbook/mcp && pnpm install
claude mcp add design-playbook -- node "$(pwd)/server.mjs"
```

In dev mode (running from a clone, no `version` pinned) it reads `../public/plays.json` directly; with a `version`, or when running outside a clone, it reads through the GitHub API.

## Auth

Reads work anonymously while the repo is public (rate-limited by GitHub for unauthenticated calls). With `GITHUB_TOKEN` set, or `gh auth token` available, reads are unthrottled — and `propose_play` (the write path) always requires auth. No separate credentials, no hosted infrastructure.

## Publishing

The package publishes from this subfolder on git tags via GitHub Actions with npm provenance (trusted publishing — no long-lived token). The server itself rarely changes: content updates ship by merging to `main`, not by releasing the package. A remote/hosted variant would only ever be needed for claude.ai web users (browsers can't spawn local MCP servers); that is deliberately out of scope.

## Content freshness contract

`public/plays.json` is generated from `plays/*.mdx` by `pnpm build:plays` and **must be committed in sync** — the deploy workflow enforces this, because API reads at a ref only see committed files.

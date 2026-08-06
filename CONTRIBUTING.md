# Contributing

The playbook belongs to everyone who runs these plays — designers, PMs, and engineers. This guide covers how humans contribute; the technical conventions agents (and you) must follow when touching code or content live in [AGENTS.md](./AGENTS.md).

## Ways to contribute

1. **Improve a play** — fix wording, add facilitation tips, attach a Miro template or agent skill. Edit its file in `plays/`.
2. **Write a coming-soon play** — pick any play marked "(soon)", write its content following the play grammar, and remove `comingSoon: true` from the frontmatter. Every reference across the site updates automatically.
3. **Add a new play** — create `plays/<slug>.mdx` per the frontmatter contract in AGENTS.md, or open the repo in Claude Code and ask for the `add-play` skill.
4. **Add a workshop skill** — teach agents to *run* a play (interview → scaffold the session in Miro). Model it on `skills/run-design-smash/`.
5. **Improve the site** — code contributions follow the same PR flow; check AGENTS.md for the stack and visual-language rules first.

## Getting started

```sh
git clone git@github.com:coveo-incubator/design-playbook.git
cd design-playbook
pnpm install
pnpm dev        # http://127.0.0.1:5173
```

Requires Node 22+ and pnpm. If cloning fails with a 403, authorize the `coveo-incubator` org on your SSH key / GitHub CLI (Settings → SSH keys → Configure SSO).

## Branch and PR flow

- Branch from `main`: `play/<slug>` for content, `feat/<topic>` or `fix/<topic>` for site changes.
- Open a PR and squash-merge. Merging to `main` deploys the site.
- **Content PRs** (only `plays/*.mdx` or images): a rendering check is the review — run `pnpm dev`, confirm the play looks right on the home grid, sidebar, and its own page. No code review needed.
- **Code PRs**: `pnpm type-check` and `pnpm build` must pass; describe what changed and include a screenshot for anything visual.
- Don't edit a PR that's already approved unless the author asks.

## Writing style for plays

- Follow the play grammar (*When? / Why? / What do you need? / Step by step / Common mistakes / What next?*) — skip sections that don't apply rather than padding them.
- Write to the facilitator, in active voice: "Read out the opportunity", not "The opportunity should be read out".
- Keep the original playbook's personality — it says "write drunk; edit sober" and means it. Tighten wording, don't sand it down.
- Reference other plays with `<PlayRef slug="…" />`, never by typing their name — names and coming-soon status must stay inherited.

## Keeping the key documents honest

Three documents describe this repo, each with one job. When your change touches what they describe, update them in the same PR — a stale README is a bug.

| Document | Job | Update it when… |
| --- | --- | --- |
| `README.md` | The shopfront: what the playbook is and what it can do | You add a capability someone would want to know exists — a new section of plays, a new agent integration (MCP, skill, plays.json consumer), a deploy/hosting change |
| `AGENTS.md` | The contract: conventions agents and devs must follow | You change the frontmatter schema, visual tokens, file structure, MDX components (`PlayRef`, callouts), or the agent-operability rules |
| `CONTRIBUTING.md` | The invitation: how humans participate | You change the PR flow, review expectations, or add a new way to contribute |

Rules of thumb:

- Frontmatter field added or removed → AGENTS.md (contract) **and** the `add-play` skill.
- New skill under `skills/` → README (capability) and, if it changes how plays are written, AGENTS.md.
- New play or content edit → no doc updates needed; that's the system working.
- If you're unsure where something goes: README says *what exists*, AGENTS.md says *how it must be done*, CONTRIBUTING.md says *how to take part*.

## Questions

Ask in the design channel, or open an issue on the repo. If you have volunteered to review content before the relaunch — thank you; start with the "(soon)" plays.

---
name: add-play
description: Scaffold a new play (workshop, method, or study) in the Design Playbook. Use when the user asks to add, create, or migrate a play into the playbook.
---

# Add a play to the Design Playbook

## Gather (ask only for what's missing)

1. **Title** and one-sentence **summary**.
2. **Section** — `understanding` (Understanding the problem), `designing` (Designing a solution), `beyond` (Beyond the solution), or `craft` (Research craft — cross-cutting research skills used at any stage; research plans, guides, calls, synthesis, readouts go here, not in a stage).
3. **Confidence level** — 1–5 on the playbook's confidence meter, or "anytime" (omit the field). Ask the user where this play sits.
4. Optional: duration, participants, Miro template URL, related agent skills from https://github.com/coveo/ai-tools/tree/main/skills.
5. **Source material** — if the play exists in the Figma Design Playbook file (key `WmXa6mH4tPZQ5hppqqJCgi`), check `docs/figma-content-scan.md` first (full text of all slides). Preserve the original wording where it's good; tighten where it's not.

## Write

Create `plays/<kebab-case-slug>.mdx` following the frontmatter contract in AGENTS.md. Body grammar (skip sections that don't apply):

```
## When?
## Why?
## What do you need?
## Step by step
## Common mistakes
## What next?
```

- Cross-link other plays with `<PlayRef slug="<slug>" />` — never hardcode play titles or "(coming soon)" text; it derives from frontmatter.
- Use blockquotes for "Before you start" callouts (they render as Alert components).
- Hero art: every play gets an SVG in `public/illustrations/<slug>.svg` following the illustration language in AGENTS.md (retro stripe bands on warm paper). The generator lives in the gitignored `style-lab/` — if it isn't available locally, open the PR without art and note it; a maintainer adds the illustration.
- Inline content images use relative paths (`covers/<name>.png`) with files in `public/covers/`.
- No registry edit is needed — files under `plays/` are auto-discovered.

## Verify

1. `pnpm type-check` passes.
2. `pnpm dev` (binds 127.0.0.1) — confirm the play appears in the sidebar under the right section, on the home grid, and its page renders with the confidence meter.
3. If the play references a Miro template or skill, confirm the links resolve.

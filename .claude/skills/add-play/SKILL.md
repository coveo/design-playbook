---
name: add-play
description: Scaffold a new play (workshop, method, or study) in the Design Playbook. Use when the user asks to add, create, or migrate a play into the playbook.
---

# Add a play to the Design Playbook

## Gather (ask only for what's missing)

1. **Title** and one-sentence **summary**.
2. **Section** — `understanding` (Understanding the problem), `designing` (Designing a solution), or `beyond` (Beyond the solution).
3. **Confidence level** — 1–5 on the playbook's confidence meter, or "anytime" (omit the field). Ask the user where this play sits.
4. Optional: duration, participants, format (Workshop | Study | Framework | Async), Miro template URL, related agent skills from https://github.com/coveo/ai-tools/tree/main/skills.
5. **Source material** — if the play exists in the Figma Design Playbook file (key `WmXa6mH4tPZQ5hppqqJCgi`), check `docs/figma-content-scan.md` first (full text of all slides), and pull screenshots with the Figma MCP `get_screenshot` for cover images. Preserve the original wording where it's good; tighten where it's not.

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

- Cross-link other plays as `[Title](/#/plays/<slug>)`.
- Reference images with relative paths (`covers/<slug>.png`) and put files in `public/covers/`.
- No registry edit is needed — files under `plays/` are auto-discovered.

## Verify

1. `pnpm type-check` passes.
2. `pnpm dev` (binds 127.0.0.1) — confirm the play appears in the sidebar under the right section, on the home grid, and its page renders with the confidence meter.
3. If the play references a Miro template or skill, confirm the links resolve.

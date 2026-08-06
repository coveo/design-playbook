---
name: add-play
description: Scaffold a new play (workshop, method, or study) in the Design Playbook. Use when the user asks to add, create, or migrate a play into the playbook.
---

# Add a play to the Design Playbook

## Gather (ask only for what's missing)

1. **Title** and one-sentence **summary**.
2. **Category** — reuse an existing one if it fits (`grep -h "^category:" plays/*.mdx | sort -u`); only create a new category deliberately.
3. Optional: duration, participants, format (Workshop | Study | Method | Async), Miro template URL, related agent skills from https://github.com/coveo/ai-tools/tree/main/skills.
4. **Source material** — if the play exists in the Figma Design Playbook file (key `WmXa6mH4tPZQ5hppqqJCgi`), pull its content with the Figma MCP (`get_screenshot` for reference, `get_design_context` for text) instead of writing from scratch. Preserve the original wording where it's good; tighten where it's not.

## Write

Create `plays/<kebab-case-slug>.mdx` following the frontmatter contract in AGENTS.md. Body structure:

```
## When to use it
## How to run it
## Outputs
```

Add sections only when the play genuinely needs them (e.g. "Preparation", "Facilitation tips", "Remote variant"). No registry edit is needed — files under `plays/` are auto-discovered.

## Verify

1. `pnpm type-check` passes (frontmatter shape errors surface here).
2. `pnpm dev` (binds 127.0.0.1) — confirm the card appears on the home page under the right category and the play page renders.
3. If the play references a Miro template or skill, confirm the links resolve.

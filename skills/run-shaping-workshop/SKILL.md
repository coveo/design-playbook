---
name: run-shaping-workshop
description: Set up and facilitate a Shaping Workshop — interviews the user about the opportunity and groups, then scaffolds a Miro board with breakout zones and pitch templates. Use when the user asks to run, set up, or prepare a shaping workshop or shaping session.
metadata:
  version: "1.1.0"
  last-evaluated: "2026-08-07"
  maturity: 4/5      # Production
---

# Run a Shaping Workshop

The source of truth is `plays/shaping-workshop.mdx` (or the MCP's `get_play`, slug `shaping-workshop`). Follow the play, not this file, if they diverge.

## 1. Interview (one round of questions)

**Hard stops:** the opportunity (what and why now) and the appetite are required — shaping starts from a time budget. Stop and ask rather than scaffolding placeholders.

1. **The opportunity** — what are we shaping, and why now? Ask for the evidence the PM will present (customer behaviours, pain points, requests) and the desired outcome.
2. **Appetite** — how big a bet? Shaping starts from a time budget, not a feature list.
3. **Groups** — how many breakout groups (default 2), and who's in them? Each needs engineers plus a designer or PM.
4. **Where** — existing Miro board/space or create new?


## 2. Confirm before creating (plan-validate-execute)

Present a one-screen plan before touching Miro: board name, destination (team/space), and the frame list from step 3. Create nothing until the user confirms.

## Fallback: no Miro

If the Miro MCP is unavailable, or a call fails twice: switch to the **HTML blueprint** — write a single static HTML file that *visualizes* the board layout (frames as labeled boxes with their contents as notes, same left-to-right order). It is a picture of the board to build from or share, not a whiteboarding tool. Tell the user why you fell back.

## 3. Scaffold the Miro board (requires Miro MCP)

Create `Shaping Workshop — <opportunity>` with, left to right:

1. **The opportunity** — brief area for the PM's intro: why this / why now, evidence stickies, desired outcome, appetite, and an explicit **in scope / out of scope** pair.
2. **Breakout zones** — one per group, each containing a **pitch template**: *Problem we're really solving / Concept sketches / Questions & assumptions / Technical implications & sequencing / How we'll detect the outcome / Pivot switches*.
3. **Share-back wall** — space to pin each group's pitch, with a sticky stack for questions raised while pulling ideas apart.
4. **Decision** — a small frame for the aligned path forward and what's deliberately not being done.

Share the board link back with a one-line facilitator brief: shaping decides what we're *not* doing; budget first, scope second.


## 4. Verify, then hand over

Completion criterion: every frame from the layout list exists on the board — check with a board read (e.g. `board_list_items`) and fix gaps before sharing. Missing frames: one brief area, one zone per group with its pitch template, share-back wall, decision frame. Then share the link with the facilitator brief. If the user rejects the board, offer to trash it (`board_trash`) rather than leaving orphans.

## 5. Offer follow-ups (don't do them unprompted)

Draft the invite, or when the workshop lands on a clear opportunity, point to `design-smash` as the next play.

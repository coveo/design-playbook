---
name: run-design-dash
description: Set up and facilitate a Design Dash — interviews the user about the problem and participants, then scaffolds a two-session Miro board (context, crazy 8s, 4-step sketches, voting, storyboard). Use when the user asks to run, set up, or prepare a design dash or design sprint.
metadata:
  version: "1.1.0"
  last-evaluated: "2026-08-07"
  maturity: 4/5      # Production
---

# Run a Design Dash

The source of truth is `plays/design-dash.mdx` (or the MCP's `get_play`, slug `design-dash`). Follow the play, not this file, if they diverge.

## 1. Interview (one round of questions)

**Hard stop:** the problem and at least one piece of context (client feedback, story-mapping output, competitor example) are required — a dash without shared context is just a drawing session. Stop and ask.

1. **The problem** — what are we aligning on? What context exists?
2. **Participants** — who's in, who facilitates, who is the master voter (usually the PM)?
3. **Sessions** — two sessions (~3h total); are they same-day or split?
4. **Where** — existing Miro board/space or create new?


## 2. Confirm before creating (plan-validate-execute)

Present a one-screen plan before touching Miro: board name, destination (team/space), and the frame list from step 3. Create nothing until the user confirms.

## Fallback: no Miro

If the Miro MCP is unavailable, or a call fails twice: switch to the **HTML blueprint** — write a single static HTML file that *visualizes* the board layout (frames as labeled boxes with their contents as notes, same left-to-right order). It is a picture of the board to build from or share, not a whiteboarding tool. Tell the user why you fell back.

## 3. Scaffold the Miro board (requires Miro MCP)

Create `Design Dash — <problem>` with two session areas:

**Session 1 — map & sketch**: a **context** frame (problem summary, evidence, sprint questions), per-participant **crazy 8s** zones, and per-participant **4-step sketch** slots — each slot titled with a codename placeholder and a reminder: *multiple states, lots of copy, no explanations*.

**Session 2 — vote & storyboard**: a **gallery** frame for uploaded sketches with voting dots (plus a distinct pair for the master voter), and a **storyboard** frame of 6–7 empty step slots for the winning idea.

Share the board link with a one-line facilitator brief: don't explain your sketch — it has to speak for itself.


## 4. Verify, then hand over

Completion criterion: every frame from the layout list exists on the board — check with a board read (e.g. `board_list_items`) and fix gaps before sharing. Missing frames: context frame, per-participant crazy-8s and sketch slots, gallery with dots, storyboard slots. Then share the link with the facilitator brief. If the user rejects the board, offer to trash it (`board_trash`) rather than leaving orphans.

## 5. Offer follow-ups (don't do them unprompted)

Draft invites for the two sessions, or when the storyboard is done, point to `prototyping-with-agents` for the build.

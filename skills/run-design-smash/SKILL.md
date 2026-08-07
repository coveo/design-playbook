---
name: run-design-smash
description: Set up and facilitate a Design Smash workshop — interviews the user about the problem and participants, then scaffolds a ready-to-run Miro board (gallery wall, voting dots, agenda). Use when the user asks to run, set up, or prepare a Design Smash or ideation workshop.
metadata:
  version: "1.1.0"
  last-evaluated: "2026-08-07"
  maturity: 4/5      # Production
---

# Run a Design Smash

The source of truth for this play is `plays/design-smash.mdx` (or `<site>/plays.json`, slug `design-smash`). Read it first — the board you build must follow its steps, and if the play changes, follow the play, not this file.

## 1. Interview (ask only what's missing, in one round of questions)

**Hard stop:** a written problem/opportunity statement is required — the play demands "a precise and clear opportunity". If the user has none, stop and offer `run-shaping-workshop` first; scaffold nothing without it.

1. **The opportunity/problem** — one or two sentences, ideally the output of a Shaping Workshop.
2. **Size check** — is it roughly 1–3 screens / 1–3 user steps? If clearly bigger, flag that the play warns against too-broad opportunities.
3. **Participants** — names or count (engineers, PMs, designers all welcome), and who facilitates (default: the user).
4. **Format** — remote (Miro-first) or in-room (paper-first, Miro for the gallery only)?
5. **Timebox** — default 90 minutes.
6. **Where** — existing Miro board/space or create a new one?


## 2. Confirm before creating (plan-validate-execute)

Present a one-screen plan before touching Miro: board name, destination (team/space), and the frame list from step 3. Create nothing until the user confirms.

## Fallback: no Miro

If the Miro MCP is unavailable, or a call fails twice: switch to the **HTML blueprint** — write a single static HTML file that *visualizes* the board layout (frames as labeled boxes with their contents as notes, same left-to-right order). It is a picture of the board to build from or share, not a whiteboarding tool. Tell the user why you fell back.

## 3. Scaffold the Miro board (requires Miro MCP)

Create one board named `Design Smash — <short problem name>` with these areas, left to right (use frames/sections; keep it uncluttered):

1. **Context** — the agreed problem/opportunity summary at the top (editable text), plus a "boundaries: in / out" pair of sticky zones. This mirrors step 1 of the play.
2. **Warm-up** — small area with the chosen warm-up exercise (default: squiggle birds) and a one-line instruction.
3. **Idea generation** — per-participant private zones for crazy-8s uploads, plus a shared **mini-gallery** frame ("pick 3–4 ideas, broad range, not your best").
4. **Gallery wall** — the main frame: numbered slots for final three-frame sketches (one per participant), each slot with a title placeholder. Add a stock of voting dots (small circles) in a corner, 3 per participant, plus a sticky stack for questions.
5. **Decision** — a frame with the two possible outcomes from the play's final vote: "3–4 provocations" vs "1 coherent solution", and a next-step sticky pointing to Storyboarding.
6. **Agenda** — a compact timeline sticky matching the play's timings scaled to the user's timebox (overview 15' → warm-up 10' → ideation → sketching 20-30' → gallery 10-20' → interpretation ~20' → vote).

Then share the board link back, with a one-paragraph facilitator brief: the four common mistakes from the play, compressed.


## 4. Verify, then hand over

Completion criterion: every frame from the layout list exists on the board — check with a board read (e.g. `board_list_items`) and fix gaps before sharing. Missing frames: re-run the create for just those. Then share the link with the facilitator brief. If the user rejects the board, offer to trash it (`board_trash`) rather than leaving orphans.

## 5. Offer follow-ups (don't do them unprompted)

- Schedule the session / draft the invite text.
- After the workshop: photograph → upload sketches; and when it ends in provocations or a winning sketch, point to the `storyboarding` play as the next step.

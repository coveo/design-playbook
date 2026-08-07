---
name: run-design-smash
description: Set up and facilitate a Design Smash workshop — interviews the user about the problem and participants, then scaffolds a ready-to-run Miro board (gallery wall, voting dots, agenda). Use when the user asks to run, set up, or prepare a Design Smash or ideation workshop.
metadata:
  version: "1.0.0"
  last-evaluated: "2026-08-07"
  maturity: 4/5      # Production
---

# Run a Design Smash

The source of truth for this play is `plays/design-smash.mdx` (or `<site>/plays.json`, slug `design-smash`). Read it first — the board you build must follow its steps, and if the play changes, follow the play, not this file.

## 1. Interview (ask only what's missing, in one round of questions)

1. **The opportunity/problem** — one or two sentences. Ideally the output of a Shaping Workshop. If the user has none, warn them the play expects a precise opportunity and suggest running `shaping-workshop` first (don't block — they may know what they're doing).
2. **Size check** — is it roughly 1–3 screens / 1–3 user steps? If clearly bigger, flag that the play warns against too-broad opportunities.
3. **Participants** — names or count (engineers, PMs, designers all welcome), and who facilitates (default: the user).
4. **Format** — remote (Miro-first) or in-room (paper-first, Miro for the gallery only)?
5. **Timebox** — default 90 minutes.
6. **Where** — existing Miro board/space or create a new one?

## 2. Scaffold the Miro board (requires Miro MCP)

Create one board named `Design Smash — <short problem name>` with these areas, left to right (use frames/sections; keep it uncluttered):

1. **Context** — the agreed problem/opportunity summary at the top (editable text), plus a "boundaries: in / out" pair of sticky zones. This mirrors step 1 of the play.
2. **Warm-up** — small area with the chosen warm-up exercise (default: squiggle birds) and a one-line instruction.
3. **Idea generation** — per-participant private zones for crazy-8s uploads, plus a shared **mini-gallery** frame ("pick 3–4 ideas, broad range, not your best").
4. **Gallery wall** — the main frame: numbered slots for final three-frame sketches (one per participant), each slot with a title placeholder. Add a stock of voting dots (small circles) in a corner, 3 per participant, plus a sticky stack for questions.
5. **Decision** — a frame with the two possible outcomes from the play's final vote: "3–4 provocations" vs "1 coherent solution", and a next-step sticky pointing to Storyboarding.
6. **Agenda** — a compact timeline sticky matching the play's timings scaled to the user's timebox (overview 15' → warm-up 10' → ideation → sketching 20-30' → gallery 10-20' → interpretation ~20' → vote).

Then share the board link back, with a one-paragraph facilitator brief: the four common mistakes from the play, compressed.

## 3. Offer follow-ups (don't do them unprompted)

- Schedule the session / draft the invite text.
- After the workshop: photograph → upload sketches; and when it ends in provocations or a winning sketch, point to the `storyboarding` play as the next step.

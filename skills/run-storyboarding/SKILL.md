---
name: run-storyboarding
description: Set up and facilitate a Storyboarding session — interviews the user about the winning sketch and prototype goal, then scaffolds a Miro board with the story rail (6–7 step slots) and per-screen content zones. Use when the user asks to run, set up, or prepare a storyboarding session.
metadata:
  version: "1.0.0"
  last-evaluated: "2026-08-07"
  maturity: 4/5      # Production
---

# Run a Storyboarding session

The source of truth is `plays/storyboarding.mdx` (or the MCP's `get_play`, slug `storyboarding`). Follow the play, not this file, if they diverge.

## 1. Interview (one round of questions)

**Hard stop:** storyboarding needs input — the top-voted sketch from a Design Smash, or tested provocation concepts. If neither exists, stop and offer `run-design-smash`; a storyboard without a seed is just an empty comic strip.

1. **The seed** — link or image of the winning sketch / provocations, and the agreed direction.
2. **The prototype's primary goal** — what must we learn by validating this? Any secondary goals (multiple approaches, multiple flows)?
3. **Participants** — who's in the hour, who facilitates?
4. **Where** — existing Miro board/space or create new?

## 2. Confirm before creating (plan-validate-execute)

Present a one-screen plan before touching Miro: board name, destination (team/space), and the frame list from step 3. Create nothing until the user confirms.

## Fallback: no Miro

If the Miro MCP is unavailable, or a call fails twice: switch to the **HTML blueprint** — write a single static HTML file that *visualizes* the board layout (frames as labeled boxes with their contents as notes, same left-to-right order). It is a picture of the board to build from or share, not a whiteboarding tool. Tell the user why you fell back.

## 3. Scaffold the Miro board (requires Miro MCP)

Create `Storyboard — <concept>` with, left to right:

1. **The seed** — a frame holding the winning sketch / provocation results and one sticky stating the agreed direction.
2. **Goal** — a frame with the primary goal sticky, secondary-goal stickies, and one prompt: *what do we most need to learn?*
3. **The story rail** — 6–7 empty step slots in a row, each with a name post-it on top and a content zone below. Tip sticky on slot 1: *stuck? start with the first and last steps of the journey*. The sketch usually lands mid-rail — leave slots either side.
4. **In / out** — a two-column frame for the flesh-out pass: ideas that go into the prototype vs. ideas parked as not important enough.

Share the board link with a one-line facilitator brief: it's usually just a few extra screens before and after the sketch.

## 4. Verify, then hand over

Completion criterion: every frame from the layout list exists on the board — check with a board read (e.g. `board_list_items`) and fix gaps before sharing. Missing frames: seed, goal, 6–7 rail slots, in/out columns. If the user rejects the board, offer to trash it (`board_trash`) rather than leaving orphans.

## 5. Offer follow-ups (don't do them unprompted)

When the rail is agreed, point to `prototyping-with-agents` to turn the storyboard into a working prototype.

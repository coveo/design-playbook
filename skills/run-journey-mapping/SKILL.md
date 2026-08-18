---
name: run-journey-mapping
description: Set up and facilitate a Journey Mapping session — interviews the user about the journey and the people in it, then scaffolds a Miro board with phase columns, user rows, and emotion/opportunity lanes. Use when the user asks to run, set up, or prepare a journey mapping session.
metadata:
  version: "1.1.0"
  last-evaluated: "2026-08-07"
  maturity: 4/5      # Production
---

# Run a Journey Mapping session

The source of truth is `plays/journey-mapping.mdx` (or the MCP's `get_play`, slug `journey-mapping`). One check before scaffolding: if the user wants to design the *ideal* journey or scope a first version, that's User Story Mapping — flag it and stop.

## 1. Interview (one round of questions)

**Hard stop:** the journey and the users involved are required — a map with no chosen journey has no columns. Stop and ask.

1. **The journey** — which one, and how high-level? ("Creating a campaign" and "user views a health issue" are both valid.)
2. **Users involved** — one or several (e.g. merchandiser, developer, support)? If several, separate journeys or one unified map?
3. **What's known** — are the phases already understood, or is naming them part of the session?
4. **Where** — existing Miro board/space or create new?


## 2. Confirm before creating (plan-validate-execute)

Present a one-screen plan before touching Miro: board name, destination (team/space), and the frame list from step 3. Create nothing until the user confirms.

## Fallback: no Miro

If the Miro MCP is unavailable, or a call fails twice: switch to the **HTML blueprint** — write a single static HTML file that *visualizes* the board layout (frames as labeled boxes with their contents as notes, same left-to-right order). It is a picture of the board to build from or share, not a whiteboarding tool. Tell the user why you fell back.

## 3. Scaffold the Miro board (requires Miro MCP)

Create `Journey Map — <journey>` as a grid:

1. **Title card** — the chosen journey, phrased from the user's perspective.
2. **User legend** — one colored dot per user involved.
3. **Phase columns** — the known phases as column headers (e.g. *Notification / Investigation / Resolution*), or empty headers to name live.
4. **Steps zone** — sticky space under each phase, one row per user, granular enough to tell a story.
5. **EMOTIONS lane** — a horizontal band below the steps for highs and lows (emoji stickies work).
6. **OPPORTUNITIES lane** — a band at the bottom for the questions the map provokes ("How can we build trust when everything's running smoothly?").

Share the board link with a one-line facilitator brief: map what happens today, not what should happen.


## 4. Verify, then hand over

Completion criterion: every frame from the layout list exists on the board — check with a board read (e.g. `board_list_items`) and fix gaps before sharing. Missing frames: title card, user legend, phase columns, steps zone, EMOTIONS lane, OPPORTUNITIES lane. Then share the link with the facilitator brief. If the user rejects the board, offer to trash it (`board_trash`) rather than leaving orphans.

## 5. Offer follow-ups (don't do them unprompted)

When opportunities emerge, point to `shaping-workshop` for the strongest one.

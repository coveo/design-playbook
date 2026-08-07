---
name: run-journey-mapping
description: Set up and facilitate a Journey Mapping session — interviews the user about the journey and the people in it, then scaffolds a Miro board with phase columns, user rows, and emotion/opportunity lanes. Use when the user asks to run, set up, or prepare a journey mapping session.
---

# Run a Journey Mapping session

The source of truth is `plays/journey-mapping.mdx` (or the MCP's `get_play`, slug `journey-mapping`). One check before scaffolding: if the user wants to design the *ideal* journey or scope a first version, that's User Story Mapping — flag it and stop.

## 1. Interview (one round of questions)

1. **The journey** — which one, and how high-level? ("Creating a campaign" and "user views a health issue" are both valid.)
2. **Users involved** — one or several (e.g. merchandiser, developer, support)? If several, separate journeys or one unified map?
3. **What's known** — are the phases already understood, or is naming them part of the session?
4. **Where** — existing Miro board/space or create new?

## 2. Scaffold the Miro board (requires Miro MCP)

Create `Journey Map — <journey>` as a grid:

1. **Title card** — the chosen journey, phrased from the user's perspective.
2. **User legend** — one colored dot per user involved.
3. **Phase columns** — the known phases as column headers (e.g. *Notification / Investigation / Resolution*), or empty headers to name live.
4. **Steps zone** — sticky space under each phase, one row per user, granular enough to tell a story.
5. **EMOTIONS lane** — a horizontal band below the steps for highs and lows (emoji stickies work).
6. **OPPORTUNITIES lane** — a band at the bottom for the questions the map provokes ("How can we build trust when everything's running smoothly?").

Share the board link with a one-line facilitator brief: map what happens today, not what should happen.

## 3. Offer follow-ups (don't do them unprompted)

When opportunities emerge, point to `shaping-workshop` for the strongest one.

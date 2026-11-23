---
name: run-async-design-crit
description: Build the board for an Async Design Crit — asks for the crit name, topics and deadline, then scaffolds an empty, labelled Miro board (walkthrough video, context, one area per topic) ready for the designer to fill. Use when the user asks to set up, prepare or build the board for an async design crit or async design review.
metadata:
  version: "1.0.0"
  last-evaluated: "2026-11-10"
  maturity: 3/5      # Beta
---

# Build the board for an Async Design Crit

The source of truth is `plays/async-design-crit.mdx` (or the MCP's `get_play`, slug `async-design-crit`). Follow the play, not this file, if they diverge.

This skill does **one step of the play: building the board**. It scaffolds empty, labelled areas. It does not write the problem, research or critique content, draft Slack messages, or run the nudge and close-out. That's the designer's work.

## 1. Ask (one round, only what's missing)

1. **Crit name**: what's being critiqued, in a few words.
2. **Topics**: 1–3 names for the parts people should give feedback on (e.g. "Scheduling a campaign", "When campaigns overlap").
3. **Deadline**: day and time, with time zone.
4. **Where**: an existing Miro board or space, or a new board.

## 2. Confirm before creating

Show the board name, destination and area list from step 3 on one screen. Create nothing until the user confirms.

## 3. Scaffold the board (requires Miro MCP)

Create `Async crit — <crit name>` with these areas, left to right, all empty except labels and the feedback rules:

1. **Watch me!**: an empty space sized for the walkthrough video, labelled "Paste your walkthrough video here (5–10 min)".
2. **Context**: four labelled areas in a row:
   - **The problem**
   - **Research**
   - **The goal of the critique**: one question this crit must answer
   - **How to give feedback**: fill this one in with the rules from step 2 of the play (comment on the board, not sticky notes; reply in threads) and the deadline.
3. **One area per topic**: titled `Topic <n>: <name>`, empty, wide enough for a flow of screens or A/B/C variants.

If the Miro MCP is unavailable or a call fails twice, stop and say why. Don't fall back to another format.

## 4. Verify, then hand over

Read the board back and check every area from step 3 exists with its label. Fix gaps, then share the link with one line: fill the context first, lay out each topic as a flow, then check commenter access before posting (step 4 of the play). If the user rejects the board, offer to delete it rather than leave an orphan.

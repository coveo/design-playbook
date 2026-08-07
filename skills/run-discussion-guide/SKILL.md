---
name: run-discussion-guide
description: Draft a discussion guide from a research plan and publish it to Confluence in the house format — timeboxed section tables, consent script, prototype modules, bias-linted questions. Use when the user asks to write, draft, or create a discussion guide, interview script, or usability test script.
metadata:
  version: "1.0.0"
  last-evaluated: "2026-08-07"
  maturity: 4/5      # Production
---

# Write a Discussion Guide

The method is `plays/writing-discussion-guides.mdx`; the format is the house style below, distilled from real guides. The base template is [Template: Discussion guide](https://coveord.atlassian.net/wiki/spaces/UX/pages/5506039825) — the origin, not gospel.

## 1. Intake (ask-on-block)

**Hard stop:** a research plan (link or pasted content) is required — the guide's job is turning *its* research questions into a script. No plan → stop and offer `creating-research-plan`.

Collect, asking only when missing:

1. **Research plan** — extract goals, research questions, participant criteria, session length (default 45–60 min).
2. **Study type** — discovery conversation or evaluative (prototype) session; shapes the module structure.
3. **Prototype links** — required for evaluative studies. If there is also *prototype source code* (repo or path), offer: *"Want me to investigate the prototype code first — dead-ends, non-clickable areas, and key themes worth probing — to inform the tasks and moderator caveats?"* Findings become task boundaries and "not everything is clickable" notes.
4. **Audiences** — one guide can carry variants (customers vs. internal folks, new vs. returning participants); ask which apply.

## 2. Draft in the house format

Structure (matches the corpus — deviate only with reason):

1. **Intro block** — bullets, spoken-word register: welcome + thanks; introductions; purpose in 1–2 sentences; "we're not testing you — there are no right or wrong answers"; **the recording-consent question, always explicit**; "any questions before we start?". Write per-audience intro variants when audiences differ.
2. Divider, then `Discussion guide` heading and warm-up questions (role, responsibilities, product familiarity).
3. **Question sections as single-column tables**, one per theme, header row carrying the section title **and timebox** ("Section 2 — Search behaviours (15–20 min)"). Under each section, an italic *Assesses: …* line stating what it's for. Timeboxes must sum to the session length.
4. **Evaluative studies**: a module per prototype — moderator framing script, link-share setup, scenario, task with think-aloud ask, the *"this is a prototype, not everything is clickable"* caveat, an Observations row, and per-element then overall questions. Two+ prototypes → note module rotation across calls.
5. **Wrap-up table** — anything we missed; the follow-up ask (async feedback, next round, reaching their users); "any questions for us?".

Question craft comes from the plays: anchor to the recent past, open questions, magic-wand closers sparingly. Keep the whole guide one page.

## 3. Bias lint (validation loop)

Before publishing, scan every question and rewrite offenders:

- Leading or yes/no-inviting questions
- Hypotheticals ("would you…", "could you imagine…") — anchor to the past instead
- Subjective comparisons ("is this easier?") — if they volunteer "easier", the moderator asks *why*
- Pitching disguised as a question

Completion criterion: zero offenders remain, or each survivor is deliberate and flagged to the user.

## 4. Publish to Confluence (requires Atlassian MCP)

- **Destination**: if the research plan is a Confluence page, create the guide as its **child page** in the same space — confirm with the user before creating. If there's no plan link, **ask where to put it** (space + parent).
- **ADF always, markdown never** — Confluence pages are written with `contentFormat: "adf"`; markdown silently strips the table structure this format depends on.
- Title: `Discussion guide — <study name>`. Mark `[WIP]` if the user says it's a draft.
- **Fallback**: if the Atlassian MCP is unavailable or the write fails, produce the guide as a local markdown file and say why.

Completion criterion: page exists at the confirmed destination, structure intact on re-read (intro block, timeboxed section tables, wrap-up). If the user rejects it, offer to delete the page rather than leaving drafts behind.

## 5. Offer follow-ups (don't do them unprompted)

Pilot the guide on a colleague (the play's step 5), or when sessions are done, hand off to the research synthesis skill in coveo/ai-tools.

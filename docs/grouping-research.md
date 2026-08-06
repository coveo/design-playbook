# Should the playbook keep its three-stage grouping?

Research across ten playbooks/method libraries (Aug 2026), triggered by the observation that
research-craft plays (research plans, discussion guides, running calls, synthesis) feel like they
belong to both "Understanding the problem" and "Beyond the solution".

## What everyone else does

| Library | Grouping axis | Categories | Cross-phase answer |
| --- | --- | --- | --- |
| 18F Methods | Process phase + one cross-cutting bucket | Discover, Decide, Make, Validate, **Fundamentals** | Fundamentals holds what applies everywhere (recruiting, incentives, privacy) — no duplication |
| GOV.UK Service Manual | Dual-axis | Phase pages (discovery/alpha/beta/live) + separate methods library | Phase pages say *when* and link to method pages that say *how* — written once |
| IDEO Design Kit | HCD phase | Inspiration, Ideation, Implementation | Alternate question-based entry ("How do I conduct an interview?") |
| Google Design Sprint Kit | Sprint phase (hard) | Understand, Define, Sketch, Decide, Prototype, Validate | None — works only because a sprint is a fixed linear week |
| Atlassian Team Playbook | Team problem, not phase | Align to goals, Plan & track, Unleash knowledge… | Multi-listing + related-play links; **Health Monitor** diagnoses and recommends plays |
| VMware Tanzu Labs | Engagement phase, multi-tagged | Discovery, Framing, Delivery, Transition… | **Non-exclusive tags** — a practice appears under every phase it serves |
| IBM Enterprise Design Thinking | A loop, not phases | Observe, Reflect, Make (+ phase-independent Keys) | The loop repeats, so "early and late" isn't an exception |
| SessionLab / Hyper Island | Purpose tags + logistics facets | Team, Energiser, Idea Generation… | Pure tagging; filters for time, group size, skill |
| NN/g | Activities per iteration | Discover, Explore, Test, **Listen** | "Stages are not neatly compartmentalized… the end of one cycle is the beginning of the next"; Listen runs throughout |
| Teresa Torres | No phases | Weekly continuous-discovery cadence | Discovery is a habit, not a phase |

## The verdict on our three stages

**Keep them — everyone keeps a phase view because it's the friendliest entry point — but hold them
loosely, and stop asking them to hold work they can't.** The felt conflict is real and named in the
literature: research craft is *stage-independent skill*, invoked by stage-specific moments. Filing
"Writing Discussion Guides" under Beyond the solution is exactly the miscategorisation 18F's
Fundamentals bucket and GOV.UK's dual-axis exist to avoid.

## Recommendation

1. **Add a fourth, explicitly cross-cutting section: "Research craft"** (18F Fundamentals pattern).
   Move there: Creating a Research Plan, Writing Discussion Guides, Running Calls, Synthesising
   Research, Presenting your Findings.
2. **Keep the stage plays as the "when"**: Speaking to Customers stays in Understanding the problem
   (the discovery moment), Testing your Solutions stays in Beyond the solution (the validation
   moment). Both stay thin and `PlayRef` into the craft plays for the how (GOV.UK pattern: stage
   narrates when, craft explains how — written once, linked everywhere).
3. **Lean into the confidence meter as our Health Monitor.** It is already the phase-independent
   diagnostic axis — "where am I?" — which is the same job Atlassian's standout mechanic does. The
   MCP's `recommend_play` uses it; the Home page could later gain a "not sure where to start?"
   entry that walks it.
4. **Don't build multi-tagging yet.** Tags earn their keep at SessionLab scale (hundreds of
   methods). At ~17 plays, a single honest section per play plus `PlayRef` cross-links is cheaper
   and clearer. Revisit at ~30+ plays.
5. **Steal for the backlog:** Atlassian's prep-time/run-time/participants metadata strip (we have
   Time; add prep time when plays get skills), Google DSK's "recipes" (pre-assembled sequences —
   Design Dash already is one), Tanzu's learning paths (e.g. "new PM's first research round" as a
   sequenced path through craft plays).

## Sources

18F Methods (github.com/18F/methods) · GOV.UK Service Manual user research · IDEO designkit.org ·
Google designsprintkit.withgoogle.com · Atlassian atlassian.com/team-playbook · Tanzu
labspractices.com · IBM Enterprise Design Thinking field guide · NN/g "UX Research Cheat Sheet" +
"Which UX Research Methods" · Design Council "Double Diamond 15 years on" · Smashing Magazine
(Budd) "Improving the Double Diamond" · Product Talk (Torres) continuous discovery.

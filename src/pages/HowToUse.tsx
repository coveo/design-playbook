import {ConfidenceMeter} from '../components/ConfidenceMeter';

export const HowToUse = () => (
    <div className="page">
        <article className="prose howto">
            <h1>
                <span className="gradient-heading">How to use the playbook</span>
            </h1>
            <p className="lead">
                The playbook is a collection of plays — workshops, sessions and frameworks —
                organised around how confident you are in the problem and the solution. Two
                minutes here and you&rsquo;ll know exactly how to read it.
            </p>

            <h2>The confidence meter</h2>
            <p>
                Every play carries a meter showing the confidence level it works best at. Low
                confidence means you are still working out what the problem is; high confidence
                means you know what you are building and why.
            </p>
            <div className="meter-scale">
                <div className="row">
                    <ConfidenceMeter level={1} />
                    <span>Little is known — start framing the problem (e.g. Shaping Workshop)</span>
                </div>
                <div className="row">
                    <ConfidenceMeter level={2} />
                    <span>
                        The problem is framed — explore and converge on ideas (e.g. Design Smash,
                        Storyboarding)
                    </span>
                </div>
                <div className="row">
                    <ConfidenceMeter level={4} />
                    <span>The solution is taking shape — validate and refine it</span>
                </div>
                <div className="row">
                    <ConfidenceMeter />
                    <span>All bars empty: the play works at any confidence level</span>
                </div>
            </div>

            <h2>The three stages</h2>
            <p>Plays are grouped into the stages of a design effort:</p>
            <ul>
                <li>
                    <strong>Understanding the problem</strong> — align on what we are solving and
                    why, before jumping to solutions.
                </li>
                <li>
                    <strong>Designing a solution</strong> — turn the chosen direction into
                    something testable.
                </li>
                <li>
                    <strong>Beyond the solution</strong> — test with users and feed what you learn
                    back into the loop.
                </li>
            </ul>
            <p>
                Stages are a compass, not a pipeline — plays tell you in their <em>What next?</em>{' '}
                section where to go from there.
            </p>

            <h2>Reading a play</h2>
            <p>Each play follows the same grammar, so you always know where to look:</p>
            <ul>
                <li>
                    <strong>When?</strong> — the moment this play earns its time
                </li>
                <li>
                    <strong>Why?</strong> — the reasoning behind the method
                </li>
                <li>
                    <strong>What do you need?</strong> — people and materials
                </li>
                <li>
                    <strong>Step by step</strong> — how to actually run it
                </li>
                <li>
                    <strong>What next?</strong> — where the output goes
                </li>
            </ul>
            <p>Hover any play link inside a page to preview it without leaving where you are.</p>

            <h2>Make it yours</h2>
            <p>
                None of this is prescriptive. Each play can — and probably should — be adapted to
                your team&rsquo;s needs and context. A good playbook is never finished.
            </p>
            <p>
                Plays link to their tools where they exist: Miro templates for workshops and agent
                skills (research synthesis, research narrative) that speed up the heavy lifting.
                Want to add or improve a play? The playbook lives in a repo — open a PR or ask the
                design team.
            </p>
        </article>
    </div>
);

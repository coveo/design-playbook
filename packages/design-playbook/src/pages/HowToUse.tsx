import {Tabs} from '@mantine/core';
import {useSearchParams} from 'react-router-dom';
import {ConfidenceMeter} from '../components/ConfidenceMeter';
import {Copyable, MCP_DOCS, MCP_URLS, REPO_SSH} from '../components/Copyable';
import {ResourceChip} from '../components/ResourceChip';

const GeneralTab = () => (
    <article className="prose howto">
        <h2>The confidence meter</h2>
        <p>
            Every play carries a meter showing the confidence level it works best at. Low
            confidence means you are still working out what the problem is; high confidence means
            you know what you are building and why.
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

        <h2>Stages and craft</h2>
        <p>Plays are grouped by the stage of a design effort, plus one cross-cutting shelf:</p>
        <ul>
            <li>
                <strong>Understanding the problem</strong> — align on what we are solving and why,
                before jumping to solutions.
            </li>
            <li>
                <strong>Designing a solution</strong> — turn the chosen direction into something
                testable, and test it.
            </li>
            <li>
                <strong>Research craft</strong> — the stage-independent skills every research round
                uses: planning, discussion guides, running calls, synthesis, readouts.
            </li>
        </ul>
        <p>
            Stages are a compass, not a pipeline — plays tell you in their <em>What next?</em>{' '}
            section where to go from there, and stage plays lean on the craft plays for the how.
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
            None of this is prescriptive. Each play can — and probably should — be adapted to your
            team&rsquo;s needs and context. A good playbook is never finished. Want to add or
            improve a play? The playbook lives in a repo — open a PR or ask the design team.
        </p>
    </article>
);

const McpTab = () => (
    <article className="prose howto">
        <h2>The playbook MCP server</h2>
        <p>
            Connect your agent to the playbook and it can read plays, get recommendations for your
            situation, facilitate workshops, and even propose new plays — no app, no repo browsing.
            Content is always live: reads come straight from the repo, and you can pin any
            published version.
        </p>

        <h2>Connect</h2>
        <p>
            Once the server is published, connecting will be one line — exactly like the Plasma
            MCP. Until then, it runs from a clone:
        </p>
        <Copyable label="1. Get the repo" command={`git clone ${REPO_SSH}`} />
        <Copyable label="2. Install the server" command="cd design-playbook && pnpm install" />
        <Copyable
            label="3. Register it with your agent (Claude Code shown; any MCP client works — point it at packages/mcp/server.mjs)"
            command="claude mcp add design-playbook -- node ./design-playbook/packages/mcp/server.mjs"
        />
        <p>
            Auth rides your existing GitHub SSO (<code>gh auth login</code>) — nothing extra to set
            up.
        </p>

        <h2>What your agent can do with it</h2>
        <ul>
            <li>
                <strong>list_plays / get_play</strong> — browse and read any play, at any version
            </li>
            <li>
                <strong>recommend_play</strong> — describe your situation, get the right play with
                the playbook&rsquo;s own selection logic
            </li>
            <li>
                <strong>run_play</strong> — everything needed to facilitate a session: the play
                plus its skill, so your agent can interview you and scaffold the workshop
            </li>
            <li>
                <strong>propose_play</strong> — contribute a play; the server opens the PR
            </li>
        </ul>

        <h2>Workshop MCP servers</h2>
        <p>
            Plays that scaffold sessions or publish artifacts use Miro, Figma, or Confluence
            through your agent&rsquo;s own MCP connections. All three are the vendors&rsquo; own
            remote servers (OAuth, no keys) — add them once by URL, and <code>run_play</code>{' '}
            hands your agent these same URLs when a play needs them:
        </p>
        {Object.entries(MCP_URLS).map(([name, url]) => (
            <Copyable key={name} label={`${name} MCP`} command={url} />
        ))}
        <div className="resource-row">
            {Object.entries(MCP_DOCS).map(([name, href]) => (
                <ResourceChip key={name} href={href}>
                    {name} MCP docs
                </ResourceChip>
            ))}
        </div>
    </article>
);

const SkillsTab = () => (
    <article className="prose howto">
        <h2>What a skill is</h2>
        <p>
            A skill is a set of instructions your agent follows — the facilitation knowledge behind
            a play, written down. Where the MCP server gives your agent <em>access</em> to the
            playbook, skills give it <em>judgment</em>: what to ask you, how to set up the board,
            which mistakes to prevent.
        </p>

        <h2>Playbook skills</h2>
        <ul>
            <li>
                <strong>run-design-smash, run-shaping-workshop, run-design-dash,
                run-journey-mapping, run-storyboarding</strong> — each interviews you about the session, then
                scaffolds the full Miro board from its play&rsquo;s steps
            </li>
            <li>
                <strong>add-play</strong> — scaffolds a new play file following the playbook&rsquo;s
                contract
            </li>
        </ul>
        <p>
            Plays that have a skill are labelled <em>Agent skill</em> on their page, with copyable
            setup in their Toolbox. Two ways to use them:
        </p>
        <ul>
            <li>
                <strong>With the repo</strong> — clone it and open it with your agent; skills are
                auto-discovered.
            </li>
            <li>
                <strong>Through the MCP</strong> — the <code>run_play</code> tool serves the skill
                to your agent from anywhere, no clone needed.
            </li>
        </ul>
        <Copyable label="Get the repo (includes all skills)" command={`git clone ${REPO_SSH}`} />

        <h2>Research skills (coveo/ai-tools)</h2>
        <p>
            The research plays plug into the shared AI-tools skills — the full chain from plan to
            readout: a one-goal research plan, a bias-linted discussion guide, synthesis with
            evidence and confidence labels, and narrative readouts in the Coveo theme. Their plays
            point there, and the MCP&rsquo;s <code>run_play</code> fetches them from that repo:
        </p>
        <div className="resource-row">
            <ResourceChip href="https://github.com/coveo/ai-tools/tree/main/skills/research-planner">
                Research planner
            </ResourceChip>
            <ResourceChip href="https://github.com/coveo/ai-tools/tree/main/skills/discussion-guide-writer">
                Discussion guide writer
            </ResourceChip>
            <ResourceChip href="https://github.com/coveo/ai-tools/tree/main/skills/user-research-synthesis">
                Research synthesis
            </ResourceChip>
            <ResourceChip href="https://github.com/coveo/ai-tools/tree/main/skills/research-narrative">
                Research narrative
            </ResourceChip>
        </div>
    </article>
);

export const HowToUse = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get('tab') ?? 'general';
    return (
    <div className="page howto">
        <h1>
            <span className="gradient-heading">How to Use the Playbook</span>
        </h1>
        <p className="lead">
            The playbook is a collection of plays — workshops, sessions and frameworks — organised
            around how confident you are in the problem and the solution.
        </p>
        <Tabs
            value={tab}
            onChange={(value) => setSearchParams(value && value !== 'general' ? {tab: value} : {})}
            keepMounted={false}
        >
            <Tabs.List>
                <Tabs.Tab value="general">General Usage</Tabs.Tab>
                <Tabs.Tab value="mcp">MCP</Tabs.Tab>
                <Tabs.Tab value="skills">Skills</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="general" pt="lg">
                <GeneralTab />
            </Tabs.Panel>
            <Tabs.Panel value="mcp" pt="lg">
                <McpTab />
            </Tabs.Panel>
            <Tabs.Panel value="skills" pt="lg">
                <SkillsTab />
            </Tabs.Panel>
        </Tabs>
    </div>
    );
};

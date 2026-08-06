import type {PlayFrontmatter} from '../plays';
import {AI_TOOLS_SSH, Copyable, MCP_DOCS, REPO_SSH} from './Copyable';
import {ResourceChip} from './ResourceChip';

/** The reusable end-of-play panel: agent instructions (copyable, agent-agnostic)
 * plus templates & skills chips. Fully driven by the play's frontmatter. */
export const PlayToolbox = ({frontmatter}: {frontmatter: PlayFrontmatter}) => {
    const {agent, skills, miroTemplate, slug} = frontmatter;
    if (!agent?.recipe && !skills?.length && !miroTemplate) {
        return null;
    }

    const playUrl = `${window.location.origin}${window.location.pathname}#/plays/${slug}`;

    return (
        <aside className="play-toolbox">
            <div className="toolbox-title">Toolbox</div>

            {agent?.recipe && (
                <div className="toolbox-section">
                    <div className="kicker">Run it with an agent</div>
                    <p>{agent.recipe}</p>
                    {agent.skill ? (
                        <>
                            <Copyable label="1. Get the repo (includes the skill)" command={`git clone ${REPO_SSH}`} />
                            <Copyable
                                label="2. Then tell your agent"
                                command={`Use the ${agent.skill} skill to set up this workshop`}
                            />
                        </>
                    ) : skills?.length ? (
                        <>
                            <Copyable
                                label="1. Get the skills repo (coveo/ai-tools)"
                                command={`git clone ${AI_TOOLS_SSH}`}
                            />
                            <Copyable
                                label="2. Then tell your agent"
                                command={`Use the ${skills[0].name} skill for this play`}
                            />
                        </>
                    ) : (
                        <Copyable
                            label="Tell your agent"
                            command={`Read ${playUrl} and help me run this play`}
                        />
                    )}
                    {agent.mcp?.length && (
                        <div className="toolbox-mcp">
                            <span>Works with any agent. MCP setup:</span>
                            <div className="resource-row">
                                {agent.mcp.map((name) =>
                                    MCP_DOCS[name] ? (
                                        <ResourceChip key={name} href={MCP_DOCS[name]}>
                                            {name} MCP
                                        </ResourceChip>
                                    ) : (
                                        <span key={name} className="resource-chip">
                                            {name} MCP
                                        </span>
                                    ),
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {(skills?.length || miroTemplate) && (
                <div className="toolbox-section">
                    <div className="kicker">Templates &amp; skills</div>
                    <div className="resource-row">
                        {miroTemplate && (
                            <ResourceChip href={miroTemplate}>Miro template</ResourceChip>
                        )}
                        {skills?.map((skill) => (
                            <ResourceChip key={skill.url} href={skill.url}>
                                {skill.name}
                            </ResourceChip>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
};

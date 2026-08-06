import {ActionIcon, CopyButton, Tooltip} from '@mantine/core';
import {IconCheck, IconCopy} from '@coveord/plasma-react-icons';
import type {PlayFrontmatter} from '../plays';
import {ResourceChip} from './ResourceChip';

const REPO_SSH = 'git@github.com:coveo-incubator/design-playbook.git';

/** Where to set up each MCP server — Confluence is the source of truth */
const MCP_DOCS: Record<string, string> = {
    Miro: 'https://coveord.atlassian.net/wiki/spaces/RD/pages/6135447581/Miro+MCP+Server',
    Figma: 'https://coveord.atlassian.net/wiki/spaces/RD/pages/6144655446/Figma+MCP+Server',
};

/** Docs-CLI style copyable line: code + copy button */
const Copyable = ({label, command}: {label: string; command: string}) => (
    <div className="copyable">
        <span className="copyable-label">{label}</span>
        <div className="copyable-row">
            <code>{command}</code>
            <CopyButton value={command} timeout={1500}>
                {({copied, copy}) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} fz="xs">
                        <ActionIcon variant="subtle" color={copied ? 'teal' : 'gray'} onClick={copy} size="sm">
                            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        </ActionIcon>
                    </Tooltip>
                )}
            </CopyButton>
        </div>
    </div>
);

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

import {MDXProvider} from '@mdx-js/react';
import {Anchor, Badge, Button, Text} from '@mantine/core';
import {IconExternalLink} from '@coveord/plasma-react-icons';
import {Link, useParams} from 'react-router-dom';
import {Callout} from '../components/Callout';
import {ConfidenceLevel} from '../components/ConfidenceMeter';
import {PlayAnchor, PlayRef} from '../components/PlayAnchor';
import {ResourceChip} from '../components/ResourceChip';
import {asset, playBySlug, sections} from '../plays';
import type {Play} from '../plays';

const REPO_URL = 'https://github.com/coveo-incubator/design-playbook';

const mdxComponents = {a: PlayAnchor, blockquote: Callout, PlayRef};

const ComingSoon = ({play}: {play: Play}) => {
    const {frontmatter} = play;
    const section = sections.find((s) => s.id === frontmatter.section);
    return (
        <div className="page">
            <div className="play-hero">
                <div className="play-hero-text">
                    <span className="kicker">{section?.label}</span>
                    <h1>
                        <span className="gradient-heading">{frontmatter.title}</span>
                    </h1>
                    <p className="summary">{frontmatter.summary}</p>
                    <div className="play-hero-footer">
                        <Badge variant="light" color="gray">
                            Coming soon
                        </Badge>
                    </div>
                </div>
            </div>

            <article className="prose">
                <p>
                    This play hasn&rsquo;t been written yet — the title and summary above are its
                    reserved spot in the playbook.
                </p>
                <h2>Looking to contribute?</h2>
                <p>
                    The playbook lives in a repo, and plays are simple MDX files. If you&rsquo;ve
                    run this play (or want to define how we run it):
                </p>
                <ul>
                    <li>
                        Edit <code>plays/{frontmatter.slug}.mdx</code>, remove the{' '}
                        <code>comingSoon</code> flag, and follow the play grammar — When? / Why? /
                        Step by step / What next?
                    </li>
                    <li>
                        Or open the repo with Claude Code and ask it to run the{' '}
                        <code>add-play</code> skill — it scaffolds everything for you.
                    </li>
                    <li>Open a PR; a rendering check is all a content PR needs.</li>
                </ul>
                <Text mt="lg">
                    <Button
                        component="a"
                        href={REPO_URL}
                        target="_blank"
                        rel="noreferrer"
                        variant="light"
                        rightSection={<IconExternalLink size={16} />}
                    >
                        Contribute this play
                    </Button>
                </Text>
            </article>
        </div>
    );
};

export const PlayPage = () => {
    const {slug} = useParams();
    const play = slug ? playBySlug(slug) : undefined;

    if (!play) {
        return (
            <div className="page">
                <h2>Play not found</h2>
                <Anchor component={Link} to="/">
                    Back to the playbook
                </Anchor>
            </div>
        );
    }

    if (play.frontmatter.comingSoon) {
        return <ComingSoon play={play} />;
    }

    const {frontmatter, Component} = play;
    const section = sections.find((s) => s.id === frontmatter.section);

    return (
        <div className="page">
            <div className="play-hero">
                <div className="play-hero-text">
                    <span className="kicker">{section?.label}</span>
                    <h1>
                        <span className="gradient-heading">{frontmatter.title}</span>
                    </h1>
                    <p className="summary">{frontmatter.summary}</p>
                    <div className="play-hero-footer">
                        <ConfidenceLevel level={frontmatter.confidence} />
                    </div>
                </div>
                {frontmatter.cover && (
                    <div className="play-hero-panel">
                        <img src={asset(frontmatter.cover)} alt="" />
                    </div>
                )}
            </div>

            {(frontmatter.duration || frontmatter.participants) && (
                <div className="play-facts">
                    {frontmatter.duration && (
                        <div className="fact">
                            <div className="kicker">Duration</div>
                            <div>{frontmatter.duration}</div>
                        </div>
                    )}
                    {frontmatter.participants && (
                        <div className="fact">
                            <div className="kicker">Participants</div>
                            <div>{frontmatter.participants}</div>
                        </div>
                    )}
                </div>
            )}

            <article className="prose">
                <MDXProvider components={mdxComponents}>
                    <Component />
                </MDXProvider>
            </article>

            {(frontmatter.skills?.length || frontmatter.miroTemplate) && (
                <div className="prose">
                    <h2>Tools for this play</h2>
                    <div className="resource-row">
                        {frontmatter.miroTemplate && (
                            <ResourceChip href={frontmatter.miroTemplate} kind="miro">
                                Miro template
                            </ResourceChip>
                        )}
                        {frontmatter.skills?.map((skill) => (
                            <ResourceChip key={skill.url} href={skill.url} kind="skill">
                                {skill.name}
                            </ResourceChip>
                        ))}
                    </div>
                </div>
            )}

            {frontmatter.agent?.recipe && (
                <div className="prose">
                    <h2>Run it with an agent</h2>
                    <p>{frontmatter.agent.recipe}</p>
                    {(frontmatter.agent.mcp?.length || frontmatter.agent.skill) && (
                        <p className="agent-meta">
                            {frontmatter.agent.mcp?.length && (
                                <>
                                    Needs MCP:{' '}
                                    {frontmatter.agent.mcp.map((name) => (
                                        <Badge key={name} variant="light" mr={6}>
                                            {name}
                                        </Badge>
                                    ))}
                                </>
                            )}
                            {frontmatter.agent.skill && (
                                <>
                                    Skill: <code>{frontmatter.agent.skill}</code>
                                </>
                            )}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

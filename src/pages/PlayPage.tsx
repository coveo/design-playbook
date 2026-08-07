import {MDXProvider} from '@mdx-js/react';
import {useMemo} from 'react';
import {Anchor, Badge, Button, HoverCard, Text} from '@mantine/core';
import {IconExternalLink, IconSparkles} from '@coveord/plasma-react-icons';
import {Link, useParams} from 'react-router-dom';
import {Callout} from '../components/Callout';
import {ConfidenceLevel} from '../components/ConfidenceMeter';
import {PlayAnchor, PlayRef} from '../components/PlayAnchor';
import {PlayToolbox} from '../components/PlayToolbox';
import {ResourceChip} from '../components/ResourceChip';
import {asset, playBySlug, sections} from '../plays';

/** Fresh URL per mount so one-shot SVG animations replay on every visit
 * (browsers cache the decoded SVG document per URL). */
const useCoverSrc = (cover?: string) =>
    useMemo(() => (cover ? `${asset(cover)}?v=${Date.now()}` : undefined), [cover]);
import type {Play} from '../plays';
import figmaLogo from '../assets/figma.svg';
import miroLogo from '../assets/miro.svg';

const MCP_ICONS: Record<string, string> = {Miro: miroLogo, Figma: figmaLogo};

const REPO_URL = 'https://github.com/coveo-incubator/design-playbook';

const mdxComponents = {a: PlayAnchor, blockquote: Callout, PlayRef};

const ComingSoon = ({play}: {play: Play}) => {
    const {frontmatter} = play;
    const section = sections.find((s) => s.id === frontmatter.section);
    const coverSrc = useCoverSrc(frontmatter.cover);
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
                {coverSrc && (
                    <div className="play-hero-panel">
                        <img src={coverSrc} alt="" />
                    </div>
                )}
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
                        Or open the repo with your agent and ask for the <code>add-play</code> skill — it
                        scaffolds everything for you.
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
                {frontmatter.skills?.length && (
                    <>
                        <h2>Meanwhile</h2>
                        <p>An agent skill already covers this ground:</p>
                        <div className="resource-row">
                            {frontmatter.skills.map((skill) => (
                                <ResourceChip key={skill.url} href={skill.url}>
                                    {skill.name}
                                </ResourceChip>
                            ))}
                        </div>
                    </>
                )}
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
    const coverSrc = useCoverSrc(frontmatter.cover);

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
                        {(frontmatter.duration ||
                        frontmatter.participants ||
                        frontmatter.agent?.skill ||
                        frontmatter.agent?.mcp?.length) && (
                            <div className="hero-meta-row">
                                {frontmatter.duration && (
                                    <span className="meta-chip">Time: {frontmatter.duration}</span>
                                )}
                                {frontmatter.participants && (
                                    <span className="meta-chip">People: {frontmatter.participants}</span>
                                )}
                                {(frontmatter.agent?.skill || frontmatter.skills?.length) && (
                                    <HoverCard width={280} shadow="md" withArrow openDelay={150}>
                                        <HoverCard.Target>
                                            <span className="meta-chip skill">
                                                <IconSparkles size={12} />
                                                Agent skill available
                                            </span>
                                        </HoverCard.Target>
                                        <HoverCard.Dropdown>
                                            <Text size="sm">
                                                Any AI tool can run this play for you — the skill
                                                interviews you and sets up the session.
                                            </Text>
                                            <Anchor component={Link} to="/how-to-use?tab=skills" size="sm" mt={8} display="block">
                                                How to use &rarr;
                                            </Anchor>
                                        </HoverCard.Dropdown>
                                    </HoverCard>
                                )}
                                {frontmatter.agent?.mcp?.length && (
                                    <span className="meta-chip">
                                        MCP support:
                                        {frontmatter.agent.mcp.map((name) =>
                                            MCP_ICONS[name] ? (
                                                <img
                                                    key={name}
                                                    src={MCP_ICONS[name]}
                                                    alt={name}
                                                    title={`${name} MCP`}
                                                    height={14}
                                                />
                                            ) : (
                                                <span key={name}>{name}</span>
                                            ),
                                        )}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {coverSrc && (
                    <div className="play-hero-panel">
                        <img src={coverSrc} alt="" />
                    </div>
                )}
            </div>

            <article className="prose">
                <MDXProvider components={mdxComponents}>
                    <Component />
                </MDXProvider>
            </article>

            <PlayToolbox frontmatter={frontmatter} />
        </div>
    );
};

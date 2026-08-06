import {MDXProvider} from '@mdx-js/react';
import {Anchor, Breadcrumbs} from '@mantine/core';
import {Link, useParams} from 'react-router-dom';
import {ConfidenceMeter} from '../components/ConfidenceMeter';
import {asset, playBySlug, sections} from '../plays';

export const PlayPage = () => {
    const {slug} = useParams();
    const play = slug ? playBySlug(slug) : undefined;

    if (!play) {
        return (
            <div>
                <h2>Play not found</h2>
                <Anchor component={Link} to="/">
                    Back to the playbook
                </Anchor>
            </div>
        );
    }

    const {frontmatter, Component} = play;
    const section = sections.find((s) => s.id === frontmatter.section);

    return (
        <div>
            <Breadcrumbs mb="lg">
                <Anchor component={Link} to="/" size="sm">
                    Home
                </Anchor>
                <span className="kicker">{section?.label}</span>
            </Breadcrumbs>

            <div className="play-hero">
                <div className="play-hero-text">
                    <h1>
                        <span className="gradient-heading">{frontmatter.title}</span>
                    </h1>
                    <p className="summary">{frontmatter.summary}</p>
                    <div className="play-hero-confidence">
                        <span>Do this when you are at this confidence level</span>
                        <ConfidenceMeter level={frontmatter.confidence} />
                    </div>
                </div>
                {frontmatter.cover && (
                    <div className="play-hero-panel">
                        <img src={asset(frontmatter.cover)} alt="" />
                    </div>
                )}
            </div>

            {(frontmatter.duration || frontmatter.participants || frontmatter.format) && (
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
                    {frontmatter.format && (
                        <div className="fact">
                            <div className="kicker">Format</div>
                            <div>{frontmatter.format}</div>
                        </div>
                    )}
                </div>
            )}

            <article className="prose">
                <MDXProvider>
                    <Component />
                </MDXProvider>
            </article>

            {(frontmatter.skills?.length || frontmatter.miroTemplate) && (
                <div className="prose">
                    <h2>Tools for this play</h2>
                    <ul>
                        {frontmatter.miroTemplate && (
                            <li>
                                <a href={frontmatter.miroTemplate} target="_blank" rel="noreferrer">
                                    Miro template
                                </a>
                            </li>
                        )}
                        {frontmatter.skills?.map((skill) => (
                            <li key={skill.url}>
                                <a href={skill.url} target="_blank" rel="noreferrer">
                                    {skill.name} (agent skill)
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

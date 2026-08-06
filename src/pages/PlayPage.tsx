import {MDXProvider} from '@mdx-js/react';
import {Link, useParams} from 'react-router-dom';
import {playBySlug} from '../plays';

export const PlayPage = () => {
    const {slug} = useParams();
    const play = slug ? playBySlug(slug) : undefined;

    if (!play) {
        return (
            <main className="content">
                <h2>Play not found</h2>
                <Link to="/">Back to the playbook</Link>
            </main>
        );
    }

    const {frontmatter, Component} = play;

    return (
        <>
            <section className="play-page-header">
                <div className="hero-inner">
                    <div className="kicker">{frontmatter.category}</div>
                    <h1>{frontmatter.title}</h1>
                    <p>{frontmatter.summary}</p>
                    <div className="play-facts">
                        {frontmatter.duration && (
                            <div className="fact">
                                <div className="eyebrow">Duration</div>
                                <div>{frontmatter.duration}</div>
                            </div>
                        )}
                        {frontmatter.participants && (
                            <div className="fact">
                                <div className="eyebrow">Participants</div>
                                <div>{frontmatter.participants}</div>
                            </div>
                        )}
                        {frontmatter.format && (
                            <div className="fact">
                                <div className="eyebrow">Format</div>
                                <div>{frontmatter.format}</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <main className="content">
                <Link to="/" className="back-link">
                    ← All plays
                </Link>
                <article className="prose">
                    <MDXProvider>
                        <Component />
                    </MDXProvider>
                </article>
                {(frontmatter.skills?.length || frontmatter.miroTemplate) && (
                    <aside className="category-section">
                        <h2>Tools for this play</h2>
                        <ul>
                            {frontmatter.miroTemplate && (
                                <li>
                                    <a href={frontmatter.miroTemplate}>Miro template</a>
                                </li>
                            )}
                            {frontmatter.skills?.map((skill) => (
                                <li key={skill.url}>
                                    <a href={skill.url}>{skill.name} (agent skill)</a>
                                </li>
                            ))}
                        </ul>
                    </aside>
                )}
            </main>
        </>
    );
};

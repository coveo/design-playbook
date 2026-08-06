import {Link} from 'react-router-dom';
import {categories, plays} from '../plays';

export const Home = () => (
    <>
        <section className="hero">
            <div className="hero-inner">
                <div className="kicker">Coveo Design</div>
                <h1>
                    The <span className="emphasis">Design Playbook</span>
                </h1>
                <p>
                    Plays, workshops, and methods for how we design at Coveo — from framing a
                    problem to testing a solution, with the agents and tools that back them.
                </p>
            </div>
        </section>
        <main className="content">
            {categories.map((category) => {
                const categoryPlays = plays.filter((p) => p.frontmatter.category === category);
                return (
                    <section key={category} className="category-section">
                        <h2>{category}</h2>
                        <div className="play-grid">
                            {categoryPlays.map(({frontmatter}) => (
                                <Link
                                    key={frontmatter.slug}
                                    to={`/plays/${frontmatter.slug}`}
                                    className="play-card"
                                >
                                    <div className="play-card-header">{frontmatter.category}</div>
                                    <div className="play-card-body">
                                        <h3>{frontmatter.title}</h3>
                                        <p>{frontmatter.summary}</p>
                                        <div className="play-meta">
                                            {frontmatter.duration && (
                                                <span>{frontmatter.duration}</span>
                                            )}
                                            {frontmatter.format && <span>{frontmatter.format}</span>}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                );
            })}
        </main>
    </>
);

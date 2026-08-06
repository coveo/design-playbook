import {Link} from 'react-router-dom';
import {ConfidenceMeter} from '../components/ConfidenceMeter';
import {playsInSection, sections} from '../plays';
import type {Play} from '../plays';

const PlayCard = ({play}: {play: Play}) => {
    const {frontmatter} = play;
    if (frontmatter.comingSoon) {
        return (
            <Link to={`/plays/${frontmatter.slug}`} className="play-card coming-soon">
                <div className="play-card-top">
                    <ConfidenceMeter level={frontmatter.confidence} small />
                    <span className="play-card-title">{frontmatter.title}</span>
                </div>
                <span className="eyebrow-soon">Coming soon</span>
            </Link>
        );
    }
    return (
        <Link to={`/plays/${frontmatter.slug}`} className="play-card">
            <div className="play-card-top">
                <ConfidenceMeter level={frontmatter.confidence} small />
                <span className="play-card-title">{frontmatter.title}</span>
            </div>
            <p>{frontmatter.summary}</p>
        </Link>
    );
};

export const Home = () => (
    <>
        <section className="home-hero">
            <div className="home-hero-inner">
                <div className="hero-kicker">A guide on product design and research</div>
                <h1>
                    The Coveo <span className="accent">Design Playbook</span>
                </h1>
                <p>
                    Created to democratise our design and research processes — so teams are always
                    focusing on the right problems and the right solutions.
                </p>
                <p className="hero-secondary">
                    It won&rsquo;t give you the perfect solution for every problem. Each play can
                    (and probably should) be adapted to your team&rsquo;s needs and context. A good
                    playbook is never finished.
                </p>
            </div>
        </section>

        <div className="page">
            {sections.map((section) => {
                const sectionPlays = playsInSection(section.id);
                if (sectionPlays.length === 0) {
                    return null;
                }
                return (
                    <section key={section.id} className="home-section">
                        <div className="home-section-heading">
                            <span className="arrow">&rarr;</span>
                            <h2>
                                <span className="gradient-heading">{section.label}</span>
                            </h2>
                        </div>
                        <div className="play-grid">
                            {sectionPlays.map((play) => (
                                <PlayCard key={play.frontmatter.slug} play={play} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    </>
);

import s1shaping from '../assets/illustrations/style1/shaping-workshop.svg';
import s1smash from '../assets/illustrations/style1/design-smash.svg';
import s2shaping from '../assets/illustrations/style2/shaping-workshop.svg';
import s2smash from '../assets/illustrations/style2/design-smash.svg';
import s3shaping from '../assets/illustrations/style3/shaping-workshop.svg';
import s3smash from '../assets/illustrations/style3/design-smash.svg';

const styles = [
    {
        name: 'Style 1 — Transit',
        note: 'Groovy concentric stripe ribbons on warm paper — 70s poster language: loop-de-loops, arch families, retro suns.',
        shaping: s1shaping,
        smash: s1smash,
    },
    {
        name: 'Style 2 — Blueprint',
        note: 'Technical drawing on warm paper — bold navy frames, retro accent inks, dashed guides, dimension ticks, title block.',
        shaping: s2shaping,
        smash: s2smash,
    },
    {
        name: 'Style 3 — Bauhaus',
        note: 'Flat bold geometry on cream — the light outlier. Filled shapes, halftone dots, poster-style rules and labels.',
        shaping: s3shaping,
        smash: s3smash,
    },
];

/** Internal comparison page — not linked from navigation. Route: /illustration-lab */
export const IllustrationLab = () => (
    <div className="page">
        <h1>
            <span className="gradient-heading">Illustration lab</span>
        </h1>
        <p style={{color: 'var(--pb-text-muted)', maxWidth: 620}}>
            Three candidate hero-illustration styles, each applied to Shaping Workshop and Design
            Smash. Pick one; the rest of the plays follow it.
        </p>
        {styles.map((style) => (
            <section key={style.name} className="home-section">
                <div className="home-section-heading">
                    <h2>
                        <span className="gradient-heading">{style.name}</span>
                    </h2>
                </div>
                <p style={{color: 'var(--pb-text-muted)', maxWidth: 620, marginTop: -8}}>{style.note}</p>
                <div className="lab-grid">
                    <figure>
                        <img src={style.shaping} alt={`${style.name} — Shaping Workshop`} />
                        <figcaption>Shaping Workshop</figcaption>
                    </figure>
                    <figure>
                        <img src={style.smash} alt={`${style.name} — Design Smash`} />
                        <figcaption>Design Smash</figcaption>
                    </figure>
                </div>
            </section>
        ))}
    </div>
);

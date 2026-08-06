import {Badge, HoverCard} from '@mantine/core';
import type {AnchorHTMLAttributes, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {asset, playBySlug} from '../plays';
import type {Play} from '../plays';
import {ConfidenceMeter} from './ConfidenceMeter';
import {ResourceChip} from './ResourceChip';

/** Display label for a play, derived from frontmatter — never hardcode this */
export const playLabel = (play: Play): string =>
    play.frontmatter.comingSoon ? `${play.frontmatter.title} (coming soon)` : play.frontmatter.title;

/** Wikipedia-style preview link. All title/summary/status data comes from the
 * play's frontmatter, so updating a play updates every reference to it. */
const PlayHoverLink = ({play, children}: {play: Play; children?: ReactNode}) => {
    const {frontmatter} = play;
    return (
        <HoverCard width={380} shadow="md" openDelay={200} withArrow position="top">
            <HoverCard.Target>
                <Link to={`/plays/${frontmatter.slug}`}>{children ?? playLabel(play)}</Link>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <div className="play-preview">
                    {frontmatter.cover && <img src={asset(frontmatter.cover)} alt="" />}
                    <div>
                        <div className="title">
                            {frontmatter.title}
                            {frontmatter.comingSoon ? (
                                <Badge size="xs" variant="light" color="gray">
                                    Coming soon
                                </Badge>
                            ) : (
                                <ConfidenceMeter level={frontmatter.confidence} small />
                            )}
                        </div>
                        <p className="summary">{frontmatter.summary}</p>
                    </div>
                </div>
            </HoverCard.Dropdown>
        </HoverCard>
    );
};

/** MDX component: <PlayRef slug="design-smash" /> renders the play's live
 * label (including its coming-soon status) as a hovercard link. */
export const PlayRef = ({slug}: {slug: string}) => {
    const play = playBySlug(slug);
    if (!play) {
        return <span>{slug}</span>;
    }
    return <PlayHoverLink play={play} />;
};

/**
 * MDX anchor renderer. Links to other plays (`/#/plays/<slug>`) get the
 * hovercard preview; external links open in a new tab.
 */
export const PlayAnchor = ({href = '', children, ...rest}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const playMatch = href.match(/^\/#\/plays\/([\w-]+)$/);
    if (playMatch) {
        const play = playBySlug(playMatch[1]);
        if (play) {
            return <PlayHoverLink play={play}>{children}</PlayHoverLink>;
        }
    }

    if (href.startsWith('/#/')) {
        return (
            <Link to={href.slice(2)} {...rest}>
                {children}
            </Link>
        );
    }

    // External links render as Slack-style chips so leaving the playbook is
    // visually signalled.
    return (
        <ResourceChip href={href} kind={/miro\.com/.test(href) ? 'miro' : 'external'}>
            {children}
        </ResourceChip>
    );
};

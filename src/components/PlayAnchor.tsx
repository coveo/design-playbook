import {HoverCard} from '@mantine/core';
import type {AnchorHTMLAttributes} from 'react';
import {Link} from 'react-router-dom';
import {asset, playBySlug} from '../plays';
import {ConfidenceMeter} from './ConfidenceMeter';

/**
 * MDX anchor renderer. Links to other plays (`/#/plays/<slug>`) get a
 * Wikipedia-style hovercard preview (cover image + summary); external links
 * open in a new tab.
 */
export const PlayAnchor = ({href = '', children, ...rest}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const playMatch = href.match(/^\/#\/plays\/([\w-]+)$/);
    if (playMatch) {
        const play = playBySlug(playMatch[1]);
        if (play) {
            const {frontmatter} = play;
            return (
                <HoverCard width={380} shadow="md" openDelay={200} withArrow position="top">
                    <HoverCard.Target>
                        <Link to={`/plays/${frontmatter.slug}`}>{children}</Link>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <div className="play-preview">
                            {frontmatter.cover && <img src={asset(frontmatter.cover)} alt="" />}
                            <div>
                                <div className="title">
                                    {frontmatter.title}
                                    <ConfidenceMeter level={frontmatter.confidence} small />
                                </div>
                                <p className="summary">{frontmatter.summary}</p>
                            </div>
                        </div>
                    </HoverCard.Dropdown>
                </HoverCard>
            );
        }
    }

    if (href.startsWith('/#/')) {
        return (
            <Link to={href.slice(2)} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <a href={href} target="_blank" rel="noreferrer" {...rest}>
            {children}
        </a>
    );
};

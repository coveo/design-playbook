import {IconExternalLink, IconLayoutBoard, IconSparkles} from '@coveord/plasma-react-icons';
import type {ReactNode} from 'react';
import githubLogo from '../assets/github.svg';

type ChipKind = 'miro' | 'skill' | 'github' | 'external';

const ICONS: Record<ChipKind, ReactNode> = {
    miro: <IconLayoutBoard size={14} />,
    skill: <IconSparkles size={14} />,
    github: <img src={githubLogo} alt="" width={16} height={16} />,
    external: <IconExternalLink size={14} />,
};

const kindFromHref = (href: string): ChipKind => {
    if (/github\.com/.test(href)) {
        return 'github';
    }
    if (/miro\.com/.test(href)) {
        return 'miro';
    }
    return 'external';
};

interface ResourceChipProps {
    href: string;
    /** Icon override; derived from the URL when omitted (github.com → GitHub logo, miro.com → board) */
    kind?: ChipKind;
    children: ReactNode;
}

/** Slack-style external resource pill: icon + label on a tinted background.
 * Used for anything that leaves the playbook — Miro templates, agent skills,
 * GitHub repos, external links — so external destinations are visually
 * signalled. */
export const ResourceChip = ({href, kind, children}: ResourceChipProps) => (
    <a className="resource-chip" href={href} target="_blank" rel="noreferrer">
        {ICONS[kind ?? kindFromHref(href)]}
        <span>{children}</span>
    </a>
);

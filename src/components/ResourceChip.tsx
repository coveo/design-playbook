import {IconExternalLink, IconLayoutBoard, IconSparkles} from '@coveord/plasma-react-icons';
import type {ReactNode} from 'react';

const ICONS: Record<string, ReactNode> = {
    miro: <IconLayoutBoard size={14} />,
    skill: <IconSparkles size={14} />,
    external: <IconExternalLink size={14} />,
};

interface ResourceChipProps {
    href: string;
    kind?: 'miro' | 'skill' | 'external';
    children: ReactNode;
}

/** Slack-style external resource pill: icon + label on a tinted background.
 * Used for anything that leaves the playbook — Miro templates, agent skills,
 * external links — so external destinations are visually signalled. */
export const ResourceChip = ({href, kind = 'external', children}: ResourceChipProps) => (
    <a className="resource-chip" href={href} target="_blank" rel="noreferrer">
        {ICONS[kind]}
        <span>{children}</span>
    </a>
);

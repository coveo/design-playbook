import {IconExternalLink, IconSparkles} from '@coveord/plasma-react-icons';
import type {ReactNode} from 'react';
import confluenceLogo from '../assets/confluence.svg';
import figmaLogo from '../assets/figma.svg';
import githubLogo from '../assets/github.svg';
import miroLogo from '../assets/miro.svg';

type ChipKind = 'miro' | 'figma' | 'confluence' | 'github' | 'skill' | 'external';

const ICONS: Record<ChipKind, ReactNode> = {
    miro: <img src={miroLogo} alt="" width={14} height={14} />,
    figma: <img src={figmaLogo} alt="" width={10} height={14} />,
    confluence: <img src={confluenceLogo} alt="" width={14} height={14} />,
    github: <img src={githubLogo} alt="" width={16} height={16} />,
    skill: <IconSparkles size={14} />,
    external: <IconExternalLink size={14} />,
};

/** Icon = destination. Confluence wins over product brands: a page ABOUT Miro
 * that lives on Confluence gets the Confluence icon. */
const kindFromHref = (href: string): ChipKind => {
    if (/atlassian\.net\/wiki/.test(href)) {
        return 'confluence';
    }
    if (/github\.com/.test(href)) {
        return 'github';
    }
    if (/miro\.com/.test(href)) {
        return 'miro';
    }
    if (/figma\.com/.test(href)) {
        return 'figma';
    }
    return 'external';
};

interface ResourceChipProps {
    href: string;
    /** Icon override; derived from the URL when omitted */
    kind?: ChipKind;
    children: ReactNode;
}

/** Slack-style external resource pill: icon + label on a tinted background.
 * Used for anything that leaves the playbook so external destinations are
 * visually signalled. */
export const ResourceChip = ({href, kind, children}: ResourceChipProps) => (
    <a className="resource-chip" href={href} target="_blank" rel="noreferrer">
        {ICONS[kind ?? kindFromHref(href)]}
        <span>{children}</span>
    </a>
);

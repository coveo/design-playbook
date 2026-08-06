import {ActionIcon, CopyButton, Tooltip} from '@mantine/core';
import {IconCheck, IconCopy} from '@coveord/plasma-react-icons';

export const REPO_SSH = 'git@github.com:coveo-incubator/design-playbook.git';
export const AI_TOOLS_SSH = 'git@github.com:coveo/ai-tools.git';

/** Where to set up each MCP server — Confluence is the source of truth */
export const MCP_DOCS: Record<string, string> = {
    Miro: 'https://coveord.atlassian.net/wiki/spaces/RD/pages/6135447581/Miro+MCP+Server',
    Figma: 'https://coveord.atlassian.net/wiki/spaces/RD/pages/6144655446/Figma+MCP+Server',
};

/** Docs-CLI style copyable line: code + copy button */
export const Copyable = ({label, command}: {label?: string; command: string}) => (
    <div className="copyable">
        {label && <span className="copyable-label">{label}</span>}
        <div className="copyable-row">
            <code>{command}</code>
            <CopyButton value={command} timeout={1500}>
                {({copied, copy}) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} fz="xs">
                        <ActionIcon variant="subtle" color={copied ? 'teal' : 'gray'} onClick={copy} size="sm">
                            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        </ActionIcon>
                    </Tooltip>
                )}
            </CopyButton>
        </div>
    </div>
);

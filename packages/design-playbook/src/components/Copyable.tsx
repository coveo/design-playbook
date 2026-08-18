import {ActionIcon, CopyButton, Tooltip} from '@mantine/core';
import {IconCheck, IconCopy} from '@coveord/plasma-react-icons';

export const REPO_SSH = 'git@github.com:coveo/design-playbook.git';
export const AI_TOOLS_SSH = 'git@github.com:coveo/ai-tools.git';

/** Public vendor docs for each workshop MCP server (no internal links) */
export const MCP_DOCS: Record<string, string> = {
    Miro: 'https://miro.com/ai/mcp/',
    Figma: 'https://developers.figma.com/docs/figma-mcp-server/',
    Atlassian: 'https://www.atlassian.com/platform/remote-mcp-server',
};

/** Remote MCP endpoints, mirrored in packages/mcp/server.mjs MCP_SERVERS — agents get these from run_play */
export const MCP_URLS: Record<string, string> = {
    Miro: 'https://mcp.miro.com/',
    Figma: 'https://mcp.figma.com/mcp',
    Atlassian: 'https://mcp.atlassian.com/v1/mcp',
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

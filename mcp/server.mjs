#!/usr/bin/env node
// Design Playbook MCP server.
//
// The repo is the database, git refs are the versions, the GitHub API is the
// read path. No content ships with this package: every read resolves
// plays.json at a ref (default: main), so consumers always see the freshest
// merged content, and can pin any tag/branch/SHA for reproducible reads.
//
// Auth: GITHUB_TOKEN env var, falling back to `gh auth token` (Coveo SSO).
// Dev mode: when the file exists locally (running from a repo clone) and no
// version is requested, reads ../public/plays.json directly.
import {execFile} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {promisify} from 'node:util';
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {z} from 'zod';

const REPO = process.env.PLAYBOOK_REPO ?? 'coveo-incubator/design-playbook';
const DEFAULT_REF = 'main';
const LOCAL_PLAYS = new URL('../public/plays.json', import.meta.url);

const execFileAsync = promisify(execFile);

let cachedToken;
async function githubToken() {
    if (process.env.GITHUB_TOKEN) {
        return process.env.GITHUB_TOKEN;
    }
    if (cachedToken === undefined) {
        try {
            const {stdout} = await execFileAsync('gh', ['auth', 'token']);
            cachedToken = stdout.trim();
        } catch {
            cachedToken = null;
        }
    }
    return cachedToken;
}

async function githubApi(path) {
    const token = await githubToken();
    const headers = {Accept: 'application/vnd.github.raw+json', 'X-GitHub-Api-Version': '2022-11-28'};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`https://api.github.com${path}`, {headers});
    if (!res.ok) {
        throw new Error(
            `GitHub API ${res.status} for ${path}. ` +
                (res.status === 401 || res.status === 404
                    ? 'Check that you are authenticated (gh auth login) and authorized for the coveo-incubator org.'
                    : await res.text()),
        );
    }
    return res;
}

// ETag cache: repeated reads of the same ref cost one conditional request.
const playsCache = new Map(); // ref -> {etag, data}

async function loadPlays(version) {
    const ref = version ?? DEFAULT_REF;

    // Dev mode: local clone, latest content, no version pinning requested.
    if (!version) {
        try {
            const raw = await readFile(LOCAL_PLAYS, 'utf8');
            return {plays: JSON.parse(raw).plays, source: 'local file'};
        } catch {
            // fall through to the API
        }
    }

    const cached = playsCache.get(ref);
    const token = await githubToken();
    const headers = {Accept: 'application/vnd.github.raw+json', 'X-GitHub-Api-Version': '2022-11-28'};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    if (cached) {
        headers['If-None-Match'] = cached.etag;
    }
    const res = await fetch(
        `https://api.github.com/repos/${REPO}/contents/public/plays.json?ref=${encodeURIComponent(ref)}`,
        {headers},
    );
    if (res.status === 304) {
        return {plays: cached.data, source: `github:${ref} (cached)`};
    }
    if (!res.ok) {
        throw new Error(
            `GitHub API ${res.status} reading plays.json at ref "${ref}". ` +
                'Check the ref exists and you are authorized for the coveo-incubator org (gh auth login).',
        );
    }
    const data = JSON.parse(await res.text()).plays;
    const etag = res.headers.get('etag');
    if (etag) {
        playsCache.set(ref, {etag, data});
    }
    return {plays: data, source: `github:${ref}`};
}

const summarize = (play) => ({
    slug: play.slug,
    title: play.title,
    section: play.section,
    summary: play.summary,
    confidence: play.confidence ?? 'anytime',
    comingSoon: play.comingSoon ?? false,
    duration: play.duration,
    miroTemplate: play.miroTemplate,
    agent: play.agent,
});

const text = (value) => ({content: [{type: 'text', text: JSON.stringify(value, null, 2)}]});

const server = new McpServer({name: 'design-playbook', version: '0.1.0'});

const versionParam = z
    .string()
    .optional()
    .describe('Git ref to read at: tag (v1.0), branch, or SHA. Omit for latest (main).');

server.registerTool(
    'list_plays',
    {
        title: 'List plays',
        description:
            'List all plays in the Coveo Design Playbook (workshops, sessions, frameworks for product design and research), with title, section, confidence level, and summary.',
        inputSchema: {
            section: z
                .enum(['understanding', 'designing', 'beyond'])
                .optional()
                .describe('Filter by stage: understanding the problem, designing a solution, beyond the solution'),
            includeComingSoon: z.boolean().optional().describe('Include plays not yet written (default true)'),
            version: versionParam,
        },
    },
    async ({section, includeComingSoon = true, version}) => {
        const {plays, source} = await loadPlays(version);
        const filtered = plays
            .filter((p) => !section || p.section === section)
            .filter((p) => includeComingSoon || !p.comingSoon)
            .map(summarize);
        return text({source, plays: filtered});
    },
);

server.registerTool(
    'get_play',
    {
        title: 'Get play',
        description:
            'Get the full content of one play: frontmatter plus the complete body (When? / Why? / Step by step / What next?) as markdown.',
        inputSchema: {
            slug: z.string().describe('Play slug, e.g. design-smash'),
            version: versionParam,
        },
    },
    async ({slug, version}) => {
        const {plays, source} = await loadPlays(version);
        const play = plays.find((p) => p.slug === slug);
        if (!play) {
            return text({
                error: `No play with slug "${slug}"`,
                available: plays.map((p) => p.slug),
            });
        }
        return text({source, play});
    },
);

server.registerTool(
    'recommend_play',
    {
        title: 'Recommend a play',
        description:
            'Given a team situation, return the playbook\'s own guidance plus candidate plays so the caller can choose. Describe the situation: what is known, what exists (research? prototype?), and what the team is trying to do.',
        inputSchema: {
            context: z.string().describe('The team situation in one or two sentences'),
            version: versionParam,
        },
    },
    async ({context, version}) => {
        const {plays, source} = await loadPlays(version);
        return text({
            source,
            context,
            guidance:
                'Pick by confidence level: 1 bar = little is known, start framing (Shaping Workshop). ' +
                '2 bars = problem framed, explore and converge (Design Smash, Storyboarding, User Journey Mapping). ' +
                '"anytime" plays (Design Dash, P.O.I.N.T. Analysis) fit whenever their When? section matches. ' +
                'Testing your Solutions applies whenever there is something to put in front of users. ' +
                'Match the situation against each candidate\'s summary and confidence below, and check its When? section via get_play before committing.',
            candidates: plays.filter((p) => !p.comingSoon).map(summarize),
        });
    },
);

server.registerTool(
    'list_versions',
    {
        title: 'List playbook versions',
        description:
            'List published playbook versions (git tags) plus the default ref. Pass a version to other tools to read the playbook as of that release.',
        inputSchema: {},
    },
    async () => {
        const res = await githubApi(`/repos/${REPO}/tags?per_page=50`);
        const tags = JSON.parse(await res.text()).map((t) => t.name);
        return text({default: DEFAULT_REF, versions: tags});
    },
);

await server.connect(new StdioServerTransport());

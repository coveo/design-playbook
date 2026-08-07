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
import {dump as dumpYaml} from 'js-yaml';
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
                .enum(['understanding', 'designing', 'beyond', 'craft'])
                .optional()
                .describe(
                    'Filter by stage: understanding the problem, designing a solution, beyond the solution — or craft (cross-cutting research craft)',
                ),
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
                '2 bars = problem framed, explore and converge (Design Smash, Storyboarding, Journey Mapping). ' +
                '"anytime" plays (Design Dash) fit whenever their When? section matches. ' +
                'Research Craft plays (section "craft") are cross-cutting skills — plan, guide, run, synthesise, present — invoked by stage plays whenever users are involved. ' +
                'Match the situation against each candidate\'s summary and confidence below, and check its When? section via get_play before committing.',
            candidates: plays.filter((p) => !p.comingSoon).map(summarize),
        });
    },
);

async function loadRepoFile(path, version) {
    // Dev mode first, unless a version is pinned.
    if (!version) {
        try {
            return await readFile(new URL(`../${path}`, import.meta.url), 'utf8');
        } catch {
            // fall through
        }
    }
    const ref = version ?? DEFAULT_REF;
    const res = await githubApi(`/repos/${REPO}/contents/${path}?ref=${encodeURIComponent(ref)}`);
    return res.text();
}

server.registerTool(
    'run_play',
    {
        title: 'Run a play',
        description:
            'Get everything needed to FACILITATE a play with the user, not just read it: the play content plus its facilitation guide (interview questions, how to scaffold the session in Miro/Figma when those MCP servers are connected). Call this when the user wants to actually run, set up, or prepare a workshop or session. Follow the returned instructions.',
        inputSchema: {
            slug: z.string().describe('Play slug, e.g. design-smash'),
            version: versionParam,
        },
    },
    async ({slug, version}) => {
        const {plays, source} = await loadPlays(version);
        const play = plays.find((p) => p.slug === slug);
        if (!play) {
            return text({error: `No play with slug "${slug}"`, available: plays.map((p) => p.slug)});
        }
        let facilitationGuide = null;
        let skillSource = null;
        const skillName = play.agent?.skill ?? `run-${slug}`;
        const skillRepo = play.agent?.skillRepo; // e.g. coveo/ai-tools — skill lives outside this repo
        try {
            if (skillRepo) {
                // External skills always read at the host repo's default branch;
                // playbook version pinning doesn't apply to them.
                const res = await githubApi(`/repos/${skillRepo}/contents/skills/${skillName}/SKILL.md`);
                facilitationGuide = await res.text();
                skillSource = `github.com/${skillRepo} — skills/${skillName}`;
            } else {
                facilitationGuide = await loadRepoFile(`skills/${skillName}/SKILL.md`, version);
                skillSource = `playbook repo — skills/${skillName}`;
            }
        } catch {
            // No dedicated skill for this play yet — fall back to generic guidance.
        }
        return text({
            source,
            play,
            skillSource,
            facilitationGuide:
                facilitationGuide ??
                'No dedicated facilitation skill exists for this play yet. Facilitate from the play ' +
                    'content itself: (1) interview the user for whatever the "When?" and "What do you ' +
                    'need?" sections require and confirm this is the right play for their confidence ' +
                    'level; (2) if a Miro or Figma MCP is connected, offer to scaffold the session ' +
                    'space following the "Step by step" section (use the miroTemplate link if present); ' +
                    '(3) share the setup back with a short facilitator brief including the "Common ' +
                    'mistakes" section if the play has one.',
            note: 'Follow facilitationGuide now. It may direct you to use Miro/Figma MCP tools — use the ones you have; if missing, tell the user which MCP server to connect.',
        });
    },
);

const FRONTMATTER_KEYS = [
    'title',
    'slug',
    'section',
    'summary',
    'confidence',
    'comingSoon',
    'duration',
    'participants',
    'cover',
    'miroTemplate',
    'skills',
    'agent',
    'order',
];

server.registerTool(
    'propose_play',
    {
        title: 'Propose a play (opens a PR)',
        description:
            'Create or update a play and open a pull request — the write path for the playbook. Use when the user wants to add a new play/section or edit an existing one. Interview the user first (title, one-line summary, which stage it belongs to, the content itself following the play grammar: When? / Why? / What do you need? / Step by step / Common mistakes / What next?). Nothing lands without PR review, so propose confidently. Cross-reference other plays with <PlayRef slug="..." /> in the body.',
        inputSchema: {
            slug: z.string().regex(/^[a-z0-9-]+$/).describe('kebab-case slug; reuse an existing slug to update that play'),
            title: z.string().describe('Display name, e.g. "Vibe Coding"'),
            section: z
                .enum(['understanding', 'designing', 'beyond', 'craft'])
                .describe('Which stage the play belongs to (craft = cross-cutting research craft)'),
            summary: z.string().describe('One sentence shown on the card and play hero'),
            body: z.string().describe('The MDX body following the play grammar (## When? / ## Why? / ## Step by step / ## What next?)'),
            confidence: z.number().int().min(1).max(5).optional().describe('1–5 on the confidence meter; omit for "anytime" plays'),
            comingSoon: z.boolean().optional(),
            duration: z.string().optional(),
            miroTemplate: z.string().optional(),
            prDescription: z.string().optional().describe('Context for reviewers: who proposed this and why'),
        },
    },
    async ({slug, title, section, summary, body, confidence, comingSoon, duration, miroTemplate, prDescription}) => {
        const token = await githubToken();
        if (!token) {
            return text({error: 'No GitHub credentials. Run `gh auth login` (and authorize the coveo-incubator org) or set GITHUB_TOKEN.'});
        }

        const api = async (path, method = 'GET', payload) => {
            const res = await fetch(`https://api.github.com${path}`, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                },
                body: payload ? JSON.stringify(payload) : undefined,
            });
            if (!res.ok) {
                throw new Error(`GitHub API ${res.status} ${method} ${path}: ${await res.text()}`);
            }
            return res.json();
        };

        // Compose the MDX file
        const {plays} = await loadPlays();
        const existing = plays.find((p) => p.slug === slug);
        const frontmatter = {
            ...Object.fromEntries(
                Object.entries(existing ?? {}).filter(([k]) => FRONTMATTER_KEYS.includes(k)),
            ),
            title,
            slug,
            section,
            summary,
            ...(confidence !== undefined && {confidence}),
            ...(comingSoon !== undefined && {comingSoon}),
            ...(duration !== undefined && {duration}),
            ...(miroTemplate !== undefined && {miroTemplate}),
        };
        if (comingSoon === false) {
            delete frontmatter.comingSoon;
        }
        if (existing && !('order' in frontmatter)) {
            frontmatter.order = existing.order;
        }
        const mdx = `---\n${dumpYaml(frontmatter).trim()}\n---\n\n${body.trim()}\n`;

        // Keep plays.json in sync in the same PR (CI enforces it)
        const updatedPlays = [...plays.filter((p) => p.slug !== slug), {...frontmatter, body: body.trim()}].sort(
            (a, b) => (a.order ?? 99) - (b.order ?? 99),
        );
        const playsJson = `${JSON.stringify({plays: updatedPlays}, null, 2)}\n`;

        // Branch from main, commit both files, open the PR
        const branch = `playbook-mcp/${slug}-${Date.now().toString(36)}`;
        const base = await api(`/repos/${REPO}/git/ref/heads/${DEFAULT_REF}`);
        await api(`/repos/${REPO}/git/refs`, 'POST', {ref: `refs/heads/${branch}`, sha: base.object.sha});

        const putFile = async (path, content) => {
            let sha;
            try {
                const current = await api(`/repos/${REPO}/contents/${path}?ref=${branch}`);
                sha = current.sha;
            } catch {
                // new file
            }
            await api(`/repos/${REPO}/contents/${path}`, 'PUT', {
                message: `${existing ? 'Update' : 'Add'} play: ${title}`,
                content: Buffer.from(content).toString('base64'),
                branch,
                ...(sha && {sha}),
            });
        };
        await putFile(`plays/${slug}.mdx`, mdx);
        await putFile('public/plays.json', playsJson);

        const pr = await api(`/repos/${REPO}/pulls`, 'POST', {
            title: `${existing ? 'Update' : 'Add'} play: ${title}`,
            head: branch,
            base: DEFAULT_REF,
            body: `${prDescription ?? 'Proposed via the playbook MCP server.'}\n\n---\nContent PR — needs a rendering check, not a code review (see CONTRIBUTING.md).`,
        });
        return text({
            pullRequest: pr.html_url,
            branch,
            action: existing ? 'updated' : 'created',
            next: 'Share the PR link with the user. The play goes live when the PR is reviewed and merged.',
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

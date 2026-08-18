// Emits public/plays.json — the machine-readable playbook.
// Consumed by agents pointed at the deployed site (<site>/plays.json) and,
// later, by the playbook MCP server. Runs as part of `pnpm build`.
import {readdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {load as parseYaml} from 'js-yaml';

const PLAYS_DIR = new URL('../plays', import.meta.url).pathname;
const OUT = new URL('../public/plays.json', import.meta.url).pathname;

const files = (await readdir(PLAYS_DIR)).filter((f) => f.endsWith('.mdx')).sort();

const plays = [];
for (const file of files) {
    const raw = await readFile(join(PLAYS_DIR, file), 'utf8');
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!match) {
        continue;
    }
    const frontmatter = parseYaml(match[1]);
    plays.push({
        ...frontmatter,
        body: match[2].trim(),
    });
}

plays.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

await writeFile(OUT, `${JSON.stringify({plays}, null, 2)}\n`);
console.log(`plays.json: ${plays.length} plays`);

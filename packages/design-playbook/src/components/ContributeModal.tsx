import {Modal} from '@mantine/core';
import {Copyable, REPO_SSH} from './Copyable';

/** In-site contribution guide — opened from the ⌘K options panel (team
 * content). Mirrors CONTRIBUTING.md's play flow without leaving the site. */
export const ContributeModal = ({opened, onClose}: {opened: boolean; onClose: () => void}) => (
    <Modal opened={opened} onClose={onClose} title="Contribute a Play" size="lg">
        <div className="prose contribute-modal">
            <p>
                Plays are MDX files in <code>packages/design-playbook/plays/</code>. Three ways in,
                easiest first:
            </p>
            <h2>With your agent (recommended)</h2>
            <Copyable label="1. Get the repo" command={`git clone ${REPO_SSH}`} />
            <Copyable
                label="2. Then tell your agent"
                command="Use the add-play skill to add a play about <topic>"
            />
            <p>
                The skill interviews you, scaffolds the play in the house grammar, and preps the
                PR. A maintainer adds the hero illustration.
            </p>
            <h2>Through the playbook MCP</h2>
            <Copyable
                label="With the design-playbook MCP connected, just ask"
                command="Propose a play about <topic> to the design playbook"
            />
            <h2>By hand</h2>
            <p>
                Create <code>plays/&lt;slug&gt;.mdx</code> per the contract in AGENTS.md, open a
                PR, and check the preview link the PR gets. Content PRs need a rendering check,
                not a code review. Plays follow the grammar: <em>When? / Why? / What do you need? /
                Step by step / Common mistakes / What next?</em>
            </p>
        </div>
    </Modal>
);

import {Anchor, Button} from '@mantine/core';
import {Link} from 'react-router-dom';

/** Catch-all for unknown routes and unwritten content — friendly, and turns
 * the dead end into a contribution prompt. */
export const NotFound = ({title = 'Nothing here yet'}: {title?: string}) => (
    <div className="page not-found">
        <h1>
            <span className="gradient-heading">{title}</span>
        </h1>
        <p>
            Looks like this content is missing — either the address is off, or this part of the
            playbook hasn&rsquo;t been written yet.
        </p>
        <p>
            Think it should exist? The playbook takes contributions from the Coveo design
            community —{' '}
            <Anchor
                href="https://github.com/coveo/design-playbook/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noreferrer"
            >
                here&rsquo;s how to contribute
            </Anchor>
            .
        </p>
        <Button component={Link} to="/" variant="light" mt="md">
            Back to the Playbook
        </Button>
    </div>
);

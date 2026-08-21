import {useLocalStorage} from '@mantine/hooks';

/** One flag gates all team-facing content: upcoming plays, internal skill
 * links (coveo/ai-tools is a private repo), and contribution shortcuts.
 * Toggled from the ⌘K options panel. Presentation, not security — the repo
 * is public; this keeps the public site free of links that 404 outside. */
export const useTeamMode = () =>
    useLocalStorage({key: 'playbook-team-mode', defaultValue: false});

import {ActionIcon, AppShell, Group, NavLink as MantineNavLink, ScrollArea, Tooltip} from '@mantine/core';
import {
    IconHelpCircle,
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarLeftExpand,
} from '@coveord/plasma-react-icons';
import {useDisclosure} from '@mantine/hooks';
import {Link, Outlet, useLocation} from 'react-router-dom';
import coveoLogo from './assets/coveo-logo.svg';
import {ConfidenceMeter} from './components/ConfidenceMeter';
import {playsInSection, sections} from './plays';

export const App = () => {
    const [opened, {toggle}] = useDisclosure(true);
    const location = useLocation();

    return (
        <AppShell
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: {mobile: !opened, desktop: !opened},
            }}
            padding={0}
        >
            <AppShell.Navbar p="sm">
                <AppShell.Section>
                    <Group justify="space-between" wrap="nowrap" pb="sm">
                        <Link to="/" className="sidebar-logo">
                            <img src={coveoLogo} alt="Coveo" />
                            <span>Design Playbook</span>
                        </Link>
                        <Tooltip label="Hide navigation" withArrow>
                            <ActionIcon
                                variant="subtle"
                                color="gray"
                                onClick={toggle}
                                aria-label="Hide navigation"
                            >
                                <IconLayoutSidebarLeftCollapse size={20} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </AppShell.Section>
                <AppShell.Section grow component={ScrollArea}>
                    <MantineNavLink
                        component={Link}
                        to="/"
                        label="Home"
                        active={location.pathname === '/'}
                    />
                    {sections.map((section) => {
                        const sectionPlays = playsInSection(section.id);
                        if (sectionPlays.length === 0) {
                            return null;
                        }
                        return (
                            <MantineNavLink
                                key={section.id}
                                label={section.label}
                                defaultOpened
                                childrenOffset={12}
                            >
                                {sectionPlays.map(({frontmatter}) => (
                                    <MantineNavLink
                                        key={frontmatter.slug}
                                        component={Link}
                                        to={`/plays/${frontmatter.slug}`}
                                        active={location.pathname === `/plays/${frontmatter.slug}`}
                                        label={
                                            frontmatter.comingSoon
                                                ? `${frontmatter.title} (soon)`
                                                : frontmatter.title
                                        }
                                        rightSection={
                                            !frontmatter.comingSoon && (
                                                <ConfidenceMeter
                                                    level={frontmatter.confidence}
                                                    small
                                                />
                                            )
                                        }
                                    />
                                ))}
                            </MantineNavLink>
                        );
                    })}
                </AppShell.Section>
                <AppShell.Section>
                    <MantineNavLink
                        component={Link}
                        to="/how-to-use"
                        label="How to use"
                        active={location.pathname === '/how-to-use'}
                        leftSection={<IconHelpCircle size={18} />}
                    />
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main>
                {!opened && (
                    <Tooltip label="Show navigation" withArrow>
                        <ActionIcon
                            variant="default"
                            className="nav-expand"
                            onClick={toggle}
                            aria-label="Show navigation"
                        >
                            <IconLayoutSidebarLeftExpand size={20} />
                        </ActionIcon>
                    </Tooltip>
                )}
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

import {
    ActionIcon,
    AppShell,
    Burger,
    Group,
    NavLink as MantineNavLink,
    ScrollArea,
    Tooltip,
} from '@mantine/core';
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
    const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
    const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);
    const location = useLocation();

    return (
        <AppShell
            header={{height: 56}}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: {mobile: !mobileOpened, desktop: !desktopOpened},
            }}
            padding="xl"
        >
            <AppShell.Header withBorder={false} style={{borderBottom: '1px solid var(--pb-border)'}}>
                <Group h="100%" px="md" gap="sm">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    {!desktopOpened && (
                        <Tooltip label="Show navigation" withArrow>
                            <ActionIcon
                                variant="subtle"
                                color="gray"
                                visibleFrom="sm"
                                onClick={toggleDesktop}
                                aria-label="Show navigation"
                            >
                                <IconLayoutSidebarLeftExpand size={20} />
                            </ActionIcon>
                        </Tooltip>
                    )}
                    <Link to="/" className="sidebar-logo">
                        <img src={coveoLogo} alt="Coveo" />
                        <span>Design Playbook</span>
                    </Link>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="sm">
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
                                        disabled={frontmatter.comingSoon}
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
                    <Group gap={4} wrap="nowrap">
                        <MantineNavLink
                            component={Link}
                            to="/how-to-use"
                            label="How to use"
                            active={location.pathname === '/how-to-use'}
                            leftSection={<IconHelpCircle size={18} />}
                            style={{flex: 1}}
                        />
                        <Tooltip label="Hide navigation" withArrow>
                            <ActionIcon
                                variant="subtle"
                                color="gray"
                                visibleFrom="sm"
                                onClick={toggleDesktop}
                                aria-label="Hide navigation"
                            >
                                <IconLayoutSidebarLeftCollapse size={20} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

import {AppShell, Burger, Group, NavLink as MantineNavLink, ScrollArea} from '@mantine/core';
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
            <AppShell.Header>
                <Group h="100%" px="md" gap="sm">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
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
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

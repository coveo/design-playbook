import {ActionIcon, AppShell, Collapse, ScrollArea, Tooltip} from '@mantine/core';
import {
    IconChevronRight,
    IconHelpCircle,
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarLeftExpand,
} from '@coveord/plasma-react-icons';
import {useDisclosure} from '@mantine/hooks';
import type {ReactNode} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import coveoLogo from './assets/coveo-logo.svg';
import {ConfidenceMeter} from './components/ConfidenceMeter';
import {playsInSection, sections} from './plays';

interface NavRowProps {
    to: string;
    active: boolean;
    indent?: boolean;
    muted?: boolean;
    right?: ReactNode;
    children: ReactNode;
}

const NavRow = ({to, active, indent, muted, right, children}: NavRowProps) => (
    <Link
        to={to}
        className={`nav-row${active ? ' active' : ''}${indent ? ' indent' : ''}${muted ? ' muted' : ''}`}
    >
        <span className="nav-row-label">{children}</span>
        {right && <span className="nav-row-right">{right}</span>}
    </Link>
);

const NavGroup = ({label, children}: {label: string; children: ReactNode}) => {
    const [opened, {toggle}] = useDisclosure(true);
    return (
        <div className="nav-group">
            <button type="button" className="nav-row nav-group-header" onClick={toggle}>
                <IconChevronRight size={12} className={`nav-chevron${opened ? ' open' : ''}`} />
                <span className="nav-row-label">{label}</span>
            </button>
            <Collapse expanded={opened}>{children}</Collapse>
        </div>
    );
};

export const App = () => {
    const [opened, {toggle}] = useDisclosure(true);
    const location = useLocation();

    return (
        <AppShell
            // Plasma's theme defaults AppShell to header={height: 60}; this shell
            // has no header, so zero it out or main gets 60px phantom padding.
            header={{height: 0}}
            navbar={{
                width: 280,
                breakpoint: 'sm',
                collapsed: {mobile: !opened, desktop: !opened},
            }}
            padding={0}
        >
            <AppShell.Navbar p="sm" className="sidebar">
                <AppShell.Section>
                    <div className="sidebar-header">
                        <Link to="/" className="sidebar-logo">
                            <img src={coveoLogo} alt="Coveo" />
                            <span>Design Playbook</span>
                        </Link>
                        <Tooltip label="Hide navigation" withArrow fz="xs">
                            <ActionIcon
                                variant="subtle"
                                color="gray"
                                onClick={toggle}
                                aria-label="Hide navigation"
                            >
                                <IconLayoutSidebarLeftCollapse size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </div>
                </AppShell.Section>
                <AppShell.Section grow component={ScrollArea}>
                    {sections.map((section) => {
                        const sectionPlays = playsInSection(section.id);
                        if (sectionPlays.length === 0) {
                            return null;
                        }
                        return (
                            <NavGroup key={section.id} label={section.label}>
                                {sectionPlays.map(({frontmatter}) => (
                                    <NavRow
                                        key={frontmatter.slug}
                                        to={`/plays/${frontmatter.slug}`}
                                        active={location.pathname === `/plays/${frontmatter.slug}`}
                                        indent
                                        muted={frontmatter.comingSoon}
                                        right={
                                            !frontmatter.comingSoon && (
                                                <ConfidenceMeter level={frontmatter.confidence} small />
                                            )
                                        }
                                    >
                                        {frontmatter.comingSoon
                                            ? `${frontmatter.title} (soon)`
                                            : frontmatter.title}
                                    </NavRow>
                                ))}
                            </NavGroup>
                        );
                    })}
                </AppShell.Section>
                <AppShell.Section>
                    <NavRow
                        to="/how-to-use"
                        active={location.pathname === '/how-to-use'}
                        right={<IconHelpCircle size={15} className="nav-help-icon" />}
                    >
                        How to Use
                    </NavRow>
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main>
                {!opened && (
                    <Tooltip label="Show navigation" withArrow fz="xs">
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

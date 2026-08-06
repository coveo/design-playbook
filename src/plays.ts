import type {ComponentType} from 'react';

export type SectionId = 'understanding' | 'designing' | 'beyond';

export interface Section {
    id: SectionId;
    label: string;
}

export const sections: Section[] = [
    {id: 'understanding', label: 'Understanding the problem'},
    {id: 'designing', label: 'Designing a solution'},
    {id: 'beyond', label: 'Beyond the solution'},
];

export interface PlayFrontmatter {
    title: string;
    slug: string;
    section: SectionId;
    summary: string;
    /** 1–5 position on the confidence meter; omit for "anytime" plays */
    confidence?: number;
    comingSoon?: boolean;
    duration?: string;
    participants?: string;
    format?: string;
    /** Path under public/, e.g. /covers/design-smash.png */
    cover?: string;
    miroTemplate?: string;
    skills?: Array<{name: string; url: string}>;
    order?: number;
}

export interface Play {
    frontmatter: PlayFrontmatter;
    Component: ComponentType;
}

interface PlayModule {
    frontmatter: PlayFrontmatter;
    default: ComponentType;
}

const modules = import.meta.glob<PlayModule>('../plays/**/*.mdx', {eager: true});

export const plays: Play[] = Object.values(modules)
    .filter((m) => m.frontmatter?.slug)
    .map((m) => ({frontmatter: m.frontmatter, Component: m.default}))
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));

export const playsInSection = (id: SectionId): Play[] =>
    plays.filter((p) => p.frontmatter.section === id);

export const playBySlug = (slug: string): Play | undefined =>
    plays.find((p) => p.frontmatter.slug === slug);

/** Resolve a public/ asset path against the configured Vite base */
export const asset = (path: string): string =>
    `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

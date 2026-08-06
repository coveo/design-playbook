import type {ComponentType} from 'react';

export interface PlayFrontmatter {
    title: string;
    slug: string;
    category: string;
    summary: string;
    duration?: string;
    participants?: string;
    format?: string;
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

export const categories: string[] = [...new Set(plays.map((p) => p.frontmatter.category))];

export const playBySlug = (slug: string): Play | undefined =>
    plays.find((p) => p.frontmatter.slug === slug);

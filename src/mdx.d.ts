declare module '*.mdx' {
    import type {ComponentType} from 'react';
    export const frontmatter: import('./plays').PlayFrontmatter;
    const Component: ComponentType;
    export default Component;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

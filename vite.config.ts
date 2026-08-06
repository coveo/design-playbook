import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import {defineConfig} from 'vite';

// BASE_PATH lets the same build target GitHub Pages today
// (/design-playbook/) and a CloudFront prefix later.
export default defineConfig({
    base: process.env.BASE_PATH ?? '/',
    plugins: [
        mdx({
            remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, {name: 'frontmatter'}]],
            providerImportSource: '@mdx-js/react',
        }),
        react(),
    ],
});

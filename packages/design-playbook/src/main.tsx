// Mantine base styles MUST load before any plasma-mantine import: Plasma's
// CSS-module overrides need to come later in the cascade to win.
import '@mantine/core/styles.css';
import {Plasmantine} from '@coveord/plasma-mantine/plasmantine';
import {createTheme} from '@mantine/core';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import {App} from './App';
import {Home} from './pages/Home';
import {HowToUse} from './pages/HowToUse';
import {NotFound} from './pages/NotFound';
import {PlayPage} from './pages/PlayPage';
import '@fontsource-variable/inter';
import './styles/theme.css';
import './styles/app.css';

// Plasma's own stack is 'canada-type-gibson' (Typekit); we extend it with the
// locally-installed Gibson and bundled Inter so the same stack reaches every
// Mantine component (tooltips, navlinks) and our CSS via --mantine-font-family.
const theme = createTheme({
    primaryColor: 'violet',
    fontFamily: "canada-type-gibson, Gibson, 'Inter Variable', Inter, sans-serif",
});

// Hash routing keeps deep links working on GitHub Pages without a 404 shim.
const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {index: true, element: <Home />},
            {path: 'plays/:slug', element: <PlayPage />},
            {path: 'how-to-use', element: <HowToUse />},
            {path: '*', element: <NotFound />},
        ],
    },
]);

// Path-style URLs (no hash) become hash routes so the router can resolve
// them — /plays/x redirects to a working play, junk lands on NotFound.
// CloudFront serves index.html for any missing object (SPA fallback), so
// this runs for every bad path. BASE_URL-aware for preview deploys.
const base = import.meta.env.BASE_URL;
const {pathname, search, hash} = window.location;
if (!hash && pathname !== base) {
    const rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\//, '');
    window.location.replace(`${base}#/${rest}${search}`);
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Plasmantine defaultColorScheme="light" theme={theme}>
            <RouterProvider router={router} />
        </Plasmantine>
    </StrictMode>,
);

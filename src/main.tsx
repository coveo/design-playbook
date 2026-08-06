import {Plasmantine} from '@coveord/plasma-mantine/plasmantine';
import {createTheme} from '@mantine/core';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import {App} from './App';
import {Home} from './pages/Home';
import {HowToUse} from './pages/HowToUse';
import {PlayPage} from './pages/PlayPage';
import '@mantine/core/styles.css';
import '@fontsource-variable/inter';
import './styles/theme.css';
import './styles/app.css';

const theme = createTheme({
    primaryColor: 'violet',
    fontFamily:
        "Gibson, 'Inter Variable', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
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
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Plasmantine defaultColorScheme="light" theme={theme}>
            <RouterProvider router={router} />
        </Plasmantine>
    </StrictMode>,
);

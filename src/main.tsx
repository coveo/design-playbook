import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import {App} from './App';
import {Home} from './pages/Home';
import {PlayPage} from './pages/PlayPage';
import './styles/theme.css';
import './styles/app.css';

// Hash routing keeps deep links working on GitHub Pages without a 404 shim.
const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {index: true, element: <Home />},
            {path: 'plays/:slug', element: <PlayPage />},
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);

import {Link, Outlet} from 'react-router-dom';
import coveoLogo from './assets/coveo-logo.svg';

export const App = () => (
    <>
        <header className="site-header">
            <img src={coveoLogo} alt="Coveo" />
            <Link to="/">Design Playbook</Link>
            <span className="header-kicker">Ways of working</span>
        </header>
        <Outlet />
    </>
);

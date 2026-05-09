import { useAuth } from '../../context/authContext';
import { useLocation, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; 
import GridViewIcon from '@mui/icons-material/GridView'; 
import PersonIcon from '@mui/icons-material/Person'; 
import styles from './NavBar.module.scss';
import { Button } from '../../components/Button/Button';

const Navbar = () => {
  const { isAuthenticated} = useAuth(); 
  const location = useLocation();

  const hiddenRoutes = ['/login', '/register', '/welcome'];
  
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const mainLinks = [
    { to: '/dashboard', label: 'Overview', icon: <HomeIcon /> },
    { to: '/projects', label: 'Projects', icon: <GridViewIcon /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (!isAuthenticated) {
    return (
      <header className={styles.header}>
        <Link to="/" className={styles.header__logo}>
          ShowUp2Move
        </Link>
        <Button to="/register" variant='solid' size="sm">
          Log In
        </Button>
      </header>
    );
  }

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar__header}>
          <div className={styles['sidebar__header-title']}>WORKSPACE</div>
        </div>

        <nav className={styles.sidebar__nav}>
          {mainLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles.sidebar__link} ${isActive(link.to) ? styles['sidebar__link--active'] : ''}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebar__footer}>
          <button className={styles['sidebar__footer-btn']}>
            New Project
          </button>

        </div>
      </aside>

      <nav className={styles.bottomBar}>
        {mainLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`${styles.bottomBar__link} ${isActive(link.to) ? styles['bottomBar__link--active'] : ''}`}
          >
            {link.icon}
          </Link>
        ))}
        <Link
          to="/settings"
          className={`${styles.bottomBar__link} ${isActive('/settings') ? styles['bottomBar__link--active'] : ''}`}
        >
          <PersonIcon />
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
import { useAuth } from '../../context/authContext';
import { useLocation, Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; 
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person'; 
import styles from './NavBar.module.scss';
import { Button } from '../../components/Button/Button';

const Navbar = () => {
  const { isAuthenticated } = useAuth(); 
  const location = useLocation();

  const hiddenRoutes = ['/login', '/register', '/welcome'];
  
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  // Am actualizat rutele pentru platforma de sport
  const mainLinks = [
    { to: '/matches', label: 'My Matches', icon:  <HomeIcon /> },
    { to: '/sports', label: 'Sports', icon: <SportsKabaddiIcon /> },
    { to: '/groups', label: 'Groups', icon: <GroupsIcon /> },
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
          <div className={styles['sidebar__header-title']}>SHOWUP2MOVE</div>
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
            + Quick Match
          </button>
        </div>
      </aside>

      {/* Varianta de Mobile (Bottom Bar) */}
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
          to="/profile"
          className={`${styles.bottomBar__link} ${isActive('/profile') ? styles['bottomBar__link--active'] : ''}`}
        >
          <PersonIcon />
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
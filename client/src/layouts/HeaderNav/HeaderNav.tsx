import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './HeaderNav.module.scss';
import { useProfile } from '../../hooks/useProfile';
import { Button } from '../../components/Button/Button';

const HeaderNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  const {profile} = useProfile();
  const hiddenRoutes = ['/login', '/register', '/welcome'];
    if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const pathnames = location.pathname.split('/').filter((x) => x);
    console.log(user);
  return (
    <header className={styles.header}>
      
      <nav className={styles.breadcrumb}>
        <Link to="/dashboard" className={styles.breadcrumb__link}>
          Home
        </Link>
        
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

          return (
            <div key={to} className={styles.breadcrumb__item}>
              <div className={styles.breadcrumb__separator}>
                <ChevronRightIcon fontSize="small" />
              </div>
              
              {isLast ? (
                <span className={styles.breadcrumb__current}>
                  {label}
                </span>
              ) : (
                <Link to={to} className={styles.breadcrumb__link}>
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      <div className={styles.account}>
        <span className={styles.account__name}>
            <Button 
            size='sm' 
            variant='text'
             to="/profile"
             iconPosition="right"
             icon={        
             <div className={styles.account__avatar}>
                {(profile?.username || 'A').charAt(0)}
            </div>
            }
             >{profile?.username || 'Account'} 
             </Button>
        </span>
      </div>

    </header>
  );
};

export default HeaderNav;
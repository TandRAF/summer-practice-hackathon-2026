import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../NavBar/NavBar'; 
import styles from './AuthLayout.module.scss'
import HeaderNav from '../HeaderNav/HeaderNav';

export const AuthLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className={isAuthPage ? styles['container'] : styles['authed-container']}>
        <Navbar /> 
        <main className={styles['authed-container__main']}>
          <HeaderNav/>
          <div>
            <Outlet />
          </div>
        </main>
    </div>
  );
};
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../NavBar/NavBar'; 
import styles from './NotAuthedLayout.module.scss';

export const NotAuthedLayout = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className={isAuthPage ? styles['container'] : styles['not-authed-container']}>
        <Navbar /> 
        <Outlet />
    </div>
  );
};
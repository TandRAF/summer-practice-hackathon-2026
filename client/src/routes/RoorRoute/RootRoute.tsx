import { useAuth } from '../../context/authContext'; 
import { DashboardPage } from '../../pages/DashboardPage/DashboardPage';
import { LandingPage } from "../../pages/LandingPage/LandingPage";

export const RootRoute = () => {
  const { isAuthenticated } = useAuth(); 

  return isAuthenticated ? <DashboardPage /> : <LandingPage />;
};
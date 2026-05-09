import { useAuth } from '../../context/authContext'; 

import { HomePage } from "../../pages/HomePage/HomePage";
import { LandingPage } from "../../pages/LandingPage/LandingPage";

export const RootRoute = () => {
  const { isAuthenticated } = useAuth(); 

  return isAuthenticated ? <HomePage /> : <LandingPage />;
};
import { StyledEngineProvider } from '@mui/material';
import { AuthProvider, useAuth } from './context/authContext';

// Import your new layouts
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { NotAuthedLayout } from './layouts/NotAuthedLayout/NotAuthedLayout';

const App: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </StyledEngineProvider>
  );
};

const MainContent = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthLayout /> : <NotAuthedLayout />;
};

export default App;
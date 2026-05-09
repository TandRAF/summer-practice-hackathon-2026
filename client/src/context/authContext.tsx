import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { authService } from "../services/authService";
import { type AuthUser, type AuthContextType } from "../types/auth"; 

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) setUser(JSON.parse(savedUser));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || "Eroare la autentificare.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(username, email, password);
      await login(email, password); 
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Eroare la înregistrare.";
      
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth trebuie folosit în interiorul unui AuthProvider");
  return context;
};
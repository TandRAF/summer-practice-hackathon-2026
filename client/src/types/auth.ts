// Acesta este utilizatorul standard folosit în toată aplicația
export interface AuthUser {
  id: string;
  email: string;
  userName?: string;
  profilePictureUrl?: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}


export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

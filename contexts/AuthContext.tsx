import { createContext, useContext } from 'react';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);
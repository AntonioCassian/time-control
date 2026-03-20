import { createContext, useContext } from 'react';

export interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  error: string; // <-- adiciona aqui
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoading: false,
  error: '',
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);
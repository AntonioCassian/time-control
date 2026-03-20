import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

import { api } from "@/services/api";

export interface AuthContextProps {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const loadToken = async () => {
            const savedToken = await AsyncStorage.getItem('access_token');
            if (savedToken) {
                setToken(savedToken);
            }
            setIsLoading(false);
        };
        loadToken();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const accessToken = response?.data?.token;

            setToken(accessToken);
            await AsyncStorage.setItem('access_token', accessToken);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error; 
        }
    };
    const logout = async () => {
        setToken(null);
        await AsyncStorage.removeItem('access_token');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


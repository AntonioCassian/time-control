import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import { AuthContext } from "@/contexts/AuthContext";
import { useLoginMutation } from "@/mutations/useLoginMutation";

interface AuthProviderProps {
    children: React.ReactNode;
    queryClient: QueryClient;
}

export const AuthProvider = ({ children, queryClient }: AuthProviderProps) => {
    const { mutate: mutateLogin } = useLoginMutation();
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>(""); 
    useEffect(() => {
        const loadToken = async () => {
            try {
                const savedToken = await AsyncStorage.getItem('token');
                if (savedToken) setToken(savedToken);
            } catch (err) {
                console.error("Erro ao carregar token:", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadToken();
    }, []);

    const login = async (email: string, password: string) => {
        setError("");

        if (!email || !password) {
            setError("Email e senha são obrigatórios");
            return;
        }

        setIsLoading(true);

        try {
            const result = await mutateLogin({ email, password });

            if (!result?.token) {
                setError("Token não recebido do servidor");
                return;
            }

            await AsyncStorage.setItem('token', result.token);
            setToken(result.token);

            router.replace('/(tabs)');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err?.message || "Erro ao fazer login");
        } finally {
            setIsLoading(false);
        }
    };
    
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setToken(null);
            queryClient.clear();
            router.replace('/');
        } catch (err) {
            console.error("Erro ao deslogar:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ token, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
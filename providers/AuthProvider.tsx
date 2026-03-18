import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

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

    useEffect(() => {
        const loadToken = async () => {
            const savedToken = await AsyncStorage.getItem('token');
            if (savedToken) setToken(savedToken);
            setIsLoading(false);
        };
        loadToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const result = await mutateLogin({ email, password });
            await AsyncStorage.setItem('token', result.token);
            setToken(result.token);

            router.replace('/(tabs)');
        } catch (err: any) {
            Alert.alert('Erro no login', err.message);
            throw err;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setToken(null);
        queryClient.clear();
        router.replace('/');
    };

    return (
        <AuthContext.Provider value={{ token, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
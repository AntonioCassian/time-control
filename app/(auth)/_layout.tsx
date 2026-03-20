// app/(auth)/_layout.tsx

import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect } from "react";

import { LoadingComponent } from "@/components/ui/loading";
import { useAuth } from "@/providers/AuthProvider";

// import { useAuth } from "@/src/contexts/AuthContext";

export default function AuthLayout() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    if (isLoading) {
        <LoadingComponent />
    }

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/(tabs)");
        }
    }, [isAuthenticated, isLoading]);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="login" options={{ headerShown: false }} />
            {/* <Stack.Screen name="signup" options={{ headerShown: false }} /> */}
        </Stack>
    );
}

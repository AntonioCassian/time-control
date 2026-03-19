import "../global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "@/contexts/AuthContext";
import { AuthProvider } from "@/providers/AuthProvider";
import { queryClient } from "@/services/queryClient";


export default function RootLayout() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider queryClient={queryClient}>
        {/* <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> /}
        </Stack> */}
        <Root />
        <StatusBar style="auto" backgroundColor="#000000" translucent={true} />
      </AuthProvider>
    </QueryClientProvider>
  )
}


const Root = () => {
  const { token, isLoading } = useAuth();

  // Espera o layout montar antes de redirecionar
  useEffect(() => {
    if (!isLoading) {
      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("/");
      }
    }
  }, [token, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ⚠️ Renderiza Slot imediatamente para o Router montar a navegação
  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: "#F3F4F6",
      },
      headerTransparent: false,
      // headerShadowVisible: false,
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notificações",
          headerBackTitle: "Voltar",
          headerTintColor: "#111827",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#111827",
          },
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerBackTitle: "Voltar",
          headerTintColor: "#111827",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#111827",
          },
        }}
      />
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
    </Stack>
  )
};
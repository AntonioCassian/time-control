import { Tabs } from "expo-router";
import { HapticTab } from "@/components/ui/haptic-tab";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {

  return (
    <>
    <StatusBar style="auto"  translucent={true} />
    <SafeAreaView  className={`${Platform.OS === 'ios' ? '' : ''} flex-1  bg-gray-200`}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#dc2626",
        headerShown: true,
        tabBarButton: HapticTab,
        headerStyle: {
          paddingTop: Platform.OS === 'ios' ? 60 : 0,  // Ajuste para iOS
        },

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Historico',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="history" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      /> */}
    </Tabs>
    </SafeAreaView >
    </>
  );
}
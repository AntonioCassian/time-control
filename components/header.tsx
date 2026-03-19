import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, View } from "react-native";

export const Header = () => {
    const today = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
    });
    return (
        <View className="flex-row items-center justify-between">
            {/* Lado esquerdo */}
            <View>
                <Text className="text-sm text-gray-500">Olá 👋</Text>
                <Text className="text-2xl font-bold text-gray-900">
                    Antonio
                </Text>

                <Text className="mt-1 text-xs text-gray-400">
                    {today}
                </Text>
            </View>

            {/* Lado direito */}
            <View className="flex-row items-center gap-3">
                {/* Notificação */}
                <View
                onTouchEnd={() => router.push('/notifications')}
                className="relative h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                    <MaterialIcons name="notifications-none" size={22} color="#374151" />

                    <View className="absolute right-0 top-0 h-3 w-3 items-center justify-center rounded-full bg-red-500">

                    </View>

                </View>

                {/* Avatar */}
                <View onTouchEnd={() => router.push('/profile')} className="h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                    <Text className="font-bold text-white">A</Text>
                </View>
            </View>
        </View>
    );
};
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Text, View } from "react-native";

import { useMe } from "@/mutations/useMe";

export const Header = () => {
    const { data, isLoading, error } = useMe(true);

    const user = data;

    const firstName = user?.name.split(' ')[0];
    const firstLetter = user?.name.charAt(0);


    const today = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
    });
    
    return (
        <View className="flex-row items-center justify-between">
            <View>
                <Text className="text-sm text-gray-500">Olá 👋</Text>
                <Text className="text-2xl font-bold text-gray-900">
                    {firstName}
                </Text>

                <Text className="mt-1 text-xs text-gray-400">
                    {today}
                </Text>
            </View>

            <View className="flex-row items-center gap-3">
                <View
                    onTouchEnd={() => router.push('/notifications')}
                    className="relative items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
                    <MaterialIcons name="notifications-none" size={22} color="#374151" />

                    <View className="absolute top-0 right-0 items-center justify-center w-3 h-3 bg-red-500 rounded-full">

                    </View>

                </View>

                {/* Avatar */}
                <View onTouchEnd={() => router.push('/profile')} className="items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                    <Text className="font-bold text-white">{firstLetter}</Text>
                </View>
            </View>
        </View>
    );
};
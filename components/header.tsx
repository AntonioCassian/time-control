import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
                <View className="items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
                    <MaterialIcons name="notifications-none" size={22} color="#374151" />
                </View>

                {/* Avatar */}
                <View className="items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
                    <Text className="font-bold text-white">A</Text>
                </View>
            </View>
        </View>
    );
};
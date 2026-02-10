import { Text, View } from "react-native"

export const Header = ()  => {
    return (
        <View className="flex-row">
            <View>
                <Text className="text-sm text-gray-600">Olá</Text>
                <Text className="text-xl font-semibold text-foreground">Antonio</Text>
            </View>
        </View>
    )
}
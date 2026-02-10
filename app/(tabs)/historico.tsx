import { Card } from "@/components/ui/card";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from "react-native";

export default function Historico() {
    return (
        <View>
            <View className="my-4 flex flex-row items-center justify-between">
                <TouchableOpacity>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color="#282c34" />
                </TouchableOpacity>
                <Text className="text-[16px] font-semibold capitalize text-[#282c34]">Janeiro De 2026</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="#282c34" />
            </View>
            <Card className="flex-row items-center gap-2">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-slate-400">
                    <MaterialIcons size={20} name="history" color="#ffffff" />
                </View>
                <View className="flex-1 flex-row justify-between">
                    <View className="flex-col items-start gap-1">
                        <Text>Total do mês</Text>
                        <Text className="text-[#282c34] font-bold text-xl">0h00</Text>
                    </View>
                    <View className="flex-col items-end gap-1">
                        <Text>Dias</Text>
                        <Text className="text-[#282c34] font-bold text-xl">1</Text>
                    </View>
                </View>
            </Card>
            <View>
                <Text className="mt-4 mb-2 text-base !text-[##6b7280] uppercase font-bold">Registros</Text>
                <Card className="flex-row items-center gap-2 p-4 bg-white border-b-2 border-[#e5e7eb] rounded-xl flex-wrap relative">
                    <View className="absolute right-2 top-4 rounded-sm bg-red-200 p-1">
                        <Text className="font-semibold text-red-500">0h22</Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-2 rounded-sm bg-slate-200 p-2">
                        <View className="items-center justify-center">
                            <Ionicons name="enter-outline" size={16} color="green" className="font-semibold" />
                        </View>
                        <Text className="text-sm text-[#6b7280]">15:25</Text>
                    </View>
                </Card>
            </View>
        </View>
    );
}
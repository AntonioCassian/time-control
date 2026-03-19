import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";

import { Card } from "@/components/ui/card";

export default function Historico() {
  return (
    <View className="flex-1 px-4 pt-6 bg-gray-100">
      
      {/* Header mês */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm">
          <MaterialIcons name="keyboard-arrow-left" size={22} color="#374151" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-gray-800">
          Janeiro de 2026
        </Text>

        <TouchableOpacity className="p-2 bg-white rounded-full shadow-sm">
          <MaterialIcons name="keyboard-arrow-right" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Resumo */}
      <Card className="p-4 mb-6 bg-white shadow-sm rounded-2xl">
        <View className="flex-row items-center gap-3">
          <View className="items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
            <MaterialIcons size={22} name="insights" color="#fff" />
          </View>

          <View className="flex-row justify-between flex-1">
            <View>
              <Text className="text-xs text-gray-500">Total do mês</Text>
              <Text className="text-xl font-bold text-gray-800">0h00</Text>
            </View>

            <View className="items-end">
              <Text className="text-xs text-gray-500">Dias trabalhados</Text>
              <Text className="text-xl font-bold text-gray-800">1</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Registros */}
      <View>
        <Text className="mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase">
          Registros
        </Text>

        {/* Card do dia */}
        <Card className="p-4 mb-3 bg-white shadow-sm rounded-2xl">
          
          {/* Header do dia */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-semibold text-gray-800">
              12 Jan 2026
            </Text>

            <View className="px-2 py-1 bg-red-100 rounded-full">
              <Text className="text-xs font-semibold text-red-600">
                -0h22
              </Text>
            </View>
          </View>

          {/* Timeline */}
          <View className="gap-3">
            
            {/* Entrada */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                  <Ionicons name="enter-outline" size={18} color="green" />
                </View>
                <Text className="text-gray-700">Entrada</Text>
              </View>

              <Text className="font-semibold text-gray-800">08:00</Text>
            </View>

            {/* Saída */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                  <Ionicons name="exit-outline" size={18} color="red" />
                </View>
                <Text className="text-gray-700">Saída</Text>
              </View>

              <Text className="font-semibold text-gray-800">12:00</Text>
            </View>

          </View>
        </Card>
      </View>
    </View>
  );
}
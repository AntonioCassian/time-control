import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";

import { Card } from "@/components/ui/card";

export default function Historico() {
  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      
      {/* Header mês */}
      <View className="mb-4 flex-row items-center justify-between">
        <TouchableOpacity className="rounded-full bg-white p-2 shadow-sm">
          <MaterialIcons name="keyboard-arrow-left" size={22} color="#374151" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-gray-800">
          Janeiro de 2026
        </Text>

        <TouchableOpacity className="rounded-full bg-white p-2 shadow-sm">
          <MaterialIcons name="keyboard-arrow-right" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Resumo */}
      <Card className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-blue-500">
            <MaterialIcons size={22} name="insights" color="#fff" />
          </View>

          <View className="flex-1 flex-row justify-between">
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
        <Text className="text-sm font-bold uppercase tracking-wide text-gray-500">
          Registros
        </Text>

        {/* Card do dia */}
        <Card className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
          
          {/* Header do dia */}
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="font-semibold text-gray-800">
              12 Jan 2026
            </Text>

            <View className="rounded-full bg-red-100 px-2 py-1">
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
                <View className="h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Ionicons name="enter-outline" size={18} color="green" />
                </View>
                <Text className="text-gray-700">Entrada</Text>
              </View>

              <Text className="font-semibold text-gray-800">08:00</Text>
            </View>

            {/* Saída */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-red-100">
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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Modal,Text, View } from "react-native";

import { LocationC } from "./location";
import { MyButton } from "./ui/button";
import { Camera } from "./ui/camera";
import { Card } from "./ui/card";

export const TimeCircle = ({
  hours = 50,
  goal = 100,
}: {
  hours?: number;
  goal?: number;
}) => {
  const percentage = Math.min((hours / goal) * 100, 100);

  const [permission, requestPermission] = useCameraPermissions();
  const [open, setOpen] = useState(false);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View className="p-4 bg-white rounded-xl">
        <Text className="text-gray-600">
          Você precisa dar permissão para usar a câmera
        </Text>
        <MyButton title="Pedir Permissão" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <>
      <Modal visible={open} animationType="slide">
        <Camera setOpen={setOpen} />
      </Modal>

      <Card className="p-5 bg-white shadow-sm rounded-2xl">
        {/* Data + localização */}
        {/* <View className="items-center mb-4">
          <Text className="text-sm text-gray-500">
            Terça-feira, 23 de Dezembro
          </Text>
          <LocationC />
        </View> */}

        {/* Círculo */}
        <View className="items-center justify-center mb-4">
          <View className="items-center justify-center w-32 h-32 border-8 border-green-500 rounded-full">
            <Text className="text-3xl font-bold text-gray-800">
              {hours}h
            </Text>
          </View>

          <View className="px-3 py-1 mt-3 bg-green-100 rounded-full">
            <Text className="text-xs font-semibold text-green-700">
              {percentage.toFixed(0)}% da meta
            </Text>
          </View>
        </View>

        {/* Próxima ação */}
        <View className="flex-row items-center justify-center gap-2 p-2 mb-4 bg-blue-100 rounded-full">
          <MaterialIcons name="schedule" size={18} color="#1d4ed8" />
          <Text className="text-sm font-semibold text-blue-700">
            Próximo: Entrada
          </Text>
        </View>

        {/* Barra de progresso */}
        <View className="h-2 mb-4 overflow-hidden bg-gray-200 rounded-full">
          <View
            className="h-full bg-green-500"
            style={{ width: `${percentage}%` }}
          />
        </View>

        {/* Botão */}
        <MyButton
          title="Registrar Ponto"
          onPress={() => setOpen(true)}
        />
      </Card>
    </>
  );
};
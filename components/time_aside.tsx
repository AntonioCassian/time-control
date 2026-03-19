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
      <Card className="">
        <Text className="mb-2 text-center text-gray-600">
          Você precisa dar permissão para usar a câmera
        </Text>
        <MyButton title="Pedir Permissão" onPress={requestPermission} />
      </Card>
    );
  }

  return (
    <>
      <Modal visible={open} animationType="slide">
        <Camera setOpen={setOpen} />
      </Modal>

      <Card className="rounded-2xl bg-white p-5 shadow-sm">
        {/* Data + localização */}
        {/* <View className="mb-4 items-center">
          <Text className="text-sm text-gray-500">
            Terça-feira, 23 de Dezembro
          </Text>
          <LocationC />
        </View> */}

        {/* Círculo */}
        <View className="mb-4 items-center justify-center">
          <View className="h-32 w-32 items-center justify-center rounded-full border-8 border-green-500">
            <Text className="text-3xl font-bold text-gray-800">
              {hours}h
            </Text>
          </View>

          <View className="mt-3 rounded-full bg-green-100 px-3 py-1">
            <Text className="text-xs font-semibold text-green-700">
              {percentage.toFixed(0)}% da meta
            </Text>
          </View>
        </View>

        {/* Próxima ação */}
        <View className="mb-4 flex-row items-center justify-center gap-2 rounded-full bg-blue-100 p-2">
          <MaterialIcons name="schedule" size={18} color="#1d4ed8" />
          <Text className="text-sm font-semibold text-blue-700">
            Próximo: Entrada
          </Text>
        </View>

        {/* Barra de progresso */}
        <View className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
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
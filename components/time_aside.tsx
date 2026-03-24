import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Modal, Text, View } from "react-native";

import { useLocation } from "./location";
import { MyButton } from "./ui/button";
import { Camera } from "./ui/camera";
import { Card } from "./ui/card";

export type TimeRecord = {
  id: number;
  event_type: string;
  created_at: string;
};

type TimeCircleProps = {
  dailyGoal?: number;
  workedHours?: number; // ✅ API
  nextEventType?: string; // ✅ API
  addRecord?: (record: TimeRecord) => void;
};

export const TimeCircle = ({
  dailyGoal = 8,
  workedHours = 0,
  nextEventType = "entrada",
  addRecord,
}: TimeCircleProps) => {
  const totalHours = workedHours;

  const percentage = Math.min(
    Math.round((totalHours / dailyGoal) * 100),
    100
  );

  const goalCompleted = totalHours >= dailyGoal;

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const nextEvent = capitalize(nextEventType);

  // 🎨 cores
  const eventColors: Record<string, string> = {
    Entrada: "#1d4ed8",
    Saida: "#dc2626",
    Retorno: "#16a34a",
  };

  const eventBgColors: Record<string, string> = {
    Entrada: "#DBEAFE",
    Saida: "#FEE2E2",
    Retorno: "#DCFCE7",
  };

  const nextEventColor = eventColors[nextEvent] ?? "#1e40af";
  const nextEventBg = eventBgColors[nextEvent] ?? "#E0E7FF";

  // 📷 câmera
  const [permission, requestPermission] = useCameraPermissions();
  const [open, setOpen] = useState(false);

  const { location, errorMsg, loading, refreshLocation } = useLocation();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <Card>
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
        <Camera
          setOpen={setOpen}
          location={location}
          eventType={nextEventType} // ✅ direto da API
          addRecord={addRecord}
        />
      </Modal>

      <Card className="rounded-2xl bg-white p-5 shadow-sm">
        {/* localização */}
        <View className="mb-4 items-center">
          {!location && (
            <Text className="text-sm text-gray-500">
              Verificação de localização
            </Text>
          )}

          {loading && (
            <Text className="mt-1 text-xs text-gray-400">
              📍 Obtendo localização...
            </Text>
          )}

          {errorMsg && (
            <>
              <Text className="mt-1 text-xs text-red-500">
                {errorMsg}
              </Text>
              <MyButton
                title="Ativar localização"
                onPress={refreshLocation}
              />
            </>
          )}
        </View>

        {/* círculo */}
        <View className="mb-4 items-center justify-center">
          <View
            className="h-32 w-32 items-center justify-center rounded-full border-8"
            style={{
              borderColor: goalCompleted ? "#2563eb" : "#22c55e",
            }}
          >
            <Text className="text-3xl font-bold text-gray-800">
              {totalHours.toFixed(2)}h
            </Text>
          </View>

          <View className="mt-3 rounded-full bg-green-100 px-3 py-1">
            <Text className="text-xs font-semibold text-green-700">
              {percentage}% da meta diária
            </Text>
          </View>
        </View>

        {/* próximo evento */}
        <View
          className="mb-4 flex-row items-center justify-center gap-2 rounded-full p-2"
          style={{ backgroundColor: nextEventBg }}
        >
          <MaterialIcons
            name="schedule"
            size={18}
            color={nextEventColor}
          />
          <Text
            className="text-sm font-semibold"
            style={{ color: nextEventColor }}
          >
            Próximo: {nextEvent}
          </Text>
        </View>

        {/* barra */}
        <View className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
          <View
            className="h-full bg-green-500"
            style={{ width: `${percentage}%` }}
          />
        </View>

        {/* botão */}
        <MyButton
          title={
            goalCompleted
              ? "Meta diária concluída 🎉"
              : `Registrar ${nextEvent}`
          }
          disabled={goalCompleted}
          className={goalCompleted ? "bg-gray-400" : ""}
          onPress={() => setOpen(true)}
        />
      </Card>
    </>
  );
};
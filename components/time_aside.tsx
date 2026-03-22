import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Modal, Text, View } from "react-native";

import { useLocation } from "./location";
import { MyButton } from "./ui/button";
import { Camera } from "./ui/camera";
import { Card } from "./ui/card";

export type Record = {
  id: number;
  event_type: string;
  created_at: string;
  hours?: number;
};

type TimeCircleProps = {
  records?: Record[];
  dailyGoal?: number;
  addRecord?: (record: Record) => void;
};

export const TimeCircle = ({
  records = [],
  dailyGoal = 8,
  addRecord,
}: TimeCircleProps) => {
  // Calcular horas
  const calculateTotalHours = (records: Record[]) => {
    let total = 0;
    let lastEntry: Date | null = null;

    const sorted = [...records].sort(
      (a, b) =>
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
    );

    sorted.forEach((r) => {
      const type = r.event_type.toLowerCase();

      if (type === "entrada") {
        lastEntry = new Date(r.created_at);
      } else if ((type === "saida" || type === "retorno") && lastEntry) {
        const exitTime = new Date(r.created_at);
        const diff =
          (exitTime.getTime() - lastEntry.getTime()) / 1000 / 3600;

        total += diff > 0 ? diff : 0;
        lastEntry = null;
      }
    });

    return total;
  };

  const totalHours = calculateTotalHours(records);

  // 🔥 porcentagem corrigida
  const rawPercentage = (totalHours / dailyGoal) * 100;
  const percentage = Math.min(Math.round(rawPercentage), 100);

  const goalCompleted = totalHours >= dailyGoal;

  // Próximo evento
  const eventsOrder = ["entrada", "saida", "retorno", "saida"];
  const nextEvent =
    eventsOrder.find(
      (e) => !records.some((r) => r.event_type.toLowerCase() === e)
    ) || "nenhum";

  // Cores
  const nextEventColor = (() => {
    switch (nextEvent) {
      case "entrada":
        return "#1d4ed8";
      case "saida":
        return "#dc2626";
      case "retorno":
        return "#16a34a";
      default:
        return "#1e40af";
    }
  })();

  const nextEventBg = (() => {
    switch (nextEvent) {
      case "entrada":
        return "#DBEAFE";
      case "saida":
        return "#FEE2E2";
      case "retorno":
        return "#DCFCE7";
      default:
        return "#E0E7FF";
    }
  })();

  // Câmera
  const [permission, requestPermission] = useCameraPermissions();
  const [open, setOpen] = useState(false);

  // Localização
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
      {/* Modal */}
      <Modal visible={open} animationType="slide">
        <Camera
          setOpen={setOpen}
          location={location}
          eventType={nextEvent}
          addRecord={addRecord}
        />
      </Modal>

      <Card className="p-5 bg-white shadow-sm rounded-2xl">
        {/* Localização */}
        <View className="items-center mb-4">
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
              <Text className="mt-1 text-xs text-red-500">{errorMsg}</Text>
              <MyButton
                title="Ativar localização"
                onPress={refreshLocation}
              />
            </>
          )}
        </View>

        {/* Círculo */}
        <View className="items-center justify-center mb-4">
          <View
            className="items-center justify-center w-32 h-32 border-8 rounded-full"
            style={{
              borderColor: goalCompleted ? "#2563eb" : "#22c55e",
            }}
          >
            <Text className="text-3xl font-bold text-gray-800">
              {totalHours.toFixed(2)}h
            </Text>
          </View>

          <View className="px-3 py-1 mt-3 bg-green-100 rounded-full">
            <Text className="text-xs font-semibold text-green-700">
              {goalCompleted ? "100" : percentage}% da meta diária
            </Text>
          </View>

          {/* 🎉 Meta concluída */}
          {goalCompleted && (
            <View className="px-4 py-2 mt-3 bg-blue-100 rounded-full">
              <Text className="text-sm font-semibold text-blue-700">
                🎉 Meta diária concluída!
              </Text>
            </View>
          )}
        </View>

        {/* Próximo evento */}
        <View
          className="flex-row items-center justify-center gap-2 p-2 mb-4 rounded-full"
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
            Próximo:{" "}
            {nextEvent.charAt(0).toUpperCase() + nextEvent.slice(1)}
          </Text>
        </View>

        {/* Barra */}
        <View className="h-2 mb-4 overflow-hidden bg-gray-200 rounded-full">
          <View
            className="h-full bg-green-500"
            style={{ width: `${percentage}%` }}
          />
        </View>

        {/* Botão */}
        <MyButton
          title={goalCompleted ? "Meta concluída 🎉" : "Registrar Ponto"}
          onPress={() => {
            if (!location) {
              alert("Ative a localização primeiro");
              return;
            }
            setOpen(true);
          }}
        />
      </Card>
    </>
  );
};
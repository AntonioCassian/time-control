import { ScrollView, Text, View } from "react-native";

export type NotificationType = {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

const notifications: NotificationType[] = [
  {
    id: 1,
    title: "Entrada não registrada",
    description: "Você ainda não registrou sua entrada hoje",
    time: "08:15",
    read: false,
  },
  {
    id: 2,
    title: "Hora do almoço 🍽️",
    description: "Não esqueça de registrar sua saída",
    time: "12:00",
    read: true,
  },
  {
    id: 3,
    title: "Meta quase atingida 🎯",
    description: "Faltam 1h para completar sua meta",
    time: "17:00",
    read: false,
  },
];


export default function NotificationsScreen() {
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text className="mb-4 text-2xl font-bold text-gray-900">
          Notificações
        </Text>

        {notifications.map((item) => (
          <View
            key={item.id}
            className={`mb-3 rounded-xl p-4 shadow-sm ${
              item.read ? "bg-white" : "bg-blue-50"
            }`}
          >
            <Text className="font-bold text-gray-800">
              {item.title}
            </Text>

            <Text className="text-sm text-gray-500">
              {item.description}
            </Text>

            <Text className="mt-1 text-xs text-gray-400">
              {item.time}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
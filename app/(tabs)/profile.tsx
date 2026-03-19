import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";

export default function Profile() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    return (
        <View className="flex-1 bg-gray-100">
            <ScrollView contentContainerStyle={{ padding: 16 }}>

                {/* Header */}
                <Text className="mb-4 text-2xl font-bold text-gray-900">
                    Perfil
                </Text>

                {/* Avatar + Nome */}
                <View className="items-center rounded-xl bg-white p-6 shadow-sm">
                    <View className="h-20 w-20 items-center justify-center rounded-full bg-blue-500">
                        <Text className="text-2xl font-bold text-white">A</Text>
                    </View>

                    <Text className="mt-3 text-xl font-bold text-gray-900">
                        Antonio
                    </Text>

                    <Text className="text-sm text-gray-500">
                        Desenvolvedor
                    </Text>
                </View>

                {/* Informações */}
                <View className="mt-4 rounded-xl bg-white p-4 shadow-sm">
                    <Text className="mb-3 text-sm font-bold uppercase text-gray-500">
                        Informações
                    </Text>

                    <InfoItem icon="person" label="Nome" value="Antonio" />
                    <InfoItem icon="work" label="Cargo" value="Desenvolvedor" />
                    <InfoItem icon="business" label="Empresa" value="Minha Empresa" />
                </View>

                {/* Jornada */}
                <View className="mt-4 rounded-xl bg-white p-4 shadow-sm">
                    <Text className="mb-3 text-sm font-bold uppercase text-gray-500">
                        Jornada
                    </Text>

                    <InfoItem icon="schedule" label="Meta diária" value="8 horas" />
                    <InfoItem icon="date-range" label="Meta semanal" value="44 horas" />
                    <InfoItem icon="access-time" label="Horário padrão" value="08:00 - 18:00" />
                </View>

                {/* Configurações */}
                <View className="mt-4 rounded-xl bg-white p-4 shadow-sm">
                    <Text className="mb-3 text-sm font-bold uppercase text-gray-500">
                        Configurações
                    </Text>

                    {/* Notificações */}
                    <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
                        <View className="flex-row items-center gap-2">
                            <MaterialIcons name="notifications" size={20} color="#374151" />
                            <Text className="text-base text-gray-700">
                                Notificações
                            </Text>
                        </View>

                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                        />
                    </View>

                    {/* Política de Privacidade */}
                    <View
                        // onTouchEnd={() => router.push("/privacy")}
                        className="flex-row items-center justify-between py-3"
                    >
                        <View className="flex-row items-center gap-2">
                            <MaterialIcons name="privacy-tip" size={20} color="#374151" />
                            <Text className="text-base text-gray-700">
                                Política de Privacidade
                            </Text>
                        </View>

                        <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
                    </View>
                </View>

                <View
                    // onTouchEnd={handleLogout}
                    className="mt-2 items-center justify-center rounded-xl bg-white py-4 shadow-sm"
                >
                    <Text className="text-base font-bold text-red-500">
                        Sair da conta
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
}

/* COMPONENTE REUTILIZÁVEL */
const InfoItem = ({
    icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string;
}) => (
    <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
        <View className="flex-row items-center gap-2">
            <MaterialIcons name={icon} size={20} color="#6B7280" />
            <Text className="text-gray-500">{label}</Text>
        </View>

        <Text className="font-medium text-gray-900">{value}</Text>
    </View>
);